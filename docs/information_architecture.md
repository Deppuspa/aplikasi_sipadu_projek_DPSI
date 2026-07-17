# Information Architecture — SIPADU

**Sistem Presensi Digital Siswa SMP N 4 Banguntapan**

**Versi:** 1.0  
**Acuan:** SRS.md v1.0 (Source of Truth)  
**Dibuat:** Juni 2026

---

## 1. APPLICATION PAGES

Semua halaman sistem dikelompokkan berdasarkan status autentikasi dan peran aktor. Setiap halaman yang diautentikasi hanya dapat diakses oleh aktor yang tercantum pada kolom **Aktor**, sesuai dengan BR-19 (Role-Locked Login) dan VR-10 (Akses Terkunci Peran).

### 1.1 Halaman Publik (Unauthenticated)

| No | Nama Halaman | Fungsionalitas | Aktor | Referensi SRS |
|---|---|---|---|---|
| P-01 | Login | Form autentikasi email + password. Validasi akun terhadap data registrasi. Redirect ke dashboard sesuai role setelah sukses. | Semua (belum login) | F-20, BR-19 |
| P-02 | Registrasi | Form pendaftaran akun mandiri. Role dipilih terlebih dahulu, kemudian form menyesuaikan (field berbeda per role). Setelah sukses, langsung login dan redirect ke dashboard. | Semua (belum login) | F-19, BR-20, VR-09 |

### 1.2 Halaman Authenticated — Siswa

| No | Nama Halaman | Fungsionalitas | Referensi SRS |
|---|---|---|---|
| P-03 | Dashboard Siswa | Statistik ringkas: total hadir, total tidak hadir, izin menunggu. Tabel 5 pengajuan izin terbaru. Tabel 5 riwayat presensi terakhir. | 3.1, F-18 |
| P-04 | Ajukan Izin | Form pengajuan izin (tanggal, jenis izin, keterangan, bukti). Riwayat pengajuan izin milik siswa (F-10). | F-06, F-07, F-08, F-10 |
| P-05 | Riwayat Kehadiran | Tabel riwayat presensi (tanggal, jam, mapel, guru, status). Tabel riwayat izin (tanggal, jenis, status, keterangan). | F-18 |

### 1.3 Halaman Authenticated — Guru Mapel

| No | Nama Halaman | Fungsionalitas | Referensi SRS |
|---|---|---|---|
| P-06 | Dashboard Guru Mapel | Statistik: jumlah kelas diampu, jam hari ini, total presesi tercatat. Jadwal mengajar hari ini. | 3.2 |
| P-07 | Presensi Jam Pelajaran | Pilih jadwal → daftar siswa dengan status default-hadir (semua tercentang). Guru uncheck siswa tidak hadir. Simpan presensi. | F-01, F-02, F-03, BR-01, BR-02, BR-03, BR-04 |
| P-08 | Data Kehadiran | Tabel data kehadiran siswa per kelas/jam yang diampu (real-time). | F-05 |
| P-09 | Laporan Absensi | Rekap bulanan per mata pelajaran (F-11) — lihat data jumlah hadir/tidak hadir siswa. | F-11, F-13, BR-16, BR-17, BR-18 |

### 1.4 Halaman Authenticated — Wali Kelas

| No | Nama Halaman | Fungsionalitas | Referensi SRS |
|---|---|---|---|
| P-10 | Dashboard Wali Kelas | Statistik: kelas binaan, jam hari ini, izin menunggu. Rekap cepat siswa kelas binaan. | 3.3 |
| P-11 | Presensi Jam Pelajaran | Sama seperti P-07 (jika wali kelas juga mengajar sebagai guru mapel). | F-01, F-02, F-03, BR-01–BR-04 |
| P-12 | Data Kehadiran | Data kehadiran siswa di kelas yang diampu (sebagai guru mapel) dan seluruh siswa di kelas binaan. | F-05 |
| P-13 | Verifikasi Izin | Daftar pengajuan izin siswa kelas binaan. Setujui/tolak izin. Filter status. | F-09, BR-10 |
| P-14 | Pantau Rekap Kelas | Rekap harian berbasis persentase (threshold 60%) untuk kelas binaan. Filter tanggal. Progress bar per siswa. | F-12, F-13, BR-12, BR-13, BR-14, BR-15 |
| P-15 | Laporan Absensi | Rekap bulanan per mata pelajaran (F-11). Rekap harian persentase (F-12). Filter kelas/tanggal (F-13). | F-11, F-12, F-13, BR-16, BR-17, BR-18 |

### 1.5 Halaman Authenticated — Admin (Guru BK)

