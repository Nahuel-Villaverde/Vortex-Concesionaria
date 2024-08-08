import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Nueva ruta para obtener todos los usuarios
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para registrar usuarios
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000 && error.keyValue && error.keyValue.email) {
      res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

export default router;

