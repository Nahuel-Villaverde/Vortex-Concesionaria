import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Asegúrate de crear este archivo CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sessions/forgot-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className='forgot-password-mini-container'>
      <h2 className="forgot-password-title">Reset your password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-password-input"
        />
        <button type="submit" className="forgot-password-button">Enviar</button>
      </form>
      {message && <p className="forgot-password-message">{message}</p>}
      {error && <p className="forgot-password-error">{error}</p>}
      <a href="#" onClick={() => navigate('/login')} className="forgot-password-link">
        Return to Login
      </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
