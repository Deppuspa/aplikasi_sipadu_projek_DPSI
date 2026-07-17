# Spesifikasi Kebutuhan Perangkat Lunak (SKPL) / Software Requirements Specification (SRS)

## Sistem Presensi Digital Siswa SMP N 4 Banguntapan — SIPADU

**Versi:** 1.0  
**Tanggal:** Juni 2026  
**Dokumen ini berdasarkan:** Studi Kasus Sipadu dan Analisis Basis Data Referensial

---

## 1. Pendahuluan

### 1.1 Latar Belakang

SMP N 4 Banguntapan selama ini menggunakan proses absensi manual dengan memanggil nama siswa satu per satu pada setiap jam pelajaran. Pendekatan tersebut tidak efisien, memakan waktu, dan rawan kesalahan pencatatan. Sebelumnya pernah diujicobakan sistem presensi berbasis scan barcode kartu pelajar dua kali sehari (pagi dan pulang), namun pendekatan ini ditemukan memiliki kelemahan signifikan: siswa tercatat hadir di scan pagi dan scan pulang, tetapi tidak mengikuti jam pelajaran di tengah hari. Oleh karena itu, pendekatan scan barcode dinyatakan tidak digunakan.

Sipadu (Sistem Presensi Digital Siswa) hadir sebagai solusi berbasis web yang menerapkan presensi **per jam pelajaran** dengan logika _default-hadir_, di mana guru mata pelajaran yang mengajar pada jam tersebut bertugas memverifikasi kehadiran siswa dengan mengecualikan (uncheck) siswa yang tidak hadir. Sistem ini juga menyediakan fitur pengajuan izin digital oleh siswa, rekapitulasi kehadiran otomatis dengan dua metode perhitungan berbeda (bulanan per mata pelajaran dan harian berbasis persentase), serta pengelolaan sistem secara terpusat oleh admin (Guru BK).

### 1.2 Tujuan

Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) ini bertujuan untuk:

1. Mendefinisikan secara jelas dan terperinci ruang lingkup, fitur, aktor, dan batasan sistem Sipadu.
2. Menjadi acuan bersama antara pengembang, pemangku kepentingan sekolah, dan tim penguji dalam memahami kebutuhan sistem.
3. Memastikan seluruh fungsi yang dibangun sesuai dengan kasus studi dan kebijakan sekolah tanpa menyimpang ke fitur-fitur di luar lingkup.
4. Menyediakan landasan bagi fase desain, implementasi, dan pengujian sistem.

### 1.3 Ruang Lingkup

Sipadu mencakup:

- Presensi digital **per jam pelajaran** dengan mekanisme default-hadir dan uncheck oleh guru mapel.
- Pengajuan izin ketidakhadiran oleh siswa secara digital **per hari**.
- Verifikasi izin oleh wali kelas dan/atau admin.
- Rekapitulasi kehadiran bulanan per mata pelajaran sebagai acuan penilaian.
- Rekapitulasi kehadiran harian berbasis persentase (threshold 60%, izin/sakit dihitung hadir).
- Pengelolaan jadwal jam pelajaran oleh admin.
- Manajemen hak akses pengguna oleh admin.
- Pembuatan dan unduh laporan rekapitulasi kehadiran.

---

## 2. Deskripsi Umum Sistem

Sipadu adalah sistem informasi berbasis web yang menggantikan proses absensi manual di SMP N 4 Banguntapan. Sistem ini dirancang dengan pendekatan **presensi per jam pelajaran**: setiap kali memasuki jam pelajaran baru, sistem secara otomatis menandai seluruh siswa di kelas tersebut sebagai **Hadir** (berstatus _default-hadir_). Guru mata pelajaran yang mengajar pada jam tersebut kemudian memeriksa kondisi kelas secara langsung dan **melepas centang (uncheck)** hanya pada siswa yang benar-benar tidak hadir.

Siswa memiliki akun login terbatas yang digunakan khusus untuk mengajukan izin ketidakhadiran dan melihat riwayat kehadiran milik sendiri. Siswa **tidak** melakukan presensi mandiri.

Rekapitulasi kehadiran dihasilkan secara otomatis oleh sistem dalam dua bentuk:

1. **Rekap Bulanan Per Mata Pelajaran** — menampilkan jumlah kehadiran dan ketidakhadiran siswa pada satu mata pelajaran selama periode satu bulan, digunakan sebagai acuan penilaian oleh guru mapel.
2. **Rekap Harian (Persentase)** — menghitung persentase jam pelajaran dengan status hadir terhadap total jam pelajaran pada hari tersebut. Jika persentase >= 60%, status hari tersebut = Hadir. Jika < 60%, status = Tidak Hadir. Status izin/sakit pada suatu jam pelajaran **dihitung sebagai hadir** dalam perhitungan ini.

