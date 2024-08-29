import transporter from '../recursos/mailer.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const generatePasswordResetToken = async (user) => {
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();
    return token;
};

export const sendPasswordResetEmail = (user, token, host) => {
    const frontendHost = 'http://localhost:5173'; // Reemplaza con la URL de tu frontend
    const mailOptions = {
        to: user.email,
        from: 'tu_correo@gmail.com',
        subject: 'Solicitud para restablecer contraseña',
        text: `Recibió este correo electrónico porque usted (u otra persona) solicitó restablecer la contraseña de su cuenta.\n\n
                   Haga clic en el siguiente enlace, o péguelo en su navegador para completar el proceso:\n\n
                   ${frontendHost}/reset-password/${token}\n\n
                   Si no solicitó esto, ignore este correo electrónico y su contraseña permanecerá sin cambios.\n`
    };

    return transporter.sendMail(mailOptions);
};


export const validateAndUpdatePassword = async (user, password) => {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        throw new Error('La nueva contraseña no puede ser la misma que la anterior.');
    }

    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
};