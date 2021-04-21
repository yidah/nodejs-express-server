const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const adminData = require('./admin');

const router = express.Router();

// get uses an extact match so the order of the routers does not matter
router.get('/', (req, res, next) => {
  const products = adminData.products;
  // render - is a express method.Uses the default templated engine
  // then we pass data we need to share with the view
  res.render('shop', {prods:products, docTitle: 'Shop',  path: '/'});
  // res.render('shop', {
  //   prods: products,
  //   docTitle: 'Shop',
  //   path: '/',
  //   hasProducts: products.length > 0,
  //   activeShop: true,
  //   productCSS:true,
  // });
});

module.exports = router;
