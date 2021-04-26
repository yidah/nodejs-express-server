// required for the navigation template
const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
// filter for only post requests
router.post('/add-product', productsController.postAddNewProduct);

// export router
module.exports = router;

