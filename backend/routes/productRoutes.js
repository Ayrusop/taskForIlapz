const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.get('/search/query', controller.searchProducts);
router.post('/', controller.createProduct);

module.exports = router; 
