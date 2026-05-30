const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tugas_backend',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('Koneksi ke database MySQL berhasil terhubung.');
    connection.release();
  })
  .catch(err => {
    console.error('Koneksi ke database MySQL GAGAL:', err.message);
  });

module.exports = pool;
