import ProductRepository from '../services/product.service.js';

export const getProducts = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 12;
    let categoria = req.query.categoria;
    let sort = req.query.sort;

    try {
        let filtro = {};
        if (categoria) {
            filtro.categoria = categoria;
        }

        let ordenamiento = {};
        if (sort === 'asc') {
            ordenamiento.precio = 1;
        } else if (sort === 'desc') {
            ordenamiento.precio = -1;
        }

        const result = await ProductRepository.getProducts(filtro, { page, limit, lean: true, sort: ordenamiento });

        console.log('Resultado de paginación:', result);
        
        const prevLink = result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}&categoria=${categoria || ''}&sort=${sort || ''}` : null;
        const nextLink = result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}&categoria=${categoria || ''}&sort=${sort || ''}` : null;

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ status: 'error', error: 'Error al obtener los productos' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        let product = await ProductRepository.getProductById(productId);

        if (!product) {
            return res.status(404).send({ result: "error", message: "Producto no encontrado" });
        }

        res.send({ result: "success", payload: product });
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "error", message: "Error al obtener el producto" });
    }
};

export const createProduct = async (req, res) => {
    const { titulo, descripcion, precio, categoria, code, stock } = req.body;
    const thumbnail = req.file?.path?.replace(/\\/g, '/'); // Normaliza la ruta de la imagen subida

    if (!titulo || !descripcion || !precio || !thumbnail || !categoria || !code || stock === undefined) {
        return res.status(400).send({ status: "error", error: "Faltan parámetros" });
    }

    try {
        const newProduct = {
            titulo,
            descripcion,
            precio,
            thumbnail, // Usar la ruta normalizada
            categoria,
            code,
            stock
        };
        const result = await ProductRepository.createProduct(newProduct);
        res.send({ status: "success", payload: result });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).send({ status: "error", error: "Error al crear producto" });
    }
};




export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    if (!updatedProduct || Object.keys(updatedProduct).length === 0) {
        return res.status(400).send({ status: "error", error: "Faltan parametros para actualizar" });
    }

    try {
        const product = await ProductRepository.updateProduct(productId, updatedProduct);

        if (!product) {
            return res.status(404).send({ result: "error", message: "Producto no encontrado" });
        }

        res.send({ status: "success", payload: product });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send({ status: "error", error: "Error al actualizar producto" });
    }
};

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await ProductRepository.deleteProduct(productId);

        if (!result) {
            return res.status(404).send({ result: "error", message: "Producto no encontrado" });
        }

        res.send({ status: "success", message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send({ status: "error", error: "Error al eliminar producto" });
    }
};