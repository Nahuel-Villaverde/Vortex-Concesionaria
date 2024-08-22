import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    thumbnail: '',
    categoria: '',
    code: '',
    stock: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'application/json' }
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
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
        <label htmlFor="thumbnail">Thumbnail:</label>
        <input
          type="text"
          id="thumbnail"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          required
        />
        <label htmlFor="categoria">Categoría:</label>
        <input
          type="text"
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        />
        <label htmlFor="code">Código:</label>
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
        <button type="submit">Agregar Producto</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CreateProduct;
