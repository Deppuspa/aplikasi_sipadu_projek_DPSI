# UC-002: Login dengan Role-Locked Redirect

**Aktor:** Siswa, Guru Mapel, Wali Kelas, Admin  
**Referensi SRS:** F-20, BR-19, VR-10  
**Halaman Terkait:** P-01 — /login, /  
**Tujuan:** Aktor yang sudah memiliki akun login ke sistem menggunakan email dan password. Sistem memverifikasi kredensial, menentukan peran akun, dan mengarahkan ke dashboard yang sesuai.

---

## Preconditions

1. Aktor sudah memiliki akun terdaftar.
2. Aktor membuka halaman `/login` (atau `/` yang redirect ke `/login` jika belum login).

## Postconditions

1. Pengguna login dengan state tersimpan di memori (React Context).
2. Pengguna di-redirect ke `/dashboard`.
3. Halaman `/dashboard` me-render konten sesuai `user.role`.

---

## Main Flow

1. **Sistem menampilkan form login** — Halaman `/login` menampilkan:
   - Input Email (`type="email"`) dengan placeholder "contoh@email.sch.id".
   - Input Password (`type="password"`) dengan placeholder "Masukkan password".
   - Tombol "Masuk" (Primary button, `bg-blue-600`).
   - Tautan "Daftar di sini" untuk navigasi ke `/register`.
   - Panel informasi akun demo (warna `bg-blue-50`).
2. **Aktor mengisi Email** — Aktor memasukkan alamat email yang telah didaftarkan.
3. **Aktor mengisi Password** — Aktor memasukkan password.
4. **Aktor menekan tombol "Masuk"**.
5. **Sistem memvalidasi kredensial:**
   - Mencocokkan email dengan data registrasi.
   - Mencocokkan password.
   - Jika cocok, mengambil data user beserta role.
6. **Sistem menyimpan state login** — Data user disimpan dalam React Context (in-memory).
7. **Sistem redirect sesuai role** — Pengguna diarahkan ke `/dashboard`.
8. **Halaman `/dashboard` mendeteksi role** — Komponen dashboard yang sesuai dirender:
   - `siswa` → SiswaDashboard.
   - `guru_mapel` → GuruDashboard.
   - `wali_kelas` → WaliDashboard.
   - `admin` → AdminDashboard.

## Alternative Flows

### A1: Pengguna sudah login membuka `/login`
1. Jika pengguna sudah login dan mencoba mengakses `/login`, sistem redirect ke `/dashboard`.
2. Form login tidak ditampilkan.

### A2: Pengguna membuka `/` (root)
1. Jika sudah login → redirect ke `/dashboard`.
2. Jika belum login → redirect ke `/login`.

### A3: Login via registrasi
Setelah registrasi sukses (UC-001), pengguna langsung login tanpa perlu mengisi form login.

## Exception Flows

### E1: Email tidak ditemukan
1. Sistem tidak menemukan email dalam data registrasi.
2. Sistem menampilkan error banner (`bg-red-50 border-red-200 text-red-700`):
   > "Email atau password salah."
3. Form tetap terisi, aktor dapat memperbaiki input.

### E2: Password salah
1. Sistem menemukan email tetapi password tidak cocok.
2. Sistem menampilkan error banner yang sama (E1) — tidak menyebutkan mana yang salah untuk keamanan.

### E3: Field kosong
1. Sistem menggunakan validasi HTML native (`required`).
2. Browser menampilkan tooltip "Harap isi bidang ini."

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-002-01 | Login dengan email dan password yang valid berhasil dan redirect ke `/dashboard`. | ✅ / ❌ |
| AC-002-02 | Login dengan kredensial salah menampilkan error banner "Email atau password salah." | ✅ / ❌ |
| AC-002-03 | Setelah login, dashboard yang dirender sesuai role pengguna. | ✅ / ❌ |
| AC-002-04 | Pengguna yang sudah login membuka `/login` di-redirect ke `/dashboard`. | ✅ / ❌ |
| AC-002-05 | Root `/` redirect ke `/login` (belum login) atau `/dashboard` (sudah login). | ✅ / ❌ |
