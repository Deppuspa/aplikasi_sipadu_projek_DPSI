# System Logic: UC-008 Pengaturan Jadwal Pelajaran

Document Version: v1.0
Use Case ID: UC-008
Use Case Name: Pengaturan Jadwal Pelajaran
Status: Draft
Last Updated: 2026-07-16
Author: System Analyst AI

---

Note: This API contract is provided as a structural reference for future backend implementation. The current prototype uses localStorage / React Context for data persistence and session state (per srs.md Section 9, item 11) — there is no live backend API in this phase.

---

## 1. Overview

This document defines the system logic for Admin (Guru BK) managing lesson schedules. Admin can create, read, update, and delete schedule entries (F-15, F-16). Each schedule entry defines one lesson period for a specific class on a specific day, including the subject, time range, and assigned guru. Only Admin can access this feature (VR-10).

---

## 2. Sequence Diagram

### 2.1 Load Schedule List

```mermaid
sequenceDiagram
    actor Admin
    participant Frontend
    participant API
    participant Database

    Admin->>Frontend: Navigate to /jadwal
    Frontend->>API: GET /api/v1/jadwal
    API->>Database: SELECT jadwal_pelajaran JOIN guru, kelas
    Database-->>API: Schedule list
    API-->>Frontend: 200 OK + jadwal list
    Frontend-->>Admin: Display schedule table (Hari, Jam, Kelas, Mapel, Guru, Semester, Aksi)
```

### 2.2 Create Schedule

```mermaid
sequenceDiagram
    actor Admin
    participant Frontend
    participant API
    participant Database

    Admin->>Frontend: Click "Tambah Jadwal"
    Frontend-->>Admin: Show modal form

    Admin->>Frontend: Fill form (Kelas, Hari, Jam Mulai, Jam Selesai, Mapel, Guru, Semester)
    Admin->>Frontend: Click "Simpan"

    Frontend->>Frontend: Validate input (client-side)

    alt Valid
        Frontend->>API: POST /api/v1/jadwal
        API->>API: Validate input (server-side)
        API->>Database: INSERT jadwal_pelajaran
        Database-->>API: Record created
        API-->>Frontend: 201 Created + jadwal data
        Frontend->>Frontend: Close modal, refresh table
        Frontend-->>Admin: Show new schedule in table
    else Invalid
        Frontend-->>Admin: Show field errors
    end
```

### 2.3 Update and Delete Schedule

```mermaid
sequenceDiagram
    actor Admin
    participant Frontend
    participant API
    participant Database

    Admin->>Frontend: Click Pencil icon on a row
    Frontend-->>Admin: Show modal with pre-filled data

    Admin->>Frontend: Modify fields
    Admin->>Frontend: Click "Simpan"
    Frontend->>API: PUT /api/v1/jadwal/{id}
    API->>Database: UPDATE jadwal_pelajaran
    Database-->>API: Record updated
    API-->>Frontend: 200 OK
    Frontend-->>Admin: Table updated

    Admin->>Frontend: Click Trash2 icon on a row
    Frontend-->>Admin: Show confirmation dialog
    Admin->>Frontend: Confirm delete
    Frontend->>API: DELETE /api/v1/jadwal/{id}
    API->>Database: DELETE jadwal_pelajaran WHERE id=...
    Database-->>API: Record deleted
    API-->>Frontend: 200 OK
    Frontend-->>Admin: Row removed from table
```

---

## 3. API Contract

### 3.1 GET /api/v1/jadwal

Query lesson schedules with filters.

**Query Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| idKelas | string | No | Filter by class |
| hari | string | No | Filter by day (Senin-Sabtu) |
| idGuru | string | No | Filter by guru (auto-set for Guru Mapel, VR-06) |

**Request Headers:**

| Header | Value |
| --- | --- |
| Authorization | Bearer <session_token> |

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "jadwal": [
      {
        "idJadwalPelajaran": "JWP-001",
        "idKelas": "VIIA",
        "namaKelas": "VII A",
        "idGuru": "GRU-001",
        "namaGuru": "Pak Budi",
        "hari": "Senin",
        "jamMulai": "07:00",
        "jamSelesai": "08:30",
        "mataPelajaran": "Matematika",
        "semester": "2025/2026-Ganjil"
      }
    ],
    "total": 45
  },
  "message": "Success"
}
```

### 3.2 POST /api/v1/jadwal

Create a new lesson schedule entry. Admin only.

**Request Headers:**

| Header | Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | Bearer <session_token> |

**Request Body:**

```json
{
  "idKelas": "string (required)",
  "idGuru": "string (required)",
  "hari": "string (required, 'Senin'|'Selasa'|'Rabu'|'Kamis'|'Jumat'|'Sabtu')",
  "jamMulai": "string (required, HH:MM)",
  "jamSelesai": "string (required, HH:MM)",
  "mataPelajaran": "string (required)",
  "semester": "string (required)"
}
```

**Request Example:**

```json
{
  "idKelas": "VIIA",
  "idGuru": "GRU-001",
  "hari": "Senin",
  "jamMulai": "07:00",
  "jamSelesai": "08:30",
  "mataPelajaran": "Matematika",
  "semester": "2025/2026-Ganjil"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "idJadwalPelajaran": "JWP-001",
    "idKelas": "VIIA",
    "namaKelas": "VII A",
    "idGuru": "GRU-001",
    "namaGuru": "Pak Budi",
    "hari": "Senin",
    "jamMulai": "07:00",
    "jamSelesai": "08:30",
    "mataPelajaran": "Matematika",
    "semester": "2025/2026-Ganjil"
  },
  "message": "Jadwal berhasil ditambahkan"
}
```

**Error Response (403 Forbidden):**

```json
{
  "success": false,
  "data": null,
  "message": "Hanya admin yang dapat mengelola jadwal",
  "errors": []
}
```

### 3.3 PUT /api/v1/jadwal/{id}

Update an existing schedule entry. Admin only.

**Request Body:** Same as POST, all fields optional.

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": { ... },
  "message": "Jadwal berhasil diperbarui"
}
```

### 3.4 DELETE /api/v1/jadwal/{id}

Delete a schedule entry. Admin only.

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": null,
  "message": "Jadwal berhasil dihapus"
}
```

---

## 4. Data Flow

| Step | Input | Process | Output |
| --- | --- | --- | --- |
| 1 | Filter params | Query jadwal with filters | Filtered schedule list |
| 2 | Form data | Validate + INSERT jadwal_pelajaran | New schedule record |
| 3 | id + form data | Validate + UPDATE jadwal_pelajaran | Updated record |
| 4 | id | Validate + DELETE jadwal_pelajaran | Record removed |

---

## 5. Security Rules / Business Rule Enforcement

| Rule | Description |
| --- | --- |
| F-15 | Admin mengatur jadwal: Only Admin can create, update, and delete schedule entries. Server checks role = admin before POST/PUT/DELETE. |
| F-16 | Admin mengubah jadwal: Admin can modify existing schedules. |
| VR-10 | Role-locked access: Non-admin users accessing /jadwal endpoints receive 403 Forbidden. |
| Validation | Server validates: hari must be in (Senin-Sabtu), jamMulai < jamSelesai, required fields present. |

---

## 6. Traceability

| User Flow | Requirement | API Endpoint |
| --- | --- | --- |
| userflow_uc_008.md | F-15, F-16 | GET /api/v1/jadwal, POST /api/v1/jadwal, PUT /api/v1/jadwal/{id}, DELETE /api/v1/jadwal/{id} |
