import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateProduct.css'

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    categoria: '',
    code: '',
    stock: ''
  });
  const [thumbnail, setThumbnail] = useState(null); // Estado para la imagen
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]); // Guardar el archivo de imagen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Agrega los datos del producto al FormData
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    // Agrega la imagen al FormData
    if (thumbnail) {
      data.append('thumbnail', thumbnail);
    }

    try {
      const response = await axios.post('/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 200) {
        alert('Producto agregado con éxito');
        navigate('/products');
      } else {
        alert('Error al agregar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar el producto');
    }
  };

  return (
    <div className='create-product-mega-container'>
      <div className='create-product-container'>
        <h2>Add Product</h2>
        <form className='form-create-product' onSubmit={handleSubmit}>
          <label htmlFor="titulo">Title:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
          <label htmlFor="descripcion">Description:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          <label htmlFor="precio">Price:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
          <label htmlFor="categoria">Category:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
          <label htmlFor="thumbnail">Image (Thumbnail):</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          <button className="button-create-product" type="submit">Add Product</button>
        </form>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default CreateProduct;
