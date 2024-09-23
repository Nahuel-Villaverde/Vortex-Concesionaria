import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de incluir estilos si lo deseas
import logo from '/images/VortexLogo.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="left-section">
                <Link to="/home" className="logo">
                    <img src={logo} alt="Logo de Vortex" />
                </Link>
                <ul className="nav-links">
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                </ul>
            </div>
            <div className="login-link">
                <Link to="/login">Login</Link>
            </div>

        </nav>
    );
};

export default Navbar;
