# Test Execution Sheet

Document Version: v0.1
Project: Sipadu — Sistem Presensi Digital Siswa SMP N 4 Banguntapan
Product: Web-Based Attendance System
Status: Draft
Last Updated: 2026-07-17
Author: System Analyst AI

---

# 1. INSTRUCTIONS

1. **Cetak atau buka dokumen ini** dalam format yang dapat diedit (PDF viewer dengan fitur form fill, atau buka file markdown ini di editor teks).
2. **Eksekusi test case secara berurutan** sesuai urutan yang tertera di setiap seksi fitur. Jangan melompati test case.
3. **Isi kolom "Actual Result"** dengan hasil aktual yang diamati saat test case dieksekusi. Tuliskan secara spesifik apa yang terjadi di layar.
4. **Isi kolom "Status"** dengan salah satu dari:
   - **PASS** — Hasil aktual sesuai dengan Expected Result
   - **FAIL** — Hasil aktual TIDAK sesuai dengan Expected Result (sertakan defect ID di kolom Notes)
   - **N/A** — Test case tidak dapat dieksekusi (jelaskan alasan di kolom Notes)
5. **Isi kolom "Notes"** dengan informasi tambahan: defect ID, link bug tracker, screenshot reference, atau catatan observations.
6. Dokumen ini menjadi bukti eksekusi pengujian. Simpan versi terisi sebagai bagian dari test documentation.

---

# 2. FEATURE F-01–F-05: MANAJEMEN PRESENSI PER JAM PELAJARAN

## 2.1 UC-003: Presensi Per Jam Pelajaran (Default-Hadir + Uncheck)

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F01-001 | Default hadir initialization — semua siswa otomatis Hadir saat sesi dimulai | 1. Login sebagai Guru Mapel<br>2. Akses halaman /presensi<br>3. Klik "Mulai Presensi" pada jadwal Senin kelas VII A<br>4. Periksa kartu siswa yang ditampilkan | 1. Semua kartu siswa berwarna hijau (Hadir)<br>2. Status default: statusHadir=true untuk semua siswa (BR-01)<br>3. Counter menampilkan: Hadir: N, Tidak Hadir: 0, Total: N<br>4. Data tersimpan di localStorage dengan benar | | | |
| TC-F01-002 | Uncheck siswa tidak hadir — toggle kartu dari hijau ke merah | 1. Setelah inisialisasi (TC-F01-001)<br>2. Klik kartu siswa "Ahmad Rizki" (NIS: 2024001)<br>3. Periksa perubahan warna kartu dan counter | 1. Kartu berubah dari hijau ke merah<br>2. statusHadir berubah: true → false<br>3. Counter Hadir berkurang 1, Tidak Hadir bertambah 1<br>4. Perubahan terefleksi secara real-time | | | |
| TC-F01-003 | Re-check siswa — toggle kartu dari merah kembali ke hijau | 1. Setelah uncheck (TC-F01-002)<br>2. Klik kartu siswa "Ahmad Rizki" yang sudah merah<br>3. Periksa perubahan warna kartu dan counter | 1. Kartu berubah dari merah kembali ke hijau<br>2. statusHadir berubah: false → true<br>3. Counter Hadir bertambah 1, Tidak Hadir berkurang 1 | | | |
| TC-F01-004 | Uncheck beberapa siswa sekaligus | 1. Setelah inisialisasi<br>2. Klik kartu 3 siswa berbeda secara berurutan<br>3. Periksa counter dan kartu | 1. Ketiga kartu berubah ke merah<br>2. Counter Hadir: N-3, Tidak Hadir: 3<br>3. Siswa lain tetap hijau | | | |
| TC-F01-005 | Reset ke default — semua siswa kembali Hadir | 1. Setelah beberapa siswa di-uncheck<br>2. Klik tombol "Reset ke Default (Semua Hadir)"<br>3. Periksa semua kartu dan counter | 1. Semua kartu kembali hijau<br>2. Semua statusHadir = true<br>3. Counter: Hadir: N, Tidak Hadir: 0<br>4. Sesi belum tersimpan (belum klik Simpan) | | | |
| TC-F01-006 | Simpan presensi — data berhasil disimpan ke localStorage | 1. Setelah melakukan uncheck pada beberapa siswa<br>2. Klik tombol "Simpan Presensi"<br>3. Periksa localStorage | 1. Pesan sukses: "Presensi tersimpan! N siswa diproses."<br>2. Data presensi tersimpan di localStorage<br>3. Statushadir sesuai dengan yang dipilih guru | | | |
| TC-F01-007 | Presensi per jam pelajaran — satu siswa bisa berbeda status di jam berbeda | 1. Login sebagai Guru Mapel<br>2. Presensi jam pertama: uncheck Ahmad Rizki<br>3. Simpan<br>4. Mulai presensi jam kedua untuk kelas yang sama<br>5. Periksa status Ahmad Rizki | 1. Ahmad Rizki default hadir di jam kedua<br>2. Status di jam pertama dan jam kedua berbeda (BR-03)<br>3. Data presensi terpisah per jam pelajaran | | | |
| TC-F01-008 | Guru Mapel hanya bisa akses jadwal yang diampu (VR-06) | 1. Login sebagai Guru Mapel (mengampu Matematika)<br>2. Akses halaman /presensi<br>3. Coba akses jadwal yang bukan milik guru ini | 1. Hanya jadwal milik guru yang ditampilkan<br>2. Jika mencoba akses jadwal lain: error "Anda tidak memiliki akses ke jadwal ini"<br>3. Tidak bisa melakukan presensi pada jadwal orang lain | | | |
| TC-F01-009 | Tombol "Sudah Dipresensi" — disabled untuk jadwal yang sudah dipresensi | 1. Login sebagai Guru Mapel<br>2. Presensi jadwal tertentu (selesai)<br>3. Refresh halaman /presensi<br>4. Cari jadwal yang sudah dipresensi | 1. Tombol aksi berubah menjadi "Sudah Dipresensi" (disabled)<br>2. Guru tetap bisa klik untuk melihat data yang sudah ada | | | |
| TC-F01-010 | Default hadir tidak bisa kosong (VR-08) — semua siswa harus diinisialisasi | 1. Login sebagai Guru Mapel<br>2. Coba langsung klik "Simpan Presensi" tanpa inisialisasi | 1. Sistem tidak mengizinkan penyimpanan tanpa inisialisasi<br>2. Semua siswa harus terinisialisasi sebagai hadir terlebih dahulu | | | |
| TC-F01-011 | Simpan presensi dengan data tidak lengkap | 1. Setelah inisialisasi<br>2. Coba simpan dengan data presensi yang tidak lengkap (beberapa NIS hilang) | 1. Error: "Data presensi tidak lengkap"<br>2. Data tidak tersimpan<br>3. Form tetap terbuka | | | |
| TC-F01-012 | Akses presensi tanpa login — redirect ke /login | 1. Buka browser baru (tidak login)<br>2. Akses langsung URL /presensi | 1. Sistem redirect ke halaman /login<br>2. Tidak bisa mengakses halaman presensi | | | |

