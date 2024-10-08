import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Asegúrate de que esta ruta sea correcta
import './Navbar.css'; // Asegúrate de incluir estilos si lo deseas
import logo from '/images/VortexLogo.png';
import axios from 'axios';

const Navbar = () => {
    const { user, refreshUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/sessions/logout'); // Asegúrate de que esta ruta sea correcta
            navigate('/login');
            refreshUser(); // Refresca el usuario después de cerrar sesión

        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    const handleLogoClick = (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        navigate('/home'); // Navega hacia /home
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Hace scroll hacia arriba de manera suave
    };

    const handleScrollToSection = (sectionId) => {
        const section = document.querySelector(sectionId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Altura del navbar
        if (section) {
            const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = sectionPosition - navbarHeight - 100; // Restamos el navbar más un extra de 10px
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="navbar">
            <div className="left-section">
                <Link to="/home" className="logo" onClick={handleLogoClick}>
                    <img src={logo} alt="Logo de Vortex" />
                </Link>
                <ul className="nav-links">
                    <li><Link to="/products">Catalog</Link></li>
                    <li><Link to="/home" onClick={() => handleScrollToSection('#about-us')}>About Us</Link></li>
                    <li><Link to="/home" onClick={() => handleScrollToSection('#testimonials')}>Clients</Link></li>
                </ul>
            </div>
            <div className="login-link">
                {user ? (
                    <>
                        <Link to="/profile">
                            <button className="profile-button">Profile</button>
                        </Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
