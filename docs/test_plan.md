# Test Plan

Document Version: v0.1
Project: Sipadu — Sistem Presensi Digital Siswa SMP N 4 Banguntapan
Product: Web-Based Attendance System
Status: Draft
Last Updated: 2026-07-16
Author: System Analyst AI

---

# 1. INTRODUCTION

## 1.1 Purpose

Dokumen ini mendefinisikan rencana pengujian (test plan) untuk sistem Sipadu — Sistem Presensi Digital Siswa SMP N 4 Banguntapan. Test Plan ini merupakan acuan utama dalam pelaksanaan seluruh aktivitas pengujian, mencakup strategi, lingkup, sumber daya, jadwal, serta kriteria kelulusan.

## 1.2 Objectives

- Memverifikasi bahwa seluruh fitur fungsional (F-01 sampai F-20) berfungsi sesuai dengan Software Requirements Specification (SRS).
- Memvalidasi bahwa setiap use case (UC-001 sampai UC-014) berjalan sesuai spesifikasi user flow dan system logic.
- Memvalidasi bahwa seluruh kontrak API yang terdefinisi di system_logics/ dapat diimplementasikan dengan benar (meskipun fase ini menggunakan localStorage, referensi API tersedia untuk perencanaan backend mendatang).
- Memverifikasi kepatuhan terhadap non-functional requirements (NF-01 sampai NF-07).
- Mengidentifikasi defect sebelum sistem dirilis ke production.
- Memastikan mekanisme Role-Based Access Control (4 role) berfungsi dengan benar dan tidak ada pembocoran akses antar role.

## 1.3 References

| Document | Version | Location |
| --- | --- | --- |
| Software Requirements Specification (SRS) | v0.2 | `docs/srs.md` |
| Data Model | v1.0 | `docs/data_model.md` |
| User Flow Specifications | v0.1 | `docs/user_flows/` |
| System Logic Specifications | v1.0 | `docs/system_logics/` |
| Test Case Specification | v0.1 | `docs/test_cases.md` |

---

# 2. TEST SCOPE

## 2.1 In Scope

| Feature ID | Feature Name | Related Use Cases | Test Coverage |
| --- | --- | --- | --- |
| F-01 to F-05 | Presensi (Default-Hadir, Uncheck, Per Jam, Verifikasi Admin, Real-time View) | UC-003, UC-009, UC-012 | 22 TC |
| F-06 to F-10 | Izin Ketidakhadiran (Submit, Status, Verifikasi, Dampak pada Presensi, View) | UC-004, UC-005 | 17 TC |
| F-11 to F-14 | Rekapitulasi (Bulanan, Harian, Filter, Unduh CSV) | UC-006, UC-007, UC-010, UC-011 | 25 TC |
| F-15, F-16 | Manajemen Jadwal Pelajaran (CRUD, Akses Guru Mapel, Semester) | UC-008 | 14 TC |
| F-19, F-20 | Autentikasi & Otorisasi (Registrasi, Login Role-Locked) | UC-001, UC-002 | 26 TC |
| F-17 | Hak Akses Pengguna (Read-only view) | UC-013 | 4 TC |
| F-18 | Riwayat Kehadiran Siswa | UC-014 | 8 TC |
| **Total** | | **14 Use Cases** | **116 TC** |

### 2.1.1 Test Types Included

| Test Type | Description |
| --- | --- |
| Functional Testing | Memverifikasi setiap fitur berfungsi sesuai SRS, user flow, dan system logic |
| Role-Based Access Control Testing | Menguji batasan akses keempat role (Siswa, Guru Mapel, Wali Kelas, Admin) sesuai VR-05, VR-06, VR-07, VR-10 |
| UI/UX Testing | Memverifikasi tata letak, responsivitas, dan kemudahan penggunaan antarmuka |
| Validation Testing | Memvalidasi input form, business rules (BR-01 s.d. BR-20), dan data integrity |
| Error Handling Testing | Menguji response sistem terhadap kondisi error (input kosong, data duplikat, akses ditolak) |
| Business Logic Testing | Pengujian khusus untuk logika berisiko tinggi: default-hadir/uncheck (BR-01 s.d. BR-04), perhitungan threshold 60% (BR-12 s.d. BR-14), dan dampak izin-disetujui pada rekap harian |
| Regression Testing | Menguji bahwa perubahan kode tidak merusak fitur yang sudah berjalan |

