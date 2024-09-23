import React from 'react';
import Product from './Product';

const ProductList = ({ products, user, handleDeleteProduct, handlePageChange, prevLink, nextLink }) => {
  return (
    <div>
      <h1>Lista de Productos</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Product key={product._id} product={product} user={user} handleDeleteProduct={handleDeleteProduct} />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      <div className="pagination">
        {prevLink && <button onClick={() => handlePageChange(prevLink)}>&lt;&lt; Anterior</button>}
        {nextLink && <button onClick={() => handlePageChange(nextLink)}>Siguiente &gt;&gt;</button>}
      </div>
    </div>
  );
};

export default ProductList;