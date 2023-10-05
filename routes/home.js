import { Router } from "express"
import User from "../models/user.js"

const router = Router()

router.get("/",async (req, res) => {
    res.render("home.ejs")
})

router.post("/done",async (req, res) => {
    const user = new User(req.body)
    await user.save()
    res.render("home.ejs")
})
export default router