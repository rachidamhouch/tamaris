import { Router } from "express"

const router = Router()

router.get("/",async (req, res) => {
    res.render("home.ejs")
})

router.post("/done",async (req, res) => {
    console.log(req.body)
    res.render("home.ejs")
})
export default router