Sistem dikelola sepenuhnya oleh admin (Guru BK) yang memiliki akses penuh terhadap seluruh fitur. Tidak terdapat fitur notifikasi otomatis (_push notification_, email, SMS, atau media lainnya).

---

## 3. Aktor dan Hak Akses

### 3.1 Siswa

| Atribut | Deskripsi |
|---|---|
| **Login** | Memiliki akun login (email/akun) dengan akses terbatas |
| **Hak akses** | Hanya dapat mengakses data dan riwayat kehadiran milik sendiri |
| **Kewajiban** | Tidak melakukan presensi mandiri; hanya mengajukan izin dan melihat riwayat |

**Method yang dimiliki:**
- `lihatRiwayatKehadiran()` — Menampilkan riwayat dan rekapitulasi kehadiran milik siswa secara mandiri
- `ajukanIzin()` — Mengajukan izin ketidakhadiran secara digital dengan melampirkan bukti pendukung

### 3.2 Guru Mata Pelajaran (Guru Mapel)

| Atribut | Deskripsi |
|---|---|
| **Login** | Memiliki akun login |
| **Hak akses** | Melakukan presensi pada kelas dan jam pelajaran yang diampunya |
| **Kewajiban** | Memeriksa kehadiran siswa dan melakukan uncheck pada siswa tidak hadir |

**Method yang dimiliki:**
- `lihatDataKehadiran()` — Mengakses data kehadiran siswa per kelas secara _real-time_
- `lihatLaporanAbsensi()` — Melihat laporan absensi harian maupun bulanan siswa
- `verifikasiIzinSiswa()` — Memverifikasi pengajuan izin ketidakhadiran siswa
- `tindakLanjutSiswaTidakHadir()` — Menindaklanjuti siswa yang tidak hadir
- `presensiPerJamPelajaran()` — Melakukan presensi setiap jam pelajaran (uncheck siswa tidak hadir)

### 3.3 Wali Kelas

| Atribut | Deskripsi |
|---|---|
| **Login** | Memiliki akun login |
| **Hak akses** | Kewenangan ganda: (a) sebagai guru mapel biasa jika mengajar di kelas tersebut, dan (b) kewenangan tambahan untuk memantau rekap kehadiran siswa di kelas yang diampunya |
| **Catatan** | Seorang guru dapat merangkap sebagai guru mapel dan wali kelas secara simultan |

**Method yang dimiliki:**
- Seluruh method yang dimiliki Guru Mapel
- `pantauRekapKelas()` — Memantau rekapitulasi kehadiran siswa di kelas yang diampunya secara _real-time_

### 3.4 Admin (Guru BK)

| Atribut | Deskripsi |
|---|---|
| **Login** | Memiliki akun login dengan akses penuh |
| **Hak akses** | Seluruh fitur sistem |
| **Peran** | Bukan Admin TU — admin adalah Guru BK yang mengelola presensi secara terpusat |

**Method yang dimiliki:**
- `kelolaDataPresensi()` — Mengelola seluruh data presensi siswa dalam sistem
- `aturJadwalPresensi()` — Mengatur jadwal jam pelajaran/sesi presensi
- `verifikasiDataPresensi()` — Memverifikasi dan memperbaiki data presensi yang bermasalah
- `kelolaHakAksesPengguna()` — Mengatur hak akses pengguna berdasarkan peran
- `verifikasiIzin()` — Memverifikasi izin siswa secara terpusat
- `buatLaporan()` — Membuat rekapitulasi laporan kehadiran berdasarkan periode tertentu
- `unduhLaporanAbsensi()` — Mengunduh atau mencetak laporan rekapitulasi kehadiran

---

## 4. Kebutuhan Fungsional

### 4.1 Manajemen Presensi Per Jam Pelajaran (Guru Mapel, Admin)

| ID | Kebutuhan Fungsional | Aktor | Deskripsi |
|---|---|---|---|
| F-01 | Memulai sesi presensi | Guru Mapel | Guru memulai sesi presensi untuk jam pelajaran tertentu. Sistem menampilkan daftar seluruh siswa di kelas dengan status default **Hadir** (tercentang). Hanya kelas dan jam pelajaran yang diampu guru tersebut yang dapat diakses. |
| F-02 | Uncheck siswa tidak hadir | Guru Mapel | Guru melepas centang (uncheck) pada siswa yang benar-benar tidak hadir. Siswa yang tetap tercentang otomatis tercatat hadir. |
| F-03 | Menyimpan presensi | Guru Mapel | Guru menyimpan hasil presensi setelah melakukan uncheck. Data presensi per siswa, per jam pelajaran, per tanggal tersimpan dalam sistem. |
| F-04 | Verifikasi data presensi bermasalah | Admin | Admin dapat memverifikasi dan memperbaiki data presensi yang bermasalah. |
| F-05 | Melihat data kehadiran _real-time_ | Guru Mapel, Wali Kelas | Guru mapel dapat melihat data kehadiran siswa di kelas yang diampunya. Wali kelas dapat melihat data kehadiran seluruh siswa di kelas binaannya. |

