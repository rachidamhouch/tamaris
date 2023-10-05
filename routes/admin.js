import { Router } from "express"
import User from "../models/user.js"



const router = Router()

router.get("/admin",async (req, res) => {
    if (req.isAuthenticated())
    {
        const user = await User.findById(req.user.id)
        if (user.admin == "false")
            return res.redirect("/")
        res.render("admin.ejs")
    }
    else
        res.redirect("/login")
})

export default router