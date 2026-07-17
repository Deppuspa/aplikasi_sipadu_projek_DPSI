# Daftar Use Case — SIPADU

**Sistem Presensi Digital Siswa SMP N 4 Banguntapan**

**Versi:** 1.0  
**Acuan:** SRS.md v1.0, information_architecture.md v1.0, design_system.md v1.0  
**Dibuat:** Juni 2026

---

## Ringkasan

| No | ID Use Case | Nama Use Case | Aktor Utama | SRS Ref |
|---|---|---|---|---|
| 1 | UC-001 | Registrasi Akun Mandiri | Siswa, Guru Mapel, Wali Kelas, Admin | F-19, BR-20, VR-09 |
| 2 | UC-002 | Login dengan Role-Locked Redirect | Siswa, Guru Mapel, Wali Kelas, Admin | F-20, BR-19, VR-10 |
| 3 | UC-003 | Presensi Per Jam Pelajaran (Default-Hadir + Uncheck) | Guru Mapel | F-01, F-02, F-03, BR-01–BR-04, VR-06, VR-08 |
| 4 | UC-004 | Pengajuan Izin Ketidakhadiran | Siswa | F-06, F-07, F-08, BR-06–BR-09, VR-03, VR-04 |
| 5 | UC-005 | Verifikasi Izin oleh Wali Kelas / Admin | Wali Kelas, Admin | F-09, BR-10, BR-11 |
| 6 | UC-006 | Rekap Harian Berbasis Persentase (Otomatis) | Admin, Wali Kelas | F-12, BR-12–BR-15 |
| 7 | UC-007 | Rekap Bulanan Per Mata Pelajaran | Admin, Guru Mapel, Wali Kelas | F-11, F-13, BR-16–BR-18 |
| 8 | UC-008 | Pengaturan Jadwal Pelajaran | Admin | F-15, F-16 |
| 9 | UC-009 | Lihat Data Kehadiran Real-time | Guru Mapel, Wali Kelas | F-05, VR-06, VR-07 |
| 10 | UC-010 | Pantau Rekap Kelas oleh Wali Kelas | Wali Kelas | F-12, F-05, BR-12–BR-15 |
| 11 | UC-011 | Filter dan Unduh Laporan Rekapitulasi | Admin | F-13, F-14 |
| 12 | UC-012 | Verifikasi Data Presensi Bermasalah oleh Admin | Admin | F-04, BR-05 |
| 13 | UC-013 | Kelola Hak Akses Pengguna | Admin | F-17 |
| 14 | UC-014 | Lihat Riwayat Kehadiran oleh Siswa | Siswa | F-18, F-10, VR-05 |

---

## Pemetaan Fungsional

| SRS ID | Deskripsi | Use Case |
|---|---|---|
| F-01 | Memulai sesi presensi | UC-003 |
| F-02 | Uncheck siswa tidak hadir | UC-003 |
| F-03 | Menyimpan presensi | UC-003 |
| F-04 | Verifikasi data presensi bermasalah | UC-012 |
| F-05 | Melihat data kehadiran real-time | UC-009, UC-010 |
| F-06 | Mengajukan izin | UC-004 |
| F-07 | Memilih jenis izin | UC-004 |
| F-08 | Mengunggah bukti pendukung | UC-004 |
| F-09 | Verifikasi izin | UC-005 |
| F-10 | Melihat status izin | UC-014 |
| F-11 | Rekap bulanan per mata pelajaran | UC-007 |
| F-12 | Rekap harian berbasis persentase | UC-006, UC-010 |
| F-13 | Filter laporan | UC-007, UC-011 |
| F-14 | Unduh laporan | UC-011 |
| F-15 | Mengatur jadwal jam pelajaran | UC-008 |
| F-16 | Mengubah jadwal | UC-008 |
| F-17 | Mengelola hak akses pengguna | UC-013 |
| F-18 | Melihat riwayat kehadiran sendiri | UC-014 |
| F-19 | Registrasi mandiri | UC-001 |
| F-20 | Login dengan email dan password | UC-002 |

---

## Matriks Aktor vs Use Case

| Use Case | Siswa | Guru Mapel | Wali Kelas | Admin |
|---|---|---|---|---|
| UC-001 | ✅ | ✅ | ✅ | ✅ |
| UC-002 | ✅ | ✅ | ✅ | ✅ |
| UC-003 | ❌ | ✅ | ✅* | ❌ |
| UC-004 | ✅ | ❌ | ❌ | ❌ |
| UC-005 | ❌ | ❌ | ✅ | ✅ |
| UC-006 | ❌ | ❌ | ✅ | ✅ |
| UC-007 | ❌ | ✅** | ✅ | ✅ |
| UC-008 | ❌ | ❌ | ❌ | ✅ |
| UC-009 | ❌ | ✅ | ✅ | ❌ |
| UC-010 | ❌ | ❌ | ✅ | ❌ |
| UC-011 | ❌ | ❌ | ❌ | ✅ |
| UC-012 | ❌ | ❌ | ❌ | ✅ |
| UC-013 | ❌ | ❌ | ❌ | ✅ |
| UC-014 | ✅ | ❌ | ❌ | ❌ |

> * Wali kelas yang juga merangkap sebagai guru mapel dapat mengakses UC-003 (Presensi) untuk kelas yang diampunya, sesuai SRS 3.3.
> ** Guru Mapel hanya dapat mengakses rekap bulanan (bukan rekap harian) pada laporan.
