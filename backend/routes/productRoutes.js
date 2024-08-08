import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { isAdmin } from '../middleware/auth.js'; // Asegúrate de tener el middleware correctamente importado

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', isAdmin, deleteProduct); // Asegúrate de que solo los admin puedan eliminar productos

export default router;
