// routes/productRoutes.js
import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', isAuthenticated, getProducts);
router.get('/:id', isAuthenticated, getProductById);
router.post('/',  /* isAuthenticated, isAdmin, */ createProduct);
router.put('/:id', isAuthenticated, isAdmin,  updateProduct);
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct);
router.get('/create', isAuthenticated);

export default router;
