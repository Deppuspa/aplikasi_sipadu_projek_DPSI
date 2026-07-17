# Test Case Specification

Document Version: v0.1

Project: Sipadu — Sistem Presensi Digital Siswa SMP N 4 Banguntapan
Product: Web-Based Attendance System

Status: Draft
Last Updated: 2026-07-17
Author: System Analyst AI

---

# 1. INTRODUCTION

## 1.1 Purpose

Dokumen ini mendefinisikan test case untuk seluruh fitur sistem Sipadu — Sistem Presensi Digital Siswa SMP N 4 Banguntapan. Test case diturunkan dari Software Requirements Specification (SRS) dan User Flow Specifications untuk memastikan setiap kebutuhan fungsional terverifikasi.

## 1.2 Scope

Mencakup 116 test case untuk 14 Use Case (UC-001 s.d. UC-014) yang mencakup 20 Fitur Fungsional (F-01 s.d. F-20) dengan 4 Role pengguna (Siswa, Guru Mapel, Wali Kelas, Admin/Guru BK).

| Feature Group | Fitur | Use Cases | Jumlah TC |
| --- | --- | --- | --- |
| Registrasi & Autentikasi | F-19, F-20 | UC-001, UC-002 | 26 |
| Manajemen Presensi | F-01 s.d. F-05 | UC-003, UC-009, UC-012 | 22 |
| Pengajuan Izin | F-06 s.d. F-10 | UC-004, UC-005 | 17 |
| Rekapitulasi & Laporan | F-11 s.d. F-14 | UC-006, UC-007, UC-010, UC-011 | 25 |
| Manajemen Jadwal | F-15, F-16 | UC-008 | 14 |
| Hak Akses | F-17 | UC-013 | 4 |
| Riwayat Kehadiran | F-18 | UC-014 | 8 |
| **Total** | **20 Fitur** | **14 Use Cases** | **116 TC** |

## 1.3 Test Case Format

| Field | Description |
| --- | --- |
| TC ID | Identifikasi unik test case dengan format TC-FXX-NNN |
| Test Scenario | Deskripsi singkat skenario pengujian |
| Preconditions | Kondisi yang harus terpenuhi sebelum test dieksekusi |
| Test Steps | Langkah-langkah eksekusi test case secara berurutan |
| Expected Results | Hasil yang diharapkan dari eksekusi test case |
| Priority | High, Medium, atau Low |
| Req. Trace | Referensi ke requirement: F-xx (fitur), BR-xx (business rule), VR-xx (validation rule) |

## 1.4 References

| Document | Version | Location |
| --- | --- | --- |
| Software Requirements Specification (SRS) | v0.2 | `docs/srs.md` |
| Data Model | v1.0 | `docs/data_model.md` |
| User Flow Specifications | v0.1 | `docs/user_flows/` |
| System Logic Specifications | v1.0 | `docs/system_logics/` |
| Test Plan | v0.1 | `docs/test_plan.md` |

---

# 2. TEST CASE INDEX

## 2.1 Registrasi & Autentikasi (F-19, F-20)

| TC ID | Test Scenario | Use Case | Priority | Req. Trace |
| --- | --- | --- | --- | --- |
| TC-F19-001 | Registrasi akun Siswa dengan data valid | UC-001 | High | F-19, BR-20 |
| TC-F19-002 | Registrasi akun Guru Mapel dengan data valid | UC-001 | High | F-19, BR-20 |
| TC-F19-003 | Registrasi akun Wali Kelas dengan data valid | UC-001 | High | F-19, BR-20 |
| TC-F19-004 | Registrasi akun Admin (Guru BK) dengan data valid | UC-001 | High | F-19, BR-20 |
| TC-F19-005 | Registrasi gagal — email sudah terdaftar | UC-001 | High | F-19, VR-09 |
| TC-F19-006 | Registrasi gagal — NIS sudah terdaftar | UC-001 | High | F-19, VR-01 |
| TC-F19-007 | Registrasi gagal — ID Guru sudah terdaftar | UC-001 | High | F-19, VR-02 |
| TC-F19-008 | Registrasi gagal — password kurang dari 6 karakter | UC-001 | Medium | F-19 |
| TC-F19-009 | Registrasi gagal — email format tidak valid | UC-001 | Medium | F-19 |
| TC-F19-010 | Registrasi gagal — field wajib kosong | UC-001 | Medium | F-19 |
| TC-F19-011 | Form registrasi menampilkan field sesuai role | UC-001 | Medium | F-19 |
| TC-F20-001 | Login berhasil sebagai Siswa — redirect ke SiswaDashboard | UC-002 | High | F-20 |
| TC-F20-002 | Login berhasil sebagai Guru Mapel — redirect ke GuruDashboard | UC-002 | High | F-20 |
| TC-F20-003 | Login berhasil sebagai Wali Kelas — redirect ke WaliDashboard | UC-002 | High | F-20 |
| TC-F20-004 | Login berhasil sebagai Admin — redirect ke AdminDashboard | UC-002 | High | F-20 |
| TC-F20-005 | Login gagal — email atau password salah | UC-002 | High | F-20 |
| TC-F20-006 | Login gagal — email tidak terdaftar | UC-002 | High | F-20 |
| TC-F20-007 | Login gagal — field email kosong | UC-002 | Medium | F-20 |
| TC-F20-008 | Login gagal — field password kosong | UC-002 | Medium | F-20 |
| TC-F20-009 | Login dengan session aktif — redirect ke /dashboard | UC-002 | Medium | F-20 |
| TC-F20-010 | Logout — session berakhir | UC-002 | High | F-20 |
| TC-F20-011 | Page reload — session hilang (React Context) | UC-002 | High | F-20 |
| TC-F20-012 | Siswa tidak bisa akses dashboard Guru — role mismatch | UC-002 | High | F-20, VR-10, BR-19 |
| TC-F20-013 | Guru Mapel tidak bisa akses dashboard Admin — role mismatch | UC-002 | High | F-20, VR-10, BR-19 |
| TC-F20-014 | Wali Kelas tidak bisa akses fitur Admin — role mismatch | UC-002 | High | F-20, VR-10, BR-19 |
| TC-F20-015 | Admin tidak bisa melakukan presensi — role mismatch | UC-002 | Medium | F-20, VR-10, BR-19 |

## 2.2 Manajemen Presensi (F-01 s.d. F-05)

| TC ID | Test Scenario | Use Case | Priority | Req. Trace |
| --- | --- | --- | --- | --- |
| TC-F01-001 | Default hadir initialization — semua siswa otomatis Hadir | UC-003 | High | F-01, BR-01 |
| TC-F01-002 | Uncheck siswa tidak hadir — toggle hijau ke merah | UC-003 | High | F-01, F-02, BR-02 |
| TC-F01-003 | Re-check siswa — toggle merah kembali ke hijau | UC-003 | High | F-01, F-02, BR-02 |
| TC-F01-004 | Uncheck beberapa siswa sekaligus | UC-003 | Medium | F-01, F-02, BR-02 |
| TC-F01-005 | Reset ke default — semua siswa kembali Hadir | UC-003 | Medium | F-01, BR-01 |
| TC-F01-006 | Simpan presensi — data berhasil disimpan ke localStorage | UC-003 | High | F-01, F-03 |
| TC-F01-007 | Presensi per jam — satu siswa bisa berbeda status di jam berbeda | UC-003 | High | F-01, BR-03 |
| TC-F01-008 | Guru Mapel hanya bisa akses jadwal yang diampu | UC-003 | High | F-01, BR-04, VR-06 |
| TC-F01-009 | Tombol "Sudah Dipresensi" — disabled untuk jadwal selesai | UC-003 | Medium | F-01 |
| TC-F01-010 | Default hadir tidak bisa kosong — semua siswa harus diinisialisasi | UC-003 | Medium | F-01, VR-08 |
| TC-F01-011 | Simpan presensi dengan data tidak lengkap | UC-003 | Medium | F-01, F-03 |
| TC-F01-012 | Akses presensi tanpa login — redirect ke /login | UC-003 | High | F-01 |
| TC-F01-013 | Guru Mapel melihat data kehadiran real-time untuk kelas sendiri | UC-009 | High | F-05, VR-06 |
| TC-F01-014 | Wali Kelas melihat data kehadiran untuk kelas binaan | UC-009 | High | F-05, VR-07 |
| TC-F01-015 | Admin melihat semua data kehadiran tanpa filter | UC-009 | High | F-05 |
| TC-F01-016 | Filter data kehadiran berdasarkan kelas dan tanggal | UC-009 | Medium | F-05 |
| TC-F01-017 | Guru Mapel tidak bisa melihat data kelas lain | UC-009 | High | F-05, VR-06 |
| TC-F01-018 | Admin toggle status presensi dari Hadir ke Tidak Hadir | UC-012 | High | F-04, BR-05 |
| TC-F01-019 | Admin toggle status presensi dari Tidak Hadir ke Hadir | UC-012 | High | F-04, BR-05 |
| TC-F01-020 | Guru Mapel tidak bisa mengubah data presensi | UC-012 | High | F-04, VR-10 |
| TC-F01-021 | Wali Kelas tidak bisa mengubah data presensi | UC-012 | High | F-04, VR-10 |
| TC-F01-022 | Admin memverifikasi data presensi bermasalah | UC-012 | High | F-04, BR-05 |

## 2.3 Pengajuan Izin (F-06 s.d. F-10)

| TC ID | Test Scenario | Use Case | Priority | Req. Trace |
| --- | --- | --- | --- | --- |
| TC-F06-001 | Siswa mengajukan izin dengan data valid (sakit) | UC-004 | High | F-06, F-07, BR-07, BR-09 |
| TC-F06-002 | Siswa mengajukan izin dengan jenis "izin" | UC-004 | High | F-06, F-07, BR-07, BR-09 |
| TC-F06-003 | Siswa mengajukan izin dengan jenis "lainnya" | UC-004 | Medium | F-06, F-07, BR-07, BR-09 |
| TC-F06-004 | Siswa mengajukan izin dengan upload bukti pendukung | UC-004 | Medium | F-06, F-08, BR-08 |
| TC-F06-005 | Siswa mengajukan izin untuk tanggal masa depan — ditolak | UC-004 | High | F-06, VR-03 |
| TC-F06-006 | Siswa mengajukan izin duplikat untuk tanggal yang sama — ditolak | UC-004 | High | F-06, VR-04 |
| TC-F06-007 | Siswa mengajukan izin tanpa mengisi field wajib | UC-004 | Medium | F-06 |
| TC-F06-008 | Siswa melihat riwayat izin sendiri | UC-004 | Medium | F-06, F-10, VR-05 |
| TC-F06-009 | Wali Kelas menyetujui izin siswa di kelas binaan | UC-005 | High | F-09, BR-10 |
| TC-F06-010 | Wali Kelas menolak izin siswa di kelas binaan | UC-005 | High | F-09, BR-10 |
| TC-F06-011 | Admin menyetujui izin siswa | UC-005 | High | F-09, BR-10 |
| TC-F06-012 | Admin menolak izin siswa | UC-005 | High | F-09, BR-10 |
| TC-F06-013 | Wali Kelas tidak bisa melihat izin kelas lain | UC-005 | High | F-09, VR-07 |
| TC-F06-014 | Guru Mapel tidak bisa mengakses verifikasi izin | UC-005 | High | F-09, VR-10 |
| TC-F06-015 | Izin yang sudah diverifikasi tidak bisa diubah lagi | UC-005 | Medium | F-09 |
| TC-F06-016 | Izin disetujui mempengaruhi rekap harian sebagai Hadir | UC-005 | High | F-09, BR-11, BR-14 |
| TC-F06-017 | Satu izin berlaku untuk seluruh jam pelajaran pada tanggal tersebut | UC-004 | High | F-06, BR-06 |

## 2.4 Rekapitulasi & Laporan (F-11 s.d. F-14)

| TC ID | Test Scenario | Use Case | Priority | Req. Trace |
| --- | --- | --- | --- | --- |
| TC-F12-001 | Wali Kelas melihat rekap harian untuk kelas binaan | UC-006 | High | F-12, VR-07 |
| TC-F12-002 | Admin melihat rekap harian untuk semua kelas | UC-006 | High | F-12 |
| TC-F12-003 | Perhitungan persentase tepat 60% — status HADIR | UC-006 | High | F-12, BR-12, BR-13 |
| TC-F12-004 | Perhitungan persentase di bawah 60% — status TIDAK HADIR | UC-006 | High | F-12, BR-12, BR-13 |
| TC-F12-005 | Perhitungan persentase di atas 60% — status HADIR | UC-006 | High | F-12, BR-12, BR-13 |
| TC-F12-006 | Izin disetujui mendorong persentase di atas 60% | UC-006 | High | F-12, BR-14 |
| TC-F12-007 | Tidak ada data presensi untuk tanggal tertentu | UC-006 | Low | F-12 |
| TC-F12-008 | Guru Mapel tidak bisa mengakses rekap harian | UC-006 | High | F-12, VR-10 |
| TC-F12-009 | Perhitungan otomatis tanpa penyimpanan manual | UC-006 | Medium | F-12, BR-15 |
| TC-F11-001 | Guru Mapel melihat rekap bulanan untuk mata pelajaran sendiri | UC-007 | High | F-11, BR-16, BR-18, VR-06 |
| TC-F11-002 | Admin melihat rekap bulanan untuk semua mata pelajaran | UC-007 | High | F-11 |
| TC-F11-003 | Wali Kelas melihat rekap bulanan untuk kelas binaan | UC-007 | High | F-11, VR-07 |
| TC-F11-004 | Rekap bulanan bersifat read-only — tidak bisa diubah | UC-007 | Medium | F-11, BR-17 |
| TC-F11-005 | Filter rekap bulanan berdasarkan kelas, mapel, dan bulan | UC-007 | Medium | F-11 |
| TC-F11-006 | Tidak ada data untuk filter tertentu | UC-007 | Low | F-11 |
| TC-F12-010 | Wali Kelas melihat rekap harian dengan detail per jam | UC-010 | High | F-14, VR-07 |
| TC-F12-011 | Detail per jam menampilkan kode status H/TH/I* | UC-010 | Medium | F-14, BR-14 |
| TC-F12-012 | Wali Kelas hanya bisa melihat kelas binaan | UC-010 | High | F-14, VR-07 |
| TC-F12-013 | Admin tidak bisa mengakses /pantau-rekap | UC-010 | High | F-14, VR-10 |
| TC-F13-001 | Admin memfilter laporan berdasarkan kelas dan tanggal | UC-011 | Medium | F-13 |
| TC-F13-002 | Admin memfilter laporan berdasarkan mapel dan bulan | UC-011 | Medium | F-13 |
| TC-F13-003 | Admin mengunduh laporan harian sebagai CSV | UC-011 | High | F-14 |
| TC-F13-004 | Admin mengunduh laporan bulanan sebagai CSV | UC-011 | High | F-14 |
| TC-F13-005 | Guru Mapel tidak bisa mengunduh laporan | UC-011 | High | F-14, VR-10 |
| TC-F13-006 | Wali Kelas tidak bisa mengunduh laporan | UC-011 | High | F-14, VR-10 |

