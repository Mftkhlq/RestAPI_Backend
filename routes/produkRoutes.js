const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');

// GET /api/products
router.get('/', produkController.getAllProducts);

// POST /api/products
router.post('/', produkController.createProduct);

// PUT /api/products/:id
router.put('/:id', produkController.updateProduct);

// DELETE /api/products/:id
router.delete('/:id', produkController.deleteProduct);

module.exports = router;