## 2.2 UC-009: Lihat Data Kehadiran Real-time

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F01-013 | Guru Mapel melihat data kehadiran real-time untuk kelas sendiri | 1. Login sebagai Guru Mapel<br>2. Akses halaman /kehadiran<br>3. Periksa data yang ditampilkan | 1. Hanya data presensi untuk kelas dan jadwal yang diampu guru ditampilkan<br>2. Tabel menampilkan: Tanggal, NIS, Nama, Kelas, Mapel, Jam, Status, Keterangan<br>3. Data real-time sesuai dengan presensi terakhir | | | |
| TC-F01-014 | Wali Kelas melihat data kehadiran untuk kelas binaan (VR-07) | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /kehadiran<br>3. Periksa data yang ditampilkan | 1. Semua data presensi untuk siswa di kelas VII A ditampilkan<br>2. Data mencakup semua jam pelajaran<br>3. Filter default: semua data untuk kelas binaan | | | |
| TC-F01-015 | Admin melihat semua data kehadiran tanpa filter | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /kehadiran<br>3. Periksa data yang ditampilkan | 1. Semua data presensi untuk semua kelas dan jadwal ditampilkan<br>2. Tidak ada filter role-based<br>3. Admin bisa melihat data dari kelas manapun | | | |
| TC-F01-016 | Filter data kehadiran berdasarkan kelas dan tanggal | 1. Login sebagai Admin<br>2. Akses halaman /kehadiran<br>3. Filter: kelas = VII A, tanggal = 2026-07-16<br>4. Periksa data yang ditampilkan | 1. Hanya data untuk kelas VII A pada tanggal 2026-07-16 ditampilkan<br>2. Record count sesuai dengan filter<br>3. Filter berfungsi dengan benar | | | |
| TC-F01-017 | Guru Mapel tidak bisa melihat data kelas lain (VR-06) | 1. Login sebagai Guru Mapel (mengampu Matematika VII A)<br>2. Akses halaman /kehadiran<br>3. Coba filter kelas VII B | 1. Data kelas VII B tidak ditampilkan<br>2. Hanya data untuk kelas yang diampu guru ditampilkan<br>3. Filter kelas lain tidak mengembalikan data | | | |

## 2.3 UC-012: Verifikasi Data Presensi Bermasalah oleh Admin

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F01-018 | Admin toggle status presensi dari Hadir ke Tidak Hadir | 1. Login sebagai Admin<br>2. Akses halaman /kehadiran<br>3. Cari siswa dengan status Hadir<br>4. Klik badge status atau tombol aksi untuk toggle | 1. Status berubah dari Hadir (statusHadir=true) ke Tidak Hadir (statusHadir=false)<br>2. statusManual berubah: 'hadir' → 'tidak_hadir'<br>3. Badge berubah warna di tabel | | | |
| TC-F01-019 | Admin toggle status presensi dari Tidak Hadir ke Hadir | 1. Login sebagai Admin<br>2. Akses halaman /kehadiran<br>3. Cari siswa dengan status Tidak Hadir<br>4. Klik badge status untuk toggle | 1. Status berubah dari Tidak Hadir (statusHadir=false) ke Hadir (statusHadir=true)<br>2. statusManual berubah: 'tidak_hadir' → 'hadir'<br>3. Badge berubah warna di tabel | | | |
| TC-F01-020 | Guru Mapel tidak bisa mengubah data presensi — VR-10 | 1. Login sebagai Guru Mapel<br>2. Akses halaman /kehadiran<br>3. Coba klik badge status untuk toggle | 1. Tombol toggle tidak tersedia untuk Guru Mapel<br>2. Hanya Admin yang bisa melakukan perubahan<br>3. Jika mencoba akses PUT /api/v1/kehadiran/{id}: error 403 Forbidden | | | |
| TC-F01-021 | Wali Kelas tidak bisa mengubah data presensi — VR-10 | 1. Login sebagai Wali Kelas<br>2. Akses halaman /kehadiran<br>3. Coba klik badge status untuk toggle | 1. Tombol toggle tidak tersedia untuk Wali Kelas<br>2. Hanya Admin yang bisa melakukan perubahan | | | |
| TC-F01-022 | Admin memverifikasi data presensi bermasalah (BR-05) | 1. Login sebagai Admin<br>2. Akses halaman /kehadiran<br>3. Filter untuk menemukan record yang bermasalah<br>4. Toggle status sesuai koreksi | 1. Admin bisa memperbaiki data presensi yang salah<br>2. Perubahan tersimpan dengan benar<br>3. Data diperbarui di localStorage | | | |

---

# 3. FEATURE F-06–F-10: PENGAJUAN IZIN KETIDAKHADIRAN

