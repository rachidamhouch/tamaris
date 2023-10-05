import { Router } from "express"

const router = Router()

router.get("*",async (req, res) => {
    res.render("404.ejs")
})

router.post("*",async (req, res) => {
    res.render("404.ejs")
})

router.put("*",async (req, res) => {
    res.render("404.ejs")
})

router.patch("*",async (req, res) => {
    res.render("404.ejs")
})

router.delete("*",async (req, res) => {
    res.render("404.ejs")
})

export default router