| No | Nama Halaman | Fungsionalitas | Referensi SRS |
|---|---|---|---|
| P-16 | Dashboard Admin | Statistik: total siswa, total guru, izin perlu verifikasi, data presensi. Akses cepat ke kelola jadwal, verifikasi izin, lihat laporan. | 3.4 |
| P-17 | Jadwal Pelajaran | CRUD jadwal jam pelajaran per kelas per hari. Filter kelas/hari. | F-15, F-16 |
| P-18 | Verifikasi Izin | Daftar seluruh pengajuan izin (semua kelas). Setujui/tolak izin. Filter status. | F-09, BR-10 |
| P-19 | Data Presensi | Verifikasi dan perbaiki data presensi bermasalah. Melihat data kehadiran seluruh siswa. | F-04, F-05 |
| P-20 | Laporan Rekapitulasi | Rekap bulanan per mata pelajaran (F-11). Rekap harian persentase (F-12). Filter kelas/tanggal/mapel/bulan (F-13). Unduh CSV (F-14). | F-11, F-12, F-13, F-14 |
| P-21 | Hak Akses | Tabel/panel hak akses per role. Informasi batasan akses setiap peran. | F-17 |

---

## 2. ROUTE STRUCTURE

Struktur URL mengikuti konvensi **Next.js App Router**. Halaman publik berada di root level, sedangkan halaman terautentikasi dikelompokkan dalam route group `(dashboard)` dengan shared layout.

```
/                                   # Redirect ke /login jika belum login, atau /dashboard jika sudah
├── /login                          # [PUBLIC]  P-01: Login
├── /register                       # [PUBLIC]  P-02: Registrasi (role dipilih di form)
│
└── /dashboard                      # [AUTH] Route group (dashboard layout)
    ├── /dashboard                  # P-03/P-06/P-10/P-16: Dashboard per role (role-based render)
    ├── /presensi                   # P-07/P-11: Presensi (guru_mapel, wali_kelas)
    ├── /izin                       # P-04: Ajukan Izin (siswa)
    ├── /riwayat                    # P-05: Riwayat Kehadiran (siswa)
    ├── /kehadiran                  # P-08/P-12: Data Kehadiran (guru_mapel, wali_kelas)
    ├── /verifikasi-izin            # P-13/P-18: Verifikasi Izin (wali_kelas, admin)
    ├── /pantau-rekap               # P-14: Pantau Rekap Kelas (wali_kelas)
    ├── /jadwal                     # P-17: Jadwal Pelajaran (admin)
    ├── /laporan                    # P-20: Laporan Rekapitulasi (admin) — tab bulanan & harian
    └── /hak-akses                  # P-21: Hak Akses (admin)
```

### 2.1 Catatan Route

- Halaman `/dashboard` melakukan **role-based render**: komponen yang dirender berbeda tergantung `user.role` (SiswaDashboard, GuruDashboard, WaliDashboard, AdminDashboard). Tidak perlu route terpisah seperti `/siswa/dashboard`.
- Halaman `/laporan` menggunakan **tab switching** antara rekap bulanan dan rekap harian, bukan rute terpisah `/laporan/bulanan` dan `/laporan/harian` — karena kontennya cukup ringkas untuk satu halaman dengan tab.
- Halaman `/presensi` dan `/kehadiran` dibedakan: presensi adalah **aksi** (melakukan uncheck), sedangkan kehadiran adalah **view** (melihat data yang sudah tercatat).
- Setiap route terautentikasi WAJIB memiliki **guard** (middleware atau per-page effect) yang memverifikasi role aktor sesuai SRS section 3 dan VR-10.

---

## 3. SIDEBAR NAVIGATION

Setiap peran memiliki menu navigasi sidebar yang berbeda, hanya menampilkan tautan ke halaman yang menjadi hak aksesnya. Urutan menu mencerminkan alur kerja (_workflow_) aktor.

### 3.1 Sidebar — Siswa

| No | Ikon | Label Menu | Route | Referensi SRS |
|---|---|---|---|---|
| 1 | LayoutDashboard | Dashboard | /dashboard | 3.1 |
| 2 | FileText | Ajukan Izin | /izin | F-06, F-07, F-08 |
| 3 | ClipboardCheck | Riwayat Kehadiran | /riwayat | F-18 |

### 3.2 Sidebar — Guru Mapel

| No | Ikon | Label Menu | Route | Referensi SRS |
|---|---|---|---|---|
| 1 | LayoutDashboard | Dashboard | /dashboard | 3.2 |
| 2 | CheckSquare | Presensi Jam Pelajaran | /presensi | F-01, F-02, F-03 |
| 3 | Eye | Data Kehadiran | /kehadiran | F-05 |
| 4 | BarChart3 | Laporan Absensi | /laporan | F-11 |

### 3.3 Sidebar — Wali Kelas

