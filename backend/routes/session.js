import { Router } from 'express';
import passport from 'passport';
import { register, login, logout, failRegister, failLogin} from '../controllers/session.controller.js';

const router = Router();

router.post('/register', register);
router.get('/failregister', failRegister);

router.post('/login', passport.authenticate('login', { failureRedirect: 'faillogin' }), login);
router.get('/faillogin', failLogin);

router.post('/logout', logout);


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    res.redirect("http://localhost:5173/products");
});

export default router;