## 3.1 UC-004: Pengajuan Izin Ketidakhadiran

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F06-001 | Siswa mengajukan izin dengan data valid | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = hari ini, jenisIzin = "sakit", keterangan = "Sakit demam"<br>4. Klik "Ajukan Izin" | 1. Izin berhasil diajukan<br>2. Status default: "menunggu" (BR-09)<br>3. Data tersimpan di localStorage<br>4. Riwayat izin ter-update<br>5. Pesan sukses: "Izin berhasil diajukan! Status: Menunggu verifikasi." | | | |
| TC-F06-002 | Siswa mengajuan izin dengan jenis "izin" | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = hari ini, jenisIzin = "izin", keterangan = "Izin keluarga"<br>4. Klik "Ajukan Izin" | 1. Izin berhasil diajukan<br>2. Status: "menunggu"<br>3. Jenis izin: "izin" tersimpan dengan benar | | | |
| TC-F06-003 | Siswa mengajuan izin dengan jenis "lainnya" | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = hari ini, jenisIzin = "lainnya", keterangan = "Keperluan sekolah"<br>4. Klik "Ajukan Izin" | 1. Izin berhasil diajukan<br>2. Status: "menunggu"<br>3. Jenis izin: "lainnya" tersimpan dengan benar | | | |
| TC-F06-004 | Siswa mengajuan izin dengan upload bukti pendukung (BR-08) | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal, jenisIzin, keterangan<br>4. Upload file bukti pendukung (surat dokter)<br>5. Klik "Ajukan Izin" | 1. Izin berhasil diajukan<br>2. File bukti pendukung tersimpan<br>3. Nama file ditampilkan di riwayat izin | | | |
| TC-F06-005 | Siswa mengajuan izin untuk tanggal masa depan — ditolak (VR-03) | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = 2026-12-31 (masa depan)<br>4. Klik "Ajukan Izin" | 1. Error: "Tanggal izin tidak boleh di masa depan."<br>2. Izin tidak tersimpan<br>3. Form tetap terbuka dengan data yang diisi | | | |
| TC-F06-006 | Siswa mengajuan izin duplikat untuk tanggal yang sama — ditolak (VR-04) | 1. Login sebagai Siswa<br>2. Sudah mengajuan izin untuk tanggal 2026-07-16<br>3. Coba ajukan izin lagi untuk tanggal 2026-07-16 | 1. Error: "Anda sudah memiliki pengajuan izin untuk tanggal ini."<br>2. Izin kedua tidak tersimpan<br>3. Hanya satu izin per tanggal per siswa | | | |
| TC-F06-007 | Siswa mengajuan izin tanpa mengisi field wajib | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Biarkan field keterangan kosong<br>4. Klik "Ajukan Izin" | 1. Validasi error pada field yang kosong<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan | | | |
| TC-F06-008 | Siswa melihat riwayat izin sendiri | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Periksa tabel riwayat izin | 1. Hanya izin milik siswa sendiri yang ditampilkan<br>2. Data mencakup: tanggal, jenis, keterangan, bukti, status<br>3. Tidak ada izin milik siswa lain | | | |

## 3.2 UC-005: Verifikasi Izin oleh Wali Kelas / Admin

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F06-009 | Wali Kelas menyetujui izin siswa di kelas binaan | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /verifikasi-izin<br>3. Filter: statusIzin = "menunggu"<br>4. Klik "Setujui" pada izin siswa VII A | 1. Status izin berubah: "menunggu" → "disetujui"<br>2. Badge berubah warna (hijau)<br>3. Tombol aksi menghilang<br>4. Izin tersimpan di localStorage | | | |
| TC-F06-010 | Wali Kelas menolak izin siswa di kelas binaan | 1. Login sebagai Wali Kelas<br>2. Akses halaman /verifikasi-izin<br>3. Klik "Tolak" pada izin siswa | 1. Status izin berubah: "menunggu" → "ditolak"<br>2. Badge berubah warna (merah)<br>3. Tombol aksi menghilang | | | |
| TC-F06-011 | Admin menyetujui izin siswa | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /verifikasi-izin<br>3. Klik "Setujui" pada izin siswa | 1. Status izin berubah: "menunggu" → "disetujui"<br>2. Admin bisa melihat semua izin dari semua kelas | | | |
| TC-F06-012 | Admin menolak izin siswa | 1. Login sebagai Admin<br>2. Akses halaman /verifikasi-izin<br>3. Klik "Tolak" pada izin siswa | 1. Status izin berubah: "menunggu" → "ditolak" | | | |
| TC-F06-013 | Wali Kelas tidak bisa melihat izin kelas lain (VR-07) | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /verifikasi-izin<br>3. Periksa data yang ditampilkan | 1. Hanya izin dari siswa di kelas VII A ditampilkan<br>2. Izin dari kelas lain tidak terlihat<br>3. Scope filter otomatis diterapkan | | | |
| TC-F06-014 | Guru Mapel tidak bisa mengakses verifikasi izin — VR-10 | 1. Login sebagai Guru Mapel<br>2. Coba akses halaman /verifikasi-izin | 1. Akses ditolak (403 Forbidden)<br>2. Redirect ke /dashboard<br>3. Guru Mapel tidak memiliki akses verifikasi izin | | | |
| TC-F06-015 | Izin yang sudah diverifikasi tidak bisa diubah lagi | 1. Login sebagai Wali Kelas<br>2. Setujui izin tertentu<br>3. Coba setujui atau tolak izin yang sama lagi | 1. Error: "Izin sudah diverifikasi sebelumnya"<br>2. Status tidak berubah<br>3. Izin tetap "disetujui" | | | |
| TC-F06-016 | Izin disetujui mempengaruhi rekap harian sebagai Hadir (BR-11) | 1. Siswa mengajuan izin untuk tanggal 2026-07-16<br>2. Wali Kelas menyetujui izin<br>3. Lihat rekap harian untuk tanggal 2026-07-16<br>4. Periksa status siswa tersebut | 1. Siswa dengan izin disetujui dihitung sebagai Hadir di rekap harian<br>2. Persentase kehadiran memperhitungkan izin disetujui<br>3. Formula: Jam Hadir* termasuk izin disetujui (BR-14) | | | |
| TC-F06-017 | Satu izin berlaku untuk seluruh jam pelajaran pada tanggal tersebut (BR-06) | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = 2026-07-16, jenisIzin = "sakit", keterangan = "Sakit demam"<br>4. Klik "Ajukan Izin"<br>5. Lihat rekap harian untuk tanggal 2026-07-16 | 1. Izin berhasil diajukan untuk tanggal 2026-07-16<br>2. Izin berlaku untuk seluruh jam pelajaran pada tanggal tersebut (BR-06)<br>3. Tidak ada pengajuan izin per jam pelajaran<br>4. Status kehadiran untuk semua jam pada tanggal tersebut menjadi "Izin" (jika disetujui) | | | |

---

# 4. FEATURE F-11–F-14: REKAPITULASI DAN LAPORAN

