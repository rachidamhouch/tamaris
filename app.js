import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import {config} from "dotenv"
import errorRouter from "./routes/404.js"
import homeRouter from "./routes/home.js"

config()
const port = 3000
const app = express()

mongoose.connect(process.env.DB)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

//Routes
app.use("/", homeRouter)


app.use("/", errorRouter)
app.listen(process.env.PORT || port, () => {
    console.log(`Server is runing in port: ${process.env.PORT || port}`)
})
