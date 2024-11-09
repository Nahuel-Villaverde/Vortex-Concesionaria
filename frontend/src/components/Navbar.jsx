import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Navbar.css';
import logo from '/images/VortexLogo.png';
import axios from 'axios';

const Navbar = () => {
    const { user, refreshUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/sessions/logout');
            navigate('/login');
            refreshUser();
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate('/home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScrollToSection = (sectionId) => {
        const section = document.querySelector(sectionId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        if (section) {
            const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = sectionPosition - navbarHeight - 100;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleViewCart = () => {
        if (user && user.cartId) {
            navigate(`/carts/${user.cartId}`);
        } else {
            navigate('/login');
        }
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleClicktestimonials = () => {
        navigate('/home'); // Primero navega a '/home'
        handleScrollToSection('#testimonials'); // Luego hace scroll a la sección
      };

      const handleClickaboutus = () => {
        navigate('/home'); // Primero navega a '/home'
        handleScrollToSection('#about-us'); // Luego hace scroll a la sección
      };
    return (
        <nav className="navbar navbar-expand-lg">
            <Link to="/home" className="navbar-brand logo" onClick={handleLogoClick}>
                <img className='img-navbar' src={logo} alt="Logo de Vortex" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item" onClick={() => navigate('/products')}><Link to="/products" className="navbar-links">Catalog</Link></li>
                    <li className="nav-item" onClick={handleClickaboutus}><Link to="/home" className="navbar-links" onClick={() => handleScrollToSection('#about-us')}>About Us</Link></li>
                    <li className="nav-item" onClick={handleClicktestimonials}><Link to="/home" className="navbar-links" onClick={() => handleScrollToSection('#testimonials')}>Clients</Link></li>
                </ul>
                <div className="navbar-nav ms-auto login-link">
                    {user ? (
                        <>
                            <button className="profile-button" onClick={handleProfile}>Profile</button>
                            <button onClick={handleLogout} className="profile-button">Logout</button>
                            {user.role === 'user' && (
                                <button className="profile-button" onClick={handleViewCart}>Ver Carrito</button>
                            )}
                        </>
                    ) : (
                        <Link to="/login" className="nav-login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