## 2.5 Manajemen Jadwal Pelajaran (F-15, F-16)

| TC ID | Test Scenario | Use Case | Priority | Req. Trace |
| --- | --- | --- | --- | --- |
| TC-F15-001 | Admin menambah jadwal pelajaran baru — data valid | UC-008 | High | F-15 |
| TC-F15-002 | Admin mengubah jadwal pelajaran yang sudah ada | UC-008 | High | F-15 |
| TC-F15-003 | Admin menghapus jadwal pelajaran | UC-008 | High | F-15 |
| TC-F15-004 | Admin membatalkan penambahan jadwal | UC-008 | Low | F-15 |
| TC-F15-005 | Admin membatalkan penghapusan jadwal | UC-008 | Low | F-15 |
| TC-F15-006 | Validasi form jadwal — field wajib kosong | UC-008 | Medium | F-15 |
| TC-F15-007 | Validasi form jadwal — hari tidak valid | UC-008 | Medium | F-15 |
| TC-F15-008 | Validasi form jadwal — jam Mulai >= jam Selesai | UC-008 | Medium | F-15 |
| TC-F15-009 | Guru Mapel tidak bisa mengelola jadwal | UC-008 | High | F-15, VR-10 |
| TC-F15-010 | Wali Kelas tidak bisa mengelola jadwal | UC-008 | High | F-15, VR-10 |
| TC-F15-011 | Siswa tidak bisa mengelola jadwal | UC-008 | High | F-15, VR-10 |
| TC-F15-012 | Guru Mapel melihat jadwal yang diampu saja | UC-008 | High | F-16, VR-06 |
| TC-F15-013 | Admin memfilter jadwal berdasarkan hari | UC-008 | Low | F-16 |
| TC-F15-014 | Admin memfilter jadwal berdasarkan kelas | UC-008 | Low | F-16 |


## 2.6 Hak Akses & Riwayat (F-17, F-18)

| TC ID | Test Scenario | Use Case | Priority | Req. Trace |
| --- | --- | --- | --- | --- |
| TC-F17-001 | Admin melihat 4 card hak akses per role | UC-013 | High | F-17 |
| TC-F17-002 | Halaman hak akses bersifat read-only — tidak ada operasi CRUD | UC-013 | Medium | F-17 |
| TC-F17-003 | Guru Mapel tidak bisa mengakses halaman hak akses | UC-013 | High | F-17, VR-10 |
| TC-F17-004 | Wali Kelas tidak bisa mengakses halaman hak akses | UC-013 | High | F-17, VR-10 |
| TC-F18-001 | Siswa melihat riwayat presensi dan riwayat izin sendiri | UC-014 | High | F-18, F-10, VR-05 |
| TC-F18-002 | Card Riwayat Presensi menampilkan kolom sesuai spesifikasi | UC-014 | Medium | F-18 |
| TC-F18-003 | Card Riwayat Izin menampilkan kolom sesuai spesifikasi | UC-014 | Medium | F-18 |
| TC-F18-004 | Badge jenis izin tampil sesuai kategori (Sakit/Izin/Lainnya) | UC-014 | Medium | F-18 |
| TC-F18-005 | Badge status izin tampil sesuai status (Menunggu/Disetujui/Ditolak) | UC-014 | Medium | F-18 |
| TC-F18-006 | Siswa tidak bisa edit atau hapus data kehadiran | UC-014 | High | F-18, VR-10 |
| TC-F18-007 | Siswa tidak bisa melihat data kehadiran siswa lain | UC-014 | High | F-18, VR-05 |
| TC-F18-008 | Tidak ada data riwayat kehadiran — empty state | UC-014 | Low | F-18 |

---

# 3. DETAILED TEST CASES

## 3.1 Feature F-19-F-20: Registrasi dan Autentikasi

### 3.1.1 UC-001: Registrasi Akun Mandiri

---

#### TC-F19-001: Registrasi akun Siswa dengan data valid

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-001 |
| **Test Scenario** | Registrasi akun Siswa dengan data valid |
| **Preconditions** | Pengguna belum terdaftar. Browser membuka halaman /register. |
| **Test Steps** | 1. Buka halaman /register<br>2. Pilih role "Siswa"<br>3. Isi form: NIS = "2024001", Nama = "Ahmad Rizki", JK = "L", Kelas = "VII A", Email = "ahmad@smpn4.sch.id", Password = "secret123"<br>4. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Registrasi berhasil (201 Created)<br>2. Redirect ke /dashboard<br>3. SiswaDashboard ditampilkan<br>4. Token tersimpan di React Context<br>5. Akun langsung aktif (BR-20) |
| **Priority** | High |
| **Req. Trace** | F-19, BR-20 |

---

#### TC-F19-002: Registrasi akun Guru Mapel dengan data valid

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-002 |
| **Test Scenario** | Registrasi akun Guru Mapel dengan data valid |
| **Preconditions** | Pengguna belum terdaftar. Browser membuka halaman /register. |
| **Test Steps** | 1. Buka halaman /register<br>2. Pilih role "Guru Mapel"<br>3. Isi form: ID Guru = "GRU-001", Nama = "Pak Budi", Mapel = "Matematika", Email = "guru_matematika@smpn4.sch.id", Password = "secret123"<br>4. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Registrasi berhasil (201 Created)<br>2. Redirect ke /dashboard<br>3. GuruDashboard ditampilkan<br>4. Akun langsung aktif (BR-20) |
| **Priority** | High |
| **Req. Trace** | F-19, BR-20 |

---

#### TC-F19-003: Registrasi akun Wali Kelas dengan data valid

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-003 |
| **Test Scenario** | Registrasi akun Wali Kelas dengan data valid |
| **Preconditions** | Pengguna belum terdaftar. Browser membuka halaman /register. |
| **Test Steps** | 1. Buka halaman /register<br>2. Pilih role "Wali Kelas"<br>3. Isi form: ID Guru = "GRU-002", Nama = "Ibu Sari", ID Kelas = "VII A", Email = "wali_vii_a@smpn4.sch.id", Password = "secret123"<br>4. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Registrasi berhasil (201 Created)<br>2. Redirect ke /dashboard<br>3. WaliDashboard ditampilkan<br>4. Akun langsung aktif (BR-20) |
| **Priority** | High |
| **Req. Trace** | F-19, BR-20 |

---

#### TC-F19-004: Registrasi akun Admin (Guru BK) dengan data valid

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-004 |
| **Test Scenario** | Registrasi akun Admin (Guru BK) dengan data valid |
| **Preconditions** | Pengguna belum terdaftar. Browser membuka halaman /register. |
| **Test Steps** | 1. Buka halaman /register<br>2. Pilih role "Admin"<br>3. Isi form: ID Admin = "ADM-001", Nama = "Admin BK", Username = "admin_bk", Email = "admin@smpn4.sch.id", Password = "secret123"<br>4. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Registrasi berhasil (201 Created)<br>2. Redirect ke /dashboard<br>3. AdminDashboard ditampilkan<br>4. Akun langsung aktif (BR-20) |
| **Priority** | High |
| **Req. Trace** | F-19, BR-20 |

---

#### TC-F19-005: Registrasi gagal -- email sudah terdaftar

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-005 |
| **Test Scenario** | Registrasi gagal karena email sudah terdaftar |
| **Preconditions** | Akun dengan email "ahmad@smpn4.sch.id" sudah terdaftar. |
| **Test Steps** | 1. Buka halaman /register<br>2. Pilih role "Siswa"<br>3. Isi form dengan email "ahmad@smpn4.sch.id" (sudah ada)<br>4. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Error: "Email sudah terdaftar"<br>2. Registrasi gagal (409 Conflict)<br>3. Form tetap terbuka dengan data yang diisi |
| **Priority** | High |
| **Req. Trace** | F-19, VR-09 |

---

#### TC-F19-006: Registrasi gagal -- NIS sudah terdaftar

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-006 |
| **Test Scenario** | Registrasi gagal karena NIS sudah terdaftar |
| **Preconditions** | Akun dengan NIS "2024001" sudah terdaftar. |
| **Test Steps** | 1. Buka halaman /register<br>2. Pilih role "Siswa"<br>3. Isi form dengan NIS "2024001" (sudah ada)<br>4. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Error: "NIS sudah terdaftar"<br>2. Registrasi gagal (409 Conflict)<br>3. Form tetap terbuka |
| **Priority** | High |
| **Req. Trace** | F-19, VR-01 |

---

#### TC-F19-007: Registrasi gagal -- ID Guru sudah terdaftar

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-007 |
| **Test Scenario** | Registrasi gagal karena ID Guru sudah terdaftar |
| **Preconditions** | Akun dengan ID Guru "GRU-001" sudah terdaftar. |
| **Test Steps** | 1. Buka halaman /register<br>2. Pilih role "Guru Mapel"<br>3. Isi form dengan ID Guru "GRU-001" (sudah ada)<br>4. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Error: "ID Guru sudah terdaftar"<br>2. Registrasi gagal (409 Conflict) |
| **Priority** | High |
| **Req. Trace** | F-19, VR-02 |

---

#### TC-F19-008: Registrasi gagal -- password kurang dari 6 karakter

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-008 |
| **Test Scenario** | Registrasi gagal karena password kurang dari 6 karakter |
| **Preconditions** | Browser membuka halaman /register. |
| **Test Steps** | 1. Buka halaman /register<br>2. Isi form dengan password: "12345"<br>3. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Validasi error: "Password minimal 6 karakter"<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan |
| **Priority** | Medium |
| **Req. Trace** | F-19 |

---

#### TC-F19-009: Registrasi gagal -- email format tidak valid

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-009 |
| **Test Scenario** | Registrasi gagal karena format email tidak valid |
| **Preconditions** | Browser membuka halaman /register. |
| **Test Steps** | 1. Buka halaman /register<br>2. Isi form dengan email: "bukan_email"<br>3. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Validasi error: format email tidak valid<br>2. Form tidak ter-submit |
| **Priority** | Medium |
| **Req. Trace** | F-19 |

---

#### TC-F19-010: Registrasi gagal -- field wajib kosong

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-010 |
| **Test Scenario** | Registrasi gagal karena field wajib tidak diisi |
| **Preconditions** | Browser membuka halaman /register. |
| **Test Steps** | 1. Buka halaman /register<br>2. Biarkan field Nama kosong<br>3. Klik "Daftar & Masuk" |
| **Expected Results** | 1. Validasi error pada field yang kosong<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan |
| **Priority** | Medium |
| **Req. Trace** | F-19 |

---

#### TC-F19-011: Form registrasi menampilkan field sesuai role yang dipilih

| Field | Value |
| --- | --- |
| **TC ID** | TC-F19-011 |
| **Test Scenario** | Form registrasi dinamis: field berubah sesuai role |
| **Preconditions** | Browser membuka halaman /register. |
| **Test Steps** | 1. Buka halaman /register<br>2. Pilih role "Siswa" -- periksa field<br>3. Ubah ke "Guru Mapel" -- periksa field<br>4. Ubah ke "Wali Kelas" -- periksa field<br>5. Ubah ke "Admin" -- periksa field |
| **Expected Results** | 1. Siswa: NIS, Nama, JK, Kelas, Email, Password<br>2. Guru Mapel: ID Guru, Nama, Mapel, Email, Password<br>3. Wali Kelas: ID Guru, Nama, ID Kelas, Email, Password<br>4. Admin: ID Admin, Nama, Username, Email, Password<br>5. Field berubah sesuai role |
| **Priority** | Medium |
| **Req. Trace** | F-19 |

### 3.1.2 UC-002: Login dengan Role-Locked Redirect

---

#### TC-F20-001: Login berhasil sebagai Siswa -- redirect ke SiswaDashboard

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-001 |
| **Test Scenario** | Login berhasil sebagai Siswa |
| **Preconditions** | Akun Siswa "ahmad@smpn4.sch.id" sudah terdaftar. Browser membuka halaman /login. |
| **Test Steps** | 1. Buka halaman /login<br>2. Masukkan email: "ahmad@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" |
| **Expected Results** | 1. Login berhasil (200 OK)<br>2. Redirect ke /dashboard<br>3. SiswaDashboard ditampilkan<br>4. Token dan user data tersimpan di React Context |
| **Priority** | High |
| **Req. Trace** | F-20 |

---

#### TC-F20-002: Login berhasil sebagai Guru Mapel -- redirect ke GuruDashboard

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-002 |
| **Test Scenario** | Login berhasil sebagai Guru Mapel |
| **Preconditions** | Akun Guru Mapel "guru_matematika@smpn4.sch.id" sudah terdaftar. |
| **Test Steps** | 1. Buka halaman /login<br>2. Masukkan email: "guru_matematika@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" |
| **Expected Results** | 1. Login berhasil (200 OK)<br>2. Redirect ke /dashboard<br>3. GuruDashboard ditampilkan |
| **Priority** | High |
| **Req. Trace** | F-20 |

