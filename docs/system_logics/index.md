# System Logic Specifications

Document Version: v1.0
Project: Sipadu — Sistem Presensi Digital Siswa SMP N 4 Banguntapan
Product: Web-Based Attendance System
Status: Draft
Last Updated: 2026-07-16
Author: System Analyst AI

---

## 1. PURPOSE

This document serves as the master index for all System Logic Specifications for Sipadu.

Each System Logic contains sequence diagrams and API contracts derived from the corresponding User Flow specifications (SoT-3) and Data Model (SoT-2), both sourced from SRS (SoT-1).

---

## 2. FILE STRUCTURE

```text
system_logics/
├── index.md
├── sys_uc_001.md
├── sys_uc_002.md
├── sys_uc_003.md
├── sys_uc_004.md
├── sys_uc_005.md
├── sys_uc_006.md
├── sys_uc_007.md
├── sys_uc_008.md
├── sys_uc_009.md
├── sys_uc_010.md
├── sys_uc_011.md
├── sys_uc_012.md
├── sys_uc_013.md
└── sys_uc_014.md
```

---

## 3. SYSTEM LOGIC CATALOG

| Use Case ID | Use Case Name | File Path | Status |
| --- | --- | --- | --- |
| UC-001 | Registrasi Akun Mandiri | ./sys_uc_001.md | Draft |
| UC-002 | Login dengan Role-Locked Redirect | ./sys_uc_002.md | Draft |
| UC-003 | Presensi Per Jam Pelajaran (Default-Hadir + Uncheck) | ./sys_uc_003.md | Draft |
| UC-004 | Pengajuan Izin Ketidakhadiran | ./sys_uc_004.md | Draft |
| UC-005 | Verifikasi Izin oleh Wali Kelas / Admin | ./sys_uc_005.md | Draft |
| UC-006 | Rekap Harian Berbasis Persentase (Otomatis) | ./sys_uc_006.md | Draft |
| UC-007 | Rekap Bulanan Per Mata Pelajaran | ./sys_uc_007.md | Draft |
| UC-008 | Pengaturan Jadwal Pelajaran | ./sys_uc_008.md | Draft |
| UC-009 | Lihat Data Kehadiran Real-time | ./sys_uc_009.md | Draft |
| UC-010 | Pantau Rekap Kelas oleh Wali Kelas | ./sys_uc_010.md | Draft |
| UC-011 | Filter dan Unduh Laporan Rekapitulasi | ./sys_uc_011.md | Draft |
| UC-012 | Verifikasi Data Presensi Bermasalah oleh Admin | ./sys_uc_012.md | Draft |
| UC-013 | Kelola Hak Akses Pengguna | ./sys_uc_013.md | Draft |
| UC-014 | Lihat Riwayat Kehadiran oleh Siswa | ./sys_uc_014.md | Draft |

---

## 4. USER FLOW → SYSTEM LOGIC MAPPING

| User Flow | System Logic | Description |
| --- | --- | --- |
| userflow_uc_001.md | sys_uc_001.md | Self-service account registration for all roles with role-specific form fields |
| userflow_uc_002.md | sys_uc_002.md | Email + password authentication with role-locked redirect to role-specific dashboard |
| userflow_uc_003.md | sys_uc_003.md | Per-lesson attendance with default-hadir initialization and guru uncheck flow |
| userflow_uc_004.md | sys_uc_004.md | Student absence permission submission (per day) with file upload |
| userflow_uc_005.md | sys_uc_005.md | Wali Kelas / Admin verify or reject student absence permissions |
| userflow_uc_006.md | sys_uc_006.md | Automatic daily attendance percentage calculation with 60% threshold |
| userflow_uc_007.md | sys_uc_007.md | Monthly per-subject attendance summary as grading reference |
| userflow_uc_008.md | sys_uc_008.md | Admin CRUD management of lesson schedules per class per day |
| userflow_uc_009.md | sys_uc_009.md | Real-time attendance data view with role-based filtering |
| userflow_uc_010.md | sys_uc_010.md | Wali Kelas monitors class attendance with percentage-based daily recap |
| userflow_uc_011.md | sys_uc_011.md | Admin filters and downloads attendance reports as CSV |
| userflow_uc_012.md | sys_uc_012.md | Admin verifies and corrects problematic attendance records |
| userflow_uc_013.md | sys_uc_013.md | Informational view of role-based access permissions |
| userflow_uc_014.md | sys_uc_014.md | Student views own attendance history (presensi + izin) |

---

## 5. API OVERVIEW

### Base URL

```text
/api/v1
```

### Authentication

All endpoints (except register and login) require Bearer token in Authorization header:

```text
Authorization: Bearer <session_token>
```

### Common Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "errors": []
}
```

### HTTP Status Codes

| Code | Description |
| --- | --- |
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized (not logged in or invalid token) |
| 403 | Forbidden (role not authorized for this endpoint) |
| 404 | Not Found |
| 409 | Conflict (duplicate data) |
| 500 | Internal Server Error |

### Endpoint Registry

| Method | Path | Description | Roles |
| --- | --- | --- | --- |
| POST | /api/v1/auth/register | Register new account | Public |
| POST | /api/v1/auth/login | Login with email + password | Public |
| GET | /api/v1/auth/me | Get current authenticated user | All authenticated |
| POST | /api/v1/auth/logout | Destroy session | All authenticated |
| POST | /api/v1/presensi/initialize | Initialize default-hadir for a lesson session | Guru Mapel, Wali Kelas |
| POST | /api/v1/presensi/simpan | Save attendance after uncheck | Guru Mapel, Wali Kelas |
| GET | /api/v1/presensi | Query attendance records with filters | Guru Mapel, Wali Kelas, Admin |
| PUT | /api/v1/presensi/{id} | Update attendance record (admin verify) | Admin |
| POST | /api/v1/izin | Submit absence permission | Siswa |
| GET | /api/v1/izin | Query permissions with filters | Siswa (own), Wali Kelas (kelas binaan), Admin (all) |
| PUT | /api/v1/izin/{id}/verifikasi | Approve or reject permission | Wali Kelas, Admin |
| GET | /api/v1/jadwal | Query lesson schedules with filters | Guru Mapel (own), Admin (all) |
| POST | /api/v1/jadwal | Create new schedule entry | Admin |
| PUT | /api/v1/jadwal/{id} | Update schedule entry | Admin |
| DELETE | /api/v1/jadwal/{id} | Delete schedule entry | Admin |
| GET | /api/v1/laporan/harian | Get daily attendance percentage report | Wali Kelas (kelas binaan), Admin (all) |
| GET | /api/v1/laporan/bulanan | Get monthly per-subject attendance report | Guru Mapel (own mapel), Wali Kelas, Admin |
| GET | /api/v1/laporan/download | Download report as CSV | Admin |
| GET | /api/v1/kehadiran | Query attendance data for verification | Guru Mapel (own jadwal), Wali Kelas (kelas binaan), Admin (all) |
| PUT | /api/v1/kehadiran/{id} | Correct attendance record | Admin |
| GET | /api/v1/hak-akses | Get role permissions information | Admin |

---

## 6. REVISION HISTORY

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 1.0 | 2026-07-16 | System Analyst AI | Initial Draft |
