# CRUD Blog Post App - (ilham)

Aplikasi ini adalah implementasi sistem Create, Read, Update, Delete (CRUD) untuk manajemen postingan blog yang dibuat sebagai bagian dari *Technical Test* untuk posisi Front End. Aplikasi ini dibangun sepenuhnya di sisi klien (client-side) tanpa memerlukan backend, dengan memanfaatkan `localStorage` untuk persistensi data.

## ✨ Fitur Utama

Aplikasi ini memenuhi semua persyaratan yang diberikan dalam tes, termasuk:

### Autentikasi & Manajemen Sesi
- **Login Pengguna**: Sistem autentikasi statis tanpa API.
- **Persistensi Sesi**: Pengguna tetap ter-autentikasi bahkan setelah me-refresh halaman, berkat penyimpanan sesi di `localStorage`.
- **Navigasi Terproteksi**: Semua halaman utama (selain Login) tidak dapat diakses sebelum pengguna berhasil login.
- **Profil Pengguna**: Menampilkan nama pengguna di navbar dan menyediakan halaman untuk mengedit nama lengkap.
- **Logout**: Fungsi untuk keluar dari sesi dengan aman.
- **Dropdown Kustom**: Menu dropdown di navbar dibuat secara manual menggunakan React Hooks tanpa library eksternal.

### Manajemen Postingan (CRUD)
- **Buat Postingan**: Pengguna dapat menambahkan postingan baru melalui form modal, lengkap dengan judul, konten, dan gambar utama (opsional).
- **Baca Postingan**: Menampilkan semua postingan dalam tata letak grid yang rapi dan responsif.
- **Update Postingan**: Mengedit judul, konten, dan gambar postingan yang sudah ada.
- **Delete Postingan**: Menghapus postingan dari daftar.

### Fungsionalitas Tambahan
- **Pencarian Real-time**: Memfilter postingan secara dinamis berdasarkan judul atau konten dengan *debouncing* untuk performa optimal.
- **Paginasi Kustom**: Membagi daftar postingan menjadi beberapa halaman tanpa menggunakan library pihak ketiga.
- **Persistence State URL**: Posisi halaman dan kata kunci pencarian disimpan di dalam *query string* URL (`?search=...&page=...`), sehingga state tidak akan hilang saat halaman di-refresh.
- **Detail Postingan (Modal)**: Pengguna dapat melihat detail lengkap sebuah postingan (termasuk gambar) dalam sebuah modal tanpa harus meninggalkan halaman utama.
- **Upload Gambar**: Menyimpan gambar yang diunggah sebagai URL Base64 di dalam `localStorage`.
- **Tata Letak Konsisten**: Kartu postingan memiliki tinggi yang sama persis, baik yang memiliki gambar maupun tidak, untuk tampilan yang rapi.

### Tema (UI/UX)
- **Mode Gelap (Dark Mode)**: Terdapat tiga pilihan tema: Terang, Gelap, dan mengikuti pengaturan Sistem Operasi (OS). Pilihan tema disimpan secara lokal.
- **Desain Responsif**: Tampilan aplikasi sudah dioptimalkan untuk berbagai ukuran layar, mulai dari mobile, tablet, hingga desktop.
- **Desain Murni Tailwind**: Seluruh antarmuka dibangun dari awal menggunakan Tailwind CSS tanpa bantuan library komponen UI seperti Material UI atau Chakra UI.

## 🚀 Teknologi yang Digunakan

- **[React.js](https://reactjs.org/)**: Library utama untuk membangun antarmuka pengguna.
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: Untuk manajemen state aplikasi yang terpusat dan efisien.
- **[React Router DOM](https://reactrouter.com/)**: Untuk menangani routing di sisi klien.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS untuk styling yang cepat dan responsif.
- **[Vite](https://vitejs.dev/)**: Sebagai build tool modern yang sangat cepat untuk pengembangan.
- **[React Icons](https://react-icons.github.io/react-icons/)**: Untuk penggunaan ikon SVG yang mudah.

## ⚙️ Panduan Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/Ilham593/crud-app.git
    ```

2.  **Instal semua dependensi yang dibutuhkan:**
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan secara default di `http://localhost:5173`.

4.  **Login ke Aplikasi:**
    Gunakan kredensial statis di bawah ini untuk masuk:
    - **Email**: `ilham@gmail.com`
    - **Password**: `123456`

---
Proyek ini dibuat dengan memperhatikan detail, kualitas kode, dan pengalaman pengguna.