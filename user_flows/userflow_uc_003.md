# UC-003: Presensi Per Jam Pelajaran (Default-Hadir + Uncheck)

**Aktor:** Guru Mapel (Wali Kelas yang merangkap guru mapel)  
**Referensi SRS:** F-01, F-02, F-03, BR-01–BR-04, VR-06, VR-08  
**Halaman Terkait:** P-07/P-11 — /presensi  
**Tujuan:** Guru mapel melakukan presensi untuk satu jam pelajaran tertentu. Sistem menampilkan semua siswa dengan status default Hadir (tercentang). Guru melepas centang (uncheck) pada siswa yang benar-benar tidak hadir, lalu menyimpan hasil presensi.

---

## Preconditions

1. Guru mapel sudah login dan memiliki akses ke halaman `/presensi`.
2. Terdapat jadwal pelajaran yang diampu oleh guru pada hari yang dipilih.
3. Guru membuka halaman `/presensi`.

## Postconditions

1. Data presensi tersimpan: per siswa, per jam pelajaran, per tanggal.
2. Siswa yang tetap tercentang tercatat sebagai **Hadir**.
3. Siswa yang di-uncheck tercatat sebagai **Tidak Hadir**.
4. Record presensi dapat dilihat di halaman Data Kehadiran (UC-009).

---

## Main Flow

1. **Sistem menampilkan daftar jadwal** — Halaman `/presensi` menampilkan tabel jadwal yang diampu guru, difilter berdasarkan hari (default: hari ini). Kolom: Jam, Kelas, Mapel, Guru, Aksi.
2. **Guru memfilter hari (opsional)** — Guru dapat mengganti filter hari melalui dropdown `select`.
3. **Guru memilih jadwal** — Guru mengklik tombol "Mulai Presensi" (Primary button, `bg-blue-600`) pada baris jadwal yang ingin dipresensi.
4. **Sistem menampilkan daftar siswa dengan default Hadir** — Sistem menampilkan seluruh siswa di kelas tersebut dalam grid card. Setiap siswa ditampilkan dengan:
   - Status **Hadir** (default): card `bg-green-50 border-green-300`, ikon `Check` hijau.
   - Nama dan NIS siswa.
5. **Guru memeriksa kondisi kelas** — Guru mengamati kelas secara langsung dan mengidentifikasi siswa yang tidak hadir.
6. **Guru melepas centang siswa tidak hadir** — Guru mengklik card siswa yang tidak hadir. Card berubah menjadi:
   - Status **Tidak Hadir**: card `bg-red-50 border-red-300`, ikon `X` merah.
   - Guru dapat mengklik lagi untuk mengembalikan ke Hadir (toggle).
7. **Sistem memperbarui counter real-time** — Tiga angka counter berubah secara otomatis:
   - **Hadir (Default)**: jumlah siswa tercentang.
   - **Tidak Hadir (Uncheck)**: jumlah siswa tidak tercentang.
   - **Total Siswa**: jumlah seluruh siswa.
8. **Guru menekan tombol "Simpan Presensi"** (Primary button, `bg-blue-600`).
9. **Sistem menyimpan data presensi** — Data per siswa, per idJadwal, per tanggal tersimpan di sistem.
10. **Sistem menampilkan success banner** (`bg-green-50 border-green-200 text-green-700`):
    > "Presensi tersimpan! [jumlah] siswa diproses."

## Alternative Flows

### A1: Guru membatalkan sebelum menyimpan
1. Guru mengklik tombol "Kembali" (Secondary button, `border border-gray-300`).
2. Sistem kembali ke daftar jadwal tanpa menyimpan perubahan.
3. Status presensi untuk jadwal tersebut tetap kosong (belum ada data).

### A2: Guru me-reset ke default
1. Guru mengklik tombol "Reset ke Default (Semua Hadir)" (Secondary button).
2. Semua card siswa kembali ke status Hadir (tercentang).
3. Counter diperbarui.

### A3: Jadwal sudah dipresensi sebelumnya
1. Jika guru sudah pernah menyimpan presensi untuk jadwal yang sama pada tanggal yang sama, tombol "Mulai Presensi" berubah menjadi "Sudah Dipresensi" (Disabled button, `bg-gray-100 text-gray-400`).
2. Guru tetap dapat mengklik untuk membuka dan mengubah data yang sudah ada.

### A4: Tidak ada jadwal untuk hari yang dipilih
1. Sistem menampilkan empty state: "Tidak ada jadwal presensi untuk hari ini."

### A5: Wali kelas melakukan presensi
1. Wali kelas yang juga mengajar (merangkap guru mapel) dapat mengakses halaman `/presensi`.
2. Alur sama seperti guru mapel, hanya menampilkan jadwal di kelas yang diampu.

## Exception Flows

### E1: Guru mencoba mengakses kelas di luar jadwal
1. Sistem hanya menampilkan jadwal yang terdaftar untuk guru tersebut (VR-06).
2. Guru tidak dapat melihat atau memilih jadwal di luar tanggung jawabnya.

### E2: Semua siswa default hadir (BR-08)
1. Sistem menjamin bahwa saat sesi presensi dimulai, semua siswa dalam keadaan tercentang (Hadir).
2. Guru tidak dapat memulai sesi dengan keadaan semua siswa tidak tercentang.

### E3: Gagal menyimpan
1. Sistem gagal menyimpan data (misal: limit storage).
2. Sistem menampilkan error banner.
3. Data presensi yang sudah diinput tetap ada di memori hingga guru berhasil menyimpan.

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-003-01 | Semua siswa di kelas muncul dengan status Hadir (tercentang) saat sesi presensi dimulai. | ✅ / ❌ |
| AC-003-02 | Guru dapat melepas centang siswa tidak hadir; card berubah warna dari hijau ke merah. | ✅ / ❌ |
| AC-003-03 | Counter Hadir / Tidak Hadir / Total diperbarui secara real-time. | ✅ / ❌ |
| AC-003-04 | Data presensi tersimpan setelah guru mengklik "Simpan Presensi". | ✅ / ❌ |
| AC-003-05 | Jadwal yang sudah dipresensi menampilkan tombol "Sudah Dipresensi" (disabled). | ✅ / ❌ |
| AC-003-06 | Guru hanya melihat jadwal yang diampunya (VR-06). | ✅ / ❌ |