## 2.2 Out of Scope

Berdasarkan SRS Section 9 (Out of Scope), hal-hal berikut tidak termasuk dalam pengujian ini:

- Presensi berbasis barcode/scan (tidak digunakan dalam Sipadu)
- Model presensi check-in/check-out dua kali sehari (Sipadu menggunakan presensi per jam pelajaran)
- Sistem notifikasi otomatis (email/SMS)
- Sistem penilaian akademik (rekap bulanan hanya sebagai acuan, bukan sistem nilai)
- Pembayaran SPP
- Manajemen staf/HR
- Dukungan multi-sekolah
- Aplikasi native mobile
- Integrasi pihak ketiga
- Manajemen kurikulum

Selain itu, pengujian ini juga tidak mencakup:

- Performance / load testing (akan dilakukan di fase terpisah)
- Security penetration testing (akan dilakukan di fase terpisah)
- Pengujian backend/database nyata (fase ini menggunakan localStorage per SRS Section 9 item 11 — kontrak API di system_logics/ hanya sebagai referensi struktural)

---

# 3. TEST STRATEGY

## 3.1 Testing Levels

### Level 1: Component Testing (Unit)

| Aspect | Detail |
| --- | --- |
| **Target** | Setiap fungsi di frontend components dan logic bisnis (perhitungan persentase, validasi role, default-hadir) |
| **Approach** | Automated unit test (developer responsibility) |
| **Tool** | Jest / Vitest (Frontend) |
| **Responsibility** | Developer |

### Level 2: Integration Testing

| Aspect | Detail |
| --- | --- |
| **Target** | Interaksi antara frontend ↔ localStorage / React Context state (bukan API live, karena tidak ada backend di fase ini) |
| **Approach** | Automated integration test + manual verification via browser DevTools |
| **Tool** | Jest + Testing Library; Browser DevTools (Application → localStorage) |
| **Responsibility** | Tester |
| **Catatan** | Kontrak API di system_logics/ menjadi target integrasi masa depan saat backend diimplementasikan |

### Level 3: System Testing

| Aspect | Detail |
| --- | --- |
| **Target** | Seluruh fitur end-to-end via browser, mencakup alur lintas role |
| **Approach** | Manual test execution berdasarkan test case specification |
| **Tool** | Browser (Chrome, Firefox, Edge, Safari) |
| **Responsibility** | Tester |

### Level 4: User Acceptance Testing (UAT)

| Aspect | Detail |
| --- | --- |
| **Target** | Skenario bisnis nyata yang dijalankan oleh Guru Mapel, Wali Kelas, Admin (Guru BK), dan Siswa di SMP N 4 Banguntapan |
| **Approach** | Manual exploratory testing oleh end user masing-masing role |
| **Tool** | Production-like environment |
| **Responsibility** | End User (4 Role) + Tester |

## 3.2 Testing Approach

### Functional Testing Approach

Setiap test case dieksekusi berdasarkan prioritas fitur:

1. **High Priority (F-01 s.d. F-05 — Presensi, F-06 s.d. F-10 — Izin, F-19 s.d. F-20 — Autentikasi):** 100% test case dieksekusi terlebih dahulu. Ini merupakan alur inti kehadiran siswa dan kontrol akses.
2. **High Priority (F-11 s.d. F-14 — Rekapitulasi):** 100% test case dieksekusi bersamaan dengan F-01 s.d. F-10 karena ketergantungan data (rekap bergantung pada data presensi dan izin yang sudah ada).
3. **Medium Priority (F-15 s.d. F-18 — Manajemen Jadwal):** 100% test case dieksekusi setelah High Priority selesai.

### Defect Management

| Stage | Action |
| --- | --- |
| Defect Found | Tester mencatat defect di log dengan ID unik, deskripsi, dan langkah replikasi |
| Severity Level | Critical / Major / Minor / Trivial |
| Critical Defect | Pengujian dihentikan sampai defect diperbaiki (misal: bypass role-based access, salah hitung threshold 60%) |
| Major Defect | Pengujian fitur terkait dihentikan sampai diperbaiki (misal: default-hadir tidak berfungsi, izin tidak mempengaruhi rekap) |
| Minor/Trivial | Pengujian tetap berjalan, defect diperbaiki setelahnya |

