import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} width="300" />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
    </div>
  );
};

export default ProductDetails;