---

#### TC-F20-003: Login berhasil sebagai Wali Kelas -- redirect ke WaliDashboard

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-003 |
| **Test Scenario** | Login berhasil sebagai Wali Kelas |
| **Preconditions** | Akun Wali Kelas "wali_vii_a@smpn4.sch.id" sudah terdaftar. |
| **Test Steps** | 1. Buka halaman /login<br>2. Masukkan email: "wali_vii_a@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" |
| **Expected Results** | 1. Login berhasil (200 OK)<br>2. Redirect ke /dashboard<br>3. WaliDashboard ditampilkan |
| **Priority** | High |
| **Req. Trace** | F-20 |

---

#### TC-F20-004: Login berhasil sebagai Admin -- redirect ke AdminDashboard

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-004 |
| **Test Scenario** | Login berhasil sebagai Admin (Guru BK) |
| **Preconditions** | Akun Admin "admin@smpn4.sch.id" sudah terdaftar. |
| **Test Steps** | 1. Buka halaman /login<br>2. Masukkan email: "admin@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" |
| **Expected Results** | 1. Login berhasil (200 OK)<br>2. Redirect ke /dashboard<br>3. AdminDashboard ditampilkan |
| **Priority** | High |
| **Req. Trace** | F-20 |

---

#### TC-F20-005: Login gagal -- email atau password salah

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-005 |
| **Test Scenario** | Login gagal karena password salah |
| **Preconditions** | Akun "ahmad@smpn4.sch.id" sudah terdaftar. |
| **Test Steps** | 1. Buka halaman /login<br>2. Masukkan email: "ahmad@smpn4.sch.id", password: "salah"<br>3. Klik "Masuk" |
| **Expected Results** | 1. Error: "Email atau password salah"<br>2. Pesan generic (tidak mengungkapkan field mana yang salah)<br>3. Tetap di halaman login |
| **Priority** | High |
| **Req. Trace** | F-20 |

---

#### TC-F20-006: Login gagal -- email tidak terdaftar

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-006 |
| **Test Scenario** | Login gagal karena email tidak terdaftar |
| **Preconditions** | Email "tidak_ada@smpn4.sch.id" belum terdaftar. |
| **Test Steps** | 1. Buka halaman /login<br>2. Masukkan email: "tidak_ada@smpn4.sch.id", password: "secret123"<br>3. Klik "Masuk" |
| **Expected Results** | 1. Error: "Email atau password salah"<br>2. Pesan sama dengan case password salah (generic)<br>3. Tetap di halaman login |
| **Priority** | High |
| **Req. Trace** | F-20 |

---

#### TC-F20-007: Login gagal -- field email kosong

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-007 |
| **Test Scenario** | Login gagal karena field email kosong |
| **Preconditions** | Browser membuka halaman /login. |
| **Test Steps** | 1. Buka halaman /login<br>2. Biarkan email kosong<br>3. Klik "Masuk" |
| **Expected Results** | 1. Validasi error: "Email harus diisi"<br>2. Form tidak ter-submit |
| **Priority** | Medium |
| **Req. Trace** | F-20 |

---

#### TC-F20-008: Login gagal -- field password kosong

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-008 |
| **Test Scenario** | Login gagal karena field password kosong |
| **Preconditions** | Browser membuka halaman /login. |
| **Test Steps** | 1. Buka halaman /login<br>2. Masukkan email, biarkan password kosong<br>3. Klik "Masuk" |
| **Expected Results** | 1. Validasi error: "Password harus diisi"<br>2. Form tidak ter-submit |
| **Priority** | Medium |
| **Req. Trace** | F-20 |

---

#### TC-F20-009: Login dengan session aktif -- redirect ke /dashboard

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-009 |
| **Test Scenario** | User sudah login, akses halaman login lagi |
| **Preconditions** | User sudah login (session aktif di React Context). |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Dalam keadaan sudah login, akses URL /login |
| **Expected Results** | 1. Sistem mendeteksi sesi aktif<br>2. Redirect ke /dashboard<br>3. Tidak ditampilkan form login |
| **Priority** | Medium |
| **Req. Trace** | F-20 |

---

#### TC-F20-010: Logout -- session berakhir

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-010 |
| **Test Scenario** | User melakukan logout |
| **Preconditions** | User sudah login. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Klik tombol "Logout" di sidebar atau header<br>3. Coba akses halaman yang dilindungi |
| **Expected Results** | 1. Session berakhir (token dihapus dari React Context)<br>2. Redirect ke /login<br>3. Tidak bisa mengakses halaman yang dilindungi |
| **Priority** | High |
| **Req. Trace** | F-20 |

---

#### TC-F20-011: Page reload -- session hilang (React Context)

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-011 |
| **Test Scenario** | Session hilang setelah page reload (in-memory state) |
| **Preconditions** | User sudah login. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Refresh browser (F5 atau Ctrl+R)<br>3. Periksa status login |
| **Expected Results** | 1. Session hilang (React Context in-memory)<br>2. Redirect ke /login<br>3. Harus login ulang |
| **Priority** | High |
| **Req. Trace** | F-20 |

---

#### TC-F20-012: Siswa tidak bisa akses dashboard Guru -- role mismatch

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-012 |
| **Test Scenario** | Siswa mencoba mengakses fitur Guru Mapel |
| **Preconditions** | User login sebagai Siswa. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Coba akses URL /dashboard (guru view) atau fitur guru |
| **Expected Results** | 1. Sistem mendeteksi role tidak sesuai<br>2. Redirect ke SiswaDashboard<br>3. Tidak bisa mengakses fitur guru |
| **Priority** | High |
| **Req. Trace** | F-20, VR-10, BR-19 |

---

#### TC-F20-013: Guru Mapel tidak bisa akses dashboard Admin -- role mismatch

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-013 |
| **Test Scenario** | Guru Mapel mencoba mengakses fitur Admin |
| **Preconditions** | User login sebagai Guru Mapel. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Coba akses URL /dashboard (admin view) atau fitur admin |
| **Expected Results** | 1. Sistem mendeteksi role tidak sesuai<br>2. Redirect ke GuruDashboard<br>3. Tidak bisa mengakses fitur admin |
| **Priority** | High |
| **Req. Trace** | F-20, VR-10, BR-19 |

---

#### TC-F20-014: Wali Kelas tidak bisa akses fitur Admin -- role mismatch

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-014 |
| **Test Scenario** | Wali Kelas mencoba mengakses fitur Admin |
| **Preconditions** | User login sebagai Wali Kelas. |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Coba akses halaman /jadwal atau /admin/hak-akses |
| **Expected Results** |1. Akses ditolak — role tidak berwenang<br>2. Sistem redirect ke WaliDashboard (VR-10)<br>3. Tidak bisa mengakses fitur admin|
| **Priority** | High |
| **Req. Trace** | F-20, VR-10, BR-19 |

---

#### TC-F20-015: Admin tidak bisa melakukan presensi -- role mismatch

| Field | Value |
| --- | --- |
| **TC ID** | TC-F20-015 |
| **Test Scenario** | Admin mencoba mengakses fitur presensi |
| **Preconditions** | User login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Coba akses halaman /presensi<br>3. Coba melakukan presensi |
| **Expected Results** | 1. Admin tidak memiliki jadwal pelajaran<br>2. Tidak bisa melakukan presensi<br>3. Presensi hanya untuk Guru Mapel dan Wali Kelas |
| **Priority** | Medium |
| **Req. Trace** | F-20, VR-10, BR-19 |

---

## 3.2 Feature F-01-F-05: Manajemen Presensi Per Jam Pelajaran

### 3.2.1 UC-003: Presensi Per Jam Pelajaran (Default-Hadir + Uncheck)

---

#### TC-F01-001: Default hadir initialization -- semua siswa otomatis Hadir

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-001 |
| **Test Scenario** | Semua siswa otomatis Hadir saat sesi dimulai |
| **Preconditions** | Login sebagai Guru Mapel. Ada jadwal Senin kelas VII A. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Akses halaman /presensi<br>3. Klik "Mulai Presensi" pada jadwal Senin kelas VII A<br>4. Periksa kartu siswa yang ditampilkan |
| **Expected Results** | 1. Semua kartu siswa berwarna hijau (Hadir)<br>2. Status default: statusHadir=true untuk semua siswa (BR-01)<br>3. Counter menampilkan: Hadir: N, Tidak Hadir: 0, Total: N<br>4. Data tersimpan di localStorage dengan benar |
| **Priority** | High |
| **Req. Trace** | F-01, BR-01 |

---

#### TC-F01-002: Uncheck siswa tidak hadir -- toggle kartu dari hijau ke merah

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-002 |
| **Test Scenario** | Toggle kartu siswa dari Hadir ke Tidak Hadir |
| **Preconditions** | Sesi presensi sudah diinisialisasi (TC-F01-001). |
| **Test Steps** | 1. Setelah inisialisasi (TC-F01-001)<br>2. Klik kartu siswa "Ahmad Rizki" (NIS: 2024001)<br>3. Periksa perubahan warna kartu dan counter |
| **Expected Results** | 1. Kartu berubah dari hijau ke merah<br>2. statusHadir berubah: true -> false<br>3. Counter Hadir berkurang 1, Tidak Hadir bertambah 1<br>4. Perubahan terefleksi secara real-time |
| **Priority** | High |
| **Req. Trace** | F-01, F-02, BR-02 |

---

#### TC-F01-003: Re-check siswa -- toggle kartu dari merah kembali ke hijau

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-003 |
| **Test Scenario** | Toggle kartu siswa dari Tidak Hadir kembali ke Hadir |
| **Preconditions** | Siswa sudah di-uncheck (TC-F01-002). |
| **Test Steps** | 1. Setelah uncheck (TC-F01-002)<br>2. Klik kartu siswa "Ahmad Rizki" yang sudah merah<br>3. Periksa perubahan warna kartu dan counter |
| **Expected Results** | 1. Kartu berubah dari merah kembali ke hijau<br>2. statusHadir berubah: false -> true<br>3. Counter Hadir bertambah 1, Tidak Hadir berkurang 1 |
| **Priority** | High |
| **Req. Trace** | F-01, F-02, BR-02 |

---

#### TC-F01-004: Uncheck beberapa siswa sekaligus

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-004 |
| **Test Scenario** | Multi-uncheck beberapa siswa berurutan |
| **Preconditions** | Sesi presensi sudah diinisialisasi. |
| **Test Steps** | 1. Setelah inisialisasi<br>2. Klik kartu 3 siswa berbeda secara berurutan<br>3. Periksa counter dan kartu |
| **Expected Results** | 1. Ketiga kartu berubah ke merah<br>2. Counter Hadir: N-3, Tidak Hadir: 3<br>3. Siswa lain tetap hijau |
| **Priority** | Medium |
| **Req. Trace** | F-01, F-02, BR-02 |

---

#### TC-F01-005: Reset ke default -- semua siswa kembali Hadir

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-005 |
| **Test Scenario** | Reset semua status ke default Hadir |
| **Preconditions** | Beberapa siswa sudah di-uncheck. |
| **Test Steps** | 1. Setelah beberapa siswa di-uncheck<br>2. Klik tombol "Reset ke Default (Semua Hadir)"<br>3. Periksa semua kartu dan counter |
| **Expected Results** | 1. Semua kartu kembali hijau<br>2. Semua statusHadir = true<br>3. Counter: Hadir: N, Tidak Hadir: 0<br>4. Sesi belum tersimpan (belum klik Simpan) |
| **Priority** | Medium |
| **Req. Trace** | F-01, BR-01 |

---

#### TC-F01-006: Simpan presensi -- data berhasil disimpan ke localStorage

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-006 |
| **Test Scenario** | Simpan data presensi ke localStorage |
| **Preconditions** | Sesi presensi sudah diinisialisasi, beberapa siswa di-uncheck. |
| **Test Steps** | 1. Setelah melakukan uncheck pada beberapa siswa<br>2. Klik tombol "Simpan Presensi"<br>3. Periksa localStorage |
| **Expected Results** | 1. Pesan sukses: "Presensi tersimpan! N siswa diproses."<br>2. Data presensi tersimpan di localStorage<br>3. StatusHadir sesuai dengan yang dipilih guru |
| **Priority** | High |
| **Req. Trace** | F-01, F-03 |

---

#### TC-F01-007: Presensi per jam -- satu siswa bisa berbeda status di jam berbeda

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-007 |
| **Test Scenario** | Presensi terpisah per jam pelajaran |
| **Preconditions** | Ada 2 jadwal untuk kelas yang sama di hari yang sama. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Presensi jam pertama: uncheck Ahmad Rizki<br>3. Simpan<br>4. Mulai presensi jam kedua untuk kelas yang sama<br>5. Periksa status Ahmad Rizki |
| **Expected Results** | 1. Ahmad Rizki default hadir di jam kedua<br>2. Status di jam pertama dan jam kedua berbeda (BR-03)<br>3. Data presensi terpisah per jam pelajaran |
| **Priority** | High |
| **Req. Trace** | F-01, BR-03 |

---

#### TC-F01-008: Guru Mapel hanya bisa akses jadwal yang diampu

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-008 |
| **Test Scenario** | Guru Mapel hanya bisa presensi untuk jadwal sendiri |
| **Preconditions** | Login sebagai Guru Mapel (mengampu Matematika). Ada jadwal lain yang bukan milik guru ini. |
| **Test Steps** | 1. Login sebagai Guru Mapel (mengampu Matematika)<br>2. Akses halaman /presensi<br>3. Coba akses jadwal yang bukan milik guru ini |
| **Expected Results** | 1. Hanya jadwal milik guru yang ditampilkan<br>2. Jika mencoba akses jadwal lain: error "Anda tidak memiliki akses ke jadwal ini"<br>3. Tidak bisa melakukan presensi pada jadwal orang lain |
| **Priority** | High |
| **Req. Trace** | F-01, BR-04, VR-06 |

