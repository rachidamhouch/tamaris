import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { config } from "dotenv";
import errorRouter from "./routes/404.js";
import homeRouter from "./routes/home.js";
import adminRouter from "./routes/admin.js";
import loginRouter from "./routes/login.js";
import infoRouter from "./routes/info.js";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import findOrCreate from "mongoose-findorcreate"
import User from "./models/user.js"

config();
const port = 3000;
const app = express();

await mongoose.connect(process.env.DB);

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
      return cb(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_URL
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id}, function (err, user) {
    return cb(err, user);
  });
}
));
//Routes
app.use("/", homeRouter);
app.use("/", loginRouter);
app.use("/", adminRouter);
app.use("/", infoRouter);


app.use("/", errorRouter);
app.listen(process.env.PORT || port, () => {
  console.log(`Server is runing in port: ${process.env.PORT || port}`);
});
