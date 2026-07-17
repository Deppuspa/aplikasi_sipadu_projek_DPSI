# UC-009: Lihat Data Kehadiran Real-time

**Aktor:** Guru Mapel, Wali Kelas  
**Referensi SRS:** F-05, VR-06, VR-07  
**Halaman Terkait:** P-08/P-12 — /kehadiran  
**Tujuan:** Guru mapel dan wali kelas melihat data kehadiran siswa secara real-time. Data yang ditampilkan sesuai dengan kewenangan masing-masing aktor (VR-06, VR-07).

---

## Preconditions

1. Guru mapel atau wali kelas sudah login.
2. Terdapat data presensi yang sudah tersimpan.
3. Aktor membuka halaman `/kehadiran`.

## Postconditions

1. Aktor melihat data kehadiran yang sesuai dengan kewenangannya.
2. Data dapat difilter berdasarkan kelas dan tanggal.

---

## Main Flow

1. **Sistem menampilkan halaman** — Halaman `/kehadiran` menampilkan:
   - Judul "Data Kehadiran".
   - Filter Kelas dan Filter Tanggal.
   - Counter record: "[jumlah] record ditemukan".
2. **Sistem menyesuaikan data sesuai peran:**
   - **Guru Mapel:** hanya menampilkan data presensi untuk jadwal yang diampunya (VR-06).
   - **Wali Kelas:** menampilkan data presensi seluruh siswa di kelas binaannya (VR-07).
3. **Sistem menampilkan tabel kehadiran** — Kolom: Tanggal, NIS, Nama, Kelas, Mapel, Jam, Status (badge), Keterangan.
   - Status badge: "Hadir" (`bg-green-50 text-green-700`) atau "Tidak Hadir" (`bg-red-50 text-red-700`).
4. **Guru/Wali kelas memfilter data (opsional):**
   - Memilih **Kelas** dari dropdown.
   - Memilih **Tanggal** menggunakan input `type="date"`.
5. **Sistem memperbarui tabel** — Data difilter sesuai pilihan.
6. **Counter record diperbarui** — Menampilkan jumlah record yang sesuai filter.

## Alternative Flows

### A1: Tidak ada data untuk filter
1. Sistem menampilkan empty state: "Tidak ada data kehadiran."

### A2: Filter kelas tidak tersedia
1. Untuk guru mapel, dropdown kelas hanya menampilkan kelas yang diampu.
2. Untuk wali kelas, dropdown kelas hanya menampilkan kelas binaannya.

## Exception Flows

### E1: Belum ada presensi
1. Jika belum ada data presensi sama sekali, tabel kosong.
2. Sistem menampilkan empty state.
3. Counter menampilkan 0 record.

### E2: Akses oleh aktor lain
1. Siswa atau admin membuka `/kehadiran`.
2. Admin diizinkan (lihat matriks akses IA 7.2).
3. Siswa tidak diizinkan — sistem redirect ke `/dashboard`.

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-009-01 | Guru mapel hanya melihat data untuk kelas dan jadwal yang diampu. | ✅ / ❌ |
| AC-009-02 | Wali kelas melihat data seluruh siswa di kelas binaan. | ✅ / ❌ |
| AC-009-03 | Filter kelas dan tanggal berfungsi. | ✅ / ❌ |
| AC-009-04 | Status kehadiran ditampilkan dengan badge yang sesuai (Hadir/Tidak Hadir). | ✅ / ❌ |
