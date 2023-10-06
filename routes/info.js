import { Router } from "express"
import User from "../models/user.js"



const router = Router()


router.get("/info",async (req, res) => {
    if (req.isAuthenticated())
    {
        const admin = await User.findById(req.user.id)
        if (admin.admin == "false")
            return res.redirect("/")
        try{
            const user = await User.findById(req.query.id)
            res.render("info.ejs", {user})
        }catch(err){
            return res.redirect("/usernotfound")
        }
    }
    else
        res.redirect("/login")
})


export default router