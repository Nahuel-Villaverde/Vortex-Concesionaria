import React from 'react';
import Product from './Product';
import './ProductList.css'

const ProductList = ({ products, user, handleDeleteProduct, handlePageChange, prevLink, nextLink }) => {
  return (
    <div>
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
        {prevLink && <button onClick={() => handlePageChange(prevLink)}>&lt;&lt; Previous </button>}
        {nextLink && <button onClick={() => handlePageChange(nextLink)}>Next &gt;&gt;</button>}
      </div>
    </div>
  );
};

export default ProductList;
