import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Users from './components/Users';
import RegisterUser from './components/RegisterUser';
import ProductList from './components/ProductList';

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Carga los usuarios al iniciar
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Usuarios</Link>
            </li>
            <li>
              <Link to="/products">Ver Productos</Link>
            </li>
            <li>
              <Link to="/users">Registrar usuario</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/users" element={<RegisterUser onUserRegistered={fetchUsers} />} />
          <Route path="/" element={<Users users={users} />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
