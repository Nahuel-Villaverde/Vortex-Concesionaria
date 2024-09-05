import { Router } from 'express';
import { createCart, getCartById, addProductToCart, deleteProductFromCart, updateProductInCart, clearCart, purchaseCart } from '../controllers/cart.controller.js';
import { isUser } from '../middleware/auth.js';

const router = Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/products/:pid', /* isUser, */ addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid/products/:pid', updateProductInCart);
router.delete('/:cid', clearCart);

router.post('/:cid/purchase', purchaseCart);

export default router;