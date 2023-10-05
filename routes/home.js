import { Router } from "express";
import multer from "multer";
import User from "../models/user.js";

const router = Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileName = file.originalname;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const allowedExtensions = ["jpg", "jpeg", "png"];
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, "public/img/");
    }
    else
      cb(null, "temp/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename files with a unique timestamp
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  const data = {
    name:"",
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

router.post("/", upload.single("img"), async (req, res) => {
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
  else{
    const fileName = req.file.originalname;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const allowedExtensions = ["jpg", "jpeg", "png"];
    if (!allowedExtensions.includes(fileExtension)) {
        n = 1;
        data.n7 = "صغية غير مقبولة";
    }
  }
  if (!user.input6) {
    n = 1;
    data.n8 = "حقل مطلوب";
  }
  if (n) {
    if (data.n7 != "صغية غير مقبولة")
      data.n7 = "حقل مطلوب";
    return res.render("home.ejs", {...data, error: "Yes"});
  }
  await user.save();
  res.render("thanks.ejs");
});
export default router;