### 4.2 Pengajuan Izin Ketidakhadiran (Siswa, Guru, Admin)

| ID | Kebutuhan Fungsional | Aktor | Deskripsi |
|---|---|---|---|
| F-06 | Mengajukan izin | Siswa | Siswa login dan mengajukan izin ketidakhadiran untuk suatu tanggal. Izin bersifat **per hari** — satu pengajuan berlaku untuk seluruh jam pelajaran pada tanggal tersebut. |
| F-07 | Memilih jenis izin | Siswa | Siswa memilih kategori izin: **sakit**, **izin**, atau **lainnya**. |
| F-08 | Mengunggah bukti pendukung | Siswa | Siswa mengunggah file bukti pendukung (misal: surat dokter) sebagai lampiran pengajuan izin. |
| F-09 | Verifikasi izin | Wali Kelas, Admin | Wali kelas dan/atau admin memverifikasi pengajuan izin dan memperbarui status menjadi **menunggu**, **disetujui**, atau **ditolak**. |
| F-10 | Melihat status izin | Siswa | Siswa dapat melihat status terkini dari pengajuan izin yang telah diajukan. |

### 4.3 Rekapitulasi dan Laporan (Admin, Guru Mapel, Wali Kelas)

| ID | Kebutuhan Fungsional | Aktor | Deskripsi |
|---|---|---|---|
| F-11 | Rekap bulanan per mata pelajaran | Admin, Guru Mapel, Wali Kelas | Sistem menghasilkan rekapitulasi kehadiran per mata pelajaran selama periode satu bulan, digunakan sebagai acuan penilaian. Menampilkan jumlah hadir dan tidak hadir setiap siswa. |
| F-12 | Rekap harian berbasis persentase | Admin, Wali Kelas | Sistem secara otomatis menghitung status kehadiran harian setiap siswa berdasarkan threshold 60%. Izin/sakit dihitung sebagai hadir. |
| F-13 | Filter laporan | Admin, Wali Kelas | Laporan dapat disaring berdasarkan kelas, tanggal, atau nama siswa. |
| F-14 | Unduh laporan | Admin | Admin dapat mengunduh atau mencetak laporan rekapitulasi kehadiran dalam format tertentu. |

### 4.4 Manajemen Jadwal Pelajaran (Admin)

| ID | Kebutuhan Fungsional | Aktor | Deskripsi |
|---|---|---|---|
| F-15 | Mengatur jadwal jam pelajaran | Admin | Admin mengatur jadwal jam pelajaran yang menjadi acuan sesi-sesi presensi per kelas per hari. |
| F-16 | Mengubah jadwal | Admin | Admin dapat mengubah jadwal jam pelajaran yang berlaku. |

### 4.5 Manajemen Hak Akses (Admin)

| ID | Kebutuhan Fungsional | Aktor | Deskripsi |
|---|---|---|---|
| F-17 | Mengelola hak akses pengguna | Admin | Admin mengatur hak akses pengguna berdasarkan peran: siswa hanya dapat mengakses data sendiri, guru mapel hanya dapat mengakses kelas yang diampu, wali kelas memiliki akses tambahan ke kelas binaan, admin dapat mengakses seluruh fitur. |

### 4.6 Riwayat Kehadiran (Siswa)

| ID | Kebutuhan Fungsional | Aktor | Deskripsi |
|---|---|---|---|
| F-18 | Melihat riwayat kehadiran sendiri | Siswa | Siswa dapat melihat riwayat dan rekapitulasi kehadiran miliknya sendiri. |

### 4.7 Registrasi dan Autentikasi (Semua Aktor)

| ID | Kebutuhan Fungsional | Aktor | Deskripsi |
|---|---|---|---|
| F-19 | Registrasi mandiri (self-service) | Siswa, Guru Mapel, Wali Kelas, Admin | Setiap aktor dapat mendaftarkan akun secara mandiri melalui form registrasi yang menyesuaikan dengan peran yang dipilih. Form registrasi mencakup field yang relevan sesuai peran. Akun yang berhasil didaftarkan langsung aktif dan dapat digunakan untuk login tanpa proses verifikasi atau approval dari pihak lain. |
| F-20 | Login dengan email dan password | Siswa, Guru Mapel, Wali Kelas, Admin | Setiap aktor login menggunakan email dan password yang telah didaftarkan. Setiap akun terikat pada **satu peran tetap** (role-locked). Setelah login, sistem mengarahkan (redirect) pengguna ke dashboard yang sesuai dengan peran akun tersebut. Akun tidak dapat mengakses dashboard atau fitur milik peran lain. |

---

## 5. Kebutuhan Non-Fungsional

