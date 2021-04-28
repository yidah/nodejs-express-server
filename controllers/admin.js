const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('admin/add-product', {
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

  exports.getProducts = (req, res, next) =>{
    Product.fetchAll((products) => {
      res.render('admin/products', { 
        prods: products, 
        docTitle: 'Admin Products', 
        path: 'admin/products' });
    });
  }