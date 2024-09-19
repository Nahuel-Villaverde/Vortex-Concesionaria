import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductList from './ProductList'; // Importamos el componente ProductList

const ProductContainer = () => {
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
        const productsResponse = await axios.get(`/api/products?page=${page}&limit=${limit}&categoria=${categoria}&sort=${sort}`);
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

  const handleLogout = async () => {
    try {
      await axios.post('/api/sessions/logout');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleViewCart = () => {
    if (user && user.cartId) {
      navigate(`/carts/${user.cartId}`);
    } else {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
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
    <div>
      {user && <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>}
      {user && <button className="profile-button" onClick={handleProfileClick}>Ver Perfil</button>}
      {user?.role === 'user' && (
        <button className="view-cart-button" onClick={handleViewCart}>Ver Carrito</button>
      )}
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

      <div>
        <label htmlFor="limit">Limite de Productos: </label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
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