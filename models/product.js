// database connection
const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // we use ? to avoid SQL injection attacks. MySql will make sure it parses 
    // any hidden sql commands and remove them
    // this code will also yield a promise
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)',
    [this.title, this.price, this.imageUrl, this.description]);
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  // load details
  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
