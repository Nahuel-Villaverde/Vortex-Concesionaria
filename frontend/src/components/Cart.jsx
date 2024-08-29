import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { id } = useParams();

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/api/carts/${id}`);
      console.log('Datos del carrito:', response.data.payload); 
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

  return (
    <div>
      <h1>Tu Carrito</h1>
      {cart.products.length > 0 ? (
        <div>
          {cart.products.map((item, index) => (
            <div key={`${item.id._id}-${index}`}>
              <h2>{item.id?.titulo || 'Producto desconocido'}</h2>
              <p>Cantidad: {item.quantity || 0}</p>
              <p>Precio por unidad: ${item.id?.precio || 0}</p>
              <p>Total: ${item.id?.precio * item.quantity || 0}</p>

              <button onClick={() => handleDeleteProduct(item.id._id)}>Eliminar Producto</button>
            </div>
          ))}
          <h3>Total del carrito: ${total}</h3>

          <button onClick={handleClearCart}>Eliminar Todos los Productos</button>
        </div>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

export default Cart;
