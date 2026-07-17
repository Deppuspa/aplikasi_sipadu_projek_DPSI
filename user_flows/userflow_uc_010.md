# UC-010: Pantau Rekap Kelas oleh Wali Kelas

**Aktor:** Wali Kelas  
**Referensi SRS:** F-12, F-05, BR-12–BR-15  
**Halaman Terkait:** P-14 — /pantau-rekap  
**Tujuan:** Wali kelas memantau rekapitulasi kehadiran siswa di kelas binaannya secara real-time. Rekap dihitung berbasis persentase harian dengan threshold 60%, termasuk dampak izin disetujui (BR-11, BR-14).

---

## Preconditions

1. Wali kelas sudah login dan memiliki kelas binaan.
2. Terdapat data presensi dan/atau izin untuk tanggal yang dipilih.
3. Wali kelas membuka halaman `/pantau-rekap`.

## Postconditions

1. Wali kelas melihat status kehadiran harian setiap siswa di kelas binaan.
2. Detail per jam pelajaran ditampilkan untuk setiap siswa.
3. Data dapat difilter berdasarkan tanggal.

---

## Main Flow

1. **Sistem menampilkan halaman** — Halaman `/pantau-rekap` menampilkan:
   - Judul "Pantau Rekap Kelas [nama kelas]".
   - Subjudul "Real-time — [nama hari]".
   - Filter Tanggal (default H-1).
   - Info box rumus rekap (`bg-blue-50 border-blue-200`).
   - Ringkasan: Total Siswa, Hadir (`text-green-600`), Tidak Hadir (`text-red-600`).
2. **Sistem menghitung rekap untuk tanggal default:**
   - Mengambil semua siswa di kelas binaan.
   - Menentukan total jam pelajaran pada hari tersebut.
   - Untuk setiap siswa:
     a. Menghitung jam Hadir* (presensi true + izin disetujui + default-hadir).
     b. Menghitung persentase = (Jam Hadir* / Total Jam) × 100%.
     c. Status hari: **Hadir** jika ≥ 60%, **Tidak Hadir** jika < 60%.
     d. Detail per jam: singkatan mapel + status (H = Hadir, TH = Tidak Hadir, I* = Izin).
3. **Sistem menampilkan tabel rekap** — Kolom: NIS, Nama, Hadir/Total, Persentase, Progress (progress bar), Status Hari (badge), Detail Per Jam.
   - Progress bar: `bg-green-500` jika ≥ 60%, `bg-red-500` jika < 60%.
   - Status badge: "Hadir" (`bg-green-50 text-green-700`) atau "Tidak Hadir" (`bg-red-50 text-red-700`).
4. **Wali kelas mengganti tanggal (opsional)** — Mengubah input `type="date"`.
5. **Sistem menghitung ulang** — Tabel dan ringkasan diperbarui.
6. **Wali kelas meninjau detail** — Kolom "Detail Per Jam" menampilkan breakdown setiap jam pelajaran (misal: "Mat:TH | B.I: H | I*").

## Alternative Flows

### A1: Tidak ada jadwal pada tanggal tersebut
1. Jika tanggal yang dipilih tidak memiliki jadwal pelajaran (hari libur), sistem menampilkan empty state:
   > "Tidak ada jadwal pelajaran pada tanggal ini."

### A2: Wali kelas tidak memiliki kelas binaan
1. Jika wali kelas tidak memiliki `idKelas`, sistem menampilkan:
   > "Anda tidak memiliki kelas binaan."
2. Tabel rekap tidak ditampilkan.

## Exception Flows

### E1: Akses oleh aktor lain
1. Admin, guru mapel, atau siswa mencoba membuka `/pantau-rekap`.
2. Halaman hanya untuk wali kelas — sistem redirect ke `/dashboard` (VR-10).

### E2: Data presensi tidak ada untuk jam tertentu
1. Sistem menganggap default-hadir untuk jam yang belum dipresensi.
2. Tidak ada error — status tetap dihitung dengan asumsi Hadir.

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-010-01 | Wali kelas melihat data hanya untuk kelas binaannya. | ✅ / ❌ |
| AC-010-02 | Persentase dihitung dengan rumus BR-12. | ✅ / ❌ |
| AC-010-03 | Threshold 60% diterapkan dengan benar. | ✅ / ❌ |
| AC-010-04 | Izin/sakit disetujui dihitung sebagai Hadir. | ✅ / ❌ |
| AC-010-05 | Detail per jam ditampilkan untuk setiap siswa. | ✅ / ❌ |
| AC-010-06 | Filter tanggal berfungsi. | ✅ / ❌ |
| AC-010-07 | Hanya wali kelas yang dapat mengakses halaman ini. | ✅ / ❌ |
