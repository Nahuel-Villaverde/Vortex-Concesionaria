import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        // Obtener la información del usuario autenticado
        const userResponse = await axios.get('/api/sessions/current_user');
        setUser(userResponse.data);

        // Obtener la lista de productos
        const productsResponse = await axios.get('/api/products');
        setProducts(productsResponse.data.payload);
      } catch (error) {
        console.error('Error:', error);
        navigate('/login');
      }
    };

    fetchUserAndProducts();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/sessions/logout');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleAddProduct = () => {
    navigate('/products/create');
  };

  const handleEditProduct = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        const response = await axios.delete(`/api/products/${productId}`);
        if (response.status === 200) {
          alert('Producto eliminado con éxito');
          setProducts(products.filter((product) => product._id !== productId));
        } else {
          alert('Error al eliminar el producto');
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>; // O muestra un indicador de carga
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      {user.role === 'admin' && (
        <div>
          <button onClick={handleAddProduct}>Agregar Producto</button>
        </div>
      )}
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h2>{product.titulo}</h2>
              <p>{product.descripcion}</p>
              <p>Precio: ${product.precio}</p>
              <p>Categoria: {product.categoria}</p>
              <img src={product.thumbnail} alt={product.titulo} style={{ width: '100px' }} />
              {user.role === 'admin' && (
                <div>
                  <button onClick={() => handleEditProduct(product._id)}>Modificar</button>
                  <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default ProductList;
