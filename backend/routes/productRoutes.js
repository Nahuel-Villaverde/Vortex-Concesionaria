// routes/productRoutes.js
import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import multer from 'multer';

const router = Router();

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname.replace(/\\/g, '/')); // Normaliza el nombre
    }
});


const upload = multer({ storage });

router.get('/', /* isAuthenticated, */ getProducts);
router.get('/:id', /* isAuthenticated, */ getProductById);

router.post('/', upload.single('thumbnail'), /* isAuthenticated, isAdmin, */ createProduct);
router.put('/:id', isAuthenticated, isAdmin,  updateProduct);
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct);
router.get('/create', isAuthenticated);

export default router;
