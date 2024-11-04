import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/sessions/current_user');
        setUser(response.data);
      } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error);
        setError('Error al cargar el perfil del usuario');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className='user-profile-container'>
      <h1>Perfil del Usuario</h1>
      <p>Nombre: {user.first_name}</p>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>
    </div>
  );
};

export default UserProfile;
