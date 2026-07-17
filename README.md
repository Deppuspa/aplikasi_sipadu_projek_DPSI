# SIPADU - Presensi Siswa SMP N 4 BANGUNTAPAN

## 📖 Deskripsi Singkat

**SIPADU** adalah sistem informasi berbasis web yang menggantikan proses absensi manual di **SMP Negeri 4 Banguntapan**. Sistem ini dirancang menggunakan konsep **presensi per jam pelajaran**, sehingga setiap memasuki jam pelajaran baru seluruh siswa pada kelas tersebut secara otomatis akan berstatus **Hadir** (default hadir). Guru mata pelajaran kemudian hanya perlu melakukan pemeriksaan kelas dan mengubah status siswa yang benar-benar tidak hadir dengan melepas centang (uncheck) pada daftar presensi.

Siswa memiliki akun yang digunakan **khusus untuk login**, **mengajukan izin ketidakhadiran**, dan **melihat riwayat kehadiran pribadi**. Siswa **tidak melakukan presensi secara mandiri**.

Sistem secara otomatis menghasilkan dua jenis rekapitulasi kehadiran:

### Rekap Bulanan Per Mata Pelajaran
Menampilkan jumlah kehadiran dan ketidakhadiran siswa pada setiap mata pelajaran selama satu bulan. Rekap ini digunakan sebagai acuan penilaian kehadiran oleh guru mata pelajaran.

### Rekap Harian (Persentase)
Menghitung persentase kehadiran siswa berdasarkan jumlah jam pelajaran yang diikuti pada hari tersebut.

- Jika persentase kehadiran **≥ 60%**, maka status hari tersebut adalah **Hadir**.
- Jika persentase kehadiran **< 60%**, maka status hari tersebut adalah **Tidak Hadir**.
- Status **Izin** dan **Sakit** pada suatu jam pelajaran tetap dihitung sebagai **Hadir** dalam perhitungan persentase.

Seluruh sistem dikelola oleh **Admin (Guru BK)** yang memiliki akses penuh terhadap seluruh fitur aplikasi. SIPADU tidak menyediakan fitur notifikasi otomatis seperti push notification, email, maupun SMS.

---

# 👥 Anggota Tim

| No | Nama | NIM |
|----|----------------------------|-------------|
| 1 | Lalu Atwi Suparman | 2300016074 |
| 2 | Naedhiah Mokessa Della | 2400016020 |
| 3 | Putri Miftakhul Jannah | 2400016021 |
| 4 | Alvia Fatma Suttawati | 2400016058 |
| 5 | Devi Puspa Rosalinda | 2400016060 |

---

# 📌 Pembagian Peran Anggota

| Nama | Tugas |
|------|-------|
| **Lalu Atwi Suparman** | Backend fitur Registrasi dan Login |
| **Naedhiah Mokessa Della** | Backend tampilan Guru Mata Pelajaran, Frontend tampilan Guru Mata Pelajaran, Penyusunan Desain Sistem |
| **Putri Miftakhul Jannah** | Frontend dan Backend Siswa, Penyusunan Arsitektur Informasi |
| **Alvia Fatma Suttawati** | Frontend dan Backend Admin, Penyusunan Folder Dokumentasi |
| **Devi Puspa Rosalinda** | Frontend dan Backend Wali Kelas, Penyusunan Software Requirements Specification (SRS) |

---

# 🛠️ Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL
- Bootstrap
- XAMPP
- Git
- GitHub

---

# ▶️ Cara Menjalankan Aplikasi

1. Clone repository GitHub.

```bash
git clone https://github.com/username/sipadu.git
```

2. Pindahkan folder proyek ke direktori `htdocs` pada XAMPP.

3. Jalankan **Apache** dan **MySQL** melalui XAMPP Control Panel.

4. Import database SIPADU ke MySQL melalui phpMyAdmin.

5. Sesuaikan konfigurasi database pada file koneksi (misalnya `config.php`).

6. Buka browser dan akses aplikasi melalui:

```text
http://localhost/sipadu
```

---

# 🔑 Akun Demo

Berikut adalah akun yang dapat digunakan untuk mencoba fitur sesuai dengan masing-masing peran.