| No | Ikon | Label Menu | Route | Referensi SRS |
|---|---|---|---|---|
| 1 | LayoutDashboard | Dashboard | /dashboard | 3.3 |
| 2 | CheckSquare | Presensi Jam Pelajaran | /presensi | F-01, F-02, F-03 |
| 3 | Eye | Data Kehadiran | /kehadiran | F-05 |
| 4 | FileText | Verifikasi Izin | /verifikasi-izin | F-09 |
| 5 | ClipboardCheck | Pantau Rekap Kelas | /pantau-rekap | F-12 |
| 6 | BarChart3 | Laporan Absensi | /laporan | F-11, F-12 |

### 3.4 Sidebar — Admin (Guru BK)

| No | Ikon | Label Menu | Route | Referensi SRS |
|---|---|---|---|---|
| 1 | LayoutDashboard | Dashboard | /dashboard | 3.4 |
| 2 | Calendar | Jadwal Pelajaran | /jadwal | F-15, F-16 |
| 3 | FileText | Verifikasi Izin | /verifikasi-izin | F-09 |
| 4 | Database | Data Presensi | /kehadiran | F-04, F-05 |
| 5 | BarChart3 | Laporan Rekapitulasi | /laporan | F-11, F-12, F-13, F-14 |
| 6 | Shield | Hak Akses | /hak-akses | F-17 |

---

## 4. PAGE HIERARCHY

Hirarki halaman menggambarkan hubungan induk-anak (_parent-child_) antar halaman dalam sistem.

```
Root (/)
│
├── [PUBLIC]
│   ├── /login                     # Tidak memiliki parent — entry point sistem
│   └── /register                  # Tidak memiliki parent — entry point sistem
│
└── [AUTH] (Dashboard Layout)
    │
    ├── /dashboard                 # Induk: Dashboard Layout. Parent dari semua konten role-specific.
    │
    ├── /presensi                  # Induk: Dashboard Layout. Tidak memiliki child page.
    │
    ├── /izin                      # Induk: Dashboard Layout. Tidak memiliki child page.
    │
    ├── /riwayat                   # Induk: Dashboard Layout. Tidak memiliki child page.
    │
    ├── /kehadiran                 # Induk: Dashboard Layout. Tidak memiliki child page.
    │
    ├── /verifikasi-izin           # Induk: Dashboard Layout. Tidak memiliki child page.
    │
    ├── /pantau-rekap              # Induk: Dashboard Layout. Tidak memiliki child page.
    │
    ├── /jadwal                    # Induk: Dashboard Layout. Tidak memiliki child page.
    │
    ├── /laporan                   # Induk: Dashboard Layout.
    │   ├── [Tab: Bulanan]        # Sub-seksi dalam halaman yang sama (tab switching)
    │   └── [Tab: Harian]         # Sub-seksi dalam halaman yang sama (tab switching)
    │
    └── /hak-akses                 # Induk: Dashboard Layout. Tidak memiliki child page.
```

### 4.1 Catatan Hirarki

- Semua halaman terautentikasi berbagi **Dashboard Layout** yang menyediakan sidebar navigasi, header (tanggal), dan konten utama.
- Halaman `/laporan` memiliki dua sub-seksi yang diimplementasikan sebagai **tab dalam satu halaman** (bukan sub-rute), karena kedua jenis rekap terkait erat dan peralihan antar tab tidak memerlukan navigasi URL penuh.
- Tidak ada halaman child lebih dalam dari satu level. Sistem dirancang dengan hirarki datar (_flat hierarchy_) untuk kemudahan navigasi — seluruh fitur dapat diakses dalam 1–2 klik dari sidebar.

---

## 5. ENTRY POINTS

Entry point adalah halaman yang pertama kali dilihat aktor setelah berhasil login, sesuai dengan **BR-19 (Role-Locked Login)**.

| Role | Entry Point (Post-Login) | Halaman | Penjelasan |
|---|---|---|---|
| **Siswa** | `/dashboard` | P-03 Dashboard Siswa | Menampilkan statistik kehadiran, izin terbaru, dan riwayat presensi |
| **Guru Mapel** | `/dashboard` | P-06 Dashboard Guru Mapel | Menampilkan jadwal mengajar hari ini dan statistik |
| **Wali Kelas** | `/dashboard` | P-10 Dashboard Wali Kelas | Menampilkan kelas binaan, jadwal, dan izin menunggu |
| **Admin (Guru BK)** | `/dashboard` | P-16 Dashboard Admin | Menampilkan statistik sistem dan akses cepat |

### 5.1 Alur Entry Point

```
[User membuka /] 
  → Cek sesi/login state
    → Jika belum login: redirect ke /login
    → Jika sudah login: redirect ke /dashboard
      → /dashboard me-render konten sesuai user.role
        → role === 'siswa'      → SiswaDashboard
        → role === 'guru_mapel' → GuruDashboard
        → role === 'wali_kelas' → WaliDashboard
        → role === 'admin'      → AdminDashboard
```

