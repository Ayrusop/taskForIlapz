import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import ProductForm from "./components/ProductForm";
import UpdateProductForm from "./components/UpdateProductForm";
import "./App.css";
const App = () => (
  <Router>
    <div className="container">
      <h1>Task For ilabz</h1>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<UpdateProductForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;