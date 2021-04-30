const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

// path.dirname returns directory name of a path
// require.main.filename gives us the path to the start up file, app.js
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callbackFunction) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callbackFunction([]);
    }
    callbackFunction(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) { // we update a product
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updateProducts = [...products];
        updateProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
          console.log(err);
        });
      } else {// we create a product
        this.id = Math.random().toString();
        // We avoid to lose the context of "this"
        // by using an arrow function as a callback (err,fileContent)=>
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id){
    getProductsFromFile((products) => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(p => p.id !== id);
      // write to the file the products without the one we want to delete
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if(!err){
          // delete product also from the cart if exists
          Cart.deleteProduct(id, product.price);
        }
      });
    });

  }

  //It is not call on a single instance of a product because it should fetch all products
  //so static makes sure that we can call this method directly on the class itself and not on an instance
  // As fs.readFile is an async call we use a callbackFunction so that whenever we finished reading the
  // file we can send the returned data to our function (see products.js controller)
  static fetchAll(callbackFunction) {
    getProductsFromFile(callbackFunction);
  }

  // load details
  static findById(id, callbackFunction) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      callbackFunction(product);
    });
  }
};