| ID | Kebutuhan Non-Fungsional | Deskripsi |
|---|---|---|
| NF-01 | Berbasis web | Sistem dibangun sebagai aplikasi web yang dapat diakses melalui peramban (_browser_) tanpa instalasi khusus. |
| NF-02 | Multi-aktor | Sistem mendukung empat jenis aktor (siswa, guru mapel, wali kelas, admin) dengan hak akses berbeda. |
| NF-03 | Keamanan akses | Setiap aktor hanya dapat mengakses data dan fitur sesuai dengan perannya. Tidak ada seorang pun selain admin yang dapat mengakses data di luar kewenangannya. |
| NF-04 | Akurasi data | Data presensi harus akurat — sistem menggunakan logika default-hadir yang meminimalkan risiko siswa tidak tercatat karena lupa absen. |
| NF-05 | Otomatisasi rekap | Rekap harian dan bulanan dihasilkan secara otomatis oleh sistem tanpa perhitungan manual. |
| NF-06 | Ketersediaan | Sistem harus tersedia selama jam operasional sekolah (hari dan jam pelajaran berlangsung). |
| NF-07 | Antarmuka responsif | Antarmuka sistem harus responsif dan dapat digunakan pada perangkat yang tersedia di sekolah (komputer laboratorium, tablet, atau ponsel guru). |

---

## 6. Model Data

### 6.1 Entitas dan Atribut

Berikut adalah entitas data dalam sistem Sipadu, disusun berdasarkan adaptasi dari skema referensi dengan penyesuaian terhadap studi kasus.

#### 6.1.1 Siswa

Menyimpan data siswa. Siswa memiliki akun login (email) terbatas untuk mengajukan izin dan melihat riwayat. Tidak terdapat atribut barcode karena _scan barcode tidak digunakan_.

**Atribut:**

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|---|---|---|---|---|
| 1 | PK | nis | String | Nomor Induk Siswa, identitas unik siswa |
| 2 | - | namaLengkap | String | Nama lengkap siswa |
| 3 | - | jenisKelamin | ENUM('L','P') | Jenis kelamin siswa |
| 4 | FK | idKelas | String | Referensi kelas tempat siswa terdaftar |
| 5 | - | email | String | Alamat email siswa, digunakan sebagai akun login ke sistem |
| 6 | - | password | String | Kata sandi akun siswa |

**Method:**
- `lihatRiwayatKehadiran()` — Menampilkan riwayat kehadiran milik sendiri
- `ajukanIzin()` — Mengajukan izin ketidakhadiran digital

#### 6.1.2 Guru

Menyimpan data guru yang dapat memiliki peran sebagai guru mapel, wali kelas, atau keduanya secara simultan.

**Atribut:**

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|---|---|---|---|---|
| 1 | PK | idGuru | String | Kode unik identitas guru |
| 2 | - | namaGuru | String | Nama lengkap guru |
| 3 | - | email | String | Alamat email untuk login |
| 4 | - | password | String | Kata sandi akun guru |
| 5 | - | role | ENUM('guru_mapel', 'wali_kelas', 'keduanya') | Peran guru: guru_mapel (hanya mengajar), wali_kelas (hanya wali kelas, tidak mengajar), atau keduanya (mengajar dan menjadi wali kelas) |
| 6 | - | mataPelajaran | String | Mata pelajaran yang diampu oleh guru (relevan jika role = guru_mapel atau keduanya) |
| 7 | FK | idKelas | String | ID kelas binaan (relevan jika role = wali_kelas atau keduanya) |

**Method:**
- `lihatDataKehadiran()` — Mengakses data kehadiran per kelas
- `lihatLaporanAbsensi()` — Melihat laporan absensi
- `verifikasiIzinSiswa()` — Memverifikasi izin siswa
- `tindakLanjutSiswaTidakHadir()` — Menindaklanjuti siswa tidak hadir
- `presensiPerJamPelajaran()` — Melakukan presensi jam pelajaran
- `pantauRekapKelas()` — (khusus wali kelas) Memantau rekap kelas binaan

#### 6.1.3 Admin (Guru BK)

Menyimpan data admin yang merupakan Guru BK, bukan Admin TU.

**Atribut:**

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|---|---|---|---|---|
| 1 | PK | idAdmin | String | Kode unik identitas admin |
| 2 | - | namaAdmin | String | Nama lengkap admin (Guru BK) |
| 3 | - | email | String | Alamat email admin untuk login |
| 4 | - | username | String | Nama pengguna admin |
| 5 | - | password | String | Kata sandi admin |

**Method:**
- `kelolaDataPresensi()` — Mengelola data presensi
- `aturJadwalPelajaran()` — Mengatur jadwal jam pelajaran
- `verifikasiDataPresensi()` — Memverifikasi data presensi
- `kelolaHakAksesPengguna()` — Mengelola hak akses
- `verifikasiIzin()` — Memverifikasi izin siswa
- `buatLaporan()` — Membuat laporan rekap
- `unduhLaporanAbsensi()` — Mengunduh laporan

