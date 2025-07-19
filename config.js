// config.js
const mysql = require('mysql2');

// Create a pool of connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ranjan@74',  // Change if needed
  database: 'ypl',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL Connection Failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL database!');
    connection.release(); // Release connection back to pool
  }
});

module.exports = pool;
