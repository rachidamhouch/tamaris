import { Router } from "express"
import User from "../models/user.js"



const router = Router()


router.get("/admin",async (req, res) => {
    if (req.isAuthenticated())
    {
        const num = 6
        const page = parseInt(req.query.page) || 0
        const user = await User.findById(req.user.id)
        if (user.admin == "false")
            return res.redirect("/")
        const users = await User.find({googleId: null}).sort([['img', 'desc']]).skip(page * num).limit(num)
        res.render("admin.ejs", {users, size: await User.count({googleId: null}), page, num, next: page+1, prev: page - 1})
    }
    else
        res.redirect("/login")
})


export default router