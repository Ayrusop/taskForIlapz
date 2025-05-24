import React, { useState } from "react";
import { createProduct } from "../api/productApi";
import { useNavigate } from "react-router-dom"
import "../styles/ProductForm.css";

const ProductForm = () => {
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return;

    try {
      await createProduct({ ...form, price: parseFloat(form.price) });
      setForm({ name: "", description: "", price: "", image: "" });

      navigate("/");
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"

      />
      <input
        name="price"
        type="number"
        value={form.price}
        
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;