### Role-Based Test Coverage

| Role | Access Boundary | Key Test Focus |
| --- | --- | --- |
| **Siswa** | Hanya melihat riwayat kehadiran sendiri, mengajukan izin sendiri. Tidak dapat mengakses presensi, rekap, jadwal, atau verifikasi. | VR-05 (data isolation), VR-09 (akun unik), izin per hari (VR-04), tanggal tidak masa depan (VR-03) |
| **Guru Mapel** | Presensi per jam pelajaran hanya untuk kelas dan jadwal yang diampu. Melihat data kehadiran real-time untuk kelas sendiri. Rekap bulanan untuk mata pelajaran sendiri. | VR-06 (akses berdasarkan jadwal), default-hadir (BR-01), uncheck (BR-02), presensi per jam (BR-03) |
| **Wali Kelas** | Memantau rekap kelas binaan (harian dengan persentase). Melihat data kehadiran real-time untuk kelas binaan. Verifikasi izin untuk siswa di kelas binaan. | VR-07 (akses kelas binaan), BR-12 s.d. BR-15 (perhitungan harian), BR-10 (verifikasi izin) |
| **Admin (Guru BK)** | Akses penuh: mengatur jadwal, verifikasi data presensi bermasalah, verifikasi izin, unduh laporan, lihat hak akses. | VR-10 (role-locked), BR-05 (verifikasi admin), BR-10 (verifikasi izin), CRUD jadwal (F-15, F-16) |

---

# 4. TEST ENVIRONMENT

## 4.1 Hardware Requirements

| Perangkat | Spesifikasi Minimum |
| --- | --- |
| Komputer / Laptop (Lab Komputer Sekolah) | Processor Intel i3 / AMD Ryzen 3, RAM 4GB, Storage 256GB |
| Laptop Guru / Tablet | Layar minimal 10 inci, RAM 3GB |
| Perangkat Siswa (jika diizinkan) | Tablet atau smartphone dengan browser modern |

## 4.2 Software Requirements

### Frontend Testing

| Software | Version |
| --- | --- |
| Google Chrome | Latest stable |
| Mozilla Firefox | Latest stable |
| Microsoft Edge | Latest stable |
| Safari | Latest stable (macOS) |

### Data Layer Testing

Karena fase ini menggunakan **localStorage / React Context** (tidak ada backend/database nyata per SRS Section 9 item 11), pengujian lapisan data dilakukan melalui:

| Tool / Metode | Kegunaan |
| --- | --- |
| Browser DevTools → Application → localStorage | Memeriksa dan memanipulasi data presensi, izin, jadwal, dan sesi login yang tersimpan |
| Browser DevTools → Console | Memeriksa error log, state React Context, dan flow data |
| Review manual kontrak API di `system_logics/` | Sebagai referensi untuk perencanaan pengujian backend mendatang |

> **Catatan:** Postman, database software, atau API testing tools tidak digunakan di fase ini karena tidak ada backend live.

## 4.3 Network Requirements

- Koneksi internet stabil dengan latency < 100ms ke server deployment (jika menggunakan hosting)
- Local development environment dapat menggunakan localhost tanpa koneksi internet
- Lingkungan uji di SMP N 4 Banguntapan harus mewakili kondisi jaringan sekolah yang sebenarnya (sambungan Wi-Fi sekolah dengan bandwidth bersama)

## 4.4 Test Data Requirements

