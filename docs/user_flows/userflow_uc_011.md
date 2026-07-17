# UC-011: Filter dan Unduh Laporan Rekapitulasi

**Aktor:** Admin (Guru BK)  
**Referensi SRS:** F-13, F-14  
**Halaman Terkait:** P-20 — /laporan  
**Tujuan:** Admin menyaring data laporan berdasarkan kelas, tanggal, mata pelajaran, atau bulan, kemudian mengunduh hasil laporan dalam format CSV.

---

## Preconditions

1. Admin sudah login.
2. Terdapat data presensi yang akan dilaporkan.
3. Admin membuka halaman `/laporan`.

## Postconditions

1. Laporan yang ditampilkan sesuai dengan filter yang dipilih.
2. File CSV berhasil diunduh ke perangkat admin.

---

## Main Flow

### Tab Rekap Bulanan

1. **Admin memilih filter:**
   - **Kelas** (dropdown) — pilih kelas tertentu atau "Semua Kelas".
   - **Mata Pelajaran** (dropdown) — pilih mapel tertentu atau "Semua Mapel".
   - **Bulan** (`type="month"`) — pilih periode bulan.
2. **Sistem memperbarui tabel** sesuai filter yang dipilih.
3. **Admin menekan tombol "Unduh CSV"** (Primary button, `bg-blue-600`).
4. **Sistem membuat file CSV** dengan data yang sedang ditampilkan:
   - Header: NIS, Nama, Kelas, Hadir, Tidak Hadir, Total, Persentase.
   - Setiap baris = satu siswa.
5. **File CSV diunduh** — Nama file: `laporan_bulanan_[bulan].csv`.
6. **Browser mengunduh file** — File tersimpan di perangkat admin.

### Tab Rekap Harian

1. **Admin memilih filter:**
   - **Tanggal** (`type="date"`) — pilih tanggal.
   - **Kelas** (dropdown) — pilih kelas tertentu atau "Semua Kelas".
2. **Sistem memperbarui tabel** sesuai filter.
3. **Admin menekan tombol "Unduh CSV"**.
4. **Sistem membuat file CSV** dengan data yang sedang ditampilkan:
   - Header: NIS, Nama, Kelas, Hadir/Total, Persentase, Status Hari.
5. **File CSV diunduh** — Nama file: `laporan_harian_[tanggal].csv`.

## Alternative Flows

### A1: Filter tidak dipilih
1. Jika tidak ada filter yang dipilih, sistem menampilkan seluruh data yang ada.
2. CSV diunduh dengan seluruh data.

### A2: Guru mapel atau wali kelas mengunduh CSV
1. Tombol "Unduh CSV" tersedia untuk semua role yang memiliki akses ke tab tersebut.
2. Data yang diunduh sesuai dengan data yang terlihat oleh role tersebut.

## Exception Flows

### E1: Tidak ada data untuk filter
1. Jika filter menghasilkan data kosong, sistem menampilkan empty state.
2. Tombol "Unduh CSV" tetap aktif tetapi akan mengunduh file CSV kosong (hanya header).

### E2: Gagal mengunduh
1. Jika browser memblokir unduhan, admin dapat mencoba lagi.
2. Sistem tidak menyediakan fallback — unduhan dilakukan melalui Blob URL (`URL.createObjectURL`).

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-011-01 | Filter kelas dan tanggal (harian) / kelas, mapel, bulan (bulanan) berfungsi. | ✅ / ❌ |
| AC-011-02 | Tombol "Unduh CSV" mengunduh file dengan data yang sesuai filter. | ✅ / ❌ |
| AC-011-03 | File CSV memiliki header yang sesuai dengan jenis laporan. | ✅ / ❌ |
| AC-011-04 | Nama file CSV mencerminkan jenis laporan dan periode. | ✅ / ❌ |
