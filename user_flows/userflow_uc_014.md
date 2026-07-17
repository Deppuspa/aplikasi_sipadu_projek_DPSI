# UC-014: Lihat Riwayat Kehadiran oleh Siswa

**Aktor:** Siswa  
**Referensi SRS:** F-18, F-10, VR-05  
**Halaman Terkait:** P-05 — /riwayat  
**Tujuan:** Siswa melihat riwayat kehadiran miliknya sendiri, mencakup riwayat presensi per jam pelajaran dan riwayat pengajuan izin.

---

## Preconditions

1. Siswa sudah login.
2. Terdapat data presensi dan/atau izin milik siswa tersebut.
3. Siswa membuka halaman `/riwayat`.

## Postconditions

1. Siswa melihat daftar riwayat presensi (tanggal, jam, mapel, guru, status).
2. Siswa melihat daftar riwayat izin (tanggal, jenis, status, keterangan).
3. Data yang ditampilkan hanya milik siswa yang login (VR-05).

---

## Main Flow

1. **Sistem menampilkan halaman** — Halaman `/riwayat` menampilkan:
   - Judul "Riwayat Kehadiran".
2. **Sistem menampilkan card "Riwayat Presensi":**
   - Tabel in-card dengan kolom: Tanggal, Jam, Mapel, Guru, Status.
   - Data diurutkan secara reverse-chronological (terbaru di atas).
   - Status badge: "Hadir" (`bg-green-50 text-green-700`) atau "Tidak Hadir" (`bg-red-50 text-red-700`).
3. **Sistem menampilkan card "Riwayat Izin":**
   - Tabel in-card dengan kolom: Tanggal, Jenis, Status, Keterangan.
   - Data diurutkan secara reverse-chronological.
   - Badge jenis izin:
     - **Sakit:** `bg-blue-50 text-blue-700`.
     - **Izin:** `bg-purple-50 text-purple-700`.
     - **Lainnya:** `bg-gray-100 text-gray-700`.
   - Badge status izin:
     - **Menunggu:** `bg-yellow-50 text-yellow-700`.
     - **Disetujui:** `bg-green-50 text-green-700`.
     - **Ditolak:** `bg-red-50 text-red-700`.

## Alternative Flows

### A1: Belum ada data presensi
1. Jika siswa belum memiliki record presensi sama sekali, card "Riwayat Presensi" menampilkan empty state:
   > "Belum ada data presensi."

### A2: Belum ada pengajuan izin
1. Jika siswa belum pernah mengajukan izin, card "Riwayat Izin" menampilkan empty state:
   > "Belum ada pengajuan izin."

### A3: Siswa melihat status izin terbaru
1. Siswa dapat melihat perubahan status izin (F-10) setelah diverifikasi oleh wali kelas/admin (UC-005).
2. Status badge berubah secara real-time tanpa perlu refresh halaman (tergantung di halaman mana siswa melihat).

## Exception Flows

### E1: Akses oleh aktor lain
1. Guru mapel, wali kelas, atau admin mencoba membuka halaman `/riwayat`.
2. Halaman hanya untuk siswa — sistem redirect ke `/dashboard`.

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-014-01 | Halaman menampilkan dua card: Riwayat Presensi dan Riwayat Izin. | ✅ / ❌ |
| AC-014-02 | Data presensi hanya milik siswa yang login (VR-05). | ✅ / ❌ |
| AC-014-03 | Data izin hanya milik siswa yang login. | ✅ / ❌ |
| AC-014-04 | Status kehadiran menggunakan badge yang sesuai. | ✅ / ❌ |
| AC-014-05 | Data diurutkan reverse-chronological. | ✅ / ❌ |
| AC-014-06 | Hanya siswa yang dapat mengakses halaman ini. | ✅ / ❌ |