#### 6.1.4 Presensi

Menyimpan data transaksi presensi **per jam pelajaran** (bukan per hari check-in/check-out). Setiap record mewakili status kehadiran satu siswa pada satu jam pelajaran tertentu pada satu tanggal.

**Atribut:**

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|---|---|---|---|---|
| 1 | PK | idPresensi | String | Kode unik record presensi |
| 2 | FK | nis | String | Referensi siswa yang dipresensi |
| 3 | FK | idJadwalPelajaran | String | Referensi jadwal jam pelajaran |
| 4 | FK | idGuru | String | Referensi guru yang melakukan presensi |
| 5 | - | tanggal | Date | Tanggal presensi |
| 6 | - | statusHadir | Boolean | Status kehadiran: **true** (Hadir, default) atau **false** (Tidak Hadir setelah di-uncheck guru) |
| 7 | - | statusManual | ENUM('hadir','tidak_hadir','sakit','izin') | Status akhir yang tercatat; sakit/izin berasal dari izin yang disetujui dan di-override ke hadir pada rekap harian |

**Method:**
- `inisialisasiDefaultHadir()` — Menandai semua siswa sebagai hadir (default) saat jam pelajaran dimulai
- `uncheckSiswa()` — Melepas centang (menandai tidak hadir) untuk siswa tertentu
- `simpanPresensi()` — Menyimpan hasil presensi
- `getStatusKehadiran()` — Mengembalikan status kehadiran siswa pada jam tersebut

#### 6.1.5 Izin

Menyimpan data pengajuan izin ketidakhadiran siswa. Satu izin berlaku untuk **seluruh jam pelajaran** pada tanggal yang diajukan _(per day)_.

**Atribut:**

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|---|---|---|---|---|
| 1 | PK | idIzin | String | Kode unik pengajuan izin |
| 2 | FK | nis | String | Referensi siswa pengaju izin |
| 3 | - | tanggalIzin | Date | Tanggal ketidakhadiran yang diajukan (satu tanggal) |
| 4 | - | jenisIzin | ENUM('sakit','izin','lainnya') | Kategori izin |
| 5 | - | keterangan | String | Deskripsi alasan ketidakhadiran |
| 6 | - | buktiPendukung | String | Path atau nama file bukti yang diunggah |
| 7 | - | statusIzin | ENUM('menunggu','disetujui','ditolak') | Status verifikasi izin |

**Method:**
- `ajukanIzin()` — Mengajukan permohonan izin
- `unggahBukti()` — Melampirkan file bukti pendukung
- `verifikasiIzin()` — Memverifikasi status izin
- `getStatusIzin()` — Menampilkan status izin terkini

#### 6.1.6 Kelas

Menyimpan data kelas.

**Atribut:**

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|---|---|---|---|---|
| 1 | PK | idKelas | String | Kode unik kelas |
| 2 | - | namaKelas | String | Nama kelas (contoh: VII A, VIII B) |
| 3 | FK | idGuru | String | Referensi guru yang menjadi wali kelas |

**Method:**
- `getDaftarSiswa()` — Menampilkan daftar siswa dalam kelas
- `getJumlahSiswa()` — Menghitung jumlah siswa
- `getRekapKehadiran()` — Menampilkan rekap kehadiran per kelas

#### 6.1.7 JadwalPelajaran

Menggantikan konsep JadwalPresensi pada skema referensi. Menyimpan jadwal jam pelajaran per kelas per hari, yang menjadi acuan sesi-sesi presensi.

**Atribut:**

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|---|---|---|---|---|
| 1 | PK | idJadwalPelajaran | String | Kode unik jadwal pelajaran |
| 2 | FK | idKelas | String | Referensi kelas |
| 3 | FK | idGuru | String | Referensi guru pengampu |
| 4 | - | hari | ENUM('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu') | Hari pelaksanaan |
| 5 | - | jamMulai | Time | Waktu mulai jam pelajaran |
| 6 | - | jamSelesai | Time | Waktu selesai jam pelajaran |
| 7 | - | mataPelajaran | String | Nama mata pelajaran |
| 8 | - | semester | String | Semester berlaku (contoh: 2025/2026-Ganjil) |

**Method:**
- `aturJadwal()` — Menetapkan atau memperbarui jadwal
- `getJadwalKelas()` — Mengambil jadwal untuk suatu kelas pada hari tertentu
- `ubahJadwal()` — Mengubah jadwal yang berlaku

#### 6.1.8 LaporanAbsensi

Menyimpan data rekapitulasi kehadiran yang dihasilkan otomatis oleh sistem.

**Atribut:**