## 4.1 UC-006: Rekap Harian Berbasis Persentase (Otomatis)

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F12-001 | Wali Kelas melihat rekap harian untuk kelas binaan | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /laporan (tab "Rekap Harian")<br>3. Filter: tanggal = 2026-07-15<br>4. Periksa data yang ditampilkan | 1. Rekap harian untuk kelas VII A ditampilkan<br>2. Summary: Total Siswa, Hadir, Tidak Hadir<br>3. Tabel: NIS, Nama, Hadir/Total, Persentase, Status Hari<br>4. Progress bar untuk setiap siswa | | | |
| TC-F12-002 | Admin melihat rekap harian untuk semua kelas | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /laporan (tab "Rekap Harian")<br>3. Filter: tanggal = 2026-07-15<br>4. Periksa data yang ditampilkan | 1. Rekap harian untuk semua kelas ditampilkan<br>2. Admin bisa filter per kelas<br>3. Data mencakup semua siswa di semua kelas | | | |
| TC-F12-003 | Perhitungan persentase tepat 60% — status HADIR (BR-13) | 1. Siapkan data: siswa hadir 3.6 dari 6 jam (60.00%)<br>2. Lihat rekap harian<br>3. Periksa status siswa | 1. Persentase = 60.00%<br>2. Status Hari = "Hadir" (>= 60%, BR-13)<br>3. Progress bar menampilkan 60% | | | |
| TC-F12-004 | Perhitungan persentase di bawah 60% — status TIDAK HADIR (BR-13) | 1. Siapkan data: siswa hadir 3 dari 6 jam (50.00%)<br>2. Lihat rekap harian<br>3. Periksa status siswa | 1. Persentase = 50.00%<br>2. Status Hari = "Tidak Hadir" (< 60%, BR-13)<br>3. Progress bar menampilkan 50% | | | |
| TC-F12-005 | Perhitungan persentase di atas 60% — status HADIR | 1. Siapkan data: siswa hadir 5 dari 6 jam (83.33%)<br>2. Lihat rekap harian<br>3. Periksa status siswa | 1. Persentase = 83.33%<br>2. Status Hari = "Hadir" (>= 60%)<br>3. Progress bar menampilkan 83.33% | | | |
| TC-F12-006 | Izin disetujui mendorong persentase di atas 60% (BR-14) | 1. Siswa hadir 3 dari 6 jam (50%)<br>2. Siswa punya izin disetujui untuk 1 jam<br>3. Hitung: (3+1)/6 = 66.67%<br>4. Lihat rekap harian | 1. Persentase = 66.67%<br>2. Status Hari = "Hadir" (>= 60%)<br>3. Izin disetujui dihitung sebagai Hadir di numerator (BR-14) | | | |
| TC-F12-007 | Tidak ada data presensi untuk tanggal tertentu | 1. Login sebagai Wali Kelas<br>2. Akses halaman /laporan<br>3. Filter tanggal yang belum ada data presensi | 1. Summary: Total Siswa = 0, Hadir = 0, Tidak Hadir = 0<br>2. Tabel menampilkan "Tidak ada data" | | | |
| TC-F12-008 | Guru Mapel tidak bisa mengakses rekap harian | 1. Login sebagai Guru Mapel<br>2. Coba akses halaman /laporan (tab "Rekap Harian") | 1. Akses ditolak (403 Forbidden)<br>2. Guru Mapel tidak memiliki akses ke rekap harian<br>3. Redirect ke dashboard | | | |
| TC-F12-009 | Perhitungan otomatis tanpa penyimpanan manual (BR-15) | 1. Login sebagai Wali Kelas<br>2. Lihat rekap harian<br>3. Periksa bahwa perhitungan dilakukan saat query, bukan saat penyimpanan | 1. Rekap dihitung secara otomatis saat halaman dimuat<br>2. Tidak ada tombol "Hitung Ulang"<br>3. Data presensi berubah → rekap berubah otomatis | | | |

## 4.2 UC-007: Rekap Bulanan Per Mata Pelajaran

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F11-001 | Guru Mapel melihat rekap bulanan untuk mata pelajaran sendiri | 1. Login sebagai Guru Mapel (mengampu Matematika)<br>2. Akses halaman /laporan (tab "Rekap Bulanan Per Mapel")<br>3. Filter: kelas = VII A, mataPelajaran = Matematika, bulan = 2026-07<br>4. Periksa data | 1. Rekap bulanan untuk Matematika VII A ditampilkan<br>2. Tabel: NIS, Nama, Kelas, Hadir, Tidak Hadir, Total, Persentase<br>3. Progress bar untuk setiap siswa<br>4. Hanya data untuk mata pelajaran yang diampu (VR-06) | | | |
| TC-F11-002 | Admin melihat rekap bulanan untuk semua mata pelajaran | 1. Login sebagai Admin<br>2. Akses halaman /laporan (tab "Rekap Bulanan Per Mapel")<br>3. Filter: kelas = VII A, bulan = 2026-07<br>4. Periksa data | 1. Rekap bulanan untuk semua mata pelajaran ditampilkan<br>2. Admin bisa filter per mata pelajaran<br>3. Data mencakup semua siswa | | | |
| TC-F11-003 | Wali Kelas melihat rekap bulanan untuk kelas binaan | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /laporan (tab "Rekap Bulanan Per Mapel")<br>3. Filter: kelas = VII A, bulan = 2026-07<br>4. Periksa data | 1. Rekap bulanan untuk kelas VII A ditampilkan<br>2. Data mencakup semua mata pelajaran<br>3. Scope terbatas pada kelas binaan | | | |
| TC-F11-004 | Rekap bulanan bersifat read-only — data tidak bisa diubah (BR-17) | 1. Login sebagai Guru Mapel atau Admin<br>2. Akses rekap bulanan<br>3. Coba klik atau edit data di tabel | 1. Tidak ada tombol edit atau hapus<br>2. Data hanya bisa dilihat (read-only)<br>3. Rekap bulanan adalah acuan penilaian, bukan sistem nilai | | | |
| TC-F11-005 | Filter rekap bulanan berdasarkan kelas, mataPelajaran, dan bulan | 1. Login sebagai Admin<br>2. Akses rekap bulanan<br>3. Filter: kelas = VII B, mataPelajaran = Bahasa Indonesia, bulan = 2026-06<br>4. Periksa data | 1. Data sesuai dengan filter yang dipilih<br>2. Tabel hanya menampilkan data untuk filter tersebut<br>3. Filter ketiga parameter berfungsi dengan benar | | | |
| TC-F11-006 | Tidak ada data untuk filter tertentu | 1. Login sebagai Admin<br>2. Akses rekap bulanan<br>3. Filter: kelas = VII A, bulan = 2025-01 (belum ada data) | 1. Tabel menampilkan "Tidak ada data"<br>2. Summary: 0 siswa | | | |

