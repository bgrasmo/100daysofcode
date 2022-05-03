const mysql = require('mysql2/promise');

const password = process.env.password;

const pool = mysql.createPool({
  host: 'localhost',
  database: 'blog',
  user: 'webdev',
  password: password
});

module.exports = pool;