---

#### TC-F01-009: Tombol "Sudah Dipresensi" -- disabled untuk jadwal selesai

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-009 |
| **Test Scenario** | Tombol aksi disabled untuk jadwal yang sudah dipresensi |
| **Preconditions** | Guru Mapel sudah melakukan presensi pada suatu jadwal. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Presensi jadwal tertentu (selesai)<br>3. Refresh halaman /presensi<br>4. Cari jadwal yang sudah dipresensi |
| **Expected Results** | 1. Tombol aksi berubah menjadi "Sudah Dipresensi" (disabled)<br>2. Guru tetap bisa klik untuk melihat data yang sudah ada |
| **Priority** | Medium |
| **Req. Trace** | F-01 |

---

#### TC-F01-010: Default hadir tidak bisa kosong -- semua siswa harus diinisialisasi

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-010 |
| **Test Scenario** | Simpan presensi tanpa inisialisasi ditolak |
| **Preconditions** | Login sebagai Guru Mapel. Belum melakukan inisialisasi. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Coba langsung klik "Simpan Presensi" tanpa inisialisasi |
| **Expected Results** | 1. Sistem tidak mengizinkan penyimpanan tanpa inisialisasi<br>2. Semua siswa harus terinisialisasi sebagai hadir terlebih dahulu |
| **Priority** | Medium |
| **Req. Trace** | F-01, VR-08 |

---

#### TC-F01-011: Simpan presensi dengan data tidak lengkap

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-011 |
| **Test Scenario** | Simpan presensi dengan data tidak lengkap ditolak |
| **Preconditions** | Sesi presensi sudah diinisialisasi. |
| **Test Steps** | 1. Setelah inisialisasi<br>2. Coba simpan dengan data presensi yang tidak lengkap (beberapa NIS hilang) |
| **Expected Results** | 1. Error: "Data presensi tidak lengkap"<br>2. Data tidak tersimpan<br>3. Form tetap terbuka |
| **Priority** | Medium |
| **Req. Trace** | F-01, F-03 |

---

#### TC-F01-012: Akses presensi tanpa login -- redirect ke /login

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-012 |
| **Test Scenario** | Akses halaman presensi tanpa autentikasi |
| **Preconditions** | User belum login (session kosong). |
| **Test Steps** | 1. Buka browser baru (tidak login)<br>2. Akses langsung URL /presensi |
| **Expected Results** | 1. Sistem redirect ke halaman /login<br>2. Tidak bisa mengakses halaman presensi |
| **Priority** | High |
| **Req. Trace** | F-01 |

### 3.2.2 UC-009: Lihat Data Kehadiran Real-time

---

#### TC-F01-013: Guru Mapel melihat data kehadiran real-time untuk kelas sendiri

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-013 |
| **Test Scenario** | Guru Mapel melihat data kehadiran untuk kelas yang diampu |
| **Preconditions** | Login sebagai Guru Mapel. Sudah ada data presensi. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Akses halaman /kehadiran<br>3. Periksa data yang ditampilkan |
| **Expected Results** | 1. Hanya data presensi untuk kelas dan jadwal yang diampu guru ditampilkan<br>2. Tabel: Tanggal, NIS, Nama, Kelas, Mapel, Jam, Status, Keterangan<br>3. Data real-time sesuai dengan presensi terakhir |
| **Priority** | High |
| **Req. Trace** | F-05, VR-06 |

---

#### TC-F01-014: Wali Kelas melihat data kehadiran untuk kelas binaan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-014 |
| **Test Scenario** | Wali Kelas melihat data kehadiran untuk kelas binaan |
| **Preconditions** | Login sebagai Wali Kelas (kelas binaan: VII A). Sudah ada data presensi. |
| **Test Steps** | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /kehadiran<br>3. Periksa data yang ditampilkan |
| **Expected Results** | 1. Semua data presensi untuk siswa di kelas VII A ditampilkan<br>2. Data mencakup semua jam pelajaran<br>3. Filter default: semua data untuk kelas binaan |
| **Priority** | High |
| **Req. Trace** | F-05, VR-07 |

---

#### TC-F01-015: Admin melihat semua data kehadiran tanpa filter

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-015 |
| **Test Scenario** | Admin melihat semua data kehadiran |
| **Preconditions** | Login sebagai Admin (Guru BK). Sudah ada data presensi. |
| **Test Steps** | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /kehadiran<br>3. Periksa data yang ditampilkan |
| **Expected Results** | 1. Semua data presensi untuk semua kelas dan jadwal ditampilkan<br>2. Tidak ada filter role-based<br>3. Admin bisa melihat data dari kelas manapun |
| **Priority** | High |
| **Req. Trace** | F-05 |

---

#### TC-F01-016: Filter data kehadiran berdasarkan kelas dan tanggal

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-016 |
| **Test Scenario** | Filter data kehadiran dengan kombinasi kelas dan tanggal |
| **Preconditions** | Login sebagai Admin. Sudah ada data presensi multi-kelas. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /kehadiran<br>3. Filter: kelas = VII A, tanggal = 2026-07-16<br>4. Periksa data yang ditampilkan |
| **Expected Results** | 1. Hanya data untuk kelas VII A pada tanggal 2026-07-16 ditampilkan<br>2. Record count sesuai dengan filter<br>3. Filter berfungsi dengan benar |
| **Priority** | Medium |
| **Req. Trace** | F-05 |

---

#### TC-F01-017: Guru Mapel tidak bisa melihat data kelas lain

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-017 |
| **Test Scenario** | Guru Mapel dibatasi hanya melihat kelas yang diampu |
| **Preconditions** | Login sebagai Guru Mapel (mengampu Matematika VII A). |
| **Test Steps** | 1. Login sebagai Guru Mapel (mengampu Matematika VII A)<br>2. Akses halaman /kehadiran<br>3. Coba filter kelas VII B |
| **Expected Results** | 1. Data kelas VII B tidak ditampilkan<br>2. Hanya data untuk kelas yang diampu guru ditampilkan<br>3. Filter kelas lain tidak mengembalikan data |
| **Priority** | High |
| **Req. Trace** | F-05, VR-06 |

### 3.2.3 UC-012: Verifikasi Data Presensi Bermasalah oleh Admin

---

#### TC-F01-018: Admin toggle status presensi dari Hadir ke Tidak Hadir

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-018 |
| **Test Scenario** | Admin mengubah status presensi dari Hadir ke Tidak Hadir |
| **Preconditions** | Login sebagai Admin. Ada data presensi dengan status Hadir. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /kehadiran<br>3. Cari siswa dengan status Hadir<br>4. Klik badge status atau tombol aksi untuk toggle |
| **Expected Results** | 1. Status berubah dari Hadir (statusHadir=true) ke Tidak Hadir (statusHadir=false)<br>2. statusManual berubah: 'hadir' -> 'tidak_hadir'<br>3. Badge berubah warna di tabel |
| **Priority** | High |
| **Req. Trace** | F-04, BR-05 |

---

#### TC-F01-019: Admin toggle status presensi dari Tidak Hadir ke Hadir

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-019 |
| **Test Scenario** | Admin mengubah status presensi dari Tidak Hadir ke Hadir |
| **Preconditions** | Login sebagai Admin. Ada data presensi dengan status Tidak Hadir. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /kehadiran<br>3. Cari siswa dengan status Tidak Hadir<br>4. Klik badge status untuk toggle |
| **Expected Results** | 1. Status berubah dari Tidak Hadir (statusHadir=false) ke Hadir (statusHadir=true)<br>2. statusManual berubah: 'tidak_hadir' -> 'hadir'<br>3. Badge berubah warna di tabel |
| **Priority** | High |
| **Req. Trace** | F-04, BR-05 |

---

#### TC-F01-020: Guru Mapel tidak bisa mengubah data presensi

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-020 |
| **Test Scenario** | Guru Mapel tidak memiliki akses ubah data presensi |
| **Preconditions** | Login sebagai Guru Mapel. Ada data presensi. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Akses halaman /kehadiran<br>3. Coba klik badge status untuk toggle |
| **Expected Results** |1. Tombol toggle tidak tersedia untuk Guru Mapel<br>2. Hanya Admin yang bisa melakukan perubahan<br>3. Jika mencoba akses PUT /api/v1/kehadiran/{id}: ditolak — hanya Admin yang berwenang|
| **Priority** | High |
| **Req. Trace** | F-04, VR-10 |

---

#### TC-F01-021: Wali Kelas tidak bisa mengubah data presensi

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-021 |
| **Test Scenario** | Wali Kelas tidak memiliki akses ubah data presensi |
| **Preconditions** | Login sebagai Wali Kelas. Ada data presensi. |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Akses halaman /kehadiran<br>3. Coba klik badge status untuk toggle |
| **Expected Results** | 1. Tombol toggle tidak tersedia untuk Wali Kelas<br>2. Hanya Admin yang bisa melakukan perubahan |
| **Priority** | High |
| **Req. Trace** | F-04, VR-10 |

---

#### TC-F01-022: Admin memverifikasi data presensi bermasalah

| Field | Value |
| --- | --- |
| **TC ID** | TC-F01-022 |
| **Test Scenario** | Admin memperbaiki data presensi yang salah |
| **Preconditions** | Login sebagai Admin. Ada data presensi yang perlu dikoreksi. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /kehadiran<br>3. Filter untuk menemukan record yang bermasalah<br>4. Toggle status sesuai koreksi |
| **Expected Results** | 1. Admin bisa memperbaiki data presensi yang salah<br>2. Perubahan tersimpan dengan benar<br>3. Data diperbarui di localStorage |
| **Priority** | High |
| **Req. Trace** | F-04, BR-05 |

---

## 3.3 Feature F-06-F-10: Pengajuan Izin Ketidakhadiran

### 3.3.1 UC-004: Pengajuan Izin Ketidakhadiran

---

#### TC-F06-001: Siswa mengajukan izin dengan data valid (sakit)

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-001 |
| **Test Scenario** | Siswa mengajukan izin sakit dengan data valid |
| **Preconditions** | Login sebagai Siswa. Belum ada izin untuk hari ini. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = hari ini, jenisIzin = "sakit", keterangan = "Sakit demam"<br>4. Klik "Ajukan Izin" |
| **Expected Results** | 1. Izin berhasil diajukan<br>2. Status default: "menunggu" (BR-09)<br>3. Data tersimpan di localStorage<br>4. Riwayat izin ter-update<br>5. Pesan sukses: "Izin berhasil diajukan! Status: Menunggu verifikasi." |
| **Priority** | High |
| **Req. Trace** | F-06, F-07, BR-07, BR-09 |

---

#### TC-F06-002: Siswa mengajukan izin dengan jenis "izin"

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-002 |
| **Test Scenario** | Siswa mengajukan izin dengan jenis "izin" |
| **Preconditions** | Login sebagai Siswa. Belum ada izin untuk hari ini. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = hari ini, jenisIzin = "izin", keterangan = "Izin keluarga"<br>4. Klik "Ajukan Izin" |
| **Expected Results** | 1. Izin berhasil diajukan<br>2. Status: "menunggu"<br>3. Jenis izin: "izin" tersimpan dengan benar |
| **Priority** | High |
| **Req. Trace** | F-06, F-07, BR-07, BR-09 |

---

#### TC-F06-003: Siswa mengajukan izin dengan jenis "lainnya"

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-003 |
| **Test Scenario** | Siswa mengajukan izin dengan jenis "lainnya" |
| **Preconditions** | Login sebagai Siswa. Belum ada izin untuk hari ini. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = hari ini, jenisIzin = "lainnya", keterangan = "Keperluan sekolah"<br>4. Klik "Ajukan Izin" |
| **Expected Results** | 1. Izin berhasil diajukan<br>2. Status: "menunggu"<br>3. Jenis izin: "lainnya" tersimpan dengan benar |
| **Priority** | Medium |
| **Req. Trace** | F-06, F-07, BR-07, BR-09 |

---

#### TC-F06-004: Siswa mengajukan izin dengan upload bukti pendukung

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-004 |
| **Test Scenario** | Siswa mengajukan izin dengan lampiran bukti |
| **Preconditions** | Login sebagai Siswa. File bukti pendukung tersedia. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal, jenisIzin, keterangan<br>4. Upload file bukti pendukung (surat dokter)<br>5. Klik "Ajukan Izin" |
| **Expected Results** | 1. Izin berhasil diajukan<br>2. File bukti pendukung tersimpan<br>3. Nama file ditampilkan di riwayat izin |
| **Priority** | Medium |
| **Req. Trace** | F-06, F-08, BR-08 |

---

#### TC-F06-005: Siswa mengajukan izin untuk tanggal masa depan -- ditolak

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-005 |
| **Test Scenario** | Izin untuk tanggal masa depan ditolak |
| **Preconditions** | Login sebagai Siswa. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = 2026-12-31 (masa depan)<br>4. Klik "Ajukan Izin" |
| **Expected Results** | 1. Error: "Tanggal izin tidak boleh di masa depan."<br>2. Izin tidak tersimpan<br>3. Form tetap terbuka dengan data yang diisi |
| **Priority** | High |
| **Req. Trace** | F-06, VR-03 |

---

#### TC-F06-006: Siswa mengajukan izin duplikat untuk tanggal yang sama -- ditolak

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-006 |
| **Test Scenario** | Izin duplikat untuk tanggal sama ditolak |
| **Preconditions** | Login sebagai Siswa. Sudah ada izin untuk tanggal 2026-07-16. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Sudah mengajuan izin untuk tanggal 2026-07-16<br>3. Coba ajukan izin lagi untuk tanggal 2026-07-16 |
| **Expected Results** | 1. Error: "Anda sudah memiliki pengajuan izin untuk tanggal ini."<br>2. Izin kedua tidak tersimpan<br>3. Hanya satu izin per tanggal per siswa |
| **Priority** | High |
| **Req. Trace** | F-06, VR-04 |

---

