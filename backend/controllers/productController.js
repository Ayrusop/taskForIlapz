const Product = require('../models/Product');

const { emitProductCreated, emitProductUpdated } = require('../sockets/productSocket'); 
exports.getAllProducts = async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
};

exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
};

exports.searchProducts = async (req, res) => {
    const q = req.query.q;
    const products = await Product.find({
        $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
        ],
    });
    res.json(products);
};

exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    const newProduct = await product.save();

    emitProductCreated(newProduct); 

    res.status(201).json(newProduct);
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        emitProductUpdated(updatedProduct); 

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};
  