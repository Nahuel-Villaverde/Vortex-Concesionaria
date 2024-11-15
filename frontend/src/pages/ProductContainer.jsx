import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductList from './ProductList'; // Importamos el componente ProductList
import './ProductContainer.css'

const ProductContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [limit, setLimit] = useState(parseInt(searchParams.get('limit')) || 12);
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [prevLink, setPrevLink] = useState(null);
  const [nextLink, setNextLink] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get(`/api/products?page=${page}&limit=12&categoria=${categoria}&sort=${sort}`);
        setProducts(productsResponse.data.payload);
        setPrevLink(productsResponse.data.prevLink);
        setNextLink(productsResponse.data.nextLink);

        try {
          const userResponse = await axios.get('/api/sessions/current_user');
          setUser(userResponse.data);
        } catch (error) {
          setUser(null); // Usuario no autenticado
        }
      } catch (error) {
        setError('Error al cargar los productos');
      }
    };

    fetchProducts();
  }, [page, limit, categoria, sort]);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      if (response.status === 200) {
        // Actualizamos el estado de los productos eliminando el producto
        setProducts(products.filter((product) => product._id !== productId));
        alert('Producto eliminado con éxito');
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handlePageChange = (link) => {
    const urlParams = new URLSearchParams(link.split('?')[1]);
    const newPage = urlParams.get('page');
    const newLimit = urlParams.get('limit') || limit;
    const newCategoria = urlParams.get('categoria') || '';
    const newSort = urlParams.get('sort') || '';

    setPage(Number(newPage));
    setLimit(Number(newLimit));
    setCategoria(newCategoria);
    setSort(newSort);

    navigate(`/products?page=${newPage}&limit=${newLimit}&categoria=${newCategoria}&sort=${newSort}`);
  };

  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    setLimit(Number(newLimit));
    setPage(1);

    navigate(`/products?page=1&limit=${newLimit}&categoria=${categoria}&sort=${sort}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setCategoria(value);
    } else if (name === 'sort') {
      setSort(value);
    }
    setPage(1);

    navigate(`/products?page=1&limit=${limit}&categoria=${categoria}&sort=${sort}`);
  };

  const handleAddProduct = () => {
    navigate('/products/create');
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='mega-container'>
      {user?.role === 'admin' && (
        <div>
          <button className='add-product-button' onClick={handleAddProduct}>Add Product</button>
        </div>
      )}

      <div className="filter-container">

        <div className="sort-container">
          <label className="label-sort" htmlFor="sort">Sort by: </label>
          <select id="sort" name="sort" value={sort} onChange={handleFilterChange}>
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="categories">
          <button className={`category-button ${categoria === '' ? 'active' : ''}`} onClick={() => handleFilterChange({ target: { name: 'categoria', value: '' } })}>ALL</button>
          <button className={`category-button ${categoria === 'coupes' ? 'active' : ''}`} onClick={() => handleFilterChange({ target: { name: 'categoria', value: 'coupes' } })}>COUPES</button>
          <button className={`category-button ${categoria === 'sedans' ? 'active' : ''}`} onClick={() => handleFilterChange({ target: { name: 'categoria', value: 'sedans' } })}>SEDANS</button>
          <button className={`category-button ${categoria === 'suvs' ? 'active' : ''}`} onClick={() => handleFilterChange({ target: { name: 'categoria', value: 'suvs' } })}>SUVS</button>
        </div>
      </div>

      <ProductList
        products={products}
        user={user}
        handleDeleteProduct={handleDeleteProduct}
        handlePageChange={handlePageChange}
        prevLink={prevLink}
        nextLink={nextLink}
      />

    </div>
  );
};

export default ProductContainer;