#### TC-F06-007: Siswa mengajukan izin tanpa mengisi field wajib

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-007 |
| **Test Scenario** | Validasi form izin -- field wajib kosong |
| **Preconditions** | Login sebagai Siswa. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Biarkan field keterangan kosong<br>4. Klik "Ajukan Izin" |
| **Expected Results** | 1. Validasi error pada field yang kosong<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan |
| **Priority** | Medium |
| **Req. Trace** | F-06 |

---

#### TC-F06-008: Siswa melihat riwayat izin sendiri

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-008 |
| **Test Scenario** | Siswa melihat riwayat izin milik sendiri |
| **Preconditions** | Login sebagai Siswa. Sudah ada riwayat izin. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Periksa tabel riwayat izin |
| **Expected Results** | 1. Hanya izin milik siswa sendiri yang ditampilkan<br>2. Data mencakup: tanggal, jenis, keterangan, bukti, status<br>3. Tidak ada izin milik siswa lain |
| **Priority** | Medium |
| **Req. Trace** | F-06, F-10, VR-05 |

### 3.3.2 UC-005: Verifikasi Izin oleh Wali Kelas / Admin

---

#### TC-F06-009: Wali Kelas menyetujui izin siswa di kelas binaan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-009 |
| **Test Scenario** | Wali Kelas menyetujui izin siswa |
| **Preconditions** | Login sebagai Wali Kelas (kelas binaan: VII A). Ada izin "menunggu" dari siswa VII A. |
| **Test Steps** | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /verifikasi-izin<br>3. Filter: statusIzin = "menunggu"<br>4. Klik "Setujui" pada izin siswa VII A |
| **Expected Results** | 1. Status izin berubah: "menunggu" -> "disetujui"<br>2. Badge berubah warna (hijau)<br>3. Tombol aksi menghilang<br>4. Izin tersimpan di localStorage |
| **Priority** | High |
| **Req. Trace** | F-09, BR-10 |

---

#### TC-F06-010: Wali Kelas menolak izin siswa di kelas binaan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-010 |
| **Test Scenario** | Wali Kelas menolak izin siswa |
| **Preconditions** | Login sebagai Wali Kelas. Ada izin "menunggu" dari siswa di kelas binaan. |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Akses halaman /verifikasi-izin<br>3. Klik "Tolak" pada izin siswa |
| **Expected Results** | 1. Status izin berubah: "menunggu" -> "ditolak"<br>2. Badge berubah warna (merah)<br>3. Tombol aksi menghilang |
| **Priority** | High |
| **Req. Trace** | F-09, BR-10 |

---

#### TC-F06-011: Admin menyetujui izin siswa

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-011 |
| **Test Scenario** | Admin menyetujui izin siswa |
| **Preconditions** | Login sebagai Admin (Guru BK). Ada izin "menunggu". |
| **Test Steps** | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /verifikasi-izin<br>3. Klik "Setujui" pada izin siswa |
| **Expected Results** | 1. Status izin berubah: "menunggu" -> "disetujui"<br>2. Admin bisa melihat semua izin dari semua kelas |
| **Priority** | High |
| **Req. Trace** | F-09, BR-10 |

---

#### TC-F06-012: Admin menolak izin siswa

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-012 |
| **Test Scenario** | Admin menolak izin siswa |
| **Preconditions** | Login sebagai Admin. Ada izin "menunggu". |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /verifikasi-izin<br>3. Klik "Tolak" pada izin siswa |
| **Expected Results** | 1. Status izin berubah: "menunggu" -> "ditolak" |
| **Priority** | High |
| **Req. Trace** | F-09, BR-10 |

---

#### TC-F06-013: Wali Kelas tidak bisa melihat izin kelas lain

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-013 |
| **Test Scenario** | Wali Kelas dibatasi hanya melihat izin kelas binaan |
| **Preconditions** | Login sebagai Wali Kelas (kelas binaan: VII A). Ada izin dari kelas lain. |
| **Test Steps** | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /verifikasi-izin<br>3. Periksa data yang ditampilkan |
| **Expected Results** | 1. Hanya izin dari siswa di kelas VII A ditampilkan<br>2. Izin dari kelas lain tidak terlihat<br>3. Scope filter otomatis diterapkan |
| **Priority** | High |
| **Req. Trace** | F-09, VR-07 |

---

#### TC-F06-014: Guru Mapel tidak bisa mengakses verifikasi izin

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-014 |
| **Test Scenario** | Guru Mapel tidak memiliki akses verifikasi izin |
| **Preconditions** | Login sebagai Guru Mapel. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Coba akses halaman /verifikasi-izin |
| **Expected Results** |1. Akses ditolak — role tidak berwenang<br>2. Sistem redirect ke /dashboard (VR-10)<br>3. Guru Mapel tidak memiliki akses verifikasi izin |
| **Priority** | High |
| **Req. Trace** | F-09, VR-10 |

---

#### TC-F06-015: Izin yang sudah diverifikasi tidak bisa diubah lagi

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-015 |
| **Test Scenario** | Izin sudah diverifikasi tidak bisa diubah |
| **Preconditions** | Login sebagai Wali Kelas. Ada izin yang sudah "disetujui". |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Setujui izin tertentu<br>3. Coba setujui atau tolak izin yang sama lagi |
| **Expected Results** | 1. Error: "Izin sudah diverifikasi sebelumnya"<br>2. Status tidak berubah<br>3. Izin tetap "disetujui" |
| **Priority** | Medium |
| **Req. Trace** | F-09 |

---

#### TC-F06-016: Izin disetujui mempengaruhi rekap harian sebagai Hadir

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-016 |
| **Test Scenario** | Izin disetujui dihitung sebagai Hadir di rekap harian |
| **Preconditions** | Siswa mengajukan izin, Wali Kelas menyetujui. |
| **Test Steps** | 1. Siswa mengajukan izin untuk tanggal 2026-07-16<br>2. Wali Kelas menyetujui izin<br>3. Lihat rekap harian untuk tanggal 2026-07-16<br>4. Periksa status siswa tersebut |
| **Expected Results** | 1. Siswa dengan izin disetujui dihitung sebagai Hadir di rekap harian<br>2. Persentase kehadiran memperhitungkan izin disetujui<br>3. Formula: Jam Hadir* termasuk izin disetujui (BR-14) |
| **Priority** | High |
| **Req. Trace** | F-09, BR-11, BR-14 |

---

#### TC-F06-017: Satu izin berlaku untuk seluruh jam pelajaran pada tanggal tersebut

| Field | Value |
| --- | --- |
| **TC ID** | TC-F06-017 |
| **Test Scenario** | Satu izin otomatis mencakup semua jam pelajaran di tanggal yang sama |
| **Preconditions** | Login sebagai Siswa. Ada 3 jadwal jam pelajaran pada tanggal 2026-07-16. Belum ada izin untuk tanggal ini. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /izin<br>3. Isi form: tanggal = 2026-07-16, jenisIzin = "sakit", keterangan = "Sakit demam"<br>4. Klik "Ajukan Izin"<br>5. Lihat rekap harian untuk tanggal 2026-07-16 |
| **Expected Results** | 1. Izin berhasil diajukan untuk tanggal 2026-07-16<br>2. Izin berlaku untuk seluruh jam pelajaran pada tanggal tersebut (BR-06)<br>3. Tidak ada pengajuan izin per jam pelajaran<br>4. Status kehadiran untuk semua jam pada tanggal tersebut menjadi "Izin" (jika disetujui) |
| **Priority** | High |
| **Req. Trace** | F-06, BR-06 |

---

## 3.4 Feature F-11-F-14: Rekapitulasi dan Laporan

### 3.4.1 UC-006: Rekap Harian Berbasis Persentase (Otomatis)

---

#### TC-F12-001: Wali Kelas melihat rekap harian untuk kelas binaan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-001 |
| **Test Scenario** | Wali Kelas melihat rekap harian kelas binaan |
| **Preconditions** | Login sebagai Wali Kelas (kelas binaan: VII A). Sudah ada data presensi untuk tanggal tertentu. |
| **Test Steps** | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /laporan (tab "Rekap Harian")<br>3. Filter: tanggal = 2026-07-15<br>4. Periksa data yang ditampilkan |
| **Expected Results** | 1. Rekap harian untuk kelas VII A ditampilkan<br>2. Summary: Total Siswa, Hadir, Tidak Hadir<br>3. Tabel: NIS, Nama, Hadir/Total, Persentase, Status Hari<br>4. Progress bar untuk setiap siswa |
| **Priority** | High |
| **Req. Trace** | F-12, VR-07 |

---

#### TC-F12-002: Admin melihat rekap harian untuk semua kelas

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-002 |
| **Test Scenario** | Admin melihat rekap harian semua kelas |
| **Preconditions** | Login sebagai Admin (Guru BK). Sudah ada data presensi multi-kelas. |
| **Test Steps** | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /laporan (tab "Rekap Harian")<br>3. Filter: tanggal = 2026-07-15<br>4. Periksa data yang ditampilkan |
| **Expected Results** | 1. Rekap harian untuk semua kelas ditampilkan<br>2. Admin bisa filter per kelas<br>3. Data mencakup semua siswa di semua kelas |
| **Priority** | High |
| **Req. Trace** | F-12 |

---

#### TC-F12-003: Perhitungan persentase tepat 60% -- status HADIR

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-003 |
| **Test Scenario** | Threshold tepat 60% menghasilkan status Hadir |
| **Preconditions** | Data: siswa hadir 3.6 dari 6 jam (60.00%). |
| **Test Steps** | 1. Siapkan data: siswa hadir 3.6 dari 6 jam (60.00%)<br>2. Lihat rekap harian<br>3. Periksa status siswa |
| **Expected Results** | 1. Persentase = 60.00%<br>2. Status Hari = "Hadir" (>= 60%, BR-13)<br>3. Progress bar menampilkan 60% |
| **Priority** | High |
| **Req. Trace** | F-12, BR-12, BR-13 |

---

#### TC-F12-004: Perhitungan persentase di bawah 60% -- status TIDAK HADIR

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-004 |
| **Test Scenario** | Threshold di bawah 60% menghasilkan status Tidak Hadir |
| **Preconditions** | Data: siswa hadir 3 dari 6 jam (50.00%). |
| **Test Steps** | 1. Siapkan data: siswa hadir 3 dari 6 jam (50.00%)<br>2. Lihat rekap harian<br>3. Periksa status siswa |
| **Expected Results** | 1. Persentase = 50.00%<br>2. Status Hari = "Tidak Hadir" (< 60%, BR-13)<br>3. Progress bar menampilkan 50% |
| **Priority** | High |
| **Req. Trace** | F-12, BR-12, BR-13 |

---

#### TC-F12-005: Perhitungan persentase di atas 60% -- status HADIR

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-005 |
| **Test Scenario** | Threshold di atas 60% menghasilkan status Hadir |
| **Preconditions** | Data: siswa hadir 5 dari 6 jam (83.33%). |
| **Test Steps** | 1. Siapkan data: siswa hadir 5 dari 6 jam (83.33%)<br>2. Lihat rekap harian<br>3. Periksa status siswa |
| **Expected Results** | 1. Persentase = 83.33%<br>2. Status Hari = "Hadir" (>= 60%)<br>3. Progress bar menampilkan 83.33% |
| **Priority** | High |
| **Req. Trace** | F-12, BR-12, BR-13 |

---

#### TC-F12-006: Izin disetujui mendorong persentase di atas 60%

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-006 |
| **Test Scenario** | Izin disetujui mempengaruhi perhitungan persentase |
| **Preconditions** | Siswa hadir 3 dari 6 jam (50%). Ada 1 izin disetujui (1 jam). |
| **Test Steps** | 1. Siswa hadir 3 dari 6 jam (50%)<br>2. Siswa punya izin disetujui untuk 1 jam<br>3. Hitung: (3+1)/6 = 66.67%<br>4. Lihat rekap harian |
| **Expected Results** | 1. Persentase = 66.67%<br>2. Status Hari = "Hadir" (>= 60%)<br>3. Izin disetujui dihitung sebagai Hadir di numerator (BR-14) |
| **Priority** | High |
| **Req. Trace** | F-12, BR-14 |

---

#### TC-F12-007: Tidak ada data presensi untuk tanggal tertentu

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-007 |
| **Test Scenario** | Empty state untuk tanggal tanpa data presensi |
| **Preconditions** | Login sebagai Wali Kelas. Tanggal yang dipilih belum ada data presensi. |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Akses halaman /laporan<br>3. Filter tanggal yang belum ada data presensi |
| **Expected Results** | 1. Summary: Total Siswa = 0, Hadir = 0, Tidak Hadir = 0<br>2. Tabel menampilkan "Tidak ada data" |
| **Priority** | Low |
| **Req. Trace** | F-12 |

---

#### TC-F12-008: Guru Mapel tidak bisa mengakses rekap harian

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-008 |
| **Test Scenario** | Guru Mapel tidak memiliki akses rekap harian |
| **Preconditions** | Login sebagai Guru Mapel. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Coba akses halaman /laporan (tab "Rekap Harian") |
| **Expected Results** | 1. Akses ditolak — role tidak berwenang<br>2. Guru Mapel tidak memiliki akses ke rekap harian<br>3. Sistem redirect ke dashboard (VR-10) |
| **Priority** | High |
| **Req. Trace** | F-12, VR-10 |

---

#### TC-F12-009: Perhitungan otomatis tanpa penyimpanan manual

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-009 |
| **Test Scenario** | Rekap dihitung otomatis saat query |
| **Preconditions** | Login sebagai Wali Kelas. Sudah ada data presensi. |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Lihat rekap harian<br>3. Periksa bahwa perhitungan dilakukan saat query, bukan saat penyimpanan |
| **Expected Results** | 1. Rekap dihitung secara otomatis saat halaman dimuat<br>2. Tidak ada tombol "Hitung Ulang"<br>3. Data presensi berubah -> rekap berubah otomatis |
| **Priority** | Medium |
| **Req. Trace** | F-12, BR-15 |

### 3.4.2 UC-007: Rekap Bulanan Per Mata Pelajaran

