# UC-013: Kelola Hak Akses Pengguna oleh Admin

**Aktor:** Admin (Guru BK)  
**Referensi SRS:** F-17  
**Halaman Terkait:** P-21 — /hak-akses  
**Tujuan:** Admin melihat dan memahami batasan hak akses setiap peran dalam sistem. Halaman ini bersifat informatif — menampilkan tabel/panel hak akses per role sesuai ketentuan SRS.

---

## Preconditions

1. Admin sudah login.
2. Admin membuka halaman `/hak-akses`.

## Postconditions

1. Admin melihat ringkasan hak akses keempat peran.
2. Admin memahami batasan akses setiap peran sesuai SRS 3.1–3.4.

---

## Main Flow

1. **Sistem menampilkan halaman** — Halaman `/hak-akses` menampilkan:
   - Judul "Kelola Hak Akses Pengguna".
   - Deskripsi: "Admin (Guru BK) mengatur hak akses pengguna berdasarkan peran dalam sistem."
2. **Sistem menampilkan 4 card peran** — Grid `grid-cols-1 md:grid-cols-2`:
   - **Siswa** (icon `GraduationCap`, border `border-green-300`).
   - **Guru Mapel** (icon `BookOpen`, border `border-blue-300`).
   - **Wali Kelas** (icon `Users`, border `border-purple-300`).
   - **Admin** (icon `ShieldCheck`, border `border-orange-300`).
3. **Setiap card menampilkan:**
   - Ikon peran di dalam `p-2 rounded-lg` dengan warna sesuai.
   - Nama peran (`font-semibold text-lg`).
   - Daftar **permissions** dengan ikon `Check` hijau.
   - Daftar **restrictions** (jika ada) dengan ikon `X` merah.
4. **Admin membaca informasi** — Admin dapat membandingkan hak akses antar peran.
5. **Admin navigasi ke halaman lain** — Tidak ada aksi yang dapat dilakukan di halaman ini selain membaca informasi.

## Alternative Flows

### A1: Admin ingin mengubah hak akses
1. Halaman `/hak-akses` bersifat informatif (read-only).
2. Tidak ada mekanisme untuk mengubah hak akses peran melalui antarmuka.
3. Perubahan hak akses hanya dapat dilakukan melalui mekanisme di luar sistem (tidak dalam lingkup F-17).

## Exception Flows

### E1: Akses oleh aktor lain
1. Siswa, guru mapel, atau wali kelas mencoba membuka `/hak-akses`.
2. Sistem memeriksa role dan mendeteksi ketidaksesuaian.
3. Sistem redirect ke `/dashboard` (VR-10).

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-013-01 | Halaman menampilkan 4 card peran (Siswa, Guru Mapel, Wali Kelas, Admin). | ✅ / ❌ |
| AC-013-02 | Setiap card menampilkan permissions dan restrictions. | ✅ / ❌ |
| AC-013-03 | Hanya admin yang dapat mengakses halaman ini. | ✅ / ❌ |
