# Pembuatan Class Diagram

## Kelompok

**Kelompok:** Sistem Absensi

### Anggota

1. Lalu Atwi Suparman (2300016074)
2. Naedhiah Mokessa Della (2400016020)
3. Putri Miftakhul Jannah (2400016021)
4. Alvia Fatma Suttawati (2400016058)
5. Devi Puspa Rosalinda (2400016060)

---

## Keterangan

- **PK** = Primary Key
- **FK** = Foreign Key

---

# B. Studi Kasus

## Judul Studi Kasus

**Sistem Presensi Digital Siswa SMP Negeri 4 Banguntapan**

### Deskripsi Singkat Sistem

Sistem Presensi Digital Siswa SMP Negeri 4 Banguntapan merupakan sistem berbasis web yang dikembangkan secara mandiri oleh salah satu guru untuk mengelola data kehadiran siswa secara digital.

Sistem mencatat presensi siswa dua kali sehari melalui **scan barcode** pada kartu pelajar di gerbang sekolah. Saat ini akses terhadap data kehadiran masih terbatas pada **Admin (Guru BK)**, sedangkan guru mata pelajaran maupun wali kelas belum dapat mengakses data tersebut secara langsung sehingga masih harus melakukan absensi manual di dalam kelas.

Pengembangan sistem dilakukan agar data presensi dapat diakses secara **real-time** oleh guru dan wali kelas. Sistem melibatkan tiga aktor utama, yaitu:

- Siswa
- Guru/Wali Kelas
- Admin (Guru BK)

Proses utama sistem meliputi:

- Pencatatan presensi masuk dan pulang.
- Pemantauan kehadiran siswa secara real-time.
- Pengelolaan izin ketidakhadiran secara digital.
- Pengaturan jadwal presensi.
- Pembuatan laporan rekapitulasi kehadiran.

---

# C. Identifikasi Class

| No | Nama Class | Deskripsi |
|----|------------|-----------|
| 1 | **Siswa** | Menyimpan data siswa yang melakukan presensi menggunakan barcode kartu pelajar. |
| 2 | **Guru** | Menyimpan data guru/wali kelas yang memantau kehadiran dan menindaklanjuti siswa tidak hadir. |
| 3 | **Admin** | Menyimpan data admin (Guru BK) yang mengelola sistem absensi, memverifikasi data, dan membuat laporan. |
| 4 | **Presensi** | Menyimpan data transaksi presensi masuk dan pulang siswa melalui scan barcode atau input NIS manual. |
| 5 | **Izin** | Menyimpan data pengajuan izin ketidakhadiran siswa yang diajukan secara digital. |
| 6 | **Kelas** | Menyimpan data kelas yang dikelola wali kelas dan berisi daftar siswa. |
| 7 | **JadwalPresensi** | Menyimpan konfigurasi batas waktu presensi masuk dan pulang yang diatur oleh admin. |
| 8 | **LaporanAbsensi** | Menyimpan rekapitulasi data kehadiran siswa yang dapat diekspor dalam berbagai periode. |

---

# D. Detail Class

# Class: Siswa

## Atribut

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|----|-----|--------------|-----------|------------|
| 1 | PK | nis | String | Nomor Induk Siswa untuk identifikasi dan presensi manual. |
| 2 | | namaLengkap | String | Nama lengkap siswa. |
| 3 | | jenisKelamin | ENUM('L','P') | Jenis kelamin. |
| 4 | FK | idKelas | String | Referensi kelas siswa. |
| 5 | | barcodeKartu | String | Barcode pada kartu pelajar. |
| 6 | | email | String | Digunakan untuk login sistem web. |

## Method

| No | Method | Keterangan |
|----|--------|------------|
| 1 | scanBarcode() | Melakukan presensi masuk atau pulang menggunakan barcode. |
| 2 | inputNISManual() | Melakukan presensi menggunakan NIS apabila kartu tidak tersedia atau scanner bermasalah. |
| 3 | lihatRiwayatKehadiran() | Menampilkan riwayat kehadiran siswa. |
| 4 | ajukanIzin() | Mengajukan izin ketidakhadiran secara digital. |

