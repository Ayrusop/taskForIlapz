import React from "react";
import { Link } from 'react-router-dom';
import "../styles/ProductCard.css"; 
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>

        <strong>₹ {product.price}</strong>
      </Link>

      
      <Link to={`/products/${product._id}/edit`} >
       <button className="btn btn-primary " style={{ textDecoration: 'none', color: 'white',marginTop: '10px' }}>
        Edit
        </button> 
      </Link>
    </div>
  );
};

export default ProductCard;
