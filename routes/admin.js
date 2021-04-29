// required for the navigation template
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const { route } = require('./shop');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// /admin/add-product => POST
// filter for only post requests
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product/', adminController.postEditProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);


// export router
module.exports = router;