## 4.3 UC-010: Pantau Rekap Kelas oleh Wali Kelas

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F12-010 | Wali Kelas melihat rekap harian kelas binaan dengan detail per jam | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /pantau-rekap<br>3. Filter: tanggal = 2026-07-15<br>4. Periksa tabel dan detail per jam | 1. Rekap harian untuk kelas VII A ditampilkan<br>2. Tabel: NIS, Nama, Hadir/Total, Persentase, Status Hari<br>3. Detail per jam: {mapel, status: H/TH/I*}<br>4. Progress bar untuk setiap siswa | | | |
| TC-F12-011 | Detail per jam menampilkan status H (Hadir), TH (Tidak Hadir), I* (Izin approved) | 1. Login sebagai Wali Kelas<br>2. Lihat rekap harian dengan detail per jam<br>3. Periksa kode status di detail per jam | 1. H = Hadir (statusHadir=true)<br>2. TH = Tidak Hadir (statusHadir=false)<br>3. I* = Izin disetujui (izin approved, BR-14)<br>4. Setiap jam menampilkan nama mata pelajaran | | | |
| TC-F12-012 | Wali Kelas hanya bisa melihat kelas binaan (VR-07) | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /pantau-rekap<br>3. Coba filter kelas VII B | 1. Data kelas VII B tidak ditampilkan<br>2. Hanya data untuk kelas binaan VII A<br>3. Filter kelas lain tidak mengembalikan data | | | |
| TC-F12-013 | Admin tidak bisa mengakses /pantau-rekap — VR-10 | 1. Login sebagai Admin<br>2. Coba akses halaman /pantau-rekap | 1. Akses ditolak (403 Forbidden)<br>2. Hanya Wali Kelas yang bisa mengakses halaman ini<br>3. Redirect ke dashboard | | | |

## 4.4 UC-011: Filter dan Unduh Laporan Rekapitulasi

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F13-001 | Admin memfilter laporan berdasarkan kelas dan tanggal | 1. Login sebagai Admin<br>2. Akses halaman /laporan<br>3. Filter: kelas = VII A, tanggal = 2026-07-15<br>4. Periksa data yang ditampilkan | 1. Data sesuai dengan filter<br>2. Tabel hanya menampilkan data untuk VII A pada 2026-07-15<br>3. Record count sesuai | | | |
| TC-F13-002 | Admin memfilter laporan berdasarkan mataPelajaran dan bulan | 1. Login sebagai Admin<br>2. Akses halaman /laporan (tab bulanan)<br>3. Filter: mataPelajaran = Matematika, bulan = 2026-07<br>4. Periksa data | 1. Data sesuai dengan filter<br>2. Hanya data untuk Matematika di bulan Juli 2026 | | | |
| TC-F13-003 | Admin mengunduh laporan harian sebagai CSV (F-14) | 1. Login sebagai Admin<br>2. Akses halaman /laporan (tab harian)<br>3. Filter: tanggal = 2026-07-15<br>4. Klik "Unduh CSV" | 1. File CSV berhasil diunduh<br>2. Format: NIS, Nama, Kelas, Hadir/Total, Persentase, Status Hari<br>3. File bernama laporan_harian_2026-07-15.csv | | | |
| TC-F13-004 | Admin mengunduh laporan bulanan sebagai CSV (F-14) | 1. Login sebagai Admin<br>2. Akses halaman /laporan (tab bulanan)<br>3. Filter: kelas = VII A, bulan = 2026-07<br>4. Klik "Unduh CSV" | 1. File CSV berhasil diunduh<br>2. Format: NIS, Nama, Kelas, Hadir, Tidak Hadir, Total, Persentase<br>3. File bernama laporan_bulanan_2026-07.csv | | | |
| TC-F13-005 | Guru Mapel tidak bisa mengunduh laporan — VR-10 | 1. Login sebagai Guru Mapel<br>2. Akses halaman /laporan<br>3. Coba klik "Unduh CSV" | 1. Tombol "Unduh CSV" tidak tersedia untuk Guru Mapel<br>2. Hanya Admin yang bisa mengunduh laporan (F-14) | | | |
| TC-F13-006 | Wali Kelas tidak bisa mengunduh laporan — VR-10 | 1. Login sebagai Wali Kelas<br>2. Akses halaman /laporan<br>3. Coba klik "Unduh CSV" | 1. Tombol "Unduh CSV" tidak tersedia untuk Wali Kelas<br>2. Hanya Admin yang bisa mengunduh laporan | | | |

---

# 5. FEATURE F-15–F-16: MANAJEMEN JADWAL PELAJARAN

