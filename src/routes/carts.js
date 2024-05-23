const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

// Ruta raíz POST /
router.post('/', cartsController.createCart);

// Ruta GET /:cid
router.get('/:cid', cartsController.getCartById);

// Ruta POST /:cid/product/:pid
router.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = router;