| Role | Email | Password | Keterangan |
|------|-------|----------|------------|
| **Siswa** | `ahmad.fauzi@siswa.sch.id` | `siswa123` | Contoh akun siswa (seluruh akun siswa menggunakan password yang sama). |
| **Guru Mata Pelajaran (Matematika)** | `siti.rahma@guru.sch.id` | `guru123` | Guru Mata Pelajaran Matematika |
| **Guru Mata Pelajaran (IPA)** | `dwi.susanto@guru.sch.id` | `guru123` | Guru Mata Pelajaran IPA |
| **Guru Mata Pelajaran (Informatika)** | `fajar.hidayat@guru.sch.id` | `guru123` | Guru Mata Pelajaran Informatika |
| **Wali Kelas VII A** | `ahmad.hidayat@guru.sch.id` | `guru123` | Wali Kelas VII A sekaligus Guru Mata Pelajaran |
| **Wali Kelas VIII B** | `rina.fitriani@guru.sch.id` | `guru123` | Wali Kelas VIII B |
| **Wali Kelas VII B** | `bambang.supriyono@guru.sch.id` | `guru123` | Wali Kelas VII B sekaligus Guru IPS |
| **Wali Kelas VII C** | `yasmin.nuraini@guru.sch.id` | `guru123` | Wali Kelas VII C sekaligus Guru Seni Budaya |
| **Wali Kelas IX A** | `kartika.dewi@guru.sch.id` | `guru123` | Wali Kelas IX A sekaligus Guru Bahasa Inggris |
| **Admin (Guru BK)** | `dewi.sartika@admin.sch.id` | `admin123` | Administrator Sistem |

### Struktur Kelas

Sistem menggunakan **9 kelas**, dengan masing-masing kelas berisi **3 siswa**, sehingga total terdapat **27 akun siswa**.

- VII A (KLS01)
- VII B (KLS02)
- VII C (KLS03)
- VIII A (KLS04)
- VIII B (KLS05)
- VIII C (KLS06)
- IX A (KLS07)
- IX B (KLS08)
- IX C (KLS09)

---

# 🌐 URL Aplikasi yang Telah Di-deploy

> Tambahkan URL deployment aplikasi di sini.

Contoh:

```text
https://aplikasisipaduprojekdpsi-versel.vercel.app/login
```

---

# 📂 URL Repository GitHub

> Tambahkan URL repository GitHub di sini.

Contoh:

```text
https://github.com/Deppuspa/aplikasi_sipadu_projek_DPSI.git
```

---

# 📝 Catatan

Repositori proyek ini dikelola dan di-*push* melalui **satu akun GitHub** untuk menghindari konflik dan error yang sebelumnya terjadi saat proses kolaborasi menggunakan beberapa akun. Penggunaan satu akun hanya bertujuan untuk menjaga stabilitas proses pengembangan dan mencegah terulangnya kendala teknis. Meskipun demikian, pengembangan sistem tetap dilakukan secara kolaboratif sesuai dengan pembagian tugas masing-masing anggota tim yang telah dijelaskan di atas. 

# Arsitektur Proyek

Proyek SIPADU ini dibangun menggunakan **Next.js (App Router)** dengan pendekatan
**fullstack**, artinya backend dan frontend tidak dipisah menjadi folder atau
repository yang berbeda, melainkan menyatu dalam satu struktur project Next.js.
Hal ini merupakan konvensi standar Next.js, di mana frontend dan backend
berjalan dalam satu aplikasi yang sama.

Pembagian tanggung jawab tiap bagian adalah sebagai berikut:

# Frontend (Tampilan/UI)
Bertanggung jawab menampilkan halaman dan interaksi pengguna.
- `src/app/(dashboard)/` — halaman dashboard, jadwal, kehadiran, izin, laporan, dll
- `src/app/login/` — halaman login
- `src/app/register/` — halaman registrasi
- `src/components/` — komponen UI yang dipakai berulang (contoh: sidebar)

# Backend (Logika & Data)
Bertanggung jawab memproses data dan menghubungkan aplikasi ke database.
- `src/app/api/` — API routes (endpoint backend Next.js)
- `src/lib/` — logika bisnis, koneksi ke database, dan helper function
- `sipadu.db` — file database SQLite tempat semua data (siswa, guru, presensi,
  izin, jadwal) disimpan

# Dokumentasi
- `docs/` — berisi seluruh dokumen pendukung proyek: data model, arsitektur
  sistem, alur pengguna (user flow), SRS, test case, dan test plan

# Mengapa Backend dan Frontend Tidak Dipisah Secara Fisik?
Next.js App Router mewajibkan folder `api` berada di dalam `src/app` agar
sistem routing backend-nya berfungsi. Karena itu, backend dan frontend memang
didesain untuk menyatu dalam satu struktur folder, bukan dipisah menjadi
folder `backend/` dan `frontend/` seperti pada proyek dengan backend dan
frontend terpisah (contoh: Express.js + React). Meski begitu, syarat "backend
dan frontend berada dalam satu repository" tetap terpenuhi, karena seluruh
kode—baik logika tampilan maupun logika data—berada dalam satu repository
yang sama.