---

#### TC-F11-001: Guru Mapel melihat rekap bulanan untuk mata pelajaran sendiri

| Field | Value |
| --- | --- |
| **TC ID** | TC-F11-001 |
| **Test Scenario** | Guru Mapel melihat rekap bulanan mapel sendiri |
| **Preconditions** | Login sebagai Guru Mapel (mengampu Matematika). Sudah ada data presensi bulanan. |
| **Test Steps** | 1. Login sebagai Guru Mapel (mengampu Matematika)<br>2. Akses halaman /laporan (tab "Rekap Bulanan Per Mapel")<br>3. Filter: kelas = VII A, mataPelajaran = Matematika, bulan = 2026-07<br>4. Periksa data |
| **Expected Results** | 1. Rekap bulanan untuk Matematika VII A ditampilkan<br>2. Tabel: NIS, Nama, Kelas, Hadir, Tidak Hadir, Total, Persentase<br>3. Progress bar untuk setiap siswa<br>4. Hanya data untuk mata pelajaran yang diampu (VR-06) |
| **Priority** | High |
| **Req. Trace** | F-11, BR-16, BR-18, VR-06 |

---

#### TC-F11-002: Admin melihat rekap bulanan untuk semua mata pelajaran

| Field | Value |
| --- | --- |
| **TC ID** | TC-F11-002 |
| **Test Scenario** | Admin melihat rekap bulanan semua mapel |
| **Preconditions** | Login sebagai Admin. Sudah ada data presensi bulanan multi-mapel. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /laporan (tab "Rekap Bulanan Per Mapel")<br>3. Filter: kelas = VII A, bulan = 2026-07<br>4. Periksa data |
| **Expected Results** | 1. Rekap bulanan untuk semua mata pelajaran ditampilkan<br>2. Admin bisa filter per mata pelajaran<br>3. Data mencakup semua siswa |
| **Priority** | High |
| **Req. Trace** | F-11 |

---

#### TC-F11-003: Wali Kelas melihat rekap bulanan untuk kelas binaan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F11-003 |
| **Test Scenario** | Wali Kelas melihat rekap bulanan kelas binaan |
| **Preconditions** | Login sebagai Wali Kelas (kelas binaan: VII A). Sudah ada data presensi bulanan. |
| **Test Steps** | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /laporan (tab "Rekap Bulanan Per Mapel")<br>3. Filter: kelas = VII A, bulan = 2026-07<br>4. Periksa data |
| **Expected Results** | 1. Rekap bulanan untuk kelas VII A ditampilkan<br>2. Data mencakup semua mata pelajaran<br>3. Scope terbatas pada kelas binaan |
| **Priority** | High |
| **Req. Trace** | F-11, VR-07 |

---

#### TC-F11-004: Rekap bulanan bersifat read-only -- tidak bisa diubah

| Field | Value |
| --- | --- |
| **TC ID** | TC-F11-004 |
| **Test Scenario** | Rekap bulanan hanya bisa dilihat |
| **Preconditions** | Login sebagai Guru Mapel atau Admin. |
| **Test Steps** | 1. Login sebagai Guru Mapel atau Admin<br>2. Akses rekap bulanan<br>3. Coba klik atau edit data di tabel |
| **Expected Results** | 1. Tidak ada tombol edit atau hapus<br>2. Data hanya bisa dilihat (read-only)<br>3. Rekap bulanan adalah acuan penilaian, bukan sistem nilai |
| **Priority** | Medium |
| **Req. Trace** | F-11, BR-17 |

---

#### TC-F11-005: Filter rekap bulanan berdasarkan kelas, mapel, dan bulan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F11-005 |
| **Test Scenario** | Filter rekap bulanan 3 parameter |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses rekap bulanan<br>3. Filter: kelas = VII B, mataPelajaran = Bahasa Indonesia, bulan = 2026-06<br>4. Periksa data |
| **Expected Results** | 1. Data sesuai dengan filter yang dipilih<br>2. Tabel hanya menampilkan data untuk filter tersebut<br>3. Filter ketiga parameter berfungsi dengan benar |
| **Priority** | Medium |
| **Req. Trace** | F-11 |

---

#### TC-F11-006: Tidak ada data untuk filter tertentu

| Field | Value |
| --- | --- |
| **TC ID** | TC-F11-006 |
| **Test Scenario** | Empty state untuk filter tanpa data |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses rekap bulanan<br>3. Filter: kelas = VII A, bulan = 2025-01 (belum ada data) |
| **Expected Results** | 1. Tabel menampilkan "Tidak ada data"<br>2. Summary: 0 siswa |
| **Priority** | Low |
| **Req. Trace** | F-11 |

### 3.4.3 UC-010: Pantau Rekap Kelas oleh Wali Kelas

---

#### TC-F12-010: Wali Kelas melihat rekap harian kelas binaan dengan detail per jam

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-010 |
| **Test Scenario** | Rekap harian dengan detail per jam pelajaran |
| **Preconditions** | Login sebagai Wali Kelas (kelas binaan: VII A). Sudah ada data presensi multi-jam. |
| **Test Steps** | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /pantau-rekap<br>3. Filter: tanggal = 2026-07-15<br>4. Periksa tabel dan detail per jam |
| **Expected Results** | 1. Rekap harian untuk kelas VII A ditampilkan<br>2. Tabel: NIS, Nama, Hadir/Total, Persentase, Status Hari<br>3. Detail per jam: {mapel, status: H/TH/I*}<br>4. Progress bar untuk setiap siswa |
| **Priority** | High |
| **Req. Trace** | F-14, VR-07 |

---

#### TC-F12-011: Detail per jam menampilkan kode status H/TH/I*

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-011 |
| **Test Scenario** | Kode status di detail per jam benar |
| **Preconditions** | Login sebagai Wali Kelas. Sudah ada data presensi dan izin disetujui. |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Lihat rekap harian dengan detail per jam<br>3. Periksa kode status di detail per jam |
| **Expected Results** | 1. H = Hadir (statusHadir=true)<br>2. TH = Tidak Hadir (statusHadir=false)<br>3. I* = Izin disetujui (izin approved, BR-14)<br>4. Setiap jam menampilkan nama mata pelajaran |
| **Priority** | Medium |
| **Req. Trace** | F-14, BR-14 |

---

#### TC-F12-012: Wali Kelas hanya bisa melihat kelas binaan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-012 |
| **Test Scenario** | Wali Kelas dibatasi pada kelas binaan |
| **Preconditions** | Login sebagai Wali Kelas (kelas binaan: VII A). |
| **Test Steps** | 1. Login sebagai Wali Kelas (kelas binaan: VII A)<br>2. Akses halaman /pantau-rekap<br>3. Coba filter kelas VII B |
| **Expected Results** | 1. Data kelas VII B tidak ditampilkan<br>2. Hanya data untuk kelas binaan VII A<br>3. Filter kelas lain tidak mengembalikan data |
| **Priority** | High |
| **Req. Trace** | F-14, VR-07 |

---

#### TC-F12-013: Admin tidak bisa mengakses /pantau-rekap

| Field | Value |
| --- | --- |
| **TC ID** | TC-F12-013 |
| **Test Scenario** | Admin tidak memiliki akses ke /pantau-rekap |
| **Preconditions** | Login sebagai Admin (Guru BK). |
| **Test Steps** | 1. Login sebagai Admin<br>2. Coba akses halaman /pantau-rekap |
| **Expected Results** |1. Akses ditolak — role tidak berwenang<br>2. Hanya Wali Kelas yang bisa mengakses halaman ini<br>3. Sistem redirect ke dashboard (VR-10) |
| **Priority** | High |
| **Req. Trace** | F-14, VR-10 |

### 3.4.4 UC-011: Filter dan Unduh Laporan Rekapitulasi

---

#### TC-F13-001: Admin memfilter laporan berdasarkan kelas dan tanggal

| Field | Value |
| --- | --- |
| **TC ID** | TC-F13-001 |
| **Test Scenario** | Filter laporan harian dengan kelas dan tanggal |
| **Preconditions** | Login sebagai Admin. Sudah ada data presensi multi-kelas. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /laporan<br>3. Filter: kelas = VII A, tanggal = 2026-07-15<br>4. Periksa data yang ditampilkan |
| **Expected Results** | 1. Data sesuai dengan filter<br>2. Tabel hanya menampilkan data untuk VII A pada 2026-07-15<br>3. Record count sesuai |
| **Priority** | Medium |
| **Req. Trace** | F-13 |

---

#### TC-F13-002: Admin memfilter laporan berdasarkan mapel dan bulan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F13-002 |
| **Test Scenario** | Filter laporan bulanan dengan mapel dan bulan |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /laporan (tab bulanan)<br>3. Filter: mataPelajaran = Matematika, bulan = 2026-07<br>4. Periksa data |
| **Expected Results** | 1. Data sesuai dengan filter<br>2. Hanya data untuk Matematika di bulan Juli 2026 |
| **Priority** | Medium |
| **Req. Trace** | F-13 |

---

#### TC-F13-003: Admin mengunduh laporan harian sebagai CSV

| Field | Value |
| --- | --- |
| **TC ID** | TC-F13-003 |
| **Test Scenario** | Unduh laporan harian dalam format CSV |
| **Preconditions** | Login sebagai Admin. Sudah ada data presensi. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /laporan (tab harian)<br>3. Filter: tanggal = 2026-07-15<br>4. Klik "Unduh CSV" |
| **Expected Results** | 1. File CSV berhasil diunduh<br>2. Format: NIS, Nama, Kelas, Hadir/Total, Persentase, Status Hari<br>3. File bernama laporan_harian_2026-07-15.csv |
| **Priority** | High |
| **Req. Trace** | F-14 |

---

#### TC-F13-004: Admin mengunduh laporan bulanan sebagai CSV

| Field | Value |
| --- | --- |
| **TC ID** | TC-F13-004 |
| **Test Scenario** | Unduh laporan bulanan dalam format CSV |
| **Preconditions** | Login sebagai Admin. Sudah ada data presensi bulanan. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /laporan (tab bulanan)<br>3. Filter: kelas = VII A, bulan = 2026-07<br>4. Klik "Unduh CSV" |
| **Expected Results** | 1. File CSV berhasil diunduh<br>2. Format: NIS, Nama, Kelas, Hadir, Tidak Hadir, Total, Persentase<br>3. File bernama laporan_bulanan_2026-07.csv |
| **Priority** | High |
| **Req. Trace** | F-14 |

---

#### TC-F13-005: Guru Mapel tidak bisa mengunduh laporan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F13-005 |
| **Test Scenario** | Guru Mapel tidak memiliki akses unduh laporan |
| **Preconditions** | Login sebagai Guru Mapel. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Akses halaman /laporan<br>3. Coba klik "Unduh CSV" |
| **Expected Results** | 1. Tombol "Unduh CSV" tidak tersedia untuk Guru Mapel<br>2. Hanya Admin yang bisa mengunduh laporan (F-14) |
| **Priority** | High |
| **Req. Trace** | F-14, VR-10 |

---

#### TC-F13-006: Wali Kelas tidak bisa mengunduh laporan

| Field | Value |
| --- | --- |
| **TC ID** | TC-F13-006 |
| **Test Scenario** | Wali Kelas tidak memiliki akses unduh laporan |
| **Preconditions** | Login sebagai Wali Kelas. |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Akses halaman /laporan<br>3. Coba klik "Unduh CSV" |
| **Expected Results** | 1. Tombol "Unduh CSV" tidak tersedia untuk Wali Kelas<br>2. Hanya Admin yang bisa mengunduh laporan |
| **Priority** | High |
| **Req. Trace** | F-14, VR-10 |

---

## 3.5 Feature F-15-F-16: Manajemen Jadwal Pelajaran

### 3.5.1 UC-008: Pengaturan Jadwal Pelajaran

---

#### TC-F15-001: Admin menambah jadwal pelajaran baru -- data valid

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-001 |
| **Test Scenario** | Admin menambah jadwal baru dengan data valid |
| **Preconditions** | Login sebagai Admin (Guru BK). |
| **Test Steps** | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /jadwal<br>3. Klik "Tambah Jadwal"<br>4. Isi form: Kelas = VII A, Hari = Senin, Jam Mulai = 07:00, Jam Selesai = 08:30, Mapel = Matematika, Guru = GRU-001, Semester = 2025/2026-Ganjil<br>5. Klik "Simpan" |
| **Expected Results** | 1. Jadwal berhasil ditambahkan<br>2. Modal form tertutup<br>3. Tabel jadwal ter-update<br>4. Jadwal baru muncul di tabel<br>5. Data tersimpan di localStorage |
| **Priority** | High |
| **Req. Trace** | F-15 |

---

#### TC-F15-002: Admin mengubah jadwal pelajaran yang sudah ada

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-002 |
| **Test Scenario** | Admin mengubah jadwal yang sudah ada |
| **Preconditions** | Login sebagai Admin. Sudah ada jadwal pelajaran. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /jadwal<br>3. Klik ikon pensil pada baris jadwal<br>4. Ubah: Jam Mulai = 07:30, Jam Selesai = 09:00<br>5. Klik "Simpan" |
| **Expected Results** | 1. Jadwal berhasil diperbarui<br>2. Modal form tertutup<br>3. Tabel jadwal ter-update<br>4. Perubahan terlihat di tabel |
| **Priority** | High |
| **Req. Trace** | F-15 |

---

#### TC-F15-003: Admin menghapus jadwal pelajaran

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-003 |
| **Test Scenario** | Admin menghapus jadwal pelajaran |
| **Preconditions** | Login sebagai Admin. Sudah ada jadwal pelajaran. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /jadwal<br>3. Klik ikon tempat sampah pada baris jadwal<br>4. Konfirmasi hapus |
| **Expected Results** | 1. Dialog konfirmasi muncul<br>2. Setelah konfirmasi, jadwal terhapus<br>3. Baris jadwal hilang dari tabel<br>4. Data terhapus dari localStorage |
| **Priority** | High |
| **Req. Trace** | F-15 |

