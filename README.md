# Sipadu — Prototype Frontend

Sistem Informasi Presensi dan Izin Siswa — prototype berbasis Next.js dengan localStorage.

## Cara Menjalankan

```bash
cd sipadu
npm install
npm run dev
```

Buka http://localhost:3000 di browser.

## Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Siswa | budi@siswa.sch.id | password123 |
| Guru Mapel | siti.rahma@guru.sch.id | password123 |
| Wali Kelas | rina.fitriani@guru.sch.id | password123 |
| Guru + Wali Kelas | ahmad.hidayat@guru.sch.id | password123 |
| Admin (Guru BK) | dewi.sartika@admin.sch.id | password123 |

## Fitur per Role

**Siswa**
- Melihat riwayat presensi dan izin
- Mengajukan izin (sakit/izin/lainnya) dengan bukti
- Dashboard ringkasan kehadiran

**Guru Mapel**
- Melihat jadwal mengajar hari ini
- Mengisi presensi per jadwal (default semua hadir, centang untuk tidak hadir)
- Edit presensi yang sudah tersimpan

**Wali Kelas**
- Dashboard rekap kehadiran kelas binaan
- Memantau rekap per siswa (detail per jam)
- Memverifikasi pengajuan izin siswa

**Admin (Guru BK)**
- CRUD jadwal pelajaran
- Verifikasi izin semua siswa
- Verifikasi presensi (ubah status Hadir/Tidak Hadir)
- Lihat laporan rekap harian & bulanan dengan unduh CSV
- Kelola hak akses (informasi read-only)
- Reset data aplikasi

## Teknologi

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- localStorage (persistence)
- lucide-react (icons)

## Struktur Routes

| Route | Akses | Halaman |
|-------|-------|---------|
| `/` | Publik | Redirect ke dashboard jika sudah login, atau ke login |
| `/login` | Publik | Login + panel akun demo |
| `/register` | Publik | Registrasi (siswa/guru/admin) |
| `/dashboard` | Semua | Dashboard sesuai role |
| `/presensi` | Guru | Isi presensi per jadwal |
| `/izin` | Semua | Ajukan & lihat riwayat izin |
| `/verifikasi-izin` | Wali_kelas, admin | Setujui/tolak izin |
| `/kehadiran` | Guru, admin | Data kehadiran siswa |
| `/laporan` | Wali_kelas, admin | Rekap harian & bulanan |
| `/jadwal` | Admin | CRUD jadwal pelajaran |
| `/pantau-rekap` | Wali_kelas | Rekap per siswa detail |
| `/riwayat` | Siswa | Riwayat presensi & izin |
| `/hak-akses` | Admin | Informasi hak akses per role |

## Mereset Data

1. **Via tombol**: Login sebagai admin → dashboard → bagian "Reset Data"
2. **Via DevTools**: Buka DevTools (F12) → tab Application → Local Storage → hapus key `sipadu_data` → refresh halaman

## Catatan Implementasi

Lihat `IMPLEMENTATION_NOTES.md` untuk detail konflik resolusi, gap, dan keputusan arsitektur.
