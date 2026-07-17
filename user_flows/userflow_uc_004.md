# UC-004: Pengajuan Izin Ketidakhadiran oleh Siswa

**Aktor:** Siswa  
**Referensi SRS:** F-06, F-07, F-08, BR-06–BR-09, VR-03, VR-04  
**Halaman Terkait:** P-04 — /izin  
**Tujuan:** Siswa mengajukan izin ketidakhadiran untuk satu tanggal tertentu. Izin bersifat per hari — satu pengajuan berlaku untuk seluruh jam pelajaran pada tanggal tersebut.

---

## Preconditions

1. Siswa sudah login.
2. Siswa membuka halaman `/izin`.

## Postconditions

1. Izin baru tersimpan dengan status **menunggu** (BR-09).
2. Izin tercatat di sistem dengan data: nis, tanggal, jenis, keterangan, bukti.
3. Riwayat izin siswa di halaman `/izin` diperbarui dengan entry baru.
4. Siswa tidak dapat mengajukan izin kedua untuk tanggal yang sama (VR-04).

---

## Main Flow

1. **Sistem menampilkan halaman pengajuan izin** — Halaman `/izin` menampilkan:
   - Judul "Ajukan Izin Ketidakhadiran".
   - Deskripsi: "Izin diajukan per hari — berlaku untuk seluruh jam pelajaran."
   - Form input: Tanggal, Jenis Izin, Keterangan, Bukti Pendukung.
   - Tombol "Ajukan Izin" (Primary button, `bg-blue-600`).
2. **Sistem menampilkan riwayat izin** — Di bawah form, tabel riwayat pengajuan izin siswa dengan kolom: Tanggal, Jenis, Status, Keterangan, Bukti.
3. **Siswa memilih tanggal** — Siswa mengisi input `type="date"` dengan tanggal ketidakhadiran.
4. **Siswa memilih jenis izin** — Siswa memilih dari dropdown: Sakit, Izin, atau Lainnya.
5. **Siswa mengisi keterangan** — Siswa menulis alasan ketidakhadiran di textarea.
6. **Siswa mengisi bukti pendukung** — Siswa memasukkan nama file bukti (simulasi) di input teks.
7. **Siswa menekan tombol "Ajukan Izin"**.
8. **Sistem memvalidasi input:**
   - Memastikan tanggal, jenis, dan keterangan terisi (required).
   - Memvalidasi tanggal tidak boleh di masa depan (VR-03).
   - Memeriksa tidak ada izin aktif (menunggu/disetujui) untuk tanggal yang sama (VR-04).
9. **Sistem menyimpan izin** — Status awal: **menunggu**.
10. **Sistem menampilkan success banner** (`bg-green-50 border-green-200 text-green-700`):
    > "Izin berhasil diajukan! Status: Menunggu verifikasi."
11. **Form dikosongkan** — Field-field kembali ke nilai awal.
12. **Tabel riwayat diperbarui** — Entry baru muncul di tabel riwayat dengan status "menunggu" (badge `bg-yellow-50 text-yellow-700`).

## Alternative Flows

### A1: Siswa mengajukan tanpa bukti
1. Field bukti bersifat opsional dalam implementasi (meskipun BR-08 menyebut wajib).
2. Jika dikosongkan, sistem menyimpan dengan nilai `'(tanpa file)'`.

### A2: Siswa melihat status izin
1. Siswa dapat melihat status terkini izin di tabel riwayat pada halaman yang sama (F-10).
2. Status badge berubah secara real-time setelah diverifikasi oleh wali kelas/admin.

## Exception Flows

### E1: Tanggal tidak valid (VR-03)
1. Sistem mendeteksi tanggal yang dipilih adalah hari di masa depan.
2. Sistem menampilkan error banner:
   > "Tanggal izin tidak boleh di masa depan."
3. Form tidak dikirim, siswa diminta memilih tanggal lain.

### E2: Duplikat izin untuk tanggal yang sama (VR-04)
1. Sistem mendeteksi sudah ada izin dengan status menunggu atau disetujui untuk tanggal yang sama.
2. Sistem menampilkan error banner:
   > "Anda sudah memiliki pengajuan izin untuk tanggal ini."
3. Form tidak dikirim.

### E3: Field required kosong
1. Validasi HTML native (`required`) pada input tanggal, jenis, dan keterangan.
2. Browser memblokir submit jika ada field required yang kosong.

### E4: Gagal menyimpan
1. Sistem gagal menyimpan data izin.
2. Sistem menampilkan error banner.
3. Data form tetap terisi, siswa dapat mencoba lagi.

---

## Acceptance Criteria

| ID | Kriteria | Status |
|---|---|---|
| AC-004-01 | Form izin menampilkan field tanggal, jenis, keterangan, dan bukti. | ✅ / ❌ |
| AC-004-02 | Izin berhasil disimpan dengan status "menunggu". | ✅ / ❌ |
| AC-004-03 | Success banner muncul setelah pengajuan berhasil. | ✅ / ❌ |
| AC-004-04 | Riwayat izin diperbarui dengan entry baru. | ✅ / ❌ |
| AC-004-05 | Tanggal masa depan ditolak dengan pesan error. | ✅ / ❌ |
| AC-004-06 | Duplikat izin untuk tanggal yang sama ditolak (VR-04). | ✅ / ❌ |
