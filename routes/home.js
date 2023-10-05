import { Router } from "express";
import multer from "multer";
import User from "../models/user.js";

const router = Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/"); // Store uploaded images in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename files with a unique timestamp
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  const data = {
    name: "",
    age: "",
    phone: "",
    input1: "",
    input2: "",
    input3: "",
    input4: "اه",
    input5: "اه",
    img: "",
    input6: "",
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: "",
    n7: "",
    n8: "",
    n9: "",
    n10: "",
  };
  res.render("home.ejs", data);
});

function checkFileFormat(req, res, next) {
  const acceptedFileFormats = ['image/jpeg', 'image/png', 'image/gif'];

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  if (!acceptedFileFormats.includes(req.file.mimetype)) {
    return res.status(400).send(`File format (${req.file.mimetype}) is not allowed.`);
  }

  // File format is allowed, proceed to the next middleware
  next();
}
router.post("/", upload.single("img"), checkFileFormat,  async (req, res) => {
  const user = new User(req.body);
  let n = 0;
  if (req.file) user.img = req.file.path.replace("public/", "");
  let data = {
    ...req.body,
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: "",
    n7: "",
    n8: "",
    img: user.img,
  };
  if (!user.name) {
    n = 1;
    data.n1 = "حقل مطلوب";
  }
  if (!user.age) {
    n = 1;
    data.n2 = "حقل مطلوب";
  }
  if (!user.phone) {
    n = 1;
    data.n3 = "حقل مطلوب";
  }
  if (!user.input1) {
    n = 1;
    data.n4 = "حقل مطلوب";
  }
  if (!user.input2) {
    n = 1;
    data.n5 = "حقل مطلوب";
  }
  if (!user.input3) {
    n = 1;
    data.n6 = "حقل مطلوب";
  }
  if (!user.img) {
    n = 1;
    data.n7 = "حقل مطلوب";
  }
  if (!user.input6) {
    n = 1;
    data.n8 = "حقل مطلوب";
  }
  if (n) {
    data.n7 = "حقل مطلوب";
    return res.render("home.ejs", data);
  }
  await user.save();
  res.render("thanks.ejs");
});
export default router;
