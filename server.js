const express = require('express');
const dotenv = require('dotenv');
const produkRoutes = require('./routes/produkRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Welcome & Documentation Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Selamat datang di RestAPI Produk (Struktur MVC + MySQL)',
    endpoints: {
      'GET /api/products': 'Menampilkan semua produk',
      'POST /api/products': 'Menambah produk baru',
      'PUT /api/products/:id': 'Mengupdate data produk (Harga/Stok) berdasarkan ID',
      'DELETE /api/products/:id': 'Menghapus produk berdasarkan ID'
    }
  });
});

// Mount Product Routes
app.use('/api/products', produkRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
