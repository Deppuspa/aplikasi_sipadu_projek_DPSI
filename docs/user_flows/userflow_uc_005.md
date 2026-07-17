# UC-005: Verifikasi Izin oleh Wali Kelas / Admin

**Aktor:** Wali Kelas, Admin (Guru BK)  
**Referensi SRS:** F-09, BR-10, BR-11  
**Halaman Terkait:** P-13/P-18 — /verifikasi-izin  
**Tujuan:** Wali kelas dan/atau admin memverifikasi pengajuan izin yang masuk dengan menyetujui atau menolak izin. Hanya wali kelas dan admin yang dapat mengubah status izin (BR-10).

---

## Preconditions

1. Wali kelas atau admin sudah login.
2. Terdapat pengajuan izin dengan status **menunggu** di sistem.
3. Wali kelas atau admin membuka halaman `/verifikasi-izin`.

## Postconditions

1. Status izin berubah menjadi **disetujui** atau **ditolak**.
2. Jika disetujui, jam pelajaran pada tanggal terkait dihitung sebagai **Hadir** dalam rekap harian (BR-11).
3. Siswa dapat melihat status terbaru melalui halaman `/izin` atau `/riwayat`.

---

## Main Flow

1. **Sistem menampilkan daftar izin** — Halaman `/verifikasi-izin` menampilkan tabel dengan kolom: Tanggal, Siswa, Jenis, Keterangan, Bukti, Status, Aksi.
2. **Sistem memfilter data sesuai peran:**
   - **Wali Kelas:** hanya melihat izin dari siswa di kelas binaannya (VR-07).
   - **Admin:** melihat seluruh izin dari semua kelas.
3. **Wali kelas/Admin memfilter status (opsional)** — Menggunakan dropdown "Semua Status" / "Menunggu" / "Disetujui" / "Ditolak".
4. **Wali kelas/Admin meninjau izin** — Memeriksa detail: jenis izin, keterangan, dan bukti pendukung.
5. **Wali kelas/Admin menekan tombol "Setujui"** (Primary button, `bg-blue-600`) **atau "Tolak"** (Danger button, `bg-red-600`) pada baris izin yang dituju.
6. **Sistem memperbarui status izin:**
   - "Setujui" → status menjadi **disetujui** (badge `bg-green-50 text-green-700`).
   - "Tolak" → status menjadi **ditolak** (badge `bg-red-50 text-red-700`).
7. **Tombol aksi menghilang** — Setelah diverifikasi, kolom Aksi menampilkan tanda strip `-` (tidak ada aksi).
8. **Tabel diperbarui secara visual** — Status badge berubah sesuai hasil verifikasi.

## Alternative Flows

### A1: Filter status
1. Wali kelas/admin mengubah filter menjadi "Menunggu" untuk melihat hanya izin yang belum diverifikasi.
2. Tabel diperbarui menampilkan hanya izin dengan status menunggu.

### A2: Tidak ada izin menunggu
1. Setelah semua izin diverifikasi, tabel kosong.
2. Sistem menampilkan empty state: "Tidak ada data izin."

## Exception Flows

### E1: Akses dari aktor yang tidak berwenang
1. Guru mapel atau siswa mencoba mengakses `/verifikasi-izin`.
2. Sistem memeriksa role dan mendeteksi ketidaksesuaian.
3. Sistem redirect ke `/dashboard` (VR-10).

### E2: Izin sudah diverifikasi sebelumnya
1. Sistem mencegah perubahan status pada izin yang sudah disetujui/ditolak.
2. Tombol "Setujui" dan "Tolak" tidak ditampilkan untuk izin tersebut.
3. Kolom Aksi menampilkan tanda strip `-`.

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-005-01 | Wali kelas melihat izin siswa kelas binaannya saja. | ✅ / ❌ |
| AC-005-02 | Admin melihat seluruh izin dari semua kelas. | ✅ / ❌ |
| AC-005-03 | "Setujui" mengubah status menjadi "disetujui" (badge hijau). | ✅ / ❌ |
| AC-005-04 | "Tolak" mengubah status menjadi "ditolak" (badge merah). | ✅ / ❌ |
| AC-005-05 | Setelah diverifikasi, tombol aksi tidak lagi ditampilkan. | ✅ / ❌ |
| AC-005-06 | Filter status berfungsi menyaring data sesuai pilihan. | ✅ / ❌ |
