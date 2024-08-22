import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error al obtener el producto');
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const productData = {
      titulo: event.target.titulo.value,
      descripcion: event.target.descripcion.value,
      precio: event.target.precio.value,
      thumbnail: event.target.thumbnail.value,
      categoria: event.target.categoria.value,
      code: event.target.code.value,
      stock: event.target.stock.value
    };

    try {
      const response = await axios.put(`/api/products/${id}`, productData);
      if (response.status === 200) {
        alert('Producto actualizado con éxito');
        navigate('/products');
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el producto');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Editar Producto</h2>
      <form id="updateProductForm" onSubmit={handleSubmit}>
        <input type="hidden" name="productId" value={product._id} />
        <label htmlFor="titulo">Título:</label>
        <input type="text" id="titulo" name="titulo" defaultValue={product.titulo} required />
        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" defaultValue={product.descripcion} required></textarea>
        <label htmlFor="precio">Precio:</label>
        <input type="number" id="precio" name="precio" defaultValue={product.precio} required />
        <label htmlFor="thumbnail">Thumbnail:</label>
        <input type="text" id="thumbnail" name="thumbnail" defaultValue={product.thumbnail} required />
        <label htmlFor="categoria">Categoría:</label>
        <input type="text" id="categoria" name="categoria" defaultValue={product.categoria} required />
        <label htmlFor="code">Code:</label>
        <input type="text" id="code" name="code" defaultValue={product.code} required />
        <label htmlFor="stock">Stock:</label>
        <input type="number" id="stock" name="stock" defaultValue={product.stock} required />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProduct;