# Class: Guru

## Atribut

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|----|-----|--------------|-----------|------------|
| 1 | PK | idGuru | String | Kode unik identitas guru. |
| 2 | | namaGuru | String | Nama lengkap guru. |
| 3 | | role | ENUM('guru_mapel', 'wali_kelas') | Peran guru dalam sistem. |
| 4 | FK | idKelas | String | Referensi kelas yang diampu (khusus wali kelas). |

## Method

| No | Method | Keterangan |
|----|--------|------------|
| 1 | lihatDataKehadiran() | Mengakses data kehadiran siswa per kelas secara real-time. |
| 2 | lihatLaporanAbsensi() | Melihat laporan absensi harian maupun bulanan siswa. |
| 3 | verifikasiIzinSiswa() | Memverifikasi pengajuan izin ketidakhadiran siswa. |
| 4 | tindakLanjutSiswaTidakHadir() | Menindaklanjuti siswa yang tidak hadir. |

---

# Class: Admin

## Atribut

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|----|-----|--------------|-----------|------------|
| 1 | PK | idAdmin | String | Kode unik identitas admin. |
| 2 | | namaAdmin | String | Nama lengkap admin (Guru BK). |
| 3 | | email | String | Akun email admin untuk login ke sistem. |
| 4 | | username | String | Username admin. |
| 5 | | password | String | Password admin. |

## Method

| No | Method | Keterangan |
|----|--------|------------|
| 1 | kelolaDataPresensi() | Mengelola seluruh data presensi siswa dalam sistem. |
| 2 | aturJadwalPresensi() | Mengatur batas waktu presensi masuk dan pulang sesuai kebijakan sekolah. |
| 3 | verifikasiDataPresensi() | Memverifikasi dan memperbaiki data kehadiran yang bermasalah akibat kegagalan scanner. |
| 4 | kelolaHakAksesPengguna() | Mengatur hak akses pengguna berdasarkan peran dalam sistem. |
| 5 | buatLaporan() | Membuat rekapitulasi laporan kehadiran siswa berdasarkan periode tertentu. |
| 6 | unduhLaporanAbsensi() | Mengunduh atau mencetak laporan rekapitulasi kehadiran siswa. |

---

# Class: Presensi

## Atribut

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|----|-----|--------------|-----------|------------|
| 1 | PK | idPresensi | String | Kode unik setiap transaksi presensi. |
| 2 | FK | nis | String | Referensi siswa yang melakukan presensi. |
| 3 | FK | idJadwal | String | Referensi jadwal presensi yang berlaku. |
| 4 | | tanggal | Date | Tanggal presensi dilakukan. |
| 5 | | waktuMasuk | Time | Waktu siswa melakukan presensi masuk. |
| 6 | | waktuPulang | Time | Waktu siswa melakukan presensi pulang. |
| 7 | | metodePresensi | String | Metode yang digunakan, yaitu scan barcode atau input NIS manual. |
| 8 | | statusKehadiran | String | Status kehadiran, seperti hadir, terlambat, atau alfa. |

## Method

| No | Method | Keterangan |
|----|--------|------------|
| 1 | catatPresensiMasuk() | Mencatat waktu presensi masuk siswa secara otomatis. |
| 2 | catatPresensiPulang() | Mencatat waktu presensi pulang siswa secara otomatis. |
| 3 | validasiWaktuPresensi() | Memvalidasi apakah presensi dilakukan sesuai jadwal. |
| 4 | getStatusKehadiran() | Mengembalikan status kehadiran berdasarkan waktu presensi. |

---

# Class: Izin

## Atribut

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|----|-----|--------------|-----------|------------|
| 1 | PK | idIzin | String | Kode unik pengajuan izin. |
| 2 | FK | nis | String | Referensi siswa yang mengajukan izin. |
| 3 | | tanggalIzin | Date | Tanggal ketidakhadiran yang diajukan. |
| 4 | | jenisIzin | ENUM('sakit','izin','lainnya') | Jenis ketidakhadiran siswa. |
| 5 | | keterangan | String | Deskripsi alasan ketidakhadiran. |
| 6 | | buktiPendukung | String | File bukti yang diunggah. |
| 7 | | statusIzin | ENUM('menunggu','disetujui','ditolak') | Status verifikasi izin. |

