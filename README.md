# Simple REST API - Product Management (MVC & MySQL)

Repository ini berisi implementasi REST API sederhana menggunakan **ExpressJS** dan **MySQL** untuk manajemen produk. Project ini dirancang menggunakan arsitektur **MVC (Model-View-Controller)** untuk memisahkan logika routing, bisnis, dan query database demi kemudahan pemeliharaan (*maintenance*).

---

## 📁 Struktur Project

```text
backend_tugas/
├── config/
│   └── database.js          # Koneksi MySQL (connection pool)
├── controllers/
│   └── produkController.js  # Logika bisnis & validasi request
├── models/
│   └── produkModel.js       # Query SQL CRUD
├── routes/
│   └── produkRoutes.js      # Definisi endpoint API
├── .env                     # Konfigurasi environment (port, database)
├── database.sql             # Script inisialisasi database & tabel
├── server.js                # Entry point utama aplikasi
├── index.js                 # Script pembantu (mendelegasikan ke server.js)
└── package.json             # Dependensi project & npm scripts
```

---

## Skema Database

Tabel **`produk`** dibuat di dalam database `Rest_API_Backend` dengan struktur berikut:

| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | `INT` | Primary Key, Auto Increment |
| `name` | `VARCHAR(255)` | Nama barang (Not Null) |
| `price` | `INT` | Harga barang (Not Null) |
| `stock` | `INT` | Jumlah stok (Not Null) |
| `category` | `VARCHAR(100)` | Kategori barang (Not Null) |

---

## Instalasi & Cara Menjalankan

### Prasyarat
- Node.js terinstal di komputer.
- MySQL Server (XAMPP / Laragon / standalone) sudah aktif.

### Langkah-langkah:
1. **Clone/Download** repository ini.
2. Buka terminal di direktori project, lalu install dependensi:
   ```bash
   npm install
   ```
3. Buat database di MySQL Anda:
   - Jalankan MySQL.
   - Import file `database.sql` lewat phpMyAdmin atau klien SQL Anda untuk membuat database `Rest_API_Backend` beserta tabel dan data awal secara otomatis.
4. Sesuaikan kredensial database di file `.env` jika diperlukan:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=Rest_API_Backend
   ```
5. Jalankan aplikasi:
   ```bash
   node server.js
   ```
   *(Atau bisa juga menggunakan `node index.js`)*.

---

## 🌐 Dokumentasi API (Endpoints)

### 1. Root / Welcome Route
- **Endpoint**: `GET /`
- **Deskripsi**: Menampilkan informasi selamat datang dan daftar endpoint.

### 2. Tampilkan Semua Produk
- **Endpoint**: `GET /api/products`
- **Deskripsi**: Menampilkan daftar semua produk.

### 3. Tambah Produk Baru
- **Endpoint**: `POST /api/products`
- **Body (JSON)**:
  ```json
  {
    "name": "Spidol Boardmarker",
    "price": 8500,
    "stock": 15,
    "category": "Alat Tulis"
  }
  ```

### 4. Update Data Produk (Harga/Stok)
- **Endpoint**: `PUT /api/products/:id`
- **Body (JSON)** *(Dapat dikirim salah satu atau keduanya)*:
  ```json
  {
    "price": 9000,
    "stock": 10
  }
  ```

### 5. Hapus Produk berdasarkan ID
- **Endpoint**: `DELETE /api/products/:id`
- **Deskripsi**: Menghapus data produk terpilih berdasarkan parameter ID.
