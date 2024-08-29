import { Router } from 'express';
import passport from 'passport';
import { register, login, logout, failRegister, failLogin, handleForgotPassword, renderPasswordReset, handlePasswordReset} from '../controllers/session.controller.js';

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

router.get('/current_user', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.status(401).send({ error: 'Usuario no autenticado' });
    }
});

router.get('/forgot-password',  handleForgotPassword);
router.post('/forgot-password', handleForgotPassword);

router.get('/reset/:token', renderPasswordReset);
router.post('/reset/:token', handlePasswordReset);

export default router;
