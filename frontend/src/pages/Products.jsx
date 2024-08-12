import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.payload);
      } catch (error) {
        console.error('Error:', error);
        navigate('/login');
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/sessions/logout');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h2>{product.titulo}</h2>
              <p>{product.descripcion}</p>
              <p>Precio: ${product.precio}</p>
              <p>Categoría: {product.categoria}</p>
              <img src={product.thumbnail} alt={product.titulo} style={{ width: '100px' }} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default ProductList;
