import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = ({ product, user, handleDeleteProduct }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleEditProduct = () => {
    navigate(`/products/${product._id}/edit`);
  };
  
  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate('/login'); // Redirige a la página de inicio de sesión si no está autenticado
      return;
    }
  
    const cartId = user.cartId;
    console.log('Cart ID:', cartId);
    console.log('Product ID:', productId); // Verifica que el productId sea correcto
  
    if (!cartId) {
      alert('No tienes un carrito asignado.');
      return;
    }
  
    try {
      const response = await axios.post(`/api/carts/${cartId}/products/${productId}`);
      if (response.status === 200) {
        alert('Producto agregado al carrito con éxito');
      } else {
        alert('Error al agregar el producto al carrito');
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      alert('Error al agregar el producto al carrito');
    }
  };
  
  

  return (
    <div className="product-item">
      <h2 className="product-title" onClick={handleProductClick}>
        {product.titulo}
      </h2>
      <p className="product-details">Descripción: {product.descripcion}</p>
      <p className="product-details">Precio: ${product.precio}</p>
      <p className="product-details">Categoría: {product.categoria}</p>
      <img src={product.thumbnail} alt={product.titulo} className="product-image" />

      {user?.role === 'admin' && (
        <div className="product-actions">
          <button onClick={handleEditProduct}>Modificar</button>
          <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button> {/* Aquí llamamos la función */}
        </div>
      )}

      {user?.role === 'user' && (
        <button onClick={() => handleAddToCart(product._id)}>Agregar al Carrito</button>

      )}

      {!user && (
        <button onClick={() => navigate('/login')}>Iniciar sesión para agregar al carrito</button>
      )}
    </div>
  );
};

export default Product;
