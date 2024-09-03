// Products.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Products.css';

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [limit, setLimit] = useState(parseInt(searchParams.get('limit')) || 10);
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [prevLink, setPrevLink] = useState(null);
  const [nextLink, setNextLink] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Cargar los productos sin autenticación
        const productsResponse = await axios.get(`/api/products?page=${page}&limit=${limit}&categoria=${categoria}&sort=${sort}`);
        setProducts(productsResponse.data.payload);
        setPrevLink(productsResponse.data.prevLink);
        setNextLink(productsResponse.data.nextLink);

        // Intentar obtener el usuario autenticado (puede fallar si no está autenticado)
        try {
          const userResponse = await axios.get('/api/sessions/current_user');
          setUser(userResponse.data);
        } catch (error) {
          setUser(null); // Usuario no autenticado
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los productos');
      }
    };

    fetchProducts();
  }, [page, limit, categoria, sort]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/sessions/logout');
      setUser(null); // Al cerrar sesión, se actualiza el estado del usuario
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleAddProduct = () => {
    navigate('/products/create');
  };

  const handleEditProduct = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        const response = await axios.delete(`/api/products/${productId}`);
        if (response.status === 200) {
          alert('Producto eliminado con éxito');
          setProducts(products.filter((product) => product._id !== productId));
        } else {
          alert('Error al eliminar el producto');
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleViewCart = () => {
    if (user && user.cartId) {
      navigate(`/carts/${user.cartId}`);
    } else {
      navigate('/login'); // Redirige a la página de inicio de sesión si no está autenticado
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
    setPage(1); // Reinicia la página al cambiar el filtro

    navigate(`/products?page=1&limit=${limit}&categoria=${categoria}&sort=${sort}`);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login'); // Redirige a la página de inicio de sesión si no está autenticado
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate('/login'); // Redirige a la página de inicio de sesión si no está autenticado
      return;
    }
    try {
      const cartId = user.cartId;
      const response = await axios.post(`/api/carts/${cartId}/products/${productId}`);
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <button onClick={handleProfileClick}>Ver Perfil</button>
      <h1>Lista de Productos</h1>
      {user?.role === 'admin' && (
        <div>
          <button onClick={handleAddProduct}>Agregar Producto</button>
        </div>
      )}
      <div>
        <label htmlFor="categoria">Categoría: </label>
        <select id="categoria" name="categoria" value={categoria} onChange={handleFilterChange}>
          <option value="">Todas</option>
          <option value="zapatillas">Zapatillas</option>
          <option value="remeras">Remeras</option>
          <option value="camperas">Camperas</option>
          <option value="pantalones">Pantalones</option>
          <option value="gorras">Gorras</option>
          <option value="conjuntos">Conjuntos</option>
        </select>
      </div>
      <div>
        <label htmlFor="sort">Ordenar por: </label>
        <select id="sort" name="sort" value={sort} onChange={handleFilterChange}>
          <option value="">Ninguno</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <h2 className="product-title" onClick={() => handleProductClick(product._id)}>
                {product.titulo}
              </h2>
              <p className="product-details">Descripción: {product.descripcion}</p>
              <p className="product-details">Precio: ${product.precio}</p>
              <p className="product-details">Categoría: {product.categoria}</p>
              <img src={product.thumbnail} alt={product.titulo} className="product-image" />
              {user?.role === 'admin' && (
                <div className="product-actions">
                  <button onClick={() => handleEditProduct(product._id)}>Modificar</button>
                  <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
                </div>
              )}
              {user?.role === 'user' && (
                <button onClick={() => handleAddToCart(product._id)}>Agregar al Carrito</button>
              )}
              {!user && (
                <button onClick={() => navigate('/login')}>Iniciar sesión para agregar al carrito</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
      <div className="pagination">
        {prevLink && <button onClick={() => handlePageChange(prevLink)}>&lt;&lt; Anterior</button>}
        <span>Página: {page}</span>
        {nextLink && <button onClick={() => handlePageChange(nextLink)}>Siguiente &gt;&gt;</button>}
      </div>
      {user && <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>}
      {user?.role === 'user' && (
        <button className="view-cart-button" onClick={handleViewCart}>Ver Carrito</button>
      )}
    </div>
  );
};

export default ProductList;