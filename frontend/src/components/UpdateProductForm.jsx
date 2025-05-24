import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../api/productApi";
import "../styles/ProductForm.css";
const UpdateProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: ""
    });
    // console.log(form)
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const res = await fetchProductById(id);
                console.log(res.data);
                setForm({
                    name: res.data.name,
                    description: res.data.description || "",
                    price: res.data.price,
                    image: res.data.image
                });

            } catch (err) {
                console.error("Failed to load product", err);
            }

        };

        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, {
                ...form,
                price: parseFloat(form.price)
            });
            navigate("/");
        } catch (err) {
            console.error("Failed to update product", err);
        }
    };
    console.log(form)
    return (
        <form onSubmit={handleSubmit} className="product-form space-y-4 max-w-md mx-auto mt-6">
            <input
                name="name"
                className="border p-2 w-full"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <textarea
                name="description"
                 className="border p-2 w-full"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"

            />
            <input
                name="price"
                className="border p-2 w-full"
                type="number"
                value={form.price}


                onChange={handleChange}
                placeholder="Price"
                required

            />
            <input
                className="border p-2 w-full"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Product</button>
        </form>
    );
};

export default UpdateProductForm;
