# UC-006: Rekap Harian Berbasis Persentase (Otomatis)

**Aktor:** Admin (Guru BK), Wali Kelas  
**Referensi SRS:** F-12, BR-12–BR-15  
**Halaman Terkait:** P-20 — /laporan (tab "Rekap Harian")  
**Tujuan:** Sistem secara otomatis menghitung status kehadiran harian setiap siswa berdasarkan threshold 60%. Izin/sakit yang disetujui dihitung sebagai Hadir. Admin dan wali kelas dapat melihat hasil rekap harian.

---

## Preconditions

1. Admin atau wali kelas sudah login.
2. Terdapat data presensi dan/atau izin untuk tanggal yang dipilih.
3. Admin atau wali kelas membuka halaman `/laporan` dan memilih tab "Rekap Harian (Persentase 60%)".

## Postconditions

1. Sistem menampilkan status kehadiran harian per siswa.
2. Status hari ditentukan oleh threshold 60% (BR-13).
3. Data dapat difilter berdasarkan tanggal dan kelas.

---

## Main Flow

1. **Sistem menampilkan tab Rekap Harian** — Halaman `/laporan` dengan tab aktif "Rekap Harian (Persentase 60%)". Hanya visible untuk wali_kelas dan admin.
2. **Sistem menetapkan default filter** — Filter tanggal default = kemarin (H-1).
3. **Sistem menghitung rekap untuk tanggal default:**
   - Untuk setiap kelas dan setiap siswa, sistem:
     a. Menentukan total jam pelajaran pada hari tersebut berdasarkan jadwal.
     b. Menghitung jumlah jam dengan status Hadir*:
        - Record presensi dengan `statusHadir = true`.
        - Record presensi yang tidak ada (belum dipresensi) dianggap **Hadir** (default-hadir logic).
        - Jam dengan izin disetujui (sakit/izin) dianggap **Hadir** (BR-14).
     c. Menghitung persentase = (Jam Hadir* / Total Jam) × 100% (BR-12).
     d. Menentukan status hari: **Hadir** jika ≥ 60%, **Tidak Hadir** jika < 60% (BR-13).
   - Menampilkan total siswa, total hadir, total tidak hadir.
4. **Sistem menampilkan tabel rekap** — Kolom: NIS, Nama, Kelas, Hadir/Total, Persentase, Progress (progress bar), Status Hari (badge).
   - Progress bar: `bg-green-500` jika ≥ 60%, `bg-red-500` jika < 60%.
   - Badge status: "Hadir" (`bg-green-50 text-green-700`) atau "Tidak Hadir" (`bg-red-50 text-red-700`).
5. **Admin/Wali kelas memfilter (opsional)**:
   - Mengubah **Tanggal** untuk melihat tanggal lain.
   - Memilih **Kelas** tertentu (dropdown).
6. **Sistem menghitung ulang** — Tabel diperbarui sesuai filter yang dipilih.
7. **Sistem menampilkan info box** (`bg-blue-50 border-blue-200`):
   > "Rekap Harian (BR-12, BR-13, BR-14): Persentase = (Jam Hadir* / Total Jam) × 100%. Threshold: >= 60% = Hadir. Izin/sakit disetujui dihitung sebagai Hadir (*)."

## Alternative Flows

### A1: Tidak ada jadwal pada tanggal yang dipilih
1. Jika tanggal yang dipilih adalah hari libur (tidak ada jadwal), sistem menampilkan empty state:
   > "Tidak ada data untuk tanggal tersebut."

### A2: Filter kelas
1. Admin/wali kelas memilih kelas tertentu dari dropdown.
2. Tabel hanya menampilkan siswa dari kelas yang dipilih.
3. Perhitungan total siswa/hadir/tidak hadir disesuaikan.

## Exception Flows

### E1: Data presensi tidak lengkap
1. Jika ada jam pelajaran yang belum dipresensi, sistem tetap menghitung dengan asumsi default-hadir (Hadir).
2. Tidak ada error yang ditampilkan — sistem tetap berjalan normal.

### E2: Akses guru mapel
1. Guru mapel membuka tab "Rekap Harian".
2. Tab tersebut tidak ditampilkan untuk guru mapel (hanya wali_kelas dan admin).
3. Guru mapel hanya dapat melihat tab "Rekap Bulanan".

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-006-01 | Persentase dihitung dengan rumus BR-12 (Jam Hadir* / Total Jam × 100%). | ✅ / ❌ |
| AC-006-02 | Threshold 60% diterapkan; status hari = Hadir jika ≥ 60%. | ✅ / ❌ |
| AC-006-03 | Izin/sakit disetujui dihitung sebagai Hadir (BR-14). | ✅ / ❌ |
| AC-006-04 | Filter tanggal dan kelas berfungsi. | ✅ / ❌ |
| AC-006-05 | Progress bar visual menampilkan persentase dengan warna sesuai threshold. | ✅ / ❌ |
| AC-006-06 | Guru mapel tidak dapat melihat tab Rekap Harian. | ✅ / ❌ |
