const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password:'yidah'
});

// allows to work with promises instead of callbacks
module.exports= pool.promise();

