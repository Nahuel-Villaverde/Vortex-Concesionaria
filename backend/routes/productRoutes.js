// routes/productRoutes.js
import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = Router();

router.get('/', isAuthenticated, getProducts);
router.get('/:id', isAuthenticated, getProductById);
router.post('/', isAuthenticated, createProduct);
router.put('/:id', isAuthenticated, updateProduct);
router.delete('/:id', isAuthenticated, deleteProduct);

export default router;
