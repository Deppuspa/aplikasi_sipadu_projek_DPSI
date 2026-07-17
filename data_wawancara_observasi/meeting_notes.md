# Identifikasi Masalah & Pengguna

## Observasi 1

**Hari/Tanggal:** Selasa, 21 April 2026  
**Tempat:** SMP Negeri 4 Banguntapan

## Identifikasi Pengguna

Berdasarkan hasil observasi dan wawancara, pengguna sistem yang terlibat meliputi:

- **Siswa**, sebagai pengguna utama sistem presensi menggunakan kartu pelajar.
- **Guru BK**, sebagai pihak yang memantau data kehadiran siswa.
- **Wakil Kepala Sekolah**, sebagai pengawas pelaksanaan sistem presensi.
- **Petugas Perpustakaan (Mbak Erina)**, sebagai pengguna sistem perpustakaan.
- **Administrator Sistem (Pak Bogi)**, sebagai pengembang sekaligus pengelola sistem.
- **Orang Tua/Wali**, sebagai pihak yang menerima informasi kehadiran siswa (belum terintegrasi secara langsung).

---

## Identifikasi Masalah

### 1. Sistem Absensi

- Sistem absensi menggunakan kartu pelajar dengan barcode (1 kartu untuk 1 siswa).
- Presensi dilakukan dua kali setiap hari, yaitu saat datang dan pulang sekolah.
- Sistem menyediakan dua metode presensi, yaitu scan barcode dan input manual menggunakan NIS.

### 2. Permasalahan Sistem Absensi

- Sistem masih dalam tahap evaluasi sehingga belum sepenuhnya stabil.
- Masih sering terjadi error teknis pada sistem.
- Proses scan tidak dapat dilakukan apabila:
  - Siswa tidak membawa kartu pelajar.
  - Terjadi gangguan pada sistem.
- Ketika sistem mengalami gangguan, proses presensi ikut terhambat.
- Data presensi belum terhubung dengan orang tua siswa.
- Aplikasi hanya dapat diakses melalui komputer yang berada di lingkungan sekolah.

### 3. Administrasi Sekolah

- Administrasi masih menggunakan pencatatan sederhana seperti Microsoft Excel.
- Pendaftaran peserta didik baru (PPDB) telah dilakukan secara online.
- Beberapa proses administrasi, seperti pencatatan buku paket, masih dilakukan secara manual.

### 4. Sistem Perpustakaan

- Pengelolaan buku menggunakan aplikasi gratis.
- Sebagian proses pencatatan masih dilakukan secara manual.
- Sistem perpustakaan masih mengalami kendala teknis.

### 5. Sistem Perizinan dan Komunikasi

- Izin tidak masuk sekolah masih dilakukan secara manual menggunakan surat atau WhatsApp.
- Apabila siswa tidak sampai ke sekolah, guru akan menghubungi orang tua melalui WhatsApp.

### 6. Kendala Sistem

- Sistem masih sering mengalami error teknis.
- Database dan aplikasi terkadang mengalami gangguan sehingga menghambat proses administrasi.

### 7. Keuangan

- Dana BOS diperoleh dari pemerintah.

### 8. Catatan Tambahan

- Study tour bersifat tidak wajib.
- Akreditasi perpustakaan belum dibahas lebih lanjut.

---

# Observasi 2

**Hari/Tanggal:** Selasa, 28 April 2026  
**Tempat:** SMP Negeri 4 Banguntapan

**Topik:** Pengembangan Sistem Presensi Berbasis Barcode

## Identifikasi Pengguna

Pengguna sistem yang terlibat terdiri dari:

- **Siswa**, sebagai pengguna sistem presensi berbasis barcode dan aplikasi web.
- **Guru BK**, sebagai pemantau data presensi siswa.
- **Administrator Sistem (Pak Bogi)**, sebagai pengembang dan pengelola sistem.
- **Guru Mata Pelajaran**, sebagai calon pengguna pada pengembangan sistem berikutnya.
- **Orang Tua/Wali**, sebagai pihak yang direncanakan menerima informasi kehadiran siswa.

---

## Identifikasi Masalah

### 1. Sistem Presensi

- Presensi menggunakan kartu pelajar dengan barcode NIS.
- Dilakukan dua kali, yaitu saat masuk dan pulang sekolah.
- Metode presensi meliputi:
  - Scan barcode.
  - Input manual menggunakan NIS.
- Sistem berbasis web memungkinkan siswa:
  - Login menggunakan email.
  - Melihat riwayat keterlambatan dan alfa.
  - Mengirim izin atau sakit dengan mengunggah dokumen pendukung.

### 2. Permasalahan Presensi

- Sistem masih berada pada tahap pengembangan.
- Kendala yang sering terjadi meliputi:
  - Siswa lupa melakukan scan.
  - Siswa tidak membawa kartu pelajar.
  - Titip presensi kepada teman.
  - Perusakan tampilan layar oleh siswa.
- Kendala teknis:
  - Cache memori penuh.
  - Gangguan sistem yang menyebabkan proses presensi terhambat.

### 3. Fitur Sistem

Sistem menyediakan beberapa fitur, antara lain:

- Presensi otomatis menggunakan barcode.
- Pengaturan jam masuk dan pulang oleh administrator.
- Rekap data presensi bulanan.
- Rekap detail waktu presensi.
- Export data.
- Input manual menggunakan NIS.
- Cetak kartu sementara.
- Upload surat izin atau sakit.

### 4. Keamanan Sistem

- Menggunakan mode Kiosk sehingga siswa tidak dapat mengakses menu administrator.
- Tombol administrator disembunyikan untuk mencegah penyalahgunaan.

### 5. Pengelolaan Sistem

- Sistem dikembangkan dan dipelihara oleh Pak Bogi.
- Guru BK berperan sebagai pemantau data presensi siswa.

### 6. Manfaat Sistem

- Mengurangi beban administrasi Guru BK.
- Mempercepat proses presensi siswa.
- Data kehadiran tersimpan secara otomatis dan lebih rapi.
- Siswa dapat memantau riwayat kehadirannya secara mandiri.
- Pengajuan izin menjadi lebih mudah melalui aplikasi web.

### 7. Rencana Pengembangan

Beberapa pengembangan yang direncanakan antara lain:

- Memberikan akses data presensi kepada guru mata pelajaran sebagai pendukung penilaian rapor.
- Mengintegrasikan sistem presensi dengan sistem perpustakaan (SLiMS).
- Meningkatkan integrasi sistem agar dapat mendukung layanan administrasi sekolah secara lebih menyeluruh.

---

# Kesimpulan

Berdasarkan hasil observasi dan wawancara, sistem presensi berbasis barcode telah membantu meningkatkan efisiensi proses pencatatan kehadiran siswa. Namun, masih terdapat beberapa kendala seperti keterbatasan perangkat, error teknis, proses perizinan yang masih manual, serta belum adanya integrasi dengan orang tua dan sistem perpustakaan. Oleh karena itu, diperlukan pengembangan sistem yang lebih stabil, terintegrasi, dan mudah diakses oleh seluruh pengguna sesuai dengan hak akses masing-masing.