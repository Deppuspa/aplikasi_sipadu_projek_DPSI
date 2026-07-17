# UC-001: Registrasi Akun Mandiri

**Aktor:** Siswa, Guru Mapel, Wali Kelas, Admin  
**Referensi SRS:** F-19, BR-20, VR-09  
**Halaman Terkait:** P-02 — /register  
**Tujuan:** Aktor mendaftarkan akun baru secara mandiri melalui form registrasi yang menyesuaikan dengan peran yang dipilih. Akun langsung aktif tanpa perlu verifikasi.

---

## Preconditions

1. Aktor belum memiliki akun (belum login).
2. Aktor membuka halaman `/register`.

## Postconditions

1. Akun baru tersimpan dalam sistem dengan role yang dipilih saat registrasi.
2. Pengguna langsung login dan di-redirect ke `/dashboard` sesuai role.
3. Email terdaftar tidak dapat digunakan untuk registrasi kedua (VR-09).

---

## Main Flow

1. **Aktor memilih peran** — Sistem menampilkan 4 pilihan peran: Siswa, Guru Mapel, Wali Kelas, Admin. Aktor mengklik salah satu.
2. **Sistem menyesuaikan form** — Form registrasi berubah secara dinamis sesuai peran yang dipilih:
   - **Siswa:** field Nama Lengkap, NIS, Jenis Kelamin, Kelas.
   - **Guru Mapel:** field Nama Lengkap, Mata Pelajaran, ID Kelas (opsional).
   - **Wali Kelas:** field Nama Lengkap, ID Kelas binaan (opsional).
   - **Admin:** field Nama Lengkap, Username (opsional).
3. **Aktor mengisi field umum** — Aktor mengisi Email dan Password.
4. **Aktor mengisi field spesifik peran** — Aktor melengkapi field yang muncul sesuai peran.
5. **Aktor menekan tombol "Daftar & Masuk"** (Primary button, `bg-blue-600`).
6. **Sistem memvalidasi input:**
   - Memastikan semua field required terisi.
   - Memvalidasi format email.
   - Memeriksa keunikan email (VR-09).
   - Memastikan NIS unik (khusus siswa, VR-01).
7. **Sistem menyimpan akun baru** — Data tersimpan di sistem dengan role tetap sesuai pilihan.
8. **Sistem login otomatis** — Pengguna langsung login tanpa perlu verifikasi (BR-20).
9. **Sistem redirect** — Pengguna diarahkan ke `/dashboard` dengan dashboard sesuai role.

## Alternative Flows

### A1: Admin memilih langsung login
Jika aktor sudah memiliki akun, ia dapat mengklik tautan "Masuk di sini" yang mengarah ke `/login`.

### A2: Username admin dikosongkan
Sistem mengisi username secara otomatis dari bagian lokal alamat email (sebelum `@`).

### A3: Guru/Wali mengosongkan ID Kelas
Field ID Kelas bersifat opsional. Jika dikosongkan, akun tetap dibuat tanpa keterkaitan kelas.

## Exception Flows

### E1: Email sudah terdaftar
1. Sistem mendeteksi email sudah digunakan oleh akun lain.
2. Sistem menampilkan error banner (`bg-red-50 border-red-200 text-red-700`):
   > "Email sudah terdaftar."
3. Form tetap terisi, aktor dapat mengganti email.

### E2: Field required kosong
1. Sistem menggunakan validasi HTML native (`required`).
2. Browser menampilkan tooltip "Harap isi bidang ini."
3. Form tidak dikirim.

### E3: Password terlalu pendek
1. Input password memiliki atribut `minLength={6}`.
2. Browser memblokir submit jika kurang dari 6 karakter.
3. Browser menampilkan pesan minimal 6 karakter.

### E4: NIS duplikat (siswa)
1. Sistem mendeteksi NIS sudah terdaftar.
2. Sistem menampilkan error banner:
   > "NIS sudah terdaftar."
3. Form tetap terisi.

### E5: Gagal menyimpan (sistem error)
1. Sistem gagal menyimpan data (misal: storage penuh).
2. Sistem menampilkan error banner:
   > "Gagal mendaftarkan akun. Silakan coba lagi."

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-001-01 | Semua 4 peran dapat dipilih dan menampilkan form yang sesuai. | ✅ / ❌ |
| AC-001-02 | Email unik divalidasi; email duplikat menampilkan error. | ✅ / ❌ |
| AC-001-03 | Akun langsung aktif tanpa perlu verifikasi email/admin. | ✅ / ❌ |
| AC-001-04 | Setelah registrasi sukses, pengguna langsung login dan redirect ke `/dashboard`. | ✅ / ❌ |
| AC-001-05 | Setiap field required memicu validasi HTML native jika dikosongkan. | ✅ / ❌ |
