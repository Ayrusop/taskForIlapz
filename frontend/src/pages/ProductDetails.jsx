import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/productApi";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductById(id).then(({ data }) => setProduct(data));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details">
            <h2 className="details-title">
                {product.name}
                </h2>

            <img src={product.image} 
            alt={product.name} 
            className="details-image" 
            />
            <p className="details-description">
                {product.description}
                </p>
            <strong className="product-price">
                ₹ {product.price}
                </strong>
        </div>
    );
};

export default ProductDetails;
