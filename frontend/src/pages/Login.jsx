import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Usa el contexto
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { refreshUser } = useUser(); // Obtén refreshUser del contexto
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/sessions/login', { email, password });
            if (response.status === 200) {
                refreshUser(); // Refresca el usuario
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
        <div className="login-container">
            <div className="login-box">
                <div className="logo-login">
                    <img src='/images/VortexLogo.png' alt="Logo de Vortex" />
                </div>
                <h2>Welcome Back</h2>
                <p className="signup-text">
                    Don't have an account yet? <a href="/register">Sign up</a>
                </p>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                <div className='google-container'>
                    <button className="google-login-button" onClick={handleGoogleLogin}>
                        <img src="images/google-logo.png" alt="Google" /> Sign in with Google
                    </button>
                </div>
                <a href="#" onClick={() => navigate('/forgot-password')} className="forgot-password">Forgot your password?</a>
            </div>
        </div>
    );
};

export default Login;