## 5.1 UC-008: Pengaturan Jadwal Pelajaran

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F15-001 | Admin menambah jadwal pelajaran baru — data valid | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /jadwal<br>3. Klik "Tambah Jadwal"<br>4. Isi form: Kelas = VII A, Hari = Senin, Jam Mulai = 07:00, Jam Selesai = 08:30, Mapel = Matematika, Guru = GRU-001, Semester = 2025/2026-Ganjil<br>5. Klik "Simpan" | 1. Jadwal berhasil ditambahkan<br>2. Modal form tertutup<br>3. Tabel jadwal ter-update<br>4. Jadwal baru muncul di tabel<br>5. Data tersimpan di localStorage | | | |
| TC-F15-002 | Admin mengubah jadwal pelajaran yang sudah ada | 1. Login sebagai Admin<br>2. Akses halaman /jadwal<br>3. Klik ikon pensil pada baris jadwal<br>4. Ubah: Jam Mulai = 07:30, Jam Selesai = 09:00<br>5. Klik "Simpan" | 1. Jadwal berhasil diperbarui<br>2. Modal form tertutup<br>3. Tabel jadwal ter-update<br>4. Perubahan terlihat di tabel | | | |
| TC-F15-003 | Admin menghapus jadwal pelajaran | 1. Login sebagai Admin<br>2. Akses halaman /jadwal<br>3. Klik ikon tempat sampah pada baris jadwal<br>4. Konfirmasi hapus | 1. Dialog konfirmasi muncul<br>2. Setelah konfirmasi, jadwal terhapus<br>3. Baris jadwal hilang dari tabel<br>4. Data terhapus dari localStorage | | | |
| TC-F15-004 | Admin membatalkan penambahan jadwal | 1. Login sebagai Admin<br>2. Klik "Tambah Jadwal"<br>3. Isi form dengan data<br>4. Klik tombol "Batal" atau X di modal | 1. Modal form tertutup<br>2. Data tidak tersimpan<br>3. Tabel jadwal tidak berubah | | | |
| TC-F15-005 | Admin membatalkan penghapusan jadwal | 1. Login sebagai Admin<br>2. Klik ikon tempat sampah pada jadwal<br>3. Klik "Batal" di dialog konfirmasi | 1. Dialog konfirmasi tertutup<br>2. Jadwal tidak terhapus<br>3. Tabel tetap seperti semula | | | |
| TC-F15-006 | Validasi form jadwal — field wajib kosong | 1. Login sebagai Admin<br>2. Klik "Tambah Jadwal"<br>3. Biarkan field "Hari" kosong<br>4. Klik "Simpan" | 1. Validasi error pada field yang kosong<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan | | | |
| TC-F15-007 | Validasi form jadwal — hari tidak valid | 1. Login sebagai Admin<br>2. Klik "Tambah Jadwal"<br>3. Isi Hari = "Minggu" (tidak valid)<br>4. Klik "Simpan" | 1. Error: Hari harus salah satu dari Senin-Sabtu<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan | | | |
| TC-F15-008 | Validasi form jadwal — jam Mulai >= jam Selesai | 1. Login sebagai Admin<br>2. Klik "Tambah Jadwal"<br>3. Isi Jam Mulai = 08:00, Jam Selesai = 07:00<br>4. Klik "Simpan" | 1. Error: Jam Mulai harus sebelum Jam Selesai<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan | | | |
| TC-F15-009 | Guru Mapel tidak bisa mengelola jadwal — VR-10 | 1. Login sebagai Guru Mapel<br>2. Coba akses halaman /jadwal<br>3. Coba tambah, ubah, atau hapus jadwal | 1. Akses ditolak (403 Forbidden)<br>2. Hanya Admin yang bisa mengelola jadwal<br>3. Redirect ke dashboard | | | |
| TC-F15-010 | Wali Kelas tidak bisa mengelola jadwal — VR-10 | 1. Login sebagai Wali Kelas<br>2. Coba akses halaman /jadwal<br>3. Coba tambah, ubah, atau hapus jadwal | 1. Akses ditolak (403 Forbidden)<br>2. Hanya Admin yang bisa mengelola jadwal | | | |
| TC-F15-011 | Siswa tidak bisa mengelola jadwal — VR-10 | 1. Login sebagai Siswa<br>2. Coba akses halaman /jadwal | 1. Akses ditolak<br>2. Siswa tidak memiliki akses ke manajemen jadwal | | | |
| TC-F15-012 | Guru Mapel melihat jadwal yang diampu saja | 1. Login sebagai Guru Mapel (mengampu Matematika)<br>2. Akses halaman /jadwal<br>3. Periksa data yang ditampilkan | 1. Hanya jadwal untuk mata pelajaran yang diampu ditampilkan<br>2. Filter otomatis: idGuru = current user (VR-06) | | | |
| TC-F15-013 | Admin memfilter jadwal berdasarkan hari | 1. Login sebagai Admin<br>2. Akses halaman /jadwal<br>3. Filter: hari = Senin<br>4. Periksa data | 1. Hanya jadwal untuk hari Senin ditampilkan<br>2. Filter berfungsi dengan benar | | | |
| TC-F15-014 | Admin memfilter jadwal berdasarkan kelas | 1. Login sebagai Admin<br>2. Akses halaman /jadwal<br>3. Filter: kelas = VII A<br>4. Periksa data | 1. Hanya jadwal untuk kelas VII A ditampilkan<br>2. Filter berfungsi dengan benar | | | |

---

# 6. FEATURE F-17: MANAJEMEN HAK AKSES

## 6.1 UC-013: Kelola Hak Akses Pengguna (Read-Only)

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F17-001 | Admin melihat daftar pengguna dan hak akses | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /admin/hak-akses<br>3. Periksa data yang ditampilkan | 1. Daftar pengguna ditampilkan: nama, email, role, status<br>2. Setiap pengguna memiliki informasi hak akses<br>3. Data bersifat read-only (tidak ada tombol edit/hapus) | | | |
| TC-F17-002 | Halaman hak akses bersifat read-only — tidak ada operasi CRUD | 1. Login sebagai Admin<br>2. Akses halaman /admin/hak-akses<br>3. Cari tombol tambah, edit, atau hapus | 1. Tidak ada tombol tambah pengguna<br>2. Tidak ada tombol edit pengguna<br>3. Tidak ada tombol hapus pengguna<br>4. Halaman hanya untuk melihat informasi | | | |
| TC-F17-003 | Guru Mapel tidak bisa mengakses halaman hak akses — VR-10 | 1. Login sebagai Guru Mapel<br>2. Coba akses halaman /admin/hak-akses | 1. Akses ditolak (403 Forbidden)<br>2. Hanya Admin yang bisa mengakses halaman ini<br>3. Redirect ke dashboard | | | |
| TC-F17-004 | Wali Kelas tidak bisa mengakses halaman hak akses — VR-10 | 1. Login sebagai Wali Kelas<br>2. Coba akses halaman /admin/hak-akses | 1. Akses ditolak (403 Forbidden)<br>2. Hanya Admin yang bisa mengakses halaman ini | | | |

---

# 7. FEATURE F-18: RIWAYAT KEHADIRAN

## 7.1 UC-014: Lihat Riwayat Kehadiran oleh Siswa

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F18-001 | Siswa melihat riwayat kehadiran sendiri | 1. Login sebagai Siswa (NIS: 2024001)<br>2. Akses halaman /siswa/riwayat<br>3. Periksa data yang ditampilkan | 1. Riwayat kehadiran milik siswa sendiri ditampilkan<br>2. Data mencakup: tanggal, mataPelajaran, jamMulai, jamSelesai, status, catatan<br>3. Tidak ada data milik siswa lain | | | |
| TC-F18-002 | Siswa memfilter riwayat berdasarkan tanggal | 1. Login sebagai Siswa<br>2. Akses halaman /siswa/riwayat<br>3. Filter: tanggalMulai = 2026-07-01, tanggalAkhir = 2026-07-15<br>4. Periksa data | 1. Hanya data untuk rentang tanggal yang dipilih ditampilkan<br>2. Filter berfungsi dengan benar<br>3. Data sesuai dengan filter | | | |
| TC-F18-003 | Siswa memfilter riwayat berdasarkan mata pelajaran | 1. Login sebagai Siswa<br>2. Akses halaman /siswa/riwayat<br>3. Filter: mataPelajaran = Matematika<br>4. Periksa data | 1. Hanya data untuk mata pelajaran Matematika ditampilkan<br>2. Filter berfungsi dengan benar | | | |
| TC-F18-004 | Siswa memfilter riwayat berdasarkan status kehadiran | 1. Login sebagai Siswa<br>2. Akses halaman /siswa/riwayat<br>3. Filter: status = "Hadir"<br>4. Periksa data | 1. Hanya data dengan status "Hadir" ditampilkan<br>2. Filter berfungsi dengan benar | | | |
| TC-F18-005 | Siswa memfilter riwayat berdasarkan status "Izin" | 1. Login sebagai Siswa<br>2. Akses halaman /siswa/riwayat<br>3. Filter: status = "Izin"<br>4. Periksa data | 1. Hanya data dengan status "Izin" ditampilkan<br>2. Data izin termasuk di riwayat kehadiran | | | |
| TC-F18-006 | Siswa tidak bisa mengedit atau menghapus data kehadiran | 1. Login sebagai Siswa<br>2. Akses halaman /siswa/riwayat<br>3. Cari tombol edit atau hapus | 1. Tidak ada tombol edit<br>2. Tidak ada tombol hapus<br>3. Data hanya bisa dilihat (read-only) | | | |
| TC-F18-007 | Siswa tidak bisa melihat data kehadiran siswa lain — VR-05 | 1. Login sebagai Siswa (NIS: 2024001)<br>2. Akses halaman /siswa/riwayat<br>3. Periksa data yang ditampilkan | 1. Hanya data milik NIS 2024001 yang ditampilkan<br>2. Tidak ada data milik siswa lain<br>3. Data isolasi berdasarkan token autentikasi (BR-14 di UC-014) | | | |
| TC-F18-008 | Tidak ada data riwayat kehadiran | 1. Login sebagai Siswa (belum punya riwayat)<br>2. Akses halaman /siswa/riwayat<br>3. Periksa pesan yang ditampilkan | 1. Pesan: "Belum ada riwayat kehadiran"<br>2. Tabel kosong<br>3. Tidak ada error | | | |