| No | Key | Nama Atribut | Tipe Data | Keterangan |
|---|---|---|---|---|
| 1 | PK | idLaporan | String | Kode unik laporan |
| 2 | FK | idKelas | String | Referensi kelas yang dilaporkan |
| 3 | - | periodeAwal | Date | Tanggal awal periode laporan |
| 4 | - | periodeAkhir | Date | Tanggal akhir periode laporan |
| 5 | - | jenisLaporan | ENUM('harian','bulanan') | Jenis laporan: harian (persentase) atau bulanan (per mata pelajaran) |
| 6 | - | dataLaporan | JSON / Text | Data rekapitulasi dalam format terstruktur |

**Method:**
- `generateLaporan()` — Menghasilkan laporan secara otomatis
- `eksporLaporan()` — Mengekspor laporan ke format unduhan
- `filterLaporan()` — Menyaring data laporan

### 6.2 Relasi Antar Entitas

| No | Entitas 1 | Relasi | Entitas 2 | Keterangan |
|---|---|---|---|---|
| 1 | Siswa | One-to-Many | Presensi | Satu siswa memiliki banyak record presensi (per jam pelajaran) |
| 2 | Siswa | One-to-Many | Izin | Satu siswa dapat mengajukan banyak izin |
| 3 | Siswa | Many-to-One | Kelas | Banyak siswa tergabung dalam satu kelas |
| 4 | Guru | One-to-Many | JadwalPelajaran | Satu guru dapat mengampu banyak jadwal pelajaran |
| 5 | Guru (wali) | One-to-Many | Kelas | Satu guru (sebagai wali kelas) dapat menjadi wali untuk satu kelas |
| 6 | Guru | One-to-Many | Presensi | Satu guru dapat melakukan banyak record presensi |
| 7 | Guru | Many-to-Many | Izin | Guru/wali kelas memverifikasi izin siswa |
| 8 | Admin | One-to-Many | JadwalPelajaran | Admin mengatur jadwal pelajaran |
| 9 | Admin | One-to-Many | LaporanAbsensi | Admin membuat dan mengunduh laporan |
| 10 | Admin | Many-to-Many | Izin | Admin memverifikasi izin secara terpusat |
| 11 | Kelas | One-to-Many | JadwalPelajaran | Satu kelas memiliki banyak jadwal pelajaran |
| 12 | Kelas | One-to-Many | LaporanAbsensi | Laporan dibuat berdasarkan kelas |
| 13 | Presensi | Many-to-One | JadwalPelajaran | Presensi mengacu pada jadwal pelajaran tertentu |
| 14 | Izin | Many-to-One | JadwalPelajaran | Izin memengaruhi status kehadiran pada seluruh jadwal di tanggal tersebut |

---

## 7. Business Rules & Validation Rules

### 7.1 Logika Presensi: Default-Hadir dan Uncheck Per Jam Pelajaran

**BR-01 — Default Hadir:** Setiap kali sesi presensi untuk suatu jam pelajaran dimulai, sistem secara otomatis menandai **semua siswa** yang terdaftar di kelas tersebut sebagai **Hadir** (status = true / tercentang).

**BR-02 — Uncheck oleh Guru Mapel:** Guru mapel yang mengajar pada jam tersebut **wajib** memeriksa kondisi kelas dan **melepas centang (uncheck)** hanya pada siswa yang benar-benar **tidak hadir**. Guru tidak perlu mencentang siswa yang hadir karena status hadir sudah menjadi default.

**BR-03 — Presensi Per Jam Pelajaran:** Proses pada BR-01 dan BR-02 berulang **setiap kali jam pelajaran berganti**. Status kehadiran satu siswa dapat berbeda antar jam pelajaran dalam satu hari yang sama. Contoh: Siswa A hadir pada jam pelajaran Matematika (07.00–08.30) tetapi tidak hadir pada jam pelajaran Bahasa Indonesia (08.30–10.00).

**BR-04 — Akses Presensi Guru Mapel:** Guru mapel **hanya** dapat mengakses dan melakukan presensi pada kelas dan jam pelajaran yang diampunya. Guru tidak dapat mengakses kelas atau jam pelajaran di luar tanggung jawabnya.

**BR-05 — Verifikasi Admin:** Admin (Guru BK) dapat memverifikasi dan memperbaiki data presensi yang bermasalah jika terjadi kesalahan pencatatan.

### 7.2 Logika Pengajuan Izin

**BR-06 — Izin Per Hari:** Satu pengajuan izin **hanya untuk satu tanggal** dan berlaku untuk **seluruh jam pelajaran** pada tanggal tersebut. Tidak ada pengajuan izin per jam pelajaran.

**BR-07 — Kategori Izin:** Izin dikategorikan menjadi tiga jenis: **sakit** (disertai bukti surat dokter), **izin** (untuk keperluan yang diketahui sekolah), dan **lainnya** (untuk keperluan di luar kategori tersebut).

