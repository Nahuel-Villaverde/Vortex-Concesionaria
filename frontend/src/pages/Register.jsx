import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Asegúrate de importar los estilos

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/sessions/register', formData);
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create an account</h2>
                <p className="login-link-container">
                    Already have an account? <a href="/login">Login</a>
                </p>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="name-inputs">
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                            className="register-input"
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last name"
                            required
                            className="register-input"
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="register-input"
                    />
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                        className="register-input"
                        min="0"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="register-input"
                    />
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
