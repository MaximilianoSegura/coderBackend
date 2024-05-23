const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Ruta raíz GET /
router.get('/', productsController.getAllProducts);

// Ruta GET /:pid
router.get('/:pid', productsController.getProductById);

// Ruta raíz POST /
router.post('/', productsController.addProduct);

// Ruta PUT /:pid
router.put('/:pid', productsController.updateProduct);

// Ruta DELETE /:pid
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;
