import React, { useEffect, useState } from "react";
import { fetchProducts, searchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import socket from "../sockets/socket";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; 

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");

    const loadProducts = async () => {
        const { data } = await fetchProducts();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();

        socket.on("productCreated", (newProduct) => {
            setProducts((prev) => [newProduct, ...prev]);
        });

        return () => socket.off("productCreated");
    }, []);

    useEffect(() => {
        socket.on("productUpdated", (updatedProduct) => {
            setProducts(prev =>
                prev.map(p => p._id === updatedProduct._id ? updatedProduct : p)
            );
            return () => socket.off("productUpdated");
        });
    }, []);

    const handleSearch = async (e) => {
        const q = e.target.value;
        setQuery(q);
        if (q.trim()) {
            const { data } = await searchProducts(q);
            setProducts(data);
        } else {
            loadProducts();
        }
    };

    return (
        <div className="container">
            <div className="home-header">
                <input
                    className="search-input"
                    placeholder="Search..."
                    value={query}
                    onChange={handleSearch}
                />
                <Link to="/products/new" className="link-no-style">
                    <button className="btn btn-primary">Add new Product</button>
                </Link>
            </div>
            <div className="grid">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
