import { Router } from 'express';
import Ticket from "../models/ticket.model.js";

const router = Router();

router.get('/:tid', async (req, res) => {
    const ticketId = req.params.tid;

    try {
        const ticket = await Ticket.findById(ticketId).lean();

        console.log(ticket)

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }

        res.json({ ticket });
    } catch (error) {
        console.error('Error al obtener el ticket:', error);
        res.status(500).json({ message: 'Error al obtener el ticket' });
    }
});

export default router;