---

#### TC-F15-004: Admin membatalkan penambahan jadwal

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-004 |
| **Test Scenario** | Admin membatalkan form tambah jadwal |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Klik "Tambah Jadwal"<br>3. Isi form dengan data<br>4. Klik tombol "Batal" atau X di modal |
| **Expected Results** | 1. Modal form tertutup<br>2. Data tidak tersimpan<br>3. Tabel jadwal tidak berubah |
| **Priority** | Low |
| **Req. Trace** | F-15 |

---

#### TC-F15-005: Admin membatalkan penghapusan jadwal

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-005 |
| **Test Scenario** | Admin membatalkan konfirmasi hapus |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Klik ikon tempat sampah pada jadwal<br>3. Klik "Batal" di dialog konfirmasi |
| **Expected Results** | 1. Dialog konfirmasi tertutup<br>2. Jadwal tidak terhapus<br>3. Tabel tetap seperti semula |
| **Priority** | Low |
| **Req. Trace** | F-15 |

---

#### TC-F15-006: Validasi form jadwal -- field wajib kosong

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-006 |
| **Test Scenario** | Validasi form -- field wajib tidak diisi |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Klik "Tambah Jadwal"<br>3. Biarkan field "Hari" kosong<br>4. Klik "Simpan" |
| **Expected Results** | 1. Validasi error pada field yang kosong<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan |
| **Priority** | Medium |
| **Req. Trace** | F-15 |

---

#### TC-F15-007: Validasi form jadwal -- hari tidak valid

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-007 |
| **Test Scenario** | Validasi form -- hari di luar Senin-Sabtu |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Klik "Tambah Jadwal"<br>3. Isi Hari = "Minggu" (tidak valid)<br>4. Klik "Simpan" |
| **Expected Results** | 1. Error: Hari harus salah satu dari Senin-Sabtu<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan |
| **Priority** | Medium |
| **Req. Trace** | F-15 |

#### TC-F15-008: Validasi form jadwal -- jam Mulai >= jam Selesai

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-008 |
| **Test Scenario** | Validasi form -- jam Mulai tidak boleh >= jam Selesai |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Klik "Tambah Jadwal"<br>3. Isi Jam Mulai = 08:00, Jam Selesai = 07:00<br>4. Klik "Simpan" |
| **Expected Results** | 1. Error: Jam Mulai harus sebelum Jam Selesai<br>2. Form tidak ter-submit<br>3. Data tidak tersimpan |
| **Priority** | Medium |
| **Req. Trace** | F-15 |

---

#### TC-F15-009: Guru Mapel tidak bisa mengelola jadwal

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-009 |
| **Test Scenario** | Guru Mapel tidak memiliki akses manajemen jadwal |
| **Preconditions** | Login sebagai Guru Mapel. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Coba akses halaman /jadwal<br>3. Coba tambah, ubah, atau hapus jadwal |
| **Expected Results** |1. Akses ditolak — role tidak berwenang<br>2. Hanya Admin yang bisa mengelola jadwal<br>3. Sistem redirect ke dashboard (VR-10)|
| **Priority** | High |
| **Req. Trace** | F-15, VR-10 |

---

#### TC-F15-010: Wali Kelas tidak bisa mengelola jadwal

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-010 |
| **Test Scenario** | Wali Kelas tidak memiliki akses manajemen jadwal |
| **Preconditions** | Login sebagai Wali Kelas. |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Coba akses halaman /jadwal<br>3. Coba tambah, ubah, atau hapus jadwal |
| **Expected Results** | 1. Akses ditolak — role tidak berwenang (VR-10)<br>2. Hanya Admin yang bisa mengelola jadwal|
| **Priority** | High |
| **Req. Trace** | F-15, VR-10 |

---

#### TC-F15-011: Siswa tidak bisa mengelola jadwal

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-011 |
| **Test Scenario** | Siswa tidak memiliki akses manajemen jadwal |
| **Preconditions** | Login sebagai Siswa. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Coba akses halaman /jadwal |
| **Expected Results** | 1. Akses ditolak<br>2. Siswa tidak memiliki akses ke manajemen jadwal |
| **Priority** | High |
| **Req. Trace** | F-15, VR-10 |

---

#### TC-F15-012: Guru Mapel melihat jadwal yang diampu saja

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-012 |
| **Test Scenario** | Guru Mapel melihat jadwal sendiri |
| **Preconditions** | Login sebagai Guru Mapel (mengampu Matematika). Sudah ada jadwal multi-mapel. |
| **Test Steps** | 1. Login sebagai Guru Mapel (mengampu Matematika)<br>2. Akses halaman /jadwal<br>3. Periksa data yang ditampilkan |
| **Expected Results** | 1. Hanya jadwal untuk mata pelajaran yang diampu ditampilkan<br>2. Filter otomatis: idGuru = current user (VR-06) |
| **Priority** | High |
| **Req. Trace** | F-16, VR-06 |

---

#### TC-F15-013: Admin memfilter jadwal berdasarkan hari

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-013 |
| **Test Scenario** | Filter jadwal berdasarkan hari |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /jadwal<br>3. Filter: hari = Senin<br>4. Periksa data |
| **Expected Results** | 1. Hanya jadwal untuk hari Senin ditampilkan<br>2. Filter berfungsi dengan benar |
| **Priority** | Low |
| **Req. Trace** | F-16 |

---

#### TC-F15-014: Admin memfilter jadwal berdasarkan kelas

| Field | Value |
| --- | --- |
| **TC ID** | TC-F15-014 |
| **Test Scenario** | Filter jadwal berdasarkan kelas |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /jadwal<br>3. Filter: kelas = VII A<br>4. Periksa data |
| **Expected Results** | 1. Hanya jadwal untuk kelas VII A ditampilkan<br>2. Filter berfungsi dengan benar |
| **Priority** | Low |
| **Req. Trace** | F-16 |

---

## 3.6 Feature F-17: Manajemen Hak Akses

### 3.6.1 UC-013: Kelola Hak Akses Pengguna (Read-Only)

---

## 3.6 Feature F-17: Manajemen Hak Akses

### 3.6.1 UC-013: Kelola Hak Akses Pengguna (Read-Only)

---

#### TC-F17-001: Admin melihat 4 card hak akses per role

| Field | Value |
| --- | --- |
| **TC ID** | TC-F17-001 |
| **Test Scenario** | Admin melihat informasi hak akses per role |
| **Preconditions** | Login sebagai Admin (Guru BK). |
| **Test Steps** | 1. Login sebagai Admin (Guru BK)<br>2. Akses halaman /hak-akses<br>3. Periksa data yang ditampilkan |
| **Expected Results** | 1. 4 card peran ditampilkan: Siswa, Guru Mapel, Wali Kelas, Admin<br>2. Setiap card menampilkan daftar permissions (ikon Check hijau)<br>3. Setiap card menampilkan daftar restrictions jika ada (ikon X merah)<br>4. Data bersifat read-only (tidak ada tombol edit/hapus) |
| **Priority** | High |
| **Req. Trace** | F-17 |

---

#### TC-F17-002: Halaman hak akses bersifat read-only -- tidak ada operasi CRUD

| Field | Value |
| --- | --- |
| **TC ID** | TC-F17-002 |
| **Test Scenario** | Halaman hak akses hanya untuk membaca |
| **Preconditions** | Login sebagai Admin. |
| **Test Steps** | 1. Login sebagai Admin<br>2. Akses halaman /hak-akses<br>3. Cari mekanisme untuk mengubah hak akses peran |
| **Expected Results** | 1. Tidak ada tombol tambah, edit, atau hapus hak akses<br>2. Halaman hanya menampilkan informasi permissions/restrictions per role<br>3. Perubahan hak akses hanya dapat dilakukan di luar sistem (tidak dalam lingkup F-17) |
| **Priority** | Medium |
| **Req. Trace** | F-17 |

---

#### TC-F17-003: Guru Mapel tidak bisa mengakses halaman hak akses

| Field | Value |
| --- | --- |
| **TC ID** | TC-F17-003 |
| **Test Scenario** | Guru Mapel tidak memiliki akses hak akses |
| **Preconditions** | Login sebagai Guru Mapel. |
| **Test Steps** | 1. Login sebagai Guru Mapel<br>2. Coba akses halaman /hak-akses |
| **Expected Results** | 1. Akses ditolak — role tidak berwenang<br>2. Sistem redirect ke /dashboard (VR-10)<br>3. Hanya Admin yang bisa mengakses halaman ini |
| **Priority** | High |
| **Req. Trace** | F-17, VR-10 |

---

#### TC-F17-004: Wali Kelas tidak bisa mengakses halaman hak akses

| Field | Value |
| --- | --- |
| **TC ID** | TC-F17-004 |
| **Test Scenario** | Wali Kelas tidak memiliki akses hak akses |
| **Preconditions** | Login sebagai Wali Kelas. |
| **Test Steps** | 1. Login sebagai Wali Kelas<br>2. Coba akses halaman /hak-akses |
| **Expected Results** | 1. Akses ditolak — role tidak berwenang<br>2. Sistem redirect ke /dashboard (VR-10)<br>3. Hanya Admin yang bisa mengakses halaman ini |
| **Priority** | High |
| **Req. Trace** | F-17, VR-10 |
---

## 3.7 Feature F-18: Riwayat Kehadiran

### 3.7.1 UC-014: Lihat Riwayat Kehadiran oleh Siswa

---

## 3.7 Feature F-18: Riwayat Kehadiran

### 3.7.1 UC-014: Lihat Riwayat Kehadiran oleh Siswa

---

#### TC-F18-001: Siswa melihat riwayat presensi dan riwayat izin sendiri

| Field | Value |
| --- | --- |
| **TC ID** | TC-F18-001 |
| **Test Scenario** | Siswa melihat dua card riwayat: Presensi dan Izin |
| **Preconditions** | Login sebagai Siswa (NIS: 2024001). Sudah ada data presensi dan izin. |
| **Test Steps** | 1. Login sebagai Siswa (NIS: 2024001)<br>2. Akses halaman /riwayat<br>3. Periksa card "Riwayat Presensi" dan "Riwayat Izin" |
| **Expected Results** | 1. Card "Riwayat Presensi" dan "Riwayat Izin" ditampilkan terpisah<br>2. Data hanya milik NIS 2024001 (server filter dari session token, VR-05)<br>3. Tidak ada data milik siswa lain |
| **Priority** | High |
| **Req. Trace** | F-18, F-10, VR-05 |

---

#### TC-F18-002: Card Riwayat Presensi menampilkan kolom sesuai spesifikasi

| Field | Value |
| --- | --- |
| **TC ID** | TC-F18-002 |
| **Test Scenario** | Kolom dan urutan data pada card Riwayat Presensi |
| **Preconditions** | Login sebagai Siswa. Sudah ada beberapa record presensi di tanggal berbeda. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /riwayat<br>3. Periksa tabel di card "Riwayat Presensi" |
| **Expected Results** | 1. Kolom: Tanggal, Jam, Mapel, Guru, Status<br>2. Data diurutkan reverse-chronological (terbaru di atas)<br>3. Badge status: "Hadir" (hijau) atau "Tidak Hadir" (merah) |
| **Priority** | Medium |
| **Req. Trace** | F-18 |

---

#### TC-F18-003: Card Riwayat Izin menampilkan kolom sesuai spesifikasi

| Field | Value |
| --- | --- |
| **TC ID** | TC-F18-003 |
| **Test Scenario** | Kolom dan urutan data pada card Riwayat Izin |
| **Preconditions** | Login sebagai Siswa. Sudah ada beberapa pengajuan izin. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /riwayat<br>3. Periksa tabel di card "Riwayat Izin" |
| **Expected Results** | 1. Kolom: Tanggal, Jenis, Status, Keterangan<br>2. Data diurutkan reverse-chronological (terbaru di atas) |
| **Priority** | Medium |
| **Req. Trace** | F-18 |

---

#### TC-F18-004: Badge jenis izin tampil sesuai kategori

| Field | Value |
| --- | --- |
| **TC ID** | TC-F18-004 |
| **Test Scenario** | Warna badge jenis izin sesuai kategori |
| **Preconditions** | Login sebagai Siswa. Sudah ada izin dengan jenis sakit, izin, dan lainnya. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /riwayat<br>3. Periksa badge jenis izin di card "Riwayat Izin" |
| **Expected Results** | 1. Jenis "Sakit" → badge biru<br>2. Jenis "Izin" → badge ungu<br>3. Jenis "Lainnya" → badge abu-abu |
| **Priority** | Medium |
| **Req. Trace** | F-18 |

---

#### TC-F18-005: Badge status izin tampil sesuai status

| Field | Value |
| --- | --- |
| **TC ID** | TC-F18-005 |
| **Test Scenario** | Warna badge status izin sesuai status verifikasi |
| **Preconditions** | Login sebagai Siswa. Sudah ada izin dengan status menunggu, disetujui, dan ditolak. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /riwayat<br>3. Periksa badge status di card "Riwayat Izin" |
| **Expected Results** | 1. Status "Menunggu" → badge kuning<br>2. Status "Disetujui" → badge hijau<br>3. Status "Ditolak" → badge merah |
| **Priority** | Medium |
| **Req. Trace** | F-18 |

---

#### TC-F18-006: Siswa tidak bisa edit atau hapus data kehadiran

| Field | Value |
| --- | --- |
| **TC ID** | TC-F18-006 |
| **Test Scenario** | Riwayat kehadiran bersifat read-only untuk Siswa |
| **Preconditions** | Login sebagai Siswa. |
| **Test Steps** | 1. Login sebagai Siswa<br>2. Akses halaman /riwayat<br>3. Cari tombol edit atau hapus di kedua card |
| **Expected Results** | 1. Tidak ada tombol edit<br>2. Tidak ada tombol hapus<br>3. Data hanya bisa dilihat (read-only) |
| **Priority** | High |
| **Req. Trace** | F-18, VR-10 |

