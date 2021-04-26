const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// get uses an extact match so the order of the routers does not matter
router.get('/', productsController.getProducts);

module.exports = router;
