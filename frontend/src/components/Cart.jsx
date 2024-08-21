import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const { id } = useParams(); // Obtener el id de la URL

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Usa el id obtenido de la URL para hacer la solicitud
        const response = await axios.get(`/api/carts/${id}`);
        console.log('Datos del carrito:', response.data.payload); // Verifica los datos del carrito
        setCart(response.data.payload);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    fetchCart();
  }, [id]); // Dependencia en id para actualizar cuando cambie

  if (!cart) {
    return <div>Cargando carrito...</div>;
  }

  return (
    <div>
      <h1>Tu Carrito</h1>
      {cart.products.length > 0 ? (
        cart.products.map((item) => (
          <div key={item.id._id}>
            <h2>{item.id.titulo}</h2>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio por unidad: ${item.id.precio}</p>
            <p>Total: ${item.id.precio * item.quantity}</p> {/* Aquí se multiplica el precio por la cantidad */}
          </div>
        ))
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
  
};

export default Cart;