| Data Item | Quantity | Description |
| --- | --- | --- |
| Akun Siswa | 3+ | Email: `ahmad@smpn4.sch.id` (pass: `secret123`), `budi@smpn4.sch.id`, `sari@smpn4.sch.id` — tersebar di minimal 2 kelas berbeda |
| Akun Guru Mapel | 2+ | Email: `guru_matematika@smpn4.sch.id` (pass: `secret123`) mengampu Matematika, `guru_bing@smpn4.sch.id` mengampu Bahasa Inggris |
| Akun Wali Kelas | 1+ | Email: `wali_vii_a@smpn4.sch.id` (pass: `secret123`) — menjadi wali kelas VII A |
| Akun Admin (Guru BK) | 1 | Email: `admin@smpn4.sch.id`, Username: `admin_bk` (pass: `secret123`) |
| Kelas | 2+ | VII A (35 siswa), VII B (30 siswa) |
| Jadwal Pelajaran | 10+ | Mencakup minimal 3 hari (Senin, Rabu, Jumat) dengan minimal 4 jam pelajaran per hari, untuk minimal 2 kelas |
| Presensi records (default-hadir) | 20+ | Record dengan statusHadir = true (semua siswa default hadir) |
| Presensi records (uncheck) | 10+ | Record dengan statusHadir = false (guru sudah melakukan uncheck untuk siswa tidak hadir) |
| Izin records — jenisIzin | 3 Jenis | Minimal 1 record untuk setiap jenis: sakit, izin, lainnya |
| Izin records — statusIzin | 3 Status | Minimal 1 record untuk setiap status: menunggu, disetujui, ditolak |
| Data edge-case threshold 60% | 3+ Siswa | Siswa A: 5/6 jam hadir = 83.33% (>= 60%, HADIR); Siswa B: 3.6/6 jam = 60.00% (tepat 60%, HADIR); Siswa C: 3/6 jam = 50.00% (< 60%, TIDAK HADIR) |

---

# 5. ROLES & RESPONSIBILITIES

| Role | Name / Team | Responsibility |
| --- | --- | --- |
| Test Manager | System Analyst | Menyusun test plan, mengawasi pelaksanaan, melaporkan hasil |
| Tester | QA Team | Mengeksekusi test case, mencatat defect, memverifikasi perbaikan |
| Developer | Dev Team | Memperbaiki defect yang ditemukan |
| End Users — Guru Mapel | Guru pengampu mata pelajaran | Menjalankan UAT untuk alur presensi per jam pelajaran, memberikan feedback |
| End Users — Wali Kelas | Guru wali kelas | Menjalankan UAT untuk pemantauan rekap kelas dan verifikasi izin |
| End Users — Admin (Guru BK) | Guru BK | Menjalankan UAT untuk manajemen jadwal, verifikasi data presensi, unduh laporan |
| End Users — Siswa | Siswa SMP N 4 Banguntapan | Menjalankan UAT untuk pengajuan izin dan melihat riwayat kehadiran |
| Project Sponsor | Pihak sekolah (Kepala Sekolah / perwakilan SMP N 4 Banguntapan) | Menyetujui hasil pengujian dan keputusan rilis |

---

# 6. TEST SCHEDULE

## 6.1 Phases

| Phase | Activity | Duration | Deliverable |
| --- | --- | --- | --- |
| **P1: Test Planning** | Menyusun test plan, menyiapkan lingkungan dan data uji | 3 hari | Test Plan Document |
| **P2: Test Case Preparation** | Menyusun test case specification untuk 14 use case | 4 hari | Test Case Specification |
| **P3: Test Execution — High Priority** | Menjalankan test case untuk F-01 s.d. F-10 (Presensi, Izin) dan F-19 s.d. F-20 (Autentikasi) | 4 hari | Test Execution Report (Phase 1) |
| **P4: Test Execution — Remaining** | Menjalankan test case untuk F-11 s.d. F-18 (Rekapitulasi, Jadwal) | 3 hari | Test Execution Report (Phase 2) |
| **P5: Defect Fixing & Re-testing** | Developer memperbaiki defect, tester melakukan re-test dan regression test | 3 hari | Fixed Build + Re-test Report |
| **P6: UAT** | User acceptance testing oleh keempat role end user di lingkungan sekolah | 2 hari | UAT Sign-off |
| **P7: Test Closure** | Menyusun laporan akhir pengujian | 1 hari | Test Summary Report |

**Total estimasi:** 20 hari kerja

> **Catatan Skala:** Sipadu memiliki 14 use case dengan 4 role (lebih besar dari referensi POS yang memiliki 6 use case dengan 1 role). Durasi P2 diperpanjang menjadi 4 hari untuk menampung test case RBAC lintas role, dan P3/P4 dibagi menjadi dua fase terpisah untuk mengelola kompleksitas pengujian alur presensi-izin-rekap yang saling bergantung.

---

# 7. ENTRY & EXIT CRITERIA

## 7.1 Entry Criteria

