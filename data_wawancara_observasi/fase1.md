# Profil Organisasi

## SMP Negeri 4 Banguntapan

SMP Negeri 4 Banguntapan merupakan salah satu sekolah menengah pertama negeri yang berada di Kabupaten Bantul, Daerah Istimewa Yogyakarta. Sekolah telah memanfaatkan teknologi informasi dalam beberapa proses administrasi, seperti Penerimaan Peserta Didik Baru (PPDB) secara online, sistem presensi digital berbasis barcode, serta sistem perpustakaan berbasis aplikasi.

Sistem Presensi Digital dikembangkan secara mandiri oleh salah satu guru sebagai solusi untuk membantu Guru BK dalam mengelola data kehadiran siswa secara lebih efektif. Sistem ini menggunakan kartu pelajar yang memiliki barcode NIS sehingga proses presensi dapat dilakukan dengan lebih cepat dibandingkan metode manual.

Walaupun demikian, berdasarkan hasil observasi dan wawancara, sistem masih memiliki beberapa kendala sehingga diperlukan pengembangan agar sistem menjadi lebih optimal, stabil, dan dapat diakses oleh seluruh pihak yang membutuhkan.

---

# A. Problem Statement

Berdasarkan hasil observasi dan wawancara yang dilakukan di SMP Negeri 4 Banguntapan, diperoleh beberapa permasalahan pada sistem yang sedang digunakan, yaitu sebagai berikut.

## 1. Sistem Presensi

Sistem presensi telah menggunakan kartu pelajar yang memiliki barcode NIS. Presensi dilakukan sebanyak dua kali setiap hari, yaitu saat masuk sekolah dan saat pulang sekolah. Selain menggunakan barcode, sistem juga menyediakan fitur input NIS secara manual apabila terjadi kendala pada kartu maupun alat pemindai.

Namun, sistem masih berada pada tahap pengembangan sehingga belum berjalan secara optimal.

Permasalahan yang ditemukan antara lain:

- Sistem masih sering mengalami error teknis.
- Scanner barcode terkadang gagal membaca kartu pelajar.
- Sebagian siswa lupa melakukan scan karena belum terbiasa menggunakan sistem.
- Sebagian siswa tidak membawa kartu pelajar.
- Masih ditemukan praktik titip presensi kepada teman.
- Sistem hanya dapat diakses melalui komputer yang berada di lingkungan sekolah.

---

## 2. Pengelolaan Data Presensi

Data presensi saat ini hanya dapat diakses oleh Admin (Guru BK).

Guru mata pelajaran maupun wali kelas belum dapat mengakses data kehadiran siswa secara langsung sehingga mereka masih harus melakukan absensi secara manual pada saat proses pembelajaran berlangsung.

Kondisi tersebut menyebabkan:

- Terjadi pencatatan absensi ganda.
- Guru tidak memperoleh informasi kehadiran siswa secara real-time.
- Monitoring kehadiran menjadi kurang efisien.

---

## 3. Sistem Perizinan

Proses pengajuan izin ketidakhadiran siswa sebagian besar masih dilakukan secara manual menggunakan:

- Surat tertulis.
- Foto surat yang dikirim melalui WhatsApp kepada wali kelas.

Walaupun sistem telah menyediakan fitur unggah surat izin melalui aplikasi web, implementasinya masih belum digunakan secara optimal.

---

## 4. Sistem Perpustakaan

Perpustakaan telah menggunakan aplikasi untuk pengelolaan buku.

Namun berdasarkan hasil wawancara diperoleh beberapa kendala, yaitu:

- Sistem masih sering mengalami error.
- Database terkadang mengalami gangguan.
- Sebagian pencatatan buku paket masih dilakukan secara manual.
- Aplikasi hanya dapat digunakan melalui komputer perpustakaan.

---

## 5. Integrasi Sistem

Saat ini sistem presensi, sistem perizinan, dan sistem perpustakaan masih berjalan secara terpisah.

Belum tersedia integrasi data antar sistem sehingga informasi harus diakses melalui aplikasi yang berbeda.

---

## 6. Pengembangan Sistem

Pengembangan sistem saat ini masih dilakukan oleh satu orang guru sehingga proses maintenance, penambahan fitur, serta pengembangan sistem masih bergantung pada satu pengembang.

Akibatnya proses pengembangan berjalan cukup lambat apabila dibandingkan dengan kebutuhan pengguna yang terus bertambah.

---

# B. Identifikasi Stakeholder

