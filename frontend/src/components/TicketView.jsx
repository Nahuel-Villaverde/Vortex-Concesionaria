import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TicketView.css'

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
    <div className='TicketView-container'>
      <h1>Purchase Completed</h1>
      <br />
      <h2>Purchase Ticket</h2>
      <p>Ticket Code: {ticket.code}</p>
      <p>Total to pay: ${ticket.amount}</p>
      <p>Buyer: {ticket.purchaser}</p>
      <br />
      <h3>Thank you for your purchase!</h3>
      <p>An email with the receipt has been sent</p>
    </div>
  );
};

export default TicketView;
