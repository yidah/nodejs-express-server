const fs = require('fs');
const path = require('path');
// path.dirname returns directory name of a path
// require.main.filename gives us the path to the start up file, app.js
const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //Fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //Analyse the cart => find existing product
      const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex]= updatedProduct
      } else {
        // if we have a new product
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err =>{
          console.log(err);
      });
    });
  }
};
