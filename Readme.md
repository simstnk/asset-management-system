# 📦 Sistem Manajemen Inventaris Aset - Infrastruktur Teknologi Informasi

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![JWT](https://img.shields.io/badge/JWT-auth-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

Sistem manajemen inventaris aset berbasis web untuk mengelola data aset IT, stok, maintenance, daily activity, peminjaman, dan dilengkapi dengan autentikasi JWT, audit log, notifikasi, serta label barcode/QR code.

---

## 🚀 Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| **Manajemen Aset** | CRUD aset dengan upload foto |
| **Manajemen Stok** | Pantau ketersediaan stok (tersedia, menipis, habis) |
| **Jadwal Maintenance** | Jadwalkan dan pantau perawatan aset |
| **Daily Activity** | Catat aktivitas harian teknisi |
| **Peminjaman Aset** | Kelola peminjaman dan pengembalian aset |
| **Master Data** | Kelola divisi, kategori, lokasi |
| **Manajemen User** | Kelola pengguna (administrator, admin, viewer) |
| **Notifikasi** | Peringatan stok menipis & maintenance mendekati jatuh tempo |
| **Riwayat Aktivitas** | Catat setiap perubahan data (CREATE, UPDATE, DELETE) |
| **Label & QR Code** | Generate barcode/QR code untuk aset |
| **Dashboard** | Tampilkan statistik dan chart |
| **Profil Pengguna** | Ubah foto profil, nama, password |
| **Autentikasi JWT** | Keamanan berbasis token |
| **Export/Import CSV** | Backup dan migrasi data |
| **Responsif** | Mendukung desktop dan mobile |

---

## 🛠️ Teknologi yang Digunakan

### Backend
- **Node.js** – Runtime JavaScript
- **Express.js** – Framework web
- **MongoDB** – Database NoSQL
- **Mongoose** – ODM untuk MongoDB
- **JSON Web Token (JWT)** – Autentikasi
- **Multer** – Upload file
- **Bcrypt** – Hashing password
- **QRCode** – Generate QR code
- **Node-Cron** – Job scheduler untuk notifikasi otomatis
- **Winston** – Logging system

### Frontend
- **HTML5, CSS3, JavaScript (Vanilla)**
- **Chart.js** – Visualisasi data
- **JsBarcode** – Generate barcode
- **QRCode.js** – Generate QR code
- **Font Awesome** – Ikon
- **SweetAlert2** – Notifikasi interaktif

---

## ⚙️ Prasyarat

- **Node.js** (v16 atau lebih baru)
- **MongoDB** (lokal atau cloud seperti MongoDB Atlas)
- **Git** (opsional)
- **Browser modern** (Chrome, Firefox, Edge)

---

## 🧭 Instalasi & Konfigurasi

### 1. Clone Repository

```bash
git clone https://github.com/your-username/asset-management-system.git
cd asset-management-system

2. Setup Backend

cd backend
npm install

3. Konfigurasi Environment
Buat file .env di folder backend/ dengan isi:

env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/inventaris

# JWT
JWT_SECRET=rahasia123
JWT_EXPIRES_IN=7d

# Upload
UPLOAD_PATH=../uploads
MAX_FILE_SIZE=5242880

# CORS
CLIENT_URL=http://localhost:5500

# Email (opsional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

4. Seed Data (Opsional)
Untuk mengisi data awal (user, kategori, lokasi, divisi):

bash
cd backend
node seed.js

5. Setup Frontend
Tidak perlu instalasi khusus karena frontend murni HTML/CSS/JS. Cukup buka file index.html di browser (disarankan menggunakan Live Server).

6. Menjalankan Backend
bash
cd backend
npm run dev  # Development (dengan nodemon)
# atau
npm start    # Production
Server akan berjalan di http://localhost:5000


7. Menjalankan Frontend
Live Server (VS Code): Klik kanan index.html → Open with Live Server

HTTP Server:

bash
npx http-server frontend/ -p 5500
Akses di http://localhost:5500


🔑 Akun Demo
Username	Password	Role
administrator	admin123	Administrator
admin	admin123	Admin
viewer	viewer123	Viewer
Hak Akses per Role
Menu------------   Administrator---Admin----Viewer
Dashboard				✅		    ✅		 ✅
Manajemen Aset	 		✅	        ✅	     ✅
Manajemen Stok			✅	        ✅	     ✅ (read only)
Jadwal Maintenance		✅	        ✅	     ✅ (read only)
Daily Activity			✅	        ✅	     ✅ (read only)
Peminjaman Aset			✅	        ✅	     ✅ (read only)
Master Data				✅	        ✅	     ❌
Manajemen User			✅	        ❌	     ❌
Riwayat Aktivitas		✅	        ✅	     ❌
Export/Import			✅	        ✅	     ❌

📌 Fitur Khusus
🔔 Notifikasi
Sistem memiliki dua jenis notifikasi otomatis:

Stok Menipis – Muncul jika stok ≤ minimum stok

Maintenance Mendekati Jatuh Tempo – Notifikasi 3 hari sebelum jadwal

Notifikasi ditampilkan di:

Dashboard (widget notifikasi)

Toast notification (real-time)

Indikator badge di navbar

📋 Audit Log (Riwayat Aktivitas)
Setiap perubahan data tercatat dengan detail:

javascript
{
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  entityType: 'Asset' | 'Stock' | 'Maintenance' | 'Loan' | 'User',
  entityId: '...',
  changes: {
    old: { ... },
    new: { ... }
  },
  performedBy: {
    userId: '...',
    username: '...',
    role: '...'
  },
  timestamp: '...',
  ipAddress: '...'
}
🏷️ Generate Label & QR Code
Pilih aset yang akan dicetak labelnya

Pilih tipe: Barcode atau QR Code

Klik "Cetak Label"

Label siap dicetak langsung dari browser

📊 Dashboard
Dashboard menampilkan:

Total aset

Aset tersedia vs dipinjam

Maintenance pending

Grafik distribusi aset per kategori

Grafik aktivitas harian

Notifikasi terbaru

🧪 Testing API
Contoh Login
bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"administrator","password":"admin123"}'
Response:

json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "username": "administrator",
      "role": "administrator",
      "name": "Administrator Sistem"
    }
  }
}
Contoh Request dengan Token
bash
curl -X GET http://localhost:5000/api/assets \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
  
🐳 Deployment
## 🐳 Deployment dengan Docker

Aplikasi ini sudah dikemas dalam image Docker dan tersedia di Docker Hub.

### Prasyarat
- Docker terinstal di sistem Anda.
- (Opsional) Docker Compose jika ingin menjalankan dengan konfigurasi lebih lanjut.

### Menjalankan dengan Docker

1. **Pull image dari Docker Hub:**
   ```bash
   docker pull dkcocro/inventaris-aset:latest
   
2. **Jalankan container:**
   ```bash
   docker run -d -p 5000:5000 --name inventaris-aset dkcocro/inventaris-aset:latest
 
3. **Akses aplikasi:**
 Buka browser di http://localhost:5000
 
Build Image Sendiri (Untuk Pengembangan)
Jika ingin membangun image sendiri dari source code:
# Di root project
```bash
docker build -t inventaris-aset .
docker tag inventaris-aset dkcocro/inventaris-aset:latest
docker push dkcocro/inventaris-aset:latest

🛠️ Troubleshooting
Masalah	Solusi
Error 401 Unauthorized	Pastikan token JWT disertakan di header Authorization: Bearer <token>
Error 404 Not Found	Pastikan backend berjalan di localhost:5000 dan route benar
Error 500 Internal Server Error	Cek log di terminal backend dan pastikan koneksi MongoDB berhasil
Foto aset tidak muncul	Pastikan folder uploads/ ada dan app.use('/uploads', express.static(...)) terdaftar
MongoDB connection error	Cek MONGODB_URI di .env dan pastikan MongoDB running
CORS error	Pastikan CLIENT_URL di .env sesuai dengan URL frontend
📄 Lisensi
Proyek ini menggunakan lisensi MIT – silakan digunakan dan dikembangkan sesuai kebutuhan.

🤝 Kontribusi
Jika ingin berkontribusi:

Fork repository

Buat branch baru (git checkout -b fitur-baru)

Commit perubahan (git commit -m 'Menambahkan fitur baru')

Push ke branch (git push origin fitur-baru)

Buat Pull Request

Panduan Kontribusi
Gunakan ESLint untuk kode JavaScript

Ikuti struktur folder yang sudah ada

Tulis komentar untuk fungsi yang kompleks

Update dokumentasi jika diperlukan


📧 Kontak
Email: dkcocro@gmail.com

Repository: https://github.com/simstnk/Sistem-manajemen-inventaris-aset.git

---
