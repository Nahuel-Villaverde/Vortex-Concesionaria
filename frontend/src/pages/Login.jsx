import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/sessions/login', { email, password });
            if (response.status === 200) {
                navigate('/products');
            }
        } catch (error) {
            setError('Login fallido. Por favor, verifica tus credenciales.');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = '/api/sessions/google';
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Contraseña:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Ingresar</button>
            </form>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            <a href="/register">Registrarse</a>
            <hr />
            <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
        </div>
    );
};

export default Login;
