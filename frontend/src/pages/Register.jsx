import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                <label>Apellido:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Edad:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                <label>Contraseña:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Registrarse</button>
            </form>
            <a href="/login">Iniciar sesión</a>
        </div>
    );
};

export default Register;