---

## 6. EXIT POINTS

| Aksi | Perilaku | Rute Tujuan | Penjelasan |
|---|---|---|---|
| **Logout** (tombol Keluar di sidebar) | Panggil `logout()` → hapus state user → redirect | `/login` | Pengguna dikembalikan ke halaman login. Sesuai NF-03 (keamanan akses). |
| **Sesi berakhir** (reload/tutup tab) | State hilang (in-memory) → guard halaman redirect | `/login` | Karena state autentikasi disimpan di memori (React state), reload akan mengembalikan ke halaman login. |

### 6.1 Catatan Exit

- Tidak ada tombol logout di halaman publik (login/register) karena pengguna tersebut tidak memiliki sesi aktif.
- Tidak ada konfirmasi logout (_confirmation dialog_) dalam lingkup fungsional SRS.

---

## 7. AUTHENTICATED VS UNAUTHENTICATED PAGES

### 7.1 Ringkasan

| Status | Rute | Keterangan |
|---|---|---|
| **Public (Unauthenticated)** | `/login`, `/register` | Dapat diakses tanpa login. Jika pengguna sudah login dan mengakses rute ini, sistem redirect ke `/dashboard`. |
| **Authenticated (Role-Locked)** | `/dashboard`, `/presensi`, `/izin`, `/riwayat`, `/kehadiran`, `/verifikasi-izin`, `/pantau-rekap`, `/jadwal`, `/laporan`, `/hak-akses` | Hanya dapat diakses setelah login. Setiap halaman memvalidasi role aktor. Jika role tidak sesuai, redirect ke `/dashboard`. Jika tidak login, redirect ke `/login`. |

### 7.2 Matriks Akses Peran per Rute

| Route | Siswa | Guru Mapel | Wali Kelas | Admin (Guru BK) |
|---|---|---|---|---|
| `/login` | ✅ (public) | ✅ (public) | ✅ (public) | ✅ (public) |
| `/register` | ✅ (public) | ✅ (public) | ✅ (public) | ✅ (public) |
| `/dashboard` | ✅ | ✅ | ✅ | ✅ |
| `/presensi` | ❌ | ✅ | ✅ | ❌* |
| `/izin` | ✅ | ❌ | ❌ | ❌ |
| `/riwayat` | ✅ | ❌ | ❌ | ❌ |
| `/kehadiran` | ❌ | ✅ | ✅ | ✅ |
| `/verifikasi-izin` | ❌ | ❌ | ✅ | ✅ |
| `/pantau-rekap` | ❌ | ❌ | ✅ | ❌ |
| `/jadwal` | ❌ | ❌ | ❌ | ✅ |
| `/laporan` | ❌ | ✅** | ✅ | ✅ |
| `/hak-akses` | ❌ | ❌ | ❌ | ✅ |

> **\*** Admin tidak perlu melakukan presensi per jam pelajaran (F-01), tetapi admin dapat memverifikasi dan memperbaiki data presensi (F-04) melalui halaman `/kehadiran`.  
> **\*\*** Guru Mapel hanya dapat melihat rekap bulanan per mata pelajaran (F-11) pada halaman `/laporan`, bukan rekap harian (F-12).

### 7.3 Mekanisme Guard

Setiap halaman terautentikasi wajib menerapkan dua lapis guard:

1. **Lapisan 1 — Layout Guard** (di `layout.tsx` route group `(dashboard)`):
   - Jika `user` null → redirect ke `/login`.
   - Ini memastikan tidak ada halaman dalam grup dashboard yang dirender tanpa autentikasi.

2. **Lapisan 2 — Per-Page Role Guard** (di masing-masing `page.tsx`):
   - Jika `user.role` tidak termasuk dalam daftar role yang diizinkan untuk halaman tersebut → redirect ke `/dashboard`.
   - Jika role sesuai → render konten halaman.
   - Implementasi per-page guard diperlukan karena layout tidak mengetahui role spesifik yang diizinkan per halaman.

### 7.4 Alur Guard (Pseudocode)

```
function PageGuard(allowedRoles: Role[]) {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user)           → router.push('/login');       // Lapisan 1
    else if (!allowedRoles.includes(user.role)) 
                         → router.push('/dashboard');   // Lapisan 2
  }, [user]);

  if (!user || !allowedRoles.includes(user.role)) return null; // Render null selama redirect
}
```

---

*Dokumen ini merupakan artefak Information Architecture yang diturunkan dari SRS.md v1.0. Seluruh keputusan desain route, navigasi, dan akses mengacu pada definisi aktor (Section 3), kebutuhan fungsional (Section 4), business rules (Section 7.5), dan validation rules (Section 7.6) SRS. Dokumen ini menjadi acuan untuk fase implementasi routing dan navigasi berikutnya.*
