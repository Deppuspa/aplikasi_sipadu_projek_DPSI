# UC-012: Verifikasi Data Presensi Bermasalah oleh Admin

**Aktor:** Admin (Guru BK)  
**Referensi SRS:** F-04, BR-05  
**Halaman Terkait:** P-19 — /kehadiran  
**Tujuan:** Admin memverifikasi dan memperbaiki data presensi yang bermasalah, misalnya jika terjadi kesalahan pencatatan oleh guru mapel.

---

## Preconditions

1. Admin sudah login.
2. Terdapat data presensi yang tersimpan di sistem.
3. Admin membuka halaman `/kehadiran`.

## Postconditions

1. Data presensi yang bermasalah dapat diperbaiki oleh admin.
2. Perbaikan tercatat menggantikan data sebelumnya.

---

## Main Flow

1. **Admin membuka halaman `/kehadiran`** — Sistem menampilkan data kehadiran seluruh siswa (tanpa filter peran).
2. **Admin memfilter data** — Menggunakan filter Kelas dan Tanggal untuk menemukan record yang bermasalah.
3. **Admin meninjau data** — Memeriksa status kehadiran setiap siswa pada tabel.
4. **Admin mengubah status kehadiran** — Admin mengklik badge status atau tombol aksi pada baris yang bermasalah untuk mengubah antara **Hadir** dan **Tidak Hadir**.
5. **Sistem menyimpan perubahan** — Data presensi diperbarui dengan status baru.
6. **Tabel diperbarui** — Status badge berubah sesuai perubahan.

## Alternative Flows

### A1: Admin hanya melihat data (tanpa perubahan)
1. Admin membuka halaman `/kehadiran` hanya untuk meninjau data.
2. Tidak ada perubahan yang dilakukan.
3. Admin dapat menutup halaman atau navigasi ke halaman lain.

## Exception Flows

### E1: Data tidak ditemukan
1. Filter yang dipilih tidak menghasilkan data.
2. Sistem menampilkan empty state: "Tidak ada data kehadiran."

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-012-01 | Admin dapat melihat seluruh data kehadiran tanpa filter peran. | ✅ / ❌ |
| AC-012-02 | Admin dapat mengubah status kehadiran siswa. | ✅ / ❌ |
| AC-012-03 | Perubahan tersimpan dan tercermin di tabel. | ✅ / ❌ |
