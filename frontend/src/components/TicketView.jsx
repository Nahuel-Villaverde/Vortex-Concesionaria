import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketView = () => {
  const [ticket, setTicket] = useState(null);
  const { id } = useParams();

  const fetchTicket = async () => {
    try {
      const response = await axios.get(`/api/tickets/${id}`);
      console.dir(response.data); // Usa console.dir para inspeccionar el objeto
      setTicket(response.data.ticket);
    } catch (error) {
      console.error('Error al obtener el ticket:', error);
    }
  };
  
  

  useEffect(() => {
    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <div>Cargando ticket...</div>;
  }

  return (
    <div>
      <h1>Compra finalizada</h1>
      <br />
      <h2>Ticket de compra</h2>
      <p>Código de ticket: {ticket.code}</p>
      <p>Total a pagar: ${ticket.amount}</p>
      <p>Comprador: {ticket.purchaser}</p>
      <br />
      <h3>¡Gracias por su compra!</h3>
      <p>Ha sido enviado un mail con el ticket</p>
    </div>
  );
};

export default TicketView;
