import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams(); // Obtén el ID del producto desde la URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch product data
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                console.log('Product Data:', response.data);
                setProduct(response.data.payload); // Asigna los datos del producto al estado
            } catch (error) {
                console.error('Error fetching the product:', error);
            }
        };

        // Fetch user data
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/sessions/current_user');
                console.log('User Data:', response.data); // Revisa la estructura del objeto user
                setUser(response.data); // Asigna los datos del usuario al estado
            } catch (error) {
                console.error('Error fetching the user:', error);
                setUser(null); // Si no se puede obtener el usuario, asigna null
            }
        };

        fetchProduct();
        fetchUser();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login'); // Redirige al inicio de sesión si no está autenticado
            return;
        }

        if (!user.cartId) {
            alert('No se pudo encontrar el carrito del usuario.');
            return;
        }

        try {
            const response = await axios.post(`/api/carts/${user.cartId}/products/${product._id}`);
            if (response.status === 200) {
                alert('Producto agregado al carrito con éxito');
            } else {
                alert('Error al agregar el producto al carrito');
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            alert('Error al agregar el producto al carrito');
        }
    };

    const handleEditProduct = () => {
        navigate(`/products/${product._id}/edit`);
    };

    const handleDeleteProduct = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                const response = await axios.delete(`/api/products/${product._id}`);
                if (response.status === 200) {
                    alert('Producto eliminado con éxito');
                    navigate('/products'); // Redirige a la lista de productos después de eliminar
                } else {
                    alert('Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                alert('Error al eliminar el producto');
            }
        }
    };

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
            <img src={product.thumbnail} alt={product.titulo} style={{ width: '200px' }} />

            {/* Mostrar botones según el estado del usuario */}
            {!user && (
                <button onClick={() => navigate('/login')}>Iniciar sesión para agregar al carrito</button>
            )}
            {user && user.role === 'user' && (
                <button onClick={handleAddToCart}>Agregar al Carrito</button>
            )}
            {user && user.role === 'admin' && (
                <div>
                    <button onClick={handleEditProduct}>Modificar Producto</button>
                    <button onClick={handleDeleteProduct}>Eliminar Producto</button>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
