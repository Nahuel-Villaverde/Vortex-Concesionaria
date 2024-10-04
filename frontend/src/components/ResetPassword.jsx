import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Importa los estilos

const ResetPassword = () => {
    const { token } = useParams(); // Obtén el token desde la URL
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/sessions/reset/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => {
                    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
                }, 3000);
            } else {
                setMessage(data.error || 'Error al restablecer la contraseña.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al conectarse al servidor.');
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-mini-container">
                <h2 className="reset-password-title">Restablecer Contraseña</h2>
                <form onSubmit={handlePasswordReset} className="reset-password-form">
                    <label htmlFor="password" className="reset-password-label">Nueva Contraseña:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className="reset-password-input"
                    />
                    <button type="submit" className="reset-password-button">Restablecer Contraseña</button>
                </form>
                {message && <p className="reset-password-message">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
