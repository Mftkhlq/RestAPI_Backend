const db = require('../config/database');

const Produk = {
  // 1. Menampilkan semua produk
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM produk');
    return rows;
  },

  // 2. Mengambil satu produk berdasarkan ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM produk WHERE id = ?', [id]);
    return rows[0];
  },

  // 3. Menambah produk baru
  create: async (name, price, stock, category) => {
    const [result] = await db.query(
      'INSERT INTO produk (name, price, stock, category) VALUES (?, ?, ?, ?)',
      [name, price, stock, category]
    );
    return result.insertId;
  },

  // 4. Mengupdate data produk (Harga/Stok) berdasarkan ID
  update: async (id, price, stock) => {
    const fields = [];
    const params = [];

    if (price !== undefined) {
      fields.push('price = ?');
      params.push(price);
    }
    if (stock !== undefined) {
      fields.push('stock = ?');
      params.push(stock);
    }

    // Jika tidak ada data yang diupdate, hentikan proses
    if (fields.length === 0) return false;

    params.push(id);
    const sql = `UPDATE produk SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await db.query(sql, params);
    return result.affectedRows > 0;
  },

  // 5. Menghapus produk berdasarkan ID
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM produk WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Produk;
