# UC-008: Pengaturan Jadwal Pelajaran oleh Admin

**Aktor:** Admin (Guru BK)  
**Referensi SRS:** F-15, F-16  
**Halaman Terkait:** P-17 — /jadwal  
**Tujuan:** Admin mengelola jadwal jam pelajaran yang menjadi acuan sesi-sesi presensi per kelas per hari. Admin dapat menambah, mengubah, dan menghapus jadwal.

---

## Preconditions

1. Admin sudah login.
2. Admin membuka halaman `/jadwal`.

## Postconditions

1. Jadwal baru tersimpan atau jadwal yang ada berhasil diubah/dihapus.
2. Data jadwal digunakan sebagai acuan untuk sesi presensi dan perhitungan rekap.
3. Hanya admin yang dapat mengelola jadwal (role-locked).

---

## Main Flow

1. **Sistem menampilkan daftar jadwal** — Halaman `/jadwal` menampilkan tabel dengan kolom: Hari, Jam, Kelas, Mapel, Guru, Semester, Aksi.
2. **Sistem mengurutkan jadwal** — Default urutan: berdasarkan hari (Senin–Sabtu), lalu jam mulai.
3. **Admin memfilter jadwal (opsional)** — Menggunakan dropdown filter Kelas dan filter Hari.
4. **Admin menekan tombol "Tambah Jadwal"** (Primary button, `bg-blue-600`).
5. **Sistem membuka modal** (`fixed inset-0 bg-black/50 z-50`) dengan form:
   - Kelas (dropdown), Hari (dropdown), Jam Mulai (`type="time"`), Jam Selesai (`type="time"`), Mata Pelajaran (`text`), Guru Pengampu (dropdown), Semester (`text`, default "2025/2026-Ganjil").
6. **Admin mengisi form jadwal** — Mengisi semua field.
7. **Admin menekan tombol "Simpan"** (Primary button, `bg-blue-600`) di dalam modal.
8. **Sistem memvalidasi input** — Memastikan field required terisi.
9. **Sistem menyimpan jadwal baru** — Data tersimpan dan ditambahkan ke tabel.
10. **Modal tertutup** — Tabel jadwal diperbarui.

## Alternative Flows

### A1: Mengubah jadwal yang sudah ada
1. Admin mengklik ikon **Pencil** (`Pencil`) pada baris jadwal yang ingin diubah.
2. Modal terbuka dengan data jadwal yang sudah terisi.
3. Admin mengubah field yang diinginkan.
4. Admin menekan "Simpan".
5. Data jadwal diperbarui.

### A2: Menghapus jadwal
1. Admin mengklik ikon **Trash2** (`Trash2`) pada baris jadwal yang ingin dihapus.
2. Sistem menampilkan konfirmasi browser (`confirm('Hapus jadwal ini?')`).
3. Jika admin mengonfirmasi, jadwal dihapus dari sistem.
4. Tabel diperbarui.

### A3: Filter kelas/hari
1. Admin memilih kelas tertentu → tabel hanya menampilkan jadwal untuk kelas tersebut.
2. Admin memilih hari tertentu → tabel hanya menampilkan jadwal untuk hari tersebut.
3. Kedua filter dapat digunakan bersamaan.

### A4: Membatalkan input
1. Admin mengklik tombol "Batal" (Secondary button, `border border-gray-300`) di dalam modal.
2. Modal tertutup tanpa menyimpan perubahan.
3. Data jadwal tidak berubah.

### A5: Tidak ada jadwal
1. Sistem menampilkan empty state: "Tidak ada jadwal."

## Exception Flows

### E1: Field required kosong
1. Validasi HTML native (`required`) pada input mata pelajaran dan jam.
2. Browser memblokir submit jika ada field required kosong.

### E2: Guru tidak dipilih
1. Dropdown guru pengampu memerlukan pilihan.
2. Jika tidak dipilih, validasi `required` aktif.

### E3: Akses aktor lain
1. Guru mapel, wali kelas, atau siswa mencoba membuka `/jadwal`.
2. Sistem memeriksa role dan mendeteksi ketidaksesuaian.
3. Sistem redirect ke `/dashboard` (VR-10).

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-008-01 | Admin dapat menambah jadwal baru melalui modal form. | ✅ / ❌ |
| AC-008-02 | Admin dapat mengubah jadwal yang sudah ada. | ✅ / ❌ |
| AC-008-03 | Admin dapat menghapus jadwal dengan konfirmasi. | ✅ / ❌ |
| AC-008-04 | Filter kelas dan hari berfungsi. | ✅ / ❌ |
| AC-008-05 | Hanya admin yang dapat mengakses halaman `/jadwal`. | ✅ / ❌ |
