import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedAuth = ({ requiredRole }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/sessions/current_user');
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Muestra un indicador de carga mientras se verifica la autenticación
    }

    // Verifica si el usuario tiene el rol requerido
    if (isAuthenticated) {
        return <Outlet />; // Renderiza el contenido protegido
    } else {
        return <Navigate to="/login" />; // Redirige al login si no está autenticado o no tiene el rol requerido
    }
};

export default ProtectedAuth;
