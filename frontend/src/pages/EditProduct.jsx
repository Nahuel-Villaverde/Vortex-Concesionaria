import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.payload); // Cambié a .payload si es que ese es el formato de respuesta
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error al obtener el producto');
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crear un FormData para manejar los archivos
    const formData = new FormData();
    formData.append('titulo', event.target.titulo.value);
    formData.append('descripcion', event.target.descripcion.value);
    formData.append('precio', event.target.precio.value);
    formData.append('categoria', event.target.categoria.value);
    formData.append('code', event.target.code.value);
    formData.append('stock', event.target.stock.value);

    // Si se selecciona un archivo nuevo, se añade al FormData
    if (event.target.thumbnail.files[0]) {
      formData.append('thumbnail', event.target.thumbnail.files[0]);
    }

    try {
      const response = await axios.put(`/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
    <div className='create-product-mega-container'>
      <div className='create-product-container'>
        <h2>Editar Producto</h2>
        <form className='form-create-product' id="updateProductForm" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="hidden" name="productId" value={product._id} />
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" defaultValue={product.titulo} required />
          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" name="descripcion" defaultValue={product.descripcion} required></textarea>
          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" step="any" name="precio" defaultValue={product.precio} required />
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input type="file" id="thumbnail" name="thumbnail" />
          <label htmlFor="categoria">Categoría:</label>
          <input type="text" id="categoria" name="categoria" defaultValue={product.categoria} required />
          <label htmlFor="code">Code:</label>
          <input type="text" id="code" name="code" defaultValue={product.code} required />
          <label htmlFor="stock">Stock:</label>
          <input type="number" id="stock" name="stock" defaultValue={product.stock} required />
          <button className="button-create-product" type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
