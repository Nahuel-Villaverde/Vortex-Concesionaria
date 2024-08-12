import { Router } from 'express';
import passport from 'passport';
import { register, login, logout, failRegister, failLogin} from '../controllers/session.controller.js';

const router = Router();

router.post('/register', register);
router.get('/failregister', failRegister);

router.post('/login', passport.authenticate('login', { failureRedirect: 'faillogin' }), login);
router.get('/faillogin', failLogin);

router.post('/logout', logout);

export default router;