## Method

| No | Method | Keterangan |
|----|--------|------------|
| 1 | ajukanIzin() | Mengajukan permohonan izin ketidakhadiran secara digital. |
| 2 | unggahBukti() | Mengunggah file bukti pendukung. |
| 3 | verifikasiIzin() | Memverifikasi dan memperbarui status izin. |
| 4 | getStatusIzin() | Menampilkan status terkini dari pengajuan izin. |

---

# Class: Kelas

## Atribut

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|----|-----|--------------|-----------|------------|
| 1 | PK | idKelas | String | Kode unik kelas. |
| 2 | | namaKelas | String | Nama kelas (contoh: VII A, VIII B). |
| 3 | FK | idGuru | String | Referensi guru yang menjadi wali kelas. |

## Method

| No | Method | Keterangan |
|----|--------|------------|
| 1 | getDaftarSiswa() | Menampilkan daftar seluruh siswa dalam kelas. |
| 2 | getJumlahSiswa() | Menghitung jumlah siswa dalam kelas secara dinamis berdasarkan data siswa yang terdaftar. |
| 3 | getRekapKehadiran() | Menampilkan rekapitulasi kehadiran siswa per kelas. |

---

# Class: JadwalPresensi

## Atribut

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|----|-----|--------------|-----------|------------|
| 1 | PK | idJadwal | String | Kode unik jadwal presensi. |
| 2 | | tanggalBerlaku | Date | Tanggal berlakunya jadwal presensi. |
| 3 | | batasWaktuMasuk | Time | Batas waktu maksimal presensi masuk. |
| 4 | | batasWaktuPulang | Time | Waktu mulai presensi pulang dapat dilakukan. |
| 5 | | keterangan | String | Catatan jadwal khusus (misalnya pulang lebih awal). |

## Method

| No | Method | Keterangan |
|----|--------|------------|
| 1 | aturJadwal() | Menetapkan atau memperbarui jadwal batas waktu presensi. |
| 2 | getJadwalAktif() | Mengambil jadwal presensi yang berlaku pada tanggal tertentu. |
| 3 | ubahJadwal() | Mengubah jadwal presensi yang berlaku pada hari tertentu. |

---

# Class: LaporanAbsensi

## Atribut

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|----|-----|--------------|-----------|------------|
| 1 | PK | idLaporan | String | Kode unik laporan. |
| 2 | FK | idKelas | String | Referensi kelas yang dilaporkan. |
| 3 | | periodeAwal | Date | Tanggal awal periode laporan. |
| 4 | | periodeAkhir | Date | Tanggal akhir periode laporan. |
| 5 | | jenisLaporan | ENUM('harian','bulanan') | Jenis laporan yang dihasilkan. |

## Method

| No | Method | Keterangan |
|----|--------|------------|
| 1 | generateLaporan() | Menghasilkan rekapitulasi laporan kehadiran secara otomatis. |
| 2 | eksporLaporan() | Mengekspor laporan ke format yang dapat diunduh. |
| 3 | filterLaporan() | Menyaring data laporan berdasarkan kelas, tanggal, atau nama siswa. |

---

# E. Relasi Antar Class

