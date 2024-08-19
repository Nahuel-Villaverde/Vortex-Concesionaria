import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams(); // Obtén el ID del producto desde la URL

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                console.log('Product Data:', response.data);
                setProduct(response.data.payload); // Asigna los datos del producto al estado
            } catch (error) {
                console.error('Error fetching the product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div>
            <h1>{product.titulo}</h1>
            <p>Descripción: {product.descripcion}</p>
            <p>Precio: {product.precio ? `$${product.precio}` : 'No disponible'}</p>
            <p>Categoría: {product.categoria || 'No disponible'}</p>
            <p>Stock: {product.stock ? product.stock : 'No disponible'}</p>
            <p>Código: {product.code || 'No disponible'}</p>
            <p>Disponible: {product.disponible ? 'Sí' : 'No'}</p>
            <img src={product.thumbnail} alt={product.titulo} style={{ width: '200px' }} />
        </div>
    );
};

export default ProductDetail;
