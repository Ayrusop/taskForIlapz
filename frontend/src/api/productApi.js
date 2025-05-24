import axios from "axios";

const API_BASE = "http://localhost:5000/api/products";

export const fetchProducts = async () => axios.get(API_BASE);

export const fetchProductById = async (id) => axios.get(`${API_BASE}/${id}`);

export const searchProducts = async (q) => axios.get(`${API_BASE}/search?q=${q}`);

export const createProduct = async (product) => axios.post(API_BASE, product);

export const updateProduct = async (id, updatedData) => {
    const response = await axios.put(`${API_BASE}/${id}`, updatedData);
    return response.data;
  };

