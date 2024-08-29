import passport from 'passport';
import User from '../models/user.js';
import cartModel from '../models/cart.model.js';
import { 
    generatePasswordResetToken, 
    sendPasswordResetEmail, 
    validateAndUpdatePassword 
} from '../services/sessions.service.js';


export const register = async (req, res, next) => {
    passport.authenticate('register', { failureRedirect: 'failregister' }, async (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('failregister');
        }

        try {
            const newCart = await cartModel.create({ products: [] });
            user.cartId = newCart._id;
            await user.save();
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/login');
            });
        } catch (error) {
            console.error('Error al crear el carrito para el usuario:', error);
            res.status(500).send({ status: "error", error: "Error al crear el carrito para el usuario" });
        }
    })(req, res, next);
};

export const login = (req, res) => {
    if (!req.user) return res.status(401).send({ status: "error", error: "Credenciales inválidas" });
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        };
        res.redirect('/products');
    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
};

export const failRegister = (req, res) => {
    console.log("Estrategia fallida");
    res.send({ error: "Falló" });
};

export const failLogin = (req, res) => {
    res.status(401).send({ error: "Login fallido" });
};

export const handleForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: "error", error: "Usuario no encontrado" });
        }

        const token = await generatePasswordResetToken(user);
        await sendPasswordResetEmail(user, token, req.headers.host);

        res.status(200).json({ message: 'Correo electrónico de restablecimiento de contraseña enviado' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: "error", error: error.message });
    }
};

export const renderPasswordReset = async (req, res) => {
    const token = req.params.token;
    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            console.log(`Usuario no encontrado para el token: ${token}`);
            return res.status(400).json({ error: 'El token de restablecimiento de contraseña no es válido o ha expirado.' });
        }

        // Enviar token como parte de la respuesta JSON
        res.status(200).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al manejar la solicitud de restablecimiento de contraseña.' });
    }
};

export const handlePasswordReset = async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'El token de restablecimiento de contraseña no es válido o ha expirado.' });
        }

        await validateAndUpdatePassword(user, password);
        res.status(200).json({ message: 'Contraseña restablecida correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al manejar el restablecimiento de contraseña. La nueva contraseña no puede ser la misma que la anterior.' });
    }
};
