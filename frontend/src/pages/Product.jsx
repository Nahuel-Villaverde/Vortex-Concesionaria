import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Product.css'

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

  // Asegúrate de que product.thumbnail no contenga espacios
  console.log('Thumbnail:', product.thumbnail);
  const imageUrl = `http://localhost:8080/uploads/${encodeURIComponent(product.thumbnail.split('/').pop())}`;


  return (
    <div className="product-item" onClick={handleProductClick}>
      <img
        src={imageUrl} // Usa la URL generada dinámicamente
        alt={product.titulo}
        className="product-image"
      />
      <div className='product-card-description'>
        <div className='product-card-description-title'>
          <h2 className="product-title" >
            {product.titulo}
          </h2>
          <p className="product-detail-card-price">${product.precio}</p>
        </div>

        <p className="product-category">{product.categoria}</p>


        {user?.role === 'admin' && (
          <div className="product-actions">
            <button className="modifiy-card" onClick={(e) => {
            e.stopPropagation(); // Evita que el click en el botón se propague al padre
            handleEditProduct();
          }}>Edit</button>
            <button className="delete-card" onClick={(e) => {
            e.stopPropagation();
            handleDeleteProduct(product._id);
          }}>Delete</button>
          </div>
        )}

        {user?.role === 'user' && (
          <button className="add-cart" onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product._id);
          }}>Add to cart</button>
        )}

        {!user && (
          <button className="add-cart" onClick={(e) => {
            e.stopPropagation();
            navigate('/login');
          }}>Login</button>
        )}
      </div>
    </div>

  );
};

export default Product;