Stakeholder merupakan pihak-pihak yang terlibat secara langsung maupun tidak langsung dalam penggunaan maupun pengelolaan Sistem Presensi Digital di SMP Negeri 4 Banguntapan. Berdasarkan hasil observasi dan wawancara, stakeholder yang terlibat adalah sebagai berikut.

| Stakeholder | Peran | Kebutuhan | Permasalahan |
|-------------|-------|-----------|--------------|
| **Siswa** | Melakukan presensi masuk dan pulang menggunakan barcode atau input NIS, melihat riwayat kehadiran, serta mengajukan izin melalui sistem. | Proses presensi yang cepat, mudah, dan akurat serta informasi kehadiran yang dapat diakses secara mandiri. | Lupa melakukan scan, tidak membawa kartu pelajar, scanner terkadang gagal membaca barcode. |
| **Guru Mata Pelajaran** | Memantau kehadiran siswa selama proses pembelajaran. | Dapat mengakses data kehadiran siswa secara real-time tanpa melakukan absensi ulang di kelas. | Belum memiliki akses terhadap data presensi sehingga masih melakukan absensi manual. |
| **Wali Kelas** | Memantau kehadiran siswa pada kelas yang diampu serta menindaklanjuti siswa yang sering tidak hadir. | Rekap kehadiran siswa yang mudah diakses dan selalu diperbarui. | Belum memperoleh laporan kehadiran secara otomatis. |
| **Guru BK (Admin)** | Mengelola sistem presensi, memverifikasi data, membuat laporan, dan melakukan monitoring kehadiran siswa. | Sistem yang stabil, mudah dikelola, dan mampu menghasilkan laporan otomatis. | Harus menangani data presensi seluruh siswa serta melakukan koreksi apabila terjadi kesalahan pencatatan. |
| **Petugas Perpustakaan** | Mengelola data buku dan transaksi peminjaman. | Sistem perpustakaan yang stabil dan mudah digunakan. | Aplikasi masih sering mengalami error dan sebagian pencatatan masih dilakukan secara manual. |
| **Orang Tua/Wali Murid** | Memantau kehadiran putra-putrinya di sekolah. | Informasi kehadiran siswa yang dapat diterima secara cepat. | Data presensi belum terintegrasi dengan orang tua sehingga informasi masih disampaikan melalui WhatsApp apabila diperlukan. |

---

# C. Kebutuhan Fungsional

Kebutuhan fungsional merupakan kebutuhan yang harus dipenuhi oleh sistem agar mampu mendukung proses bisnis yang berjalan di SMP Negeri 4 Banguntapan.

| Kode | Kebutuhan Fungsional |
|------|----------------------|
| **FR-01** | Sistem dapat melakukan presensi masuk menggunakan barcode pada kartu pelajar. |
| **FR-02** | Sistem dapat melakukan presensi pulang menggunakan barcode pada kartu pelajar. |
| **FR-03** | Sistem menyediakan input NIS secara manual apabila kartu tidak dapat digunakan. |
| **FR-04** | Sistem secara otomatis mencatat tanggal dan waktu presensi siswa. |
| **FR-05** | Sistem dapat menentukan status kehadiran siswa (hadir, terlambat, izin, sakit, atau alfa). |
| **FR-06** | Sistem dapat menyimpan riwayat presensi setiap siswa. |
| **FR-07** | Siswa dapat melihat riwayat kehadiran melalui aplikasi berbasis web. |
| **FR-08** | Siswa dapat mengajukan izin atau sakit dengan mengunggah dokumen pendukung. |
| **FR-09** | Guru atau Admin dapat melakukan verifikasi terhadap pengajuan izin siswa. |
| **FR-10** | Admin dapat mengatur jadwal presensi masuk dan pulang. |
| **FR-11** | Guru BK dapat memantau data kehadiran seluruh siswa secara real-time. |
| **FR-12** | Guru mata pelajaran dan wali kelas dapat melihat data kehadiran siswa sesuai hak akses yang dimiliki. |
| **FR-13** | Sistem dapat menghasilkan laporan kehadiran harian maupun bulanan secara otomatis. |
| **FR-14** | Sistem dapat mengekspor laporan kehadiran ke dalam format yang dibutuhkan. |
| **FR-15** | Sistem mampu mencatat seluruh aktivitas presensi secara otomatis ke dalam database. |
| **FR-16** | Sistem menyediakan fitur pencetakan kartu sementara apabila kartu pelajar hilang atau rusak. |
| **FR-17** | Sistem mampu memvalidasi waktu presensi sesuai jadwal yang telah ditentukan. |
| **FR-18** | Sistem menyediakan autentikasi pengguna sesuai peran (Admin, Guru, dan Siswa). |
| **FR-19** | Sistem membatasi akses menu administrator sehingga tidak dapat diakses oleh siswa. |
| **FR-20** | Sistem dapat menampilkan rekapitulasi kehadiran berdasarkan kelas maupun periode tertentu. |

