const Product = require('../models/Product');

// GET all products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
};

// GET one product
exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

// Search products
exports.searchProducts = async (req, res) => {
    const query = req.query.q;
    const products = await Product.find({
        $or: [
            { name: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') }
        ]
    });
    res.json(products);
};

// POST create product
exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();

    // Notify all clients via socket.io
    req.io.emit('newProduct', product);

    res.status(201).json(product);
};