---

# 8. FEATURE F-19–F-20: REGISTRASI DAN AUTENTIKASI

## 8.1 UC-001: Registrasi Akun Mandiri

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F19-001 | Registrasi akun Siswa dengan data valid | 1. Buka halaman /register<br>2. Pilih role "Siswa"<br>3. Isi form: NIS = "2024001", Nama Lengkap = "Ahmad Rizki", Jenis Kelamin = "L", Kelas = "VII A", Email = "ahmad@smpn4.sch.id", Password = "secret123"<br>4. Klik "Daftar & Masuk" | 1. Registrasi berhasil (201 Created)<br>2. Sistem redirect ke /dashboard<br>3. Dashboard Siswa ditampilkan<br>4. Token tersimpan di React Context<br>5. Akun langsung aktif (BR-20) | | | |
| TC-F19-002 | Registrasi akun Guru Mapel dengan data valid | 1. Buka halaman /register<br>2. Pilih role "Guru Mapel"<br>3. Isi form: ID Guru = "GRU-001", Nama Guru = "Pak Budi", Mata Pelajaran = "Matematika", Email = "guru_matematika@smpn4.sch.id", Password = "secret123"<br>4. Klik "Daftar & Masuk" | 1. Registrasi berhasil (201 Created)<br>2. Sistem redirect ke /dashboard<br>3. Dashboard Guru Mapel ditampilkan<br>4. Akun langsung aktif (BR-20) | | | |
| TC-F19-003 | Registrasi akun Wali Kelas dengan data valid | 1. Buka halaman /register<br>2. Pilih role "Wali Kelas"<br>3. Isi form: ID Guru = "GRU-002", Nama Guru = "Ibu Sari", ID Kelas = "VII A", Email = "wali_vii_a@smpn4.sch.id", Password = "secret123"<br>4. Klik "Daftar & Masuk" | 1. Registrasi berhasil (201 Created)<br>2. Sistem redirect ke /dashboard<br>3. Dashboard Wali Kelas ditampilkan<br>4. Akun langsung aktif (BR-20) | | | |
| TC-F19-004 | Registrasi akun Admin (Guru BK) dengan data valid | 1. Buka halaman /register<br>2. Pilih role "Admin"<br>3. Isi form: ID Admin = "ADM-001", Nama Admin = "Admin BK", Username = "admin_bk", Email = "admin@smpn4.sch.id", Password = "secret123"<br>4. Klik "Daftar & Masuk" | 1. Registrasi berhasil (201 Created)<br>2. Sistem redirect ke /dashboard<br>3. Dashboard Admin ditampilkan<br>4. Akun langsung aktif (BR-20) | | | |
| TC-F19-005 | Registrasi gagal — email sudah terdaftar (VR-09) | 1. Buka halaman /register<br>2. Pilih role "Siswa"<br>3. Isi form dengan email yang sudah terdaftar: "ahmad@smpn4.sch.id"<br>4. Klik "Daftar & Masuk" | 1. Error: "Email sudah terdaftar"<br>2. Registrasi gagal (409 Conflict)<br>3. Form tetap terbuka dengan data yang diisi | | | |
| TC-F19-006 | Registrasi gagal — NIS sudah terdaftar (VR-01) | 1. Buka halaman /register<br>2. Pilih role "Siswa"<br>3. Isi form dengan NIS yang sudah terdaftar: "2024001"<br>4. Klik "Daftar & Masuk" | 1. Error: "NIS sudah terdaftar"<br>2. Registrasi gagal (409 Conflict)<br>3. Form tetap terbuka | | | |
| TC-F19-007 | Registrasi gagal — ID Guru sudah terdaftar (VR-02) | 1. Buka halaman /register<br>2. Pilih role "Guru Mapel"<br>3. Isi form dengan ID Guru yang sudah terdaftar: "GRU-001"<br>4. Klik "Daftar & Masuk" | 1. Error: "ID Guru sudah terdaftar"<br>2. Registrasi gagal (409 Conflict) | | | |
| TC-F19-008 | Registrasi gagal — password kurang dari 6 karakter | 1. Buka halaman /register<br>2. Isi form dengan password: "12345"<br>3. Klik "Daftar & Masuk" | 1. Validasi error: "Password minimal 6 karakter"<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan | | | |
| TC-F19-009 | Registrasi gagal — email format tidak valid | 1. Buka halaman /register<br>2. Isi form dengan email: "bukan_email"<br>3. Klik "Daftar & Masuk" | 1. Validasi error: format email tidak valid<br>2. Form tidak ter-submit | | | |
| TC-F19-010 | Registrasi gagal — field wajib kosong | 1. Buka halaman /register<br>2. Biarkan field Nama Kosong<br>3. Klik "Daftar & Masuk" | 1. Validasi error pada field yang kosong<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan | | | |
| TC-F19-011 | Form registrasi menampilkan field sesuai role yang dipilih | 1. Buka halaman /register<br>2. Pilih role "Siswa" — periksa field<br>3. Ubah ke "Guru Mapel" — periksa field<br>4. Ubah ke "Wali Kelas" — periksa field<br>5. Ubah ke "Admin" — periksa field | 1. Siswa: NIS, Nama, Jenis Kelamin, Kelas, Email, Password<br>2. Guru Mapel: ID Guru, Nama, Mata Pelajaran, Email, Password<br>3. Wali Kelas: ID Guru, Nama, ID Kelas, Email, Password<br>4. Admin: ID Admin, Nama, Username, Email, Password<br>5. Field berubah sesuai role | | | |