| No | Criteria |
| --- | --- |
| EC-01 | SRS, Data Model, User Flows, dan System Logics sudah di-review dan disetujui |
| EC-02 | Lingkungan pengujian (staging) sudah siap dan terdeploy |
| EC-03 | Test data sudah disiapkan di localStorage (akun, kelas, jadwal, presensi, izin) |
| EC-04 | Tester sudah memahami test case dan skenario pengujian untuk keempat role |
| EC-05 | Semua use case (UC-001 s.d. UC-014) sudah terimplementasi di frontend |

## 7.2 Exit Criteria

| No | Criteria |
| --- | --- |
| XC-01 | 100% test case dieksekusi |
| XC-02 | Tidak ada defect dengan severity Critical atau Major yang masih open |
| XC-03 | Seluruh defect Minor/Trivial sudah didokumentasikan dan diterima sebagai known issue |
| XC-04 | UAT sudah selesai dan mendapatkan sign-off dari end user keempat role |
| XC-05 | Test Summary Report sudah disusun dan disetujui |

## 7.3 Suspension Criteria

| No | Criteria |
| --- | --- |
| SC-01 | Terdapat critical defect yang menghalangi pengujian lebih dari 50% test case |
| SC-02 | Lingkungan pengujian tidak stabil atau data localStorage sering corrupt |
| SC-03 | Perubahan kebutuhan mendadak yang signifikan (major requirement change) |

---

# 8. TEST DELIVERABLES

| Deliverable | Description | Due |
| --- | --- | --- |
| Test Plan | Dokumen perencanaan pengujian ini | Akhir P1 |
| Test Case Specification | Detail test case untuk setiap fitur dan use case | Akhir P2 |
| Test Execution Report | Hasil eksekusi test case (pass/fail) per fase | Akhir P3 & P4 |
| Defect Log | Daftar defect yang ditemukan beserta severity dan status | Akhir P3 & P4 |
| Re-test Report | Hasil verifikasi perbaikan defect | Akhir P5 |
| UAT Sign-off | Persetujuan dari end user keempat role | Akhir P6 |
| Test Summary Report | Laporan akhir pengujian | Akhir P7 |

---

# 9. RISK & MITIGATION

| Risk ID | Risk Description | Probability | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| R-01 | Role-based access boundaries terbypass (VR-06, VR-07, VR-10) — siswa mengakses fitur guru, atau guru mengakses fitur admin | Medium | High | Sediakan test case khusus RBAC untuk setiap kombinasi role × fitur; jalankan regression test setiap perubahan autentikasi |
| R-02 | Perhitungan threshold 60% (BR-12 s.d. BR-14) salah ketika izin-disetujui berinteraksi dengan default-hadir | Medium | High | Buat dataset edge-case khusus: tepat 60%, just above, just below; verifikasi manual terhadap formula di system_logics/ |
| R-03 | Data localStorage corrupt atau hilang antar sesi pengujian, menyebabkan test continuity terganggu | High | Medium | Siapkan skrip reset/seed data sebelum setiap sesi uji; gunakan browser yang sama dan hindari clear cache di tengah pengujian |
| R-04 | Test data tidak mencakup semua kombinasi 4 role × 14 use case dalam access matrix | Medium | Medium | Buat matriks komplit role vs use case sebelum eksekusi; review test data sebelum P3 dimulai |
| R-05 | Perubahan requirement di tengah pengujian (misal: penambahan role baru atau perubahan formula) | Low | High | Freeze requirement sebelum P3 dimulai; setiap perubahan harus melalui change request |
| R-06 | Kompleksitas alur lintas use case (presensi → izin → rekap harian) menyebabkan defect tersembunyi | Medium | Medium | Gunakan end-to-end scenario testing yang mencakup alur lintas use case, bukan hanya per-UC |
| R-07 | Keterbatasan akses browser tertentu (Safari) di lingkungan sekolah | Low | Low | Gunakan BrowserStack untuk simulasi jika perangkat Safari tidak tersedia; prioritaskan Chrome sesuai penggunaan di sekolah |

---

# 10. APPROVAL

| Role | Name | Signature | Date |
| --- | --- | --- | --- |
| Test Manager | System Analyst AI | | |
| Developer Lead | | | |
| Project Sponsor (Pihak Sekolah SMP N 4 Banguntapan) | | | |

---

# 11. REVISION HISTORY

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 0.1 | 2026-07-16 | System Analyst AI | Initial Draft |
