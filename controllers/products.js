const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir,'views','add-product.html'));
  res.render('add-product', {
    docTitle: 'Add product',
    path: 'admin/add-product',
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true,
  });
};

exports.postAddNewProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    // render - is a express method.Uses the default templated engine
    // then we pass data we need to share with the view
    res.render('shop', { prods: products, docTitle: 'Shop', path: '/' });
    // res.render('shop', {
    //   prods: products,
    //   docTitle: 'Shop',
    //   path: '/',
    //   hasProducts: products.length > 0,
    //   activeShop: true,
    //   productCSS:true,
    // });
  });
};
