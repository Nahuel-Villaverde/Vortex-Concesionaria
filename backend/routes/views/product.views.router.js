import express from 'express';
import { isAuthenticated } from '../../middleware/auth.js';
import path from 'path';

const router = express.Router();

router.get('/products/create', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

export default router;