---

# D. Kebutuhan Non-Fungsional

Kebutuhan non-fungsional merupakan kebutuhan yang berkaitan dengan kualitas sistem agar mampu berjalan dengan baik, aman, dan mudah digunakan oleh seluruh pengguna.

| Kode | Kebutuhan Non-Fungsional | Deskripsi |
|------|--------------------------|-----------|
| **NFR-01** | Availability | Sistem harus tersedia dan dapat digunakan selama jam operasional sekolah. |
| **NFR-02** | Performance | Sistem mampu memproses presensi dengan cepat sehingga tidak menimbulkan antrean panjang. |
| **NFR-03** | Reliability | Sistem mampu mencatat data presensi secara akurat dan meminimalkan kegagalan pencatatan. |
| **NFR-04** | Security | Data hanya dapat diakses sesuai hak akses pengguna (Admin, Guru, dan Siswa). |
| **NFR-05** | Usability | Tampilan sistem mudah dipahami dan digunakan oleh seluruh pengguna. |
| **NFR-06** | Maintainability | Sistem mudah diperbaiki dan dikembangkan apabila terdapat penambahan fitur maupun perbaikan bug. |
| **NFR-07** | Scalability | Sistem mampu menangani pertambahan jumlah pengguna maupun data tanpa menurunkan performa. |
| **NFR-08** | Compatibility | Sistem dapat dijalankan pada browser yang digunakan di lingkungan sekolah. |
| **NFR-09** | Accessibility | Sistem dapat diakses oleh pengguna sesuai dengan hak akses yang diberikan. |
| **NFR-10** | Data Integrity | Data presensi harus tersimpan secara konsisten dan tidak terjadi duplikasi data. |

---

# E. Traceability Matrix

Traceability Matrix digunakan untuk menunjukkan keterkaitan antara permasalahan yang ditemukan, stakeholder yang terlibat, serta kebutuhan fungsional yang diusulkan.

| Permasalahan | Stakeholder | Kebutuhan Fungsional |
|--------------|-------------|----------------------|
| Scanner barcode terkadang gagal membaca kartu pelajar. | Siswa, Admin | FR-03, FR-15 |
| Siswa sering lupa melakukan scan presensi. | Siswa | FR-04, FR-05 |
| Sebagian siswa tidak membawa kartu pelajar. | Siswa | FR-03 |
| Data presensi hanya dapat diakses oleh Guru BK. | Guru, Wali Kelas | FR-11, FR-12 |
| Guru masih melakukan absensi manual di kelas. | Guru Mata Pelajaran | FR-12, FR-20 |
| Pengajuan izin masih menggunakan surat atau WhatsApp. | Siswa, Guru | FR-08, FR-09 |
| Rekapitulasi kehadiran masih dilakukan secara manual. | Admin | FR-13, FR-14 |
| Belum tersedia laporan otomatis. | Admin | FR-13, FR-14 |
| Sistem belum memiliki pembatasan akses yang optimal. | Admin | FR-18, FR-19 |
| Sistem harus mampu mencatat seluruh aktivitas presensi secara otomatis. | Admin | FR-15 |

---

## Analisis Hasil Traceability Matrix

Berdasarkan hasil pemetaan pada Traceability Matrix, diketahui bahwa setiap permasalahan yang ditemukan selama observasi telah dipetakan dengan kebutuhan fungsional yang sesuai. Hal ini menunjukkan bahwa pengembangan sistem dilakukan berdasarkan kebutuhan nyata yang dialami oleh pengguna.

Permasalahan yang paling banyak ditemukan berkaitan dengan proses presensi, seperti kegagalan pemindaian barcode, siswa lupa melakukan presensi, serta keterbatasan akses terhadap data kehadiran. Oleh karena itu, kebutuhan fungsional difokuskan pada peningkatan proses pencatatan presensi, pengelolaan hak akses pengguna, penyediaan laporan otomatis, serta digitalisasi proses perizinan.

Selain meningkatkan efisiensi administrasi sekolah, kebutuhan fungsional yang diusulkan juga diharapkan mampu meningkatkan kualitas layanan sistem presensi sehingga dapat dimanfaatkan secara optimal oleh siswa, guru, wali kelas, maupun administrator sekolah.

