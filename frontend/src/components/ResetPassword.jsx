import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handlePasswordReset}>
                <label htmlFor="password">Nueva Contraseña:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button type="submit">Restablecer Contraseña</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
