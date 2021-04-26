const fs = require('fs');
const path = require('path');
// const products = [];
// path.dirname returns directory name of a path
// require.main.filename gives us the path to the start up file, app.js
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      // We avoid to lose the context of "this"
      // by using an arrow function as a callback (err,fileContent)=>
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  //It is not call on a single instance of a product because it should fetch all products
  //so static makes sure that we can call this method directly on the class itself and not on an instance
  // As fs.readFile is an async call we use a callbackFunction so that whenever we finished reading the
  // file we can send the returned data to our function (see products.js controller)
  static fetchAll(callbackFunction) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callbackFunction([]);
      }
      callbackFunction(JSON.parse(fileContent));
    });
  }
};
