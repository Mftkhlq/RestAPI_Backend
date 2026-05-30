-- 1. Membuat Database
CREATE DATABASE IF NOT EXISTS tugas_backend;
USE tugas_backend;

-- 2. Membuat Tabel Produk
CREATE TABLE IF NOT EXISTS produk (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  stock INT NOT NULL,
  category VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Memasukkan Seed Data Awal
INSERT INTO produk (name, price, stock, category) VALUES
('Indomie Goreng', 3500, 50, 'Makanan'),
('Teh Botol Sosro', 5000, 30, 'Minuman'),
('Buku Tulis Kiky', 6000, 20, 'Alat Tulis');
