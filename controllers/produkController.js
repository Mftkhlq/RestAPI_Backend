const Produk = require('../models/produkModel');

const produkController = {
  // 1. GET /api/products : Menampilkan semua produk
  getAllProducts: async (req, res) => {
    try {
      const products = await Produk.getAll();
      res.status(200).json({
        success: true,
        message: 'Berhasil mengambil semua produk',
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data produk',
        error: error.message
      });
    }
  },

  // 2. POST /api/products : Menambah produk baru
  createProduct: async (req, res) => {
    try {
      const { name, price, stock, category } = req.body || {};

      // Validasi Input
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Validasi Gagal: Nama produk (name) harus berupa text yang tidak kosong.'
        });
      }

      if (price === undefined || typeof price !== 'number' || !Number.isInteger(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: 'Validasi Gagal: Harga (price) harus berupa integer non-negatif.'
        });
      }

      if (stock === undefined || typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({
          success: false,
          message: 'Validasi Gagal: Stok (stock) harus berupa integer non-negatif.'
        });
      }

      if (!category || typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Validasi Gagal: Kategori (category) harus berupa text yang tidak kosong.'
        });
      }

      // Simpan ke DB
      const newId = await Produk.create(name.trim(), price, stock, category.trim());
      
      // Ambil data produk yang baru disimpan
      const newProduct = await Produk.getById(newId);

      res.status(201).json({
        success: true,
        message: 'Produk berhasil ditambahkan',
        data: newProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Gagal menambahkan produk baru',
        error: error.message
      });
    }
  },

  // 3. PUT /api/products/:id : Mengupdate data produk (Harga/Stok) berdasarkan ID
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { price, stock } = req.body || {};

      // Cek apakah produk dengan ID tersebut ada
      const productExist = await Produk.getById(id);
      if (!productExist) {
        return res.status(404).json({
          success: false,
          message: `Produk dengan ID ${id} tidak ditemukan.`
        });
      }

      // Validasi: Harus mengisi minimal salah satu data (price atau stock)
      if (price === undefined && stock === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Validasi Gagal: Masukkan harga (price) atau stok (stock) yang ingin diupdate.'
        });
      }

      // Validasi Harga jika dikirim
      if (price !== undefined) {
        if (typeof price !== 'number' || !Number.isInteger(price) || price < 0) {
          return res.status(400).json({
            success: false,
            message: 'Validasi Gagal: Harga (price) harus berupa integer non-negatif.'
          });
        }
      }

      // Validasi Stok jika dikirim
      if (stock !== undefined) {
        if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0) {
          return res.status(400).json({
            success: false,
            message: 'Validasi Gagal: Stok (stock) harus berupa integer non-negatif.'
          });
        }
      }

      // Update ke DB
      await Produk.update(id, price, stock);

      // Ambil data ter-update
      const updatedProduct = await Produk.getById(id);

      res.status(200).json({
        success: true,
        message: 'Data produk berhasil diupdate',
        data: updatedProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Gagal mengupdate produk',
        error: error.message
      });
    }
  },

  // 4. DELETE /api/products/:id : Menghapus produk berdasarkan ID
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      // Cek apakah produk dengan ID tersebut ada
      const productExist = await Produk.getById(id);
      if (!productExist) {
        return res.status(404).json({
          success: false,
          message: `Produk dengan ID ${id} tidak ditemukan.`
        });
      }

      // Hapus dari DB
      await Produk.delete(id);

      res.status(200).json({
        success: true,
        message: `Produk dengan ID ${id} berhasil dihapus.`,
        data: productExist
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Gagal menghapus produk',
        error: error.message
      });
    }
  }
};

module.exports = produkController;