---

# F. Metode Validasi

Validasi kebutuhan sistem dilakukan untuk memastikan bahwa kebutuhan yang telah diidentifikasi benar-benar sesuai dengan kondisi nyata di SMP Negeri 4 Banguntapan.

Metode validasi yang digunakan meliputi:

## 1. Observasi

Observasi dilakukan secara langsung di SMP Negeri 4 Banguntapan untuk memahami proses bisnis yang sedang berjalan, khususnya pada proses presensi siswa, administrasi sekolah, sistem perpustakaan, serta mekanisme perizinan siswa.

Hasil observasi menunjukkan bahwa sekolah telah menggunakan sistem presensi berbasis barcode, namun masih terdapat beberapa kendala baik dari sisi teknis maupun operasional.

---

## 2. Wawancara

Wawancara dilakukan dengan beberapa narasumber, yaitu:

- Wakil Kepala Sekolah
- Pak Bogi (Guru sekaligus Pengembang Sistem Presensi)
- Mbak Erina (Petugas Perpustakaan)

Wawancara dilakukan untuk memperoleh informasi mengenai proses bisnis, kebutuhan pengguna, kendala sistem yang sedang berjalan, serta rencana pengembangan sistem di masa mendatang.

Informasi yang diperoleh kemudian digunakan sebagai dasar dalam penyusunan kebutuhan fungsional dan non-fungsional sistem.

---

# G. Transkrip Wawancara

Transkrip wawancara disusun berdasarkan hasil wawancara yang dilakukan bersama pihak SMP Negeri 4 Banguntapan.

Dokumen transkrip wawancara memuat informasi mengenai:

- Profil narasumber.
- Pertanyaan yang diajukan.
- Jawaban narasumber.
- Hasil diskusi mengenai sistem presensi.
- Kendala sistem.
- Rencana pengembangan sistem.

Dokumen lengkap transkrip wawancara dapat dilihat pada file:

- **Hasil-Wawancara.md**

---

# H. Dokumentasi

Dokumentasi kegiatan berisi bukti pelaksanaan observasi dan wawancara di SMP Negeri 4 Banguntapan.

Dokumentasi meliputi:

- Foto kegiatan observasi.
- Foto proses wawancara.
- Dokumentasi sistem presensi.
- Dokumentasi lingkungan sekolah.

> Tambahkan seluruh foto dokumentasi pada bagian ini.

Contoh struktur folder:

```text
docs/
└── dokumentasi/
    ├── observasi-1.jpg
    ├── observasi-2.jpg
    ├── wawancara-1.jpg
    ├── wawancara-2.jpg
    └── sistem-presensi.jpg
```

---

# I. Link Hasil Wawancara

Dokumen hasil wawancara dapat diakses melalui tautan berikut.

**Google Docs**

https://docs.google.com/document/d/1LEKGEoGeP0LIWhF4nEqeWpKl4ZDmaFerLm7DxflZfNA/edit?usp=drive_link

---

# J. Notulensi Wawancara

Dokumen notulensi wawancara dapat diakses melalui tautan berikut.

**Google Docs**

https://docs.google.com/document/d/1LEKGEoGeP0LIWhF4nEqeWpKl4ZDmaFerLm7DxflZfNA/edit?usp=drivesdk

---

# Kesimpulan

Berdasarkan hasil observasi dan wawancara di SMP Negeri 4 Banguntapan, diperoleh gambaran bahwa sekolah telah memanfaatkan sistem presensi digital berbasis barcode untuk meningkatkan efisiensi pencatatan kehadiran siswa. Sistem tersebut telah memberikan manfaat dalam proses administrasi, namun masih terdapat beberapa kendala, seperti keterbatasan akses pengguna, gangguan teknis, proses perizinan yang belum sepenuhnya digital, serta belum terintegrasinya sistem dengan layanan lain di sekolah.

Melalui identifikasi stakeholder, penyusunan kebutuhan fungsional dan non-fungsional, serta analisis menggunakan Traceability Matrix, diperoleh rekomendasi pengembangan sistem yang diharapkan mampu meningkatkan kualitas layanan presensi, mempermudah proses administrasi, serta mendukung kebutuhan informasi bagi seluruh pengguna sistem.

Dokumen ini menjadi dasar dalam tahap pengembangan sistem selanjutnya sehingga solusi yang dihasilkan sesuai dengan kebutuhan pengguna dan kondisi nyata di lingkungan sekolah.

---