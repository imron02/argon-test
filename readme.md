# Argon Test

**Selamat datang di Argon Test!**

Projek ini terdiri dari dua aplikasi, yaitu ExpressJS (dalam folder api) dan NextJS (dalam folder app). Pastikan stack yang dibutuhkan, seperti Node LTS dan Docker, sudah terinstal di mesin Anda. Clone projek dari repository ini: [https://github.com/imron02/argon-test](https://github.com/imron02/argon-test).

## Menjalankan Projek

### 1. Setup Database

Masuk ke folder api (ExpressJS) dan jalankan perintah:

```bash
docker-compose up
```

### 2. Setup API

Masuk ke folder api (ExpressJS) dan lakukan langkah-langkah berikut:

1. Install dependensi dengan perintah:

   ```bash
   npm install
   ```

2. Buat tabel database:

   ```bash
   npm run db:migrate
   ```

3. Isi database dengan data dummy:

   ```bash
   npm run db:seed
   ```

4. Jalankan aplikasi (ExpressJS):

   ```bash
   npm run start
   ```

### 3. Setup App

Masuk ke folder app (NextJS) dan jalankan perintah:

```bash
npm install
npm run dev
```

### Catatan Penting

1. Terdapat koleksi Postman untuk menguji API dengan nama "Argon Test
   postman_collection.json" yang dapat ditemukan di folder api.

2. Fitur yang sudah berjalan pada aplikasi NextJS meliputi:

   - Login employee di URL "http://localhost:3000/" dengan contoh username `imron@examples.com` dan password `password`.
   - Fitur rekam kehadiran dan pulang di "http://localhost:3000/dashboard".
   - Menu performa di "http://localhost:3000/dashboard/performance".
   - Menu profile dan update profile di "http://localhost:3000/dashboard/profile".
   - Menu sign out employee.
   - Login admin di URL "http://localhost:3000/admin/login" Login dengan contoh username `admin@examples.com` dan password `password`.
   - Menu admin dashboard di "http://localhost:3000/admin/dashboard".
   - Menu sign out admin.

### Catatan Penting Tambahan

Mohon diperhatikan bahwa beberapa task belum terselesaikan karena keterbatasan waktu yang sangat terbatas. Terima kasih atas pemahamannya.

Imron Rosdiana 🫡