---

#### TC-F18-007: Siswa tidak bisa melihat data kehadiran siswa lain

| Field | Value |
| --- | --- |
| **TC ID** | TC-F18-007 |
| **Test Scenario** | Data isolasi riwayat per siswa |
| **Preconditions** | Login sebagai Siswa (NIS: 2024001). Ada data presensi/izin milik siswa lain. |
| **Test Steps** | 1. Login sebagai Siswa (NIS: 2024001)<br>2. Akses halaman /riwayat<br>3. Periksa data yang ditampilkan di kedua card |
| **Expected Results** | 1. Hanya data milik NIS 2024001 yang ditampilkan<br>2. Tidak ada data milik siswa lain<br>3. Server memfilter berdasarkan nis dari session token, bukan dari parameter request (VR-05) |
| **Priority** | High |
| **Req. Trace** | F-18, VR-05 |

---

#### TC-F18-008: Tidak ada data riwayat kehadiran -- empty state

| Field | Value |
| --- | --- |
| **TC ID** | TC-F18-008 |
| **Test Scenario** | Empty state untuk siswa tanpa riwayat |
| **Preconditions** | Login sebagai Siswa (belum punya riwayat presensi maupun izin). |
| **Test Steps** | 1. Login sebagai Siswa (belum punya riwayat)<br>2. Akses halaman /riwayat<br>3. Periksa pesan yang ditampilkan di kedua card |
| **Expected Results** | 1. Card Riwayat Presensi: "Belum ada data presensi."<br>2. Card Riwayat Izin: "Belum ada pengajuan izin."<br>3. Tidak ada error |
| **Priority** | Low |
| **Req. Trace** | F-18 |
---

# 4. TRACEABILITY MATRIX

## 4.1 Functional Requirements Traceability

| Requirement | Description | Covered by Test Cases |
| --- | --- | --- |
| F-01 | Memulai sesi presensi | TC-F01-001, TC-F01-002, TC-F01-003, TC-F01-004, TC-F01-005, TC-F01-006, TC-F01-007, TC-F01-008, TC-F01-009, TC-F01-010, TC-F01-011, TC-F01-012 |
| F-02 | Uncheck siswa tidak hadir | TC-F01-002, TC-F01-003, TC-F01-004 |
| F-03 | Menyimpan presensi | TC-F01-006, TC-F01-011 |
| F-04 | Verifikasi data presensi bermasalah | TC-F01-018, TC-F01-019, TC-F01-020, TC-F01-021, TC-F01-022 |
| F-05 | Melihat data kehadiran real-time | TC-F01-013, TC-F01-014, TC-F01-015, TC-F01-016, TC-F01-017 |
| F-06 | Mengajukan izin | TC-F06-001, TC-F06-002, TC-F06-003, TC-F06-004, TC-F06-005, TC-F06-006, TC-F06-007, TC-F06-008, TC-F06-017 |
| F-07 | Memilih jenis izin | TC-F06-001, TC-F06-002, TC-F06-003 |
| F-08 | Mengunggah bukti pendukung | TC-F06-004 |
| F-09 | Verifikasi izin | TC-F06-009, TC-F06-010, TC-F06-011, TC-F06-012, TC-F06-013, TC-F06-014, TC-F06-015, TC-F06-016 |
| F-10 | Melihat status izin | TC-F06-008 |
| F-11 | Rekap bulanan per mata pelajaran | TC-F11-001, TC-F11-002, TC-F11-003, TC-F11-004, TC-F11-005, TC-F11-006 |
| F-12 | Rekap harian berbasis persentase | TC-F12-001, TC-F12-002, TC-F12-003, TC-F12-004, TC-F12-005, TC-F12-006, TC-F12-007, TC-F12-008, TC-F12-009 |
| F-13 | Filter laporan | TC-F13-001, TC-F13-002 |
| F-14 | Unduh laporan | TC-F12-010, TC-F12-011, TC-F12-012, TC-F12-013, TC-F13-003, TC-F13-004, TC-F13-005, TC-F13-006 |
| F-15 | Mengatur jadwal jam pelajaran | TC-F15-001, TC-F15-002, TC-F15-003, TC-F15-004, TC-F15-005, TC-F15-006, TC-F15-007, TC-F15-008, TC-F15-009, TC-F15-010, TC-F15-011 |
| F-16 | Mengubah jadwal | TC-F15-012, TC-F15-013, TC-F15-014 |
| F-17 | Mengelola hak akses pengguna | TC-F17-001, TC-F17-002, TC-F17-003, TC-F17-004 |
| F-18 | Melihat riwayat kehadiran sendiri | TC-F18-001, TC-F18-002, TC-F18-003, TC-F18-004, TC-F18-005, TC-F18-006, TC-F18-007, TC-F18-008 |
| F-19 | Registrasi mandiri | TC-F19-001, TC-F19-002, TC-F19-003, TC-F19-004, TC-F19-005, TC-F19-006, TC-F19-007, TC-F19-008, TC-F19-009, TC-F19-010, TC-F19-011 |
| F-20 | Login dengan email dan password | TC-F20-001, TC-F20-002, TC-F20-003, TC-F20-004, TC-F20-005, TC-F20-006, TC-F20-007, TC-F20-008, TC-F20-009, TC-F20-010, TC-F20-011, TC-F20-012, TC-F20-013, TC-F20-014, TC-F20-015 |

## 4.2 Business Rules & Validation Rules Traceability

| Requirement | Description | Covered by Test Cases |
| --- | --- | --- |
| BR-01 | Default Hadir — Setiap kali sesi presensi untuk suatu jam pelajaran dimulai, sistem secara otomatis menandai semua siswa yang terdaftar di kelas tersebut sebagai Hadir (status = true / tercentang). | TC-F01-001, TC-F01-005 |
| BR-02 | Uncheck oleh Guru Mapel — Guru mapel yang mengajar pada jam tersebut wajib memeriksa kondisi kelas dan melepas centang (uncheck) hanya pada siswa yang benar-benar tidak hadir. Guru tidak perlu mencentang siswa yang hadir karena status hadir sudah menjadi default. | TC-F01-002, TC-F01-003, TC-F01-004 |
| BR-03 | Presensi Per Jam Pelajaran — Proses pada BR-01 dan BR-02 berulang setiap kali jam pelajaran berganti. Status kehadiran satu siswa dapat berbeda antar jam pelajaran dalam satu hari yang sama. | TC-F01-007 |
| BR-04 | Akses Presensi Guru Mapel — Guru mapel hanya dapat mengakses dan melakukan presensi pada kelas dan jam pelajaran yang diampunya. Guru tidak dapat mengakses kelas atau jam pelajaran di luar tanggung jawabnya. | TC-F01-008 |
| BR-05 | Verifikasi Admin — Admin (Guru BK) dapat memverifikasi dan memperbaiki data presensi yang bermasalah jika terjadi kesalahan pencatatan. | TC-F01-018, TC-F01-019, TC-F01-022 |
| BR-06 | Izin Per Hari — Satu pengajuan izin hanya untuk satu tanggal dan berlaku untuk seluruh jam pelajaran pada tanggal tersebut. Tidak ada pengajuan izin per jam pelajaran. | TC-F06-017 |
| BR-07 | Kategori Izin — Izin dikategorikan menjadi tiga jenis: sakit (disertai bukti surat dokter), izin (untuk keperluan yang diketahui sekolah), dan lainnya (untuk keperluan di luar kategori tersebut). | TC-F06-001, TC-F06-002, TC-F06-003 |
| BR-08 | Bukti Pendukung — Setiap pengajuan izin wajib menyertakan unggahan file bukti pendukung (misal: surat dokter untuk kategori sakit). | TC-F06-004 |
| BR-09 | Status Izin — Izin memiliki tiga status: menunggu (saat baru diajukan), disetujui (jika izin diterima), atau ditolak (jika izin tidak memenuhi ketentuan). | TC-F06-001, TC-F06-002, TC-F06-003 |
| BR-10 | Verifikator Izin — Izin diverifikasi oleh wali kelas dan/atau admin (Guru BK). Hanya wali kelas dan admin yang dapat mengubah status izin. | TC-F06-009, TC-F06-010, TC-F06-011, TC-F06-012 |
| BR-11 | Dampak Izin pada Presensi — Jika izin disetujui, maka untuk seluruh jam pelajaran pada tanggal yang diajukan, status kehadiran siswa dianggap Hadir (sama dengan status hadir biasa) pada perhitungan rekap harian berbasis persentase. | TC-F06-016 |
| BR-12 | Perhitungan Persentase Harian — Status kehadiran harian seorang siswa dihitung dengan rumus: Persentase = (Jumlah jam pelajaran dengan status Hadir*) / (Total jam pelajaran pada hari tersebut) x 100% (*Status Hadir mencakup: hadir biasa, sakit dengan izin disetujui, izin dengan izin disetujui) | TC-F12-003, TC-F12-004, TC-F12-005 |
| BR-13 | Threshold 60% — Jika Persentase >= 60%, maka status kehadiran hari tersebut = HADIR. Jika Persentase < 60%, maka status hari tersebut = TIDAK HADIR. | TC-F12-003, TC-F12-004, TC-F12-005 |
| BR-14 | Izin/Sakit Dihitung sebagai Hadir — Untuk perhitungan pada BR-12, jam pelajaran yang statusnya sakit atau izin (dengan izin yang telah disetujui) dihitung sebagai Hadir dalam pembilang persentase — tidak mengurangi persentase kehadiran. | TC-F06-016, TC-F12-006, TC-F12-011 |
| BR-15 | Otomatisasi — Rekap harian dihasilkan secara otomatis oleh sistem, tidak dihitung atau diolah secara manual. | TC-F12-009 |
| BR-16 | Periode Bulanan — Rekap dihitung per periode satu bulan, per mata pelajaran. | TC-F11-001 |
| BR-17 | Acuan Penilaian — Rekap bulanan per mata pelajaran digunakan sebagai acuan penilaian oleh guru mapel terhadap siswa di mata pelajaran yang diampunya. Ini bukan sistem penilaian akademik, melainkan data kehadiran yang menjadi referensi nilai. | TC-F11-004 |
| BR-18 | Isi Rekap — Menampilkan jumlah kehadiran dan jumlah ketidakhadiran siswa pada mata pelajaran tertentu selama satu bulan. | TC-F11-001 |
| BR-19 | Role-Locked Login — Setiap akun memiliki satu peran tetap yang ditentukan saat registrasi dan tidak dapat diubah setelahnya. Sistem WAJIB memverifikasi peran akun pada setiap login dan mengarahkan (redirect) pengguna ke dashboard yang sesuai dengan perannya. Akun TIDAK BOLEH dapat mengakses dashboard atau fitur milik peran lain. | TC-F20-012, TC-F20-013, TC-F20-014, TC-F20-015 |
| BR-20 | Registrasi Tanpa Verifikasi — Akun yang berhasil melakukan registrasi dapat langsung digunakan untuk login tanpa proses verifikasi atau approval dari pihak lain. | TC-F19-001, TC-F19-002, TC-F19-003, TC-F19-004 |
| VR-01 | Unik NIS — Setiap siswa memiliki NIS yang unik dan tidak boleh duplikat. | TC-F19-006 |
| VR-02 | Unik ID Guru — Setiap guru memiliki ID guru yang unik. | TC-F19-007 |
| VR-03 | Tanggal Izin Valid — Tanggal izin tidak boleh berupa tanggal di masa depan. | TC-F06-005 |
| VR-04 | Satu Izin Per Hari Per Siswa — Seorang siswa hanya dapat memiliki satu pengajuan izin aktif (status menunggu/disetujui) untuk tanggal yang sama. | TC-F06-006 |
| VR-05 | Akses Data Siswa — Siswa hanya dapat melihat data miliknya sendiri. | TC-F06-008, TC-F18-001, TC-F18-007 |
| VR-06 | Akses Presensi Guru — Guru mapel hanya dapat mengakses data presensi pada kelas yang terdaftar dalam jadwal mengajarnya. | TC-F01-008, TC-F01-013, TC-F01-017, TC-F11-001, TC-F15-012 |
| VR-07 | Akses Wali Kelas — Wali kelas dapat mengakses data presensi seluruh siswa di kelas binaannya. | TC-F01-014, TC-F06-013, TC-F11-003, TC-F12-001, TC-F12-010, TC-F12-012 |
| VR-08 | Default Hadir Tidak Bisa Dikosongkan — Sistem tidak boleh menyajikan sesi presensi dengan semua siswa tidak tercentang. | TC-F01-010 |
| VR-09 | Email Unik — Setiap email yang digunakan untuk registrasi harus unik di seluruh sistem. | TC-F19-005 |
| VR-10 | Akses Terkunci Peran — Sistem wajib memvalidasi peran akun pada setiap request/navigasi halaman. | TC-F01-020, TC-F01-021, TC-F06-014, TC-F12-008, TC-F12-013, TC-F13-005, TC-F13-006, TC-F15-009, TC-F15-010, TC-F15-011, TC-F17-003, TC-F17-004, TC-F18-006, TC-F20-012, TC-F20-013, TC-F20-014, TC-F20-015 |

---

# 5. REVISION HISTORY

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 0.1 | 2026-07-16 | System Analyst AI | Initial Draft |
| 0.2 | 2026-07-17 | System Analyst AI | Corrected Section 4 (Traceability Matrix): F-xx/BR-xx/VR-xx descriptions now match srs.md word-for-word; TC-to-requirement mapping re-derived from Req. Trace fields in Section 3 |
| 0.3 | 2026-07-17 | System Analyst AI | Full re-audit of all 115 TC Req. Trace fields in Section 3; corrected F-xx swaps (F-02↔F-05, F-03↔F-04, F-07→F-09, F-11↔F-12, F-13↔F-14); added missing BR/VR tags (BR-04, BR-06, BR-07, BR-16, BR-18, F-03, F-08, F-10); added TC-F06-017 for BR-06 coverage gap; regenerated Section 4; total TCs: 115→116 |