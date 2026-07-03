# Implementation Notes — Sipadu Prototype

## Source of Truth Documents
- **SRS v1.0** — Software Requirements Specification
- **IA v1.0** — Information Architecture
- **DS v1.0** — Design System
- **User Flows** — 14 use-case documents (uc_001–uc_014) with index

## Conflict Resolutions & Deviations

| # | Conflict | Resolution |
|---|----------|------------|
| 1 | IA login page says redirect already-authed users to `/dashboard`; no explicit SRS mention | Implemented redirect in both `login/page.tsx` and `register/page.tsx` |
| 2 | User-flow UC-001 (Registrasi) mentions NIS uniqueness (VR-01), SRS BR-20 says NIS must be unique | Added explicit NIS check in `handleRegister` before `registerAccount` |
| 3 | DS defines `--color-success: #16a34a`; SRS mentions hijau for Hadir without hex | Applied DS green (`#16a34a`) consistently for Hadir, success badges, progress bars ≥60% |
| 4 | User-flow UC-003 (Presensi) implies "all students default checked" | Implemented with `defaultChecked`; teacher unchecks absent students; counter updates via `onChange` |
| 5 | User-flow UC-012 (Verifikasi Presensi) — admin toggles Hadir/Tidak Hadir by clicking | Implemented as inline click toggle on the status badge in `kehadiran/page.tsx` |
| 6 | User-flow UC-005 (Verifikasi Izin) — action buttons disappear after approve/reject | Implemented via `refreshKey` state; buttons replaced by dash `-` after action |
| 7 | SRS F-01/F-02/F-03 — presensi per jadwal per hari; no explicit storage format | Stored as `{nis, idJadwal, tanggal, statusHadir}` in `presensiList`; `initMockData` seeds historical data for the past week |
| 8 | SRS BR-13 — rekap threshold 60%; DS defines color coding | Applied: ≥60% green, <60% red progress bar; status badge shows "Aman" or "Kritis" |

## Known Gaps (Minor / Out of Scope)

| Gap | Notes |
|-----|-------|
| Success banner after verifikasi izin | Not explicitly required by SRS/UC-005; banners show on izin submission already |
| Empty state for verifikasi izin table | Shows "Tidak ada pengajuan izin" text when filtered list is empty |
| Error banner "Gagal menyimpan" on registrasi (E5) | Not implemented; error handling for storage failures is minimal (console.error only) |
| Pagination on presensi/izin tables | Not in scope for prototype; all data shown in single table |
| File upload for bukti izin | Mocked as text filename only; no actual file storage |
| Email notification on izin status change | Out of scope (no backend) |
| CSV export uses client-side Blob generation | No server endpoint; downloads work in browser only |

## localStorage Schema

All data stored under single key `sipadu_data`:

```typescript
interface SipaduStorage {
  siswaList: Siswa[];
  guruList: Guru[];
  adminList: Admin[];
  kelasList: Kelas[];
  jadwalList: JadwalPelajaran[];
  presensiList: Presensi[];
  izinList: Izin[];
  registeredAccounts: RegisteredAccount[];
  _counters?: Record<string, number>;
}
```

Data is loaded via `initMockData()` on first import; mutations call `saveToStorage()` automatically.

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Siswa | budi@siswa.sch.id | password123 |
| Guru Mapel | siti.rahma@guru.sch.id | password123 |
| Keduanya (guru_mapel + wali_kelas) | ahmad.hidayat@guru.sch.id | password123 |
| Wali Kelas | rina.fitriani@guru.sch.id | password123 |
| Admin | dewi.sartika@admin.sch.id | password123 |

## Build & Run

```bash
cd sipadu
npm install
npm run dev
```

Build verified with `npm run build` (TypeScript + production compilation passes).