## 8.2 UC-002: Login dengan Role-Locked Redirect

| TC ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| TC-F20-001 | Login berhasil sebagai Siswa — redirect ke SiswaDashboard | 1. Buka halaman /login<br>2. Masukkan email: "ahmad@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" | 1. Login berhasil (200 OK)<br>2. Sistem redirect ke /dashboard<br>3. SiswaDashboard ditampilkan<br>4. Token dan user data tersimpan di React Context | | | |
| TC-F20-002 | Login berhasil sebagai Guru Mapel — redirect ke GuruDashboard | 1. Buka halaman /login<br>2. Masukkan email: "guru_matematika@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" | 1. Login berhasil (200 OK)<br>2. Sistem redirect ke /dashboard<br>3. GuruDashboard ditampilkan | | | |
| TC-F20-003 | Login berhasil sebagai Wali Kelas — redirect ke WaliDashboard | 1. Buka halaman /login<br>2. Masukkan email: "wali_vii_a@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" | 1. Login berhasil (200 OK)<br>2. Sistem redirect ke /dashboard<br>3. WaliDashboard ditampilkan | | | |
| TC-F20-004 | Login berhasil sebagai Admin — redirect ke AdminDashboard | 1. Buka halaman /login<br>2. Masukkan email: "admin@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" | 1. Login berhasil (200 OK)<br>2. Sistem redirect ke /dashboard<br>3. AdminDashboard ditampilkan | | | |
| TC-F20-005 | Login gagal — email atau password salah | 1. Buka halaman /login<br>2. Masukkan email: "ahmad@smpn4.sch.id", password: "salah"<br>3. Klik "Masuk" | 1. Error: "Email atau password salah"<br>2. Pesan generic (tidak mengungkapkan field mana yang salah)<br>3. Tetap di halaman login | | | |
| TC-F20-006 | Login gagal — email tidak terdaftar | 1. Buka halaman /login<br>2. Masukkan email: "tidak_ada@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" | 1. Error: "Email atau password salah"<br>2. Pesan sama dengan case password salah (generic)<br>3. Tetap di halaman login | | | |
| TC-F20-007 | Login gagal — field kosong | 1. Buka halaman /login<br>2. Biarkan email kosong<br>3. Klik "Masuk" | 1. Validasi error: "Email harus diisi"<br>2. Form tidak ter-submit | | | |
| TC-F20-008 | Login gagal — password kosong | 1. Buka halaman /login<br>2. Masukkan email, biarkan password kosong<br>3. Klik "Masuk" | 1. Validasi error: "Password harus diisi"<br>2. Form tidak ter-submit | | | |
| TC-F20-009 | Login dengan session aktif — redirect ke /dashboard | 1. Login sebagai Siswa<br>2. Dalam keadaan sudah login, akses URL /login | 1. Sistem mendeteksi sesi aktif<br>2. Sistem redirect ke /dashboard<br>3. Tidak ditampilkan form login | | | |
| TC-F20-010 | Logout — session berakhir | 1. Login sebagai Siswa<br>2. Klik tombol "Logout" di sidebar atau header<br>3. Coba akses halaman yang dilindungi | 1. Session berakhir (token dihapus dari React Context)<br>2. Sistem redirect ke /login<br>3. Tidak bisa mengakses halaman yang dilindungi | | | |
| TC-F20-011 | Page reload — session hilang (React Context behavior) | 1. Login sebagai Siswa<br>2. Refresh browser (F5 atau Ctrl+R)<br>3. Periksa status login | 1. Session hilang (React Context in-memory)<br>2. Sistem redirect ke /login<br>3. Harus login ulang | | | |
| TC-F20-012 | Siswa tidak bisa mengakses dashboard Guru Mapel — VR-10 | 1. Login sebagai Siswa<br>2. Coba akses URL /dashboard (guru view) atau fitur guru | 1. Sistem mendeteksi role tidak sesuai<br>2. Redirect ke SiswaDashboard<br>3. Tidak bisa mengakses fitur guru | | | |
| TC-F20-013 | Guru Mapel tidak bisa mengakses dashboard Admin — VR-10 | 1. Login sebagai Guru Mapel<br>2. Coba akses URL /dashboard (admin view) atau fitur admin | 1. Sistem mendeteksi role tidak sesuai<br>2. Redirect ke GuruDashboard<br>3. Tidak bisa mengakses fitur admin | | | |
| TC-F20-014 | Wali Kelas tidak bisa mengakses fitur Admin — VR-10 | 1. Login sebagai Wali Kelas<br>2. Coba akses halaman /jadwal atau /admin/hak-akses | 1. Akses ditolak (403 Forbidden)<br>2. Redirect ke WaliDashboard<br>3. Tidak bisa mengakses fitur admin | | | |
| TC-F20-015 | Admin tidak bisa melakukan presensi — role mismatch | 1. Login sebagai Admin<br>2. Coba akses halaman /presensi<br>3. Coba melakukan presensi | 1. Admin tidak memiliki jadwal pelajaran<br>2. Tidak bisa melakukan presensi<br>3. Presensi hanya untuk Guru Mapel dan Wali Kelas | | | |

---

# 9. EXECUTION SUMMARY (to be filled after execution)

| Feature | Total TC | Passed | Failed | N/A | Pass Rate (%) |
| --- | --- | --- | --- | --- | --- |
| F-01–F-05: Manajemen Presensi Per Jam Pelajaran | 34 | | | | |
| F-06–F-10: Pengajuan Izin Ketidakhadiran | 25 | | | | |
| F-11–F-14: Rekapitulasi dan Laporan | 23 | | | | |
| F-15–F-16: Manajemen Jadwal Pelajaran | 14 | | | | |
| F-17: Manajemen Hak Akses | 4 | | | | |
| F-18: Riwayat Kehadiran | 8 | | | | |
| F-19–F-20: Registrasi dan Autentikasi | 26 | | | | |
| **TOTAL** | **134** | | | | |

---

# 10. REVISION HISTORY

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 0.1 | 2026-07-16 | System Analyst AI | Initial Draft |
| 0.2 | 2026-07-17 | System Analyst AI | Added TC-F06-017 for BR-06 coverage (Izin Per Hari); updated total TCs: 133→134 |