**BR-08 — Bukti Pendukung:** Setiap pengajuan izin **wajib** menyertakan unggahan file bukti pendukung (misal: surat dokter untuk kategori sakit).

**BR-09 — Status Izin:** Izin memiliki tiga status: **menunggu** (saat baru diajukan), **disetujui** (jika izin diterima), atau **ditolak** (jika izin tidak memenuhi ketentuan).

**BR-10 — Verifikator Izin:** Izin diverifikasi oleh **wali kelas** dan/atau **admin (Guru BK)**. Hanya wali kelas dan admin yang dapat mengubah status izin.

**BR-11 — Dampak Izin pada Presensi:** Jika izin disetujui, maka untuk seluruh jam pelajaran pada tanggal yang diajukan, status kehadiran siswa dianggap **Hadir** (sama dengan status hadir biasa) pada perhitungan rekap harian berbasis persentase.

### 7.3 Logika Rekapitulasi Harian (Persentase)

**BR-12 — Perhitungan Persentase Harian:** Status kehadiran harian seorang siswa dihitung dengan rumus:

```
Persentase = (Jumlah jam pelajaran dengan status Hadir*) / (Total jam pelajaran pada hari tersebut) × 100%

*Status Hadir mencakup: hadir biasa, sakit (dengan izin disetujui), izin (dengan izin disetujui)
```

**BR-13 — Threshold 60%:** Jika `Persentase >= 60%`, maka status kehadiran hari tersebut = **HADIR**. Jika `Persentase < 60%`, maka status hari tersebut = **TIDAK HADIR**.

**BR-14 — Izin/Sakit Dihitung sebagai Hadir:** Untuk perhitungan pada BR-12, jam pelajaran yang statusnya **sakit** atau **izin** (dengan izin yang telah disetujui) **dihitung sebagai Hadir** dalam pembilang persentase — tidak mengurangi persentase kehadiran.

**BR-15 — Otomatisasi:** Rekap harian dihasilkan secara **otomatis** oleh sistem, tidak dihitung atau diolah secara manual.

### 7.4 Logika Rekapitulasi Bulanan Per Mata Pelajaran

**BR-16 — Periode Bulanan:** Rekap dihitung per periode **satu bulan**, per **mata pelajaran**.

**BR-17 — Acuan Penilaian:** Rekap bulanan per mata pelajaran digunakan sebagai **acuan penilaian** oleh guru mapel terhadap siswa di mata pelajaran yang diampunya. Ini bukan sistem penilaian akademik, melainkan data kehadiran yang menjadi referensi nilai.

**BR-18 — Isi Rekap:** Menampilkan jumlah kehadiran dan jumlah ketidakhadiran siswa pada mata pelajaran tertentu selama satu bulan.

### 7.5 Logika Autentikasi dan Otorisasi Peran

**BR-19 — Role-Locked Login:** Setiap akun memiliki **satu peran tetap** yang ditentukan saat registrasi dan tidak dapat diubah setelahnya. Sistem WAJIB memverifikasi peran akun pada setiap login dan mengarahkan (redirect) pengguna ke dashboard yang sesuai dengan perannya. Akun TIDAK BOLEH dapat mengakses dashboard atau fitur milik peran lain, baik melalui navigasi menu, manipulasi URL, maupun cara lainnya.

**BR-20 — Registrasi Tanpa Verifikasi:** Akun yang berhasil melakukan registrasi dapat langsung digunakan untuk login tanpa proses verifikasi atau approval dari pihak lain. Sistem tidak menerapkan mekanisme aktivasi akun (email confirmation, admin approval, dsb).

### 7.6 Validasi Rules

| ID | Validasi | Deskripsi |
|---|---|---|
| VR-01 | Unik NIS | Setiap siswa memiliki NIS yang unik dan tidak boleh duplikat |
| VR-02 | Unik ID Guru | Setiap guru memiliki ID guru yang unik |
| VR-03 | Tanggal Izin Valid | Tanggal izin tidak boleh berupa tanggal di masa depan (kecuali konteks pengajuan lebih awal) — sistem menyesuaikan dengan kebijakan sekolah |
| VR-04 | Satu Izin Per Hari Per Siswa | Seorang siswa hanya dapat memiliki satu pengajuan izin aktif (status menunggu/disetujui) untuk tanggal yang sama |
| VR-05 | Akses Data Siswa | Siswa hanya dapat melihat data miliknya sendiri; sistem wajib memfilter berdasarkan identitas siswa yang login |
| VR-06 | Akses Presensi Guru | Guru mapel hanya dapat mengakses data presensi pada kelas yang terdaftar dalam jadwal mengajarnya |
| VR-07 | Akses Wali Kelas | Wali kelas dapat mengakses data presensi seluruh siswa di kelas binaannya |
| VR-08 | Default Hadir Tidak Bisa Dikosongkan | Sistem tidak boleh menyajikan sesi presensi dengan semua siswa tidak tercentang; minimal sistem telah mengisi default hadir sebelum guru melakukan uncheck |
| VR-09 | Email Unik | Setiap email yang digunakan untuk registrasi harus unik di seluruh sistem dan tidak boleh digunakan lebih dari satu akun, lintas peran. Sistem wajib memvalidasi keunikan email sebelum menyimpan akun baru. |
| VR-10 | Akses Terkunci Peran | Sistem wajib memvalidasi peran akun pada setiap request/navigasi halaman. Akun tidak dapat membuka rute/dashboard peran lain. Setiap halaman dashboard wajib melakukan guard berdasarkan peran yang diizinkan. |

