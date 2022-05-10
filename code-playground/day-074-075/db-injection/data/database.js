const mysql = require('mysql2/promise');

const password = process.env.password;

const pool = mysql.createPool({
  host: 'localhost',
  database: 'security',
  user: 'webdev',
  password: password,
  multipleStatements: true
})

module.exports = pool;