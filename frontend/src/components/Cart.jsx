import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { id } = useParams();

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/api/carts/${id}`);
      setCart(response.data.payload);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [id]);

  if (!cart) {
    return <div>Cargando carrito...</div>;
  }

  const total = cart.products.reduce((acc, item) => acc + item.id.precio * item.quantity, 0);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/carts/${id}/products/${productId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`/api/carts/${id}`);
      await fetchCart();
    } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`/api/carts/${id}/purchase`);

      if (response.status === 200) {
        const ticket = response.data;
        const ticketUrl = `/tickets/${ticket._id}`;
        window.open(ticketUrl, '_blank'); // Abre el ticket en una nueva pestaña

        await handleClearCart();
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error al finalizar la compra:', error);
      alert('Hubo un error al intentar finalizar la compra');
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Tu Carrito</h1>
      {cart.products.length > 0 ? (
        <>
          <div className="cart-products">
            {cart.products.map((item, index) => {
              // Genera la URL de la imagen con encodeURIComponent
              const imageUrl = item.id?.thumbnail
                ? `http://localhost:8080/uploads/${encodeURIComponent(item.id.thumbnail.split('/').pop())}`
                : '';

              return (
                <div key={`${item.id._id}-${index}`} className="cart-product">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={item.id?.titulo || 'Producto'}
                      className="product-image"
                    />
                  )}
                  <div className="product-details">
                    <h2>{item.id?.titulo || 'Producto desconocido'}</h2>
                    <p>Cantidad: {item.quantity || 0}</p>
                    <p>Unidad: ${item.id?.precio || 0}</p>
                    <p>Total: ${item.id?.precio * item.quantity || 0}</p>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteProduct(item.id._id)}
                    >
                      Eliminar Producto
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <h3 className="cart-total">Total del carrito: ${total}</h3>

            <div className='cart-actions'>
              <button className="clear-cart-button" onClick={handleClearCart}>
                Eliminar todos los productos
              </button>
              <button className="checkout-button" onClick={handleCheckout}>
                Finalizar compra
              </button>
            </div>

          </div>
        </>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

export default Cart;