---

## 8. Batasan Sistem

1. **Batasan Akses Data:** Setiap aktor hanya dapat mengakses data yang sesuai dengan perannya. Siswa hanya melihat data sendiri, guru mapel hanya pada kelas/jam yang diampu, wali kelas pada kelas binaan, admin di seluruh data.

2. **Batasan Presensi Mandiri:** Siswa **tidak dapat** melakukan presensi mandiri. Presensi hanya dilakukan oleh guru mapel yang mengajar.

3. **Batasan Perangkat:** Sistem berjalan di atas peramban web (browser) dan tidak memiliki aplikasi mobile native.

4. **Batasan Notifikasi:** Sistem **tidak** memiliki fitur notifikasi otomatis (push notification, email, SMS, WhatsApp, atau media lainnya). Status kehadiran dan izin dicek secara manual oleh aktor melalui sistem.

5. **Batasan Non-Integrasi:** Sistem tidak terintegrasi dengan sistem akademik penilaian, sistem pembayaran SPP/keuangan, sistem manajemen pegawai, atau sistem pihak ketiga lainnya.

6. **Batasan Jaringan:** Sistem beroperasi di lingkungan jaringan sekolah atau dapat diakses melalui internet dengan koneksi yang memadai.

7. **Batasan Waktu Operasional:** Presensi hanya dapat dilakukan pada jam pelajaran yang telah dijadwalkan oleh admin.

---

## 9. Out-of-Scope Items

Fitur dan fungsionalitas berikut secara eksplisit **tidak termasuk** dalam ruang lingkup Sipadu dan tidak akan diimplementasikan:

| No | Item | Alasan |
|---|---|---|
| 1 | **Presensi berbasis barcode/scanner** | Studi kasus secara eksplisit menyatakan pendekatan scan barcode dua-kali-sehari TIDAK digunakan. Seluruh atribut barcode (barcodeKartu, scanBarcode, inputNISManual) dihapus. |
| 2 | **Model check-in/check-out dua kali sehari** | Sistem menggunakan presensi per jam pelajaran, bukan model masuk-pulang. Atribut waktuMasuk, waktuPulang, metodePresensi pada entitas Presensi tidak digunakan. |
| 3 | **Notifikasi otomatis (push, email, SMS, WhatsApp)** | Studi kasus menyatakan TIDAK ADA fitur notifikasi otomatis. |
| 4 | **Sistem penilaian akademik** | Rekap kehadiran hanya sebagai **acuan penilaian**, bukan sistem penilaian itu sendiri. Tugas penilaian tetap dilakukan oleh guru melalui sistem terpisah. |
| 5 | **Pembayaran SPP / sistem keuangan** | Tidak disebutkan dalam studi kasus. |
| 6 | **Manajemen pegawai/staff/HR** | Tidak disebutkan dalam studi kasus. |
| 7 | **Multi-sekolah / multi-cabang** | Sistem khusus untuk SMP N 4 Banguntapan. |
| 8 | **Aplikasi mobile native (Android/iOS)** | Sistem berbasis web, tidak ada aplikasi mobile native. |
| 9 | **Integrasi dengan pihak ketiga (payment gateway, API eksternal)** | Tidak disebutkan dalam studi kasus. |
| 10 | **Manajemen kurikulum atau materi ajar** | Tidak disebutkan dalam studi kasus. |
| 11 | **Jadwal Presensi (JadwalPresensi) dengan batas waktu masuk/pulang** | Konsep ini digantikan oleh JadwalPelajaran yang mengatur jam pelajaran sebagai sesi presensi. Batas waktu masuk/pulang tidak relevan dalam model per jam pelajaran. |
| 12 | **Admin Tata Usaha (TU)** | Admin dalam sistem ini adalah Guru BK, bukan Admin TU. |

---

*Dokumen ini disusun berdasarkan Studi Kasus Sipadu dan Analisis Basis Data Referensial. Seluruh keputusan desain mengacu pada studi kasus sebagai Source of Truth utama. Dokumen ini menjadi acuan untuk tahap implementasi berikutnya.*
