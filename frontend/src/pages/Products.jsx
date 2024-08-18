import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Products.css'; // Importa el archivo CSS

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        const userResponse = await axios.get('/api/sessions/current_user');
        setUser(userResponse.data);
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

  const handleProductClick = (id) => {
    navigate(`/products/${id}`); // Navega a la página de detalles del producto
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
        <div className="product-list">
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <h2 className="product-title" onClick={() => handleProductClick(product._id)}>{product.titulo}</h2>
              <p className="product-details">Descripción: {product.descripcion}</p>
              <p className="product-details">Precio: ${product.precio}</p>
              <p className="product-details">Categoría: {product.categoria}</p>
              <img src={product.thumbnail} alt={product.titulo} className="product-image" />
              {user.role === 'admin' && (
                <div className="product-actions">
                  <button onClick={() => handleEditProduct(product._id)}>Modificar</button>
                  <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default ProductList;
