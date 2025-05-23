import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../socket';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/products');
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();

    // Listen to socket event
    socket.on('newProduct', (newProduct) => {
      setProducts((prev) => [newProduct, ...prev]);
    });

    return () => {
      socket.off('newProduct');
    };
  }, []);

  // Search products
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query.trim() === '') {
      fetchProducts();
    } else {
      const { data } = await axios.get(`http://localhost:5000/api/products/search/query?q=${query}`);
      setProducts(data);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Product Listing</h1>
      <input
        placeholder="Search by name or description"
        value={search}
        onChange={handleSearch}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onClick={() => navigate(`/products/${p._id}`)} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