| No | Class 1 | Relasi | Class 2 | Keterangan |
|----|---------|--------|---------|------------|
| 1 | Siswa | Association | Presensi | Satu siswa dapat memiliki banyak data presensi masuk dan pulang. |
| 2 | Siswa | Association | Izin | Satu siswa dapat mengajukan banyak izin ketidakhadiran. |
| 3 | Siswa | Association | Kelas | Banyak siswa tergabung dalam satu kelas melalui `idKelas`. |
| 4 | Guru | Association | Kelas | Satu guru berperan sebagai wali kelas. |
| 5 | Guru | Association | LaporanAbsensi | Guru atau wali kelas dapat mengakses laporan absensi siswa di kelasnya. |
| 6 | Guru | Association | Izin | Guru memverifikasi pengajuan izin ketidakhadiran siswa. |
| 7 | Admin | Association | JadwalPresensi | Admin mengatur jadwal presensi masuk dan pulang. |
| 8 | Admin | Association | LaporanAbsensi | Admin mengakses dan mengunduh laporan rekapitulasi kehadiran. |
| 9 | Admin | Association | Izin | Admin memverifikasi dan mengelola data izin siswa. |
| 10 | Presensi | Association | JadwalPresensi | Data presensi divalidasi berdasarkan jadwal aktif. |
| 11 | Kelas | Composition | LaporanAbsensi | Laporan absensi dibuat berdasarkan data kehadiran setiap kelas. |

---

# F. Class Diagram

**Link Diagram:**

<https://drive.google.com/file/d/18uIk04txadhZLy3ro38SPBWk71UI5i_e/view?usp=drive_link>

**Gambar Class Diagram**

> Tambahkan gambar class diagram pada bagian ini.

---

## Keterangan

Class Diagram menggambarkan struktur **Sistem Presensi Digital Siswa SMP Negeri 4 Banguntapan** yang terdiri atas delapan class utama, yaitu **Siswa**, **Guru**, **Admin**, **Presensi**, **Izin**, **Kelas**, **JadwalPresensi**, dan **LaporanAbsensi**. Setiap class memiliki atribut yang dilengkapi notasi **Primary Key (PK)** dan **Foreign Key (FK)** untuk menunjukkan relasi antar class, serta method yang merepresentasikan fungsi utama sistem sesuai kebutuhan fungsional.

---

# G. Penjelasan Diagram

### Class Siswa

Class **Siswa** menyimpan data siswa yang melakukan presensi menggunakan barcode kartu pelajar atau input NIS secara manual. Class ini juga menyediakan fungsi untuk melihat riwayat kehadiran dan mengajukan izin secara digital. Atribut `nis` berperan sebagai **Primary Key**, sedangkan `idKelas` merupakan **Foreign Key** yang mereferensikan class **Kelas**.

### Class Guru

Class **Guru** menyimpan data guru maupun wali kelas yang bertugas memantau kehadiran siswa secara real-time. Atribut `idGuru` menjadi **Primary Key**, sedangkan `idKelas` digunakan sebagai **Foreign Key** bagi guru yang berperan sebagai wali kelas.

### Class Admin

Class **Admin** menyimpan data administrator (Guru BK) yang bertugas mengelola data presensi, mengatur jadwal presensi, memverifikasi data, serta membuat laporan kehadiran siswa.

### Class Presensi

Class **Presensi** mencatat setiap transaksi kehadiran siswa. Atribut `idPresensi` menjadi **Primary Key**, sedangkan `nis` dan `idJadwal` merupakan **Foreign Key** yang menghubungkan data siswa dan jadwal presensi.

### Class Izin

Class **Izin** menyimpan data pengajuan izin ketidakhadiran siswa. Atribut `idIzin` menjadi **Primary Key**, sedangkan `nis` menjadi **Foreign Key** yang menghubungkan data izin dengan data siswa. Pengajuan izin dapat diverifikasi oleh guru maupun admin.

### Class Kelas

Class **Kelas** menyimpan informasi setiap kelas. Atribut `idKelas` menjadi **Primary Key**, sedangkan `idGuru` merupakan **Foreign Key** yang menunjukkan guru yang bertindak sebagai wali kelas. Jumlah siswa dihitung secara dinamis melalui method `getJumlahSiswa()`.

### Class JadwalPresensi

Class **JadwalPresensi** menyimpan konfigurasi jadwal presensi masuk dan pulang. Jadwal dapat diatur maupun diubah oleh administrator sesuai kebijakan sekolah.

### Class LaporanAbsensi

Class **LaporanAbsensi** menyimpan hasil rekapitulasi kehadiran siswa. Laporan dapat dibuat secara otomatis, difilter berdasarkan kebutuhan, serta diekspor ke berbagai format sehingga memudahkan proses monitoring oleh guru maupun administrator.