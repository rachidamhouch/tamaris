import { Router } from "express"
import passport from 'passport';


const router = Router()

router.get("/login",async (req, res) => {
    if (req.isAuthenticated())
        return res.redirect("/admin")
    res.render("login.ejs")
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/admin', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/admin');
});
export default router