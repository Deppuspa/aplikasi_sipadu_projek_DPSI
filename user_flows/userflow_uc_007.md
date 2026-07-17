# UC-007: Rekap Bulanan Per Mata Pelajaran

**Aktor:** Admin (Guru BK), Guru Mapel, Wali Kelas  
**Referensi SRS:** F-11, F-13, BR-16–BR-18  
**Halaman Terkait:** P-09/P-15/P-20 — /laporan (tab "Rekap Bulanan Per Mapel")  
**Tujuan:** Sistem menampilkan rekapitulasi kehadiran per mata pelajaran untuk periode satu bulan. Data digunakan sebagai acuan penilaian oleh guru mapel (BR-17).

---

## Preconditions

1. Admin, guru mapel, atau wali kelas sudah login.
2. Terdapat data presensi untuk periode yang dipilih.
3. Aktor membuka halaman `/laporan` dan memilih tab "Rekap Bulanan Per Mapel".

## Postconditions

1. Sistem menampilkan jumlah Hadir dan Tidak Hadir setiap siswa per mata pelajaran.
2. Data dapat difilter berdasarkan kelas, mata pelajaran, dan bulan.
3. Data dapat diunduh dalam format CSV (khusus admin, lihat UC-011).

---

## Main Flow

1. **Sistem menampilkan tab Rekap Bulanan** — Halaman `/laporan` dengan tab aktif "Rekap Bulanan Per Mapel". Tab ini visible untuk semua role yang diizinkan.
2. **Sistem menetapkan filter default** — Filter: Semua Kelas, Semua Mapel, Bulan (kosong/belum dipilih).
3. **Sistem menghitung rekap berdasarkan data presensi:**
   - Mengumpulkan seluruh record presensi.
   - Mengelompokkan per siswa (NIS).
   - Menghitung jumlah **Hadir** dan **Tidak Hadir** untuk setiap siswa.
   - Menghitung persentase kehadiran = (Hadir / Total) × 100%.
4. **Sistem menampilkan tabel rekap** — Kolom: NIS, Nama, Kelas, Hadir, Tidak Hadir, Total, Persentase.
   - Progress bar: `bg-green-500` jika ≥ 60%, `bg-red-500` jika < 60%.
   - Angka Hadir: `font-semibold text-green-600`.
   - Angka Tidak Hadir: `font-semibold text-red-600`.
5. **Aktor memfilter data (opsional):**
   - Memilih **Kelas** dari dropdown.
   - Memilih **Mata Pelajaran** dari dropdown.
   - Memilih **Bulan** menggunakan input `type="month"`.
6. **Sistem menghitung ulang** — Tabel diperbarui sesuai filter.
7. **Aktor menekan tombol "Unduh CSV"** (Primary button, `bg-blue-600`) (khusus admin melalui UC-011, atau semua role yang memiliki akses).
8. **Sistem mengunduh file CSV** — File berisi data rekap yang sedang ditampilkan.

## Alternative Flows

### A1: Guru mapel mengakses rekap
1. Guru mapel hanya melihat data untuk mata pelajaran yang diampunya (VR-06).
2. Filter kelas dan mapel otomatis dibatasi sesuai jadwal guru tersebut.
3. Data siswa yang ditampilkan hanya dari kelas yang diampu.

### A2: Filter tanpa bulan
1. Jika bulan tidak dipilih, sistem menampilkan seluruh data presensi yang ada (tanpa filter bulan).
2. Data tetap dihitung dan ditampilkan secara keseluruhan.

### A3: Tidak ada data untuk filter
1. Sistem menampilkan empty state: "Tidak ada data untuk filter yang dipilih."

## Exception Flows

### E1: Tidak ada data presensi
1. Jika belum ada data presensi sama sekali, semua baris menampilkan 0 Hadir, 0 Tidak Hadir, 0 Total.
2. Progress bar tidak terisi (0%).
3. Sistem menampilkan empty state.

### E2: Guru mapel melihat data di luar kewenangan
1. Sistem membatasi filter kelas dan mapel hanya pada yang diampu guru tersebut.
2. Guru mapel tidak dapat memilih kelas/mapel di luar jadwalnya.

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-007-01 | Tabel menampilkan NIS, Nama, Kelas, Hadir, Tidak Hadir, Total, Persentase. | ✅ / ❌ |
| AC-007-02 | Filter kelas, mata pelajaran, dan bulan berfungsi. | ✅ / ❌ |
| AC-007-03 | Guru mapel hanya melihat data mapel yang diampunya (VR-06). | ✅ / ❌ |
| AC-007-04 | Persentase dihitung dengan benar: (Hadir / Total) × 100%. | ✅ / ❌ |
| AC-007-05 | Progress bar visual menampilkan persentase. | ✅ / ❌ |
