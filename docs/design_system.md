# Design System — SIPADU

**Sistem Presensi Digital Siswa SMP N 4 Banguntapan**

**Versi:** 1.0  
**Acuan:** SRS.md v1.0, information_architecture.md v1.0  
**Dibuat:** Juni 2026

---

## 1. VISUAL STYLE

**Tone:** Profesional, bersih, komunikatif, dan dapat dipahami oleh pengguna dengan beragam tingkat literasi digital (siswa SMP, guru, wali kelas, Guru BK).

**Prinsip desain:**

| Prinsip | Penerapan |
|---|---|
| **Clarity** | Hierarki visual jelas: judul → konten → aksi. Setiap halaman memiliki satu tujuan utama. |
| **Simplicity** | Hindari elemen dekoratif yang tidak perlu. Gunakan whitespace secara konsisten untuk memisahkan seksi. |
| **Consistency** | Semua komponen (tombol, input, tabel, card) menggunakan radius, bayangan, dan warna yang seragam di seluruh halaman. |
| **Accessibility** | Kontras teks terhadap latar belakang ≥ 4.5:1. Status kehadiran tidak hanya mengandalkan warna tetapi juga label teks (misal: "Hadir", "Tidak Hadir"). |
| **Efficiency** | Alur kerja (workflow) setiap aktor dapat diselesaikan dalam 1–3 klik/langkah dari halaman dashboard. |

**Tidak digunakan:**
- Animasi berlebihan, transisi halaman, parallax, atau efek dekoratif lain.
- Ikon animasi atau ilustrasi besar yang mengurangi fokus pada data.

---

## 2. COLORS

### 2.1 Color Palette

| Token | Tailwind Utility | Hex | Penggunaan |
|---|---|---|---|
| `--color-primary` | `bg-primary` / `text-primary` / `border-primary` | `#2563eb` | Tombol utama, link aktif, header sidebar, border fokus |
| `--color-primary-hover` | — | `#1d4ed8` | Hover state tombol primary |
| `--color-primary-active` | — | `#1e40af` | Active/pressed state tombol primary |
| `--color-primary-light` | `bg-primary-light` | `#dbeafe` | Background highlight, info box, sidebar item aktif |
| `--color-secondary` | `bg-secondary` / `text-secondary` | `#475569` | Teks sekunder, label non-aktif |
| `--color-bg-app` | `bg-bg-app` | `#f1f5f9` | Background halaman (di luar card/container) |
| `--color-bg-card` | `bg-bg-card` | `#ffffff` | Background card, tabel, form, sidebar |
| `--color-text-main` | `text-text-main` | `#0f172a` | Teks utama (judul, body) |
| `--color-text-muted` | `text-text-muted` | `#64748b` | Teks bantuan, label, placeholder, deskripsi |
| `--color-border` | `border-border` | `#e2e8f0` | Border card, tabel, input, separator |

### 2.2 Status Colors

| Status | Hex | Tailwind | Penggunaan |
|---|---|---|---|
| **Hadir** (success) | `#16a34a` | `green-600` | Badge "Hadir", angka hijau di tabel/progress, success banner |
| **Tidak Hadir** (error) | `#dc2626` | `red-600` | Badge "Tidak Hadir", angka merah, danger button |
| **Sakit** (informasi) | `#2563eb` | `blue-600` | Badge jenis izin "sakit" (bg `blue-50` / text `blue-700`) |
| **Izin** (pending) | `#7c3aed` | `purple-600` | Badge jenis izin "izin" (bg `purple-50` / text `purple-700`) |
| **Lainnya** (netral) | `#6b7280` | `gray-500` | Badge jenis izin "lainnya" (bg `gray-100` / text `gray-700`) |
| **Menunggu** (warning) | `#d97706` | `amber-600` | Badge status izin "menunggu" (bg `amber-50` / text `amber-700`) |
| **Disetujui** (success) | `#16a34a` | `green-600` | Badge status izin "disetujui" (bg `green-50` / text `green-700`) |
| **Ditolak** (error) | `#dc2626` | `red-600` | Badge status izin "ditolak" (bg `red-50` / text `red-700`) |

### 2.3 Background & Surface

| Elemen | Hex | Tailwind |
|---|---|---|
| App background | `#f1f5f9` | `bg-gray-100` / `bg-bg-app` |
| Card / container | `#ffffff` | `bg-white` / `bg-bg-card` |
| Table header | `#f8fafc` | `bg-gray-50` |
| Hover row | `#f8fafc` | `hover:bg-gray-50` |
| Sidebar active | `#dbeafe` | `bg-blue-50` |
| Sidebar hover | `#f3f4f6` | `hover:bg-gray-100` |

### 2.4 Text

| Level | Hex | Tailwind | Penggunaan |
|---|---|---|---|
| Main | `#0f172a` | `text-gray-900` | Judul, body teks |
| Secondary | `#475569` | `text-gray-600` | Label form, deskripsi |
| Muted / disabled | `#64748b` | `text-gray-500` | Placeholder, empty state, caption |
| On primary | `#ffffff` | `text-white` | Teks pada tombol primary |

---

## 3. TYPOGRAPHY

### 3.1 Font Family

| Token | Value |
|---|---|
| `--font-sans` | `"Segoe UI", ui-sans-serif, system-ui, sans-serif` |
| `--font-mono` | `ui-monospace, SFMono-Regular, monospace` |

Gunakan `font-sans` untuk seluruh teks antarmuka. `font-mono` untuk data teknis (tidak digunakan di halaman pengguna).

### 3.2 Font Sizes & Weights

| Level | Class | Size | Weight | Penggunaan |
|---|---|---|---|---|
| Page title | `text-xl font-semibold` | 1.25rem / 20px | 600 | Judul halaman utama |
| Section title | `font-semibold` | 0.875rem / 14px | 600 | Judul sub-seksi dalam card |
| Body | `text-sm` | 0.875rem / 14px | 400 | Konten utama paragraf, sel tabel |
| Label | `text-sm font-medium` | 0.875rem / 14px | 500 | Label input, label filter |
| Table header | `text-xs font-medium uppercase` | 0.75rem / 12px | 500 | Header kolom tabel |
| Caption | `text-xs` | 0.75rem / 12px | 400 | Keterangan, helper text, timestamp |
| Badge | `text-xs font-medium` | 0.75rem / 12px | 500 | Status badge |
| Stat value | `text-3xl font-bold` | 1.875rem / 30px | 700 | Angka statistik di card dashboard |
| KPI label | `text-xs font-medium uppercase tracking-wider` | 0.75rem / 12px | 500 | Label statistik card |
| Sidebar brand | `text-lg font-bold` | 1.125rem / 18px | 700 | Nama aplikasi di sidebar |
| Sidebar item | `text-sm` | 0.875rem / 14px | 400 (normal) / 600 (active) | Item navigasi sidebar |
| User name | `text-sm font-semibold` | 0.875rem / 14px | 600 | Nama pengguna di sidebar |

---

## 4. SPACING & LAYOUT

### 4.1 Spacing Scale

Gunakan skala spacing Tailwind secara konsisten:

| Token | Value | Penggunaan |
|---|---|---|
| `p-3` | 0.75rem / 12px | Padding sel tabel, badge, info box |
| `p-4` | 1rem / 16px | Padding card, sidebar section |
| `p-5` | 1.25rem / 20px | Padding konten card |
| `px-3 py-1.5` | 0.75rem × 0.375rem | Tombol aksi kecil |
| `px-4 py-2` | 1rem × 0.5rem | Tombol standar |
| `gap-2` | 0.5rem / 8px | Gap antar elemen dalam row |
| `gap-3` | 0.75rem / 12px | Gap antar filter/button group |
| `gap-4` | 1rem / 16px | Gap grid card dashboard |
| `space-y-4` | 1rem / 16px | Vertical spacing antar elemen halaman |
| `space-y-5` | 1.25rem / 20px | Vertical spacing dashboard sections |
| `mb-1` | 0.25rem / 4px | Spacing label ke input |
| `mb-3` | 0.75rem / 12px | Spacing section title ke konten |

### 4.2 Layout Grid

- **Dashboard stat cards:** `grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`
- **Presensi student grid:** `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`
- **Form layout:** `space-y-4 max-w-lg` (form dalam satu kolom, lebar maksimal 32rem)

### 4.3 Page Padding

- **Dashboard layout main content:** `p-4 lg:p-6`
- **Card padding:** `p-5` konten, `p-4` pada card yang lebih kecil

### 4.4 Container Widths

| Container | Max Width | Penggunaan |
|---|---|---|
| Page content | 100% (full width) dengan padding | Halaman data (tabel) |
| Form | `max-w-lg` (32rem) | Halaman form (izin, presensi step 2) |
| Sidebar | `w-64` (16rem) desktop, `w-72` (18rem) mobile overlay |

---

## 5. BUTTONS

### 5.1 Button Styles

| Variant | Classes | State | Visual |
|---|---|---|---|
| **Primary** | `px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium cursor-pointer` | Default | Background `#2563eb`, teks putih |
| | `hover:bg-blue-700` | Hover | Background `#1d4ed8` |
| | `active:bg-blue-800` | Active | Background `#1e40af` |
| **Secondary** | `px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium cursor-pointer` | Default | Border `#e2e8f0`, teks `#0f172a` |
| | `hover:bg-gray-50` | Hover | Background `#f8fafc` |
| **Danger** | `px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium cursor-pointer` | Default | Background `#dc2626`, teks putih |
| | `hover:bg-red-700` | Hover | Background `#b91c1c` |
| **Ghost (text)** | `flex items-center gap-2 text-sm text-red-600 cursor-pointer` | Default | Teks merah, tanpa background |
| | `hover:text-red-800` | Hover | Teks lebih gelap |
| **Small action** | `px-3 py-1.5 rounded text-xs font-medium cursor-pointer` | Variabel | Ukuran kecil untuk aksi dalam tabel |
| **Disabled** | `bg-gray-100 text-gray-400 cursor-not-allowed` | Disabled | Background abu-abu, teks abu-abu, tanpa efek hover |

### 5.2 Button dengan Ikon

Semua tombol dengan ikon mengikuti pola:
```html
<button class="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg ...">
  <Icon class="w-4 h-4" /> Teks Tombol
</button>
```

Ukuran ikon dalam tombol: `w-4 h-4`.

### 5.3 Quick Link / Tab-style Button

Untuk akses cepat di dashboard admin:
```html
<button class="px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
  bg-blue-50 text-blue-700 hover:bg-blue-100" />
```

Varian warna: `blue-50/blue-700`, `amber-50/amber-700`, `green-50/green-700`.

---

## 6. INPUTS

### 6.1 Text Input & Textarea

```html
<input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
<textarea class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[80px]" />
```

| State | Visual |
|---|---|
| Default | Border `#e2e8f0`, background putih, teks `#0f172a` |
| Focus | Border `#2563eb` (ring tidak digunakan, cukup border color) |
| Error | Border `#dc2626` + teks error merah di bawah |
| Disabled | Background `#f9fafb`, teks `#9ca3af`, cursor not-allowed |
| Placeholder | Teks `#64748b` |

### 6.2 Select / Dropdown

```html
<select class="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
```

Sama dengan text input untuk states. Dropdown untuk filter menggunakan `py-1.5` (lebih pendek dari `py-2`).

### 6.3 Date & Month Picker

```html
<input type="date" class="border border-gray-300 rounded-lg px-3 py-1.5 text-sm" />
<input type="month" class="border border-gray-300 rounded-lg px-3 py-1.5 text-sm" />
```

Menggunakan input HTML native dengan styling yang sama seperti select.

### 6.4 Checkbox (Presensi)

Untuk presensi per siswa, menggunakan card clickable dengan border yang berubah warna, **bukan** input checkbox HTML native:

```html
<div class="flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all
  bg-green-50 border-green-300">   <!-- checked / hadir -->
<div class="flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all
  bg-red-50 border-red-300">      <!-- unchecked / tidak hadir -->
```

| State | Background | Border | Ikon |
|---|---|---|---|
| Hadir (checked) | `bg-green-50` | `border-green-300` | `Check` hijau |
| Tidak Hadir (unchecked) | `bg-red-50` | `border-red-300` | `X` merah |

### 6.5 File Upload (Bukti Izin)

Untuk prototype, menggunakan input teks biasa (simulasi):

```html
<input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
  placeholder="Nama file bukti (contoh: surat_dokter.pdf)" />
```

Disertai caption: `<p class="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG</p>`

---

## 7. TABLES

### 7.1 Standard Table

Digunakan untuk semua tampilan data: daftar siswa, rekap presensi, daftar izin, laporan absensi, jadwal.

```html
<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
          <th class="p-3">Kolom 1</th>
          <th class="p-3">Kolom 2</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-100 hover:bg-gray-50">
          <td class="p-3">Data</td>
          <td class="p-3">Data</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

| Elemen | Styling |
|---|---|
| Container | `bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden` |
| Scroll | `overflow-x-auto` pada container untuk responsivitas horizontal |
| Header | `border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase` |
| Cell | `p-3` |
| Row | `border-b border-gray-100 hover:bg-gray-50` |
| Font size | `text-sm` untuk seluruh tabel |

### 7.2 In-Card Table (Dashboard)

Untuk tabel di dalam card dashboard, gunakan padding lebih kecil:

```html
<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
        <th class="pb-2 pr-3">...</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-gray-100">
        <td class="py-2 pr-3">...</td>
      </tr>
    </tbody>
  </table>
</div>
```

Sel in-card menggunakan `py-2 pr-3` (lebih kecil dari `p-3`).

### 7.3 Status Badge dalam Tabel

```html
<span class="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
  Hadir
</span>
```

Varian warna status badge:
- **Hadir:** `bg-green-50 text-green-700`
- **Tidak Hadir:** `bg-red-50 text-red-700`
- **Sakit:** `bg-blue-50 text-blue-700`
- **Izin:** `bg-purple-50 text-purple-700`
- **Lainnya:** `bg-gray-100 text-gray-700`
- **Menunggu:** `bg-yellow-50 text-yellow-700` (atau `bg-amber-50 text-amber-700`)
- **Disetujui:** `bg-green-50 text-green-700`
- **Ditolak:** `bg-red-50 text-red-700`

### 7.4 Progress Bar dalam Tabel

Untuk kolom persentase di laporan/rekap:

```html
<div class="flex items-center gap-2">
  <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
    <div class="h-full rounded-full bg-green-500" style="width: 75%"></div>
  </div>
  <span class="text-xs font-medium">75%</span>
</div>
```

Warna bar: `bg-green-500` jika persentase >= 60, `bg-red-500` jika < 60.

---

## 8. CARDS

### 8.1 Standard Card

```html
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
  <h3 class="font-semibold mb-3">Judul Card</h3>
  ... konten ...
</div>
```

### 8.2 Stat Card (Dashboard)

```html
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Label</p>
      <p class="text-3xl font-bold mt-1" style="color: #16a34a">42</p>
      <p class="text-xs text-gray-500 mt-1">Detail</p>
    </div>
    <div class="p-2.5 rounded-lg" style="background-color: #16a34a15">
      <Icon class="w-5 h-5" style="color: #16a34a" />
    </div>
  </div>
</div>
```

Grid: `grid grid-cols-1 md:grid-cols-3 gap-4` (3 kolom) atau `grid grid-cols-1 md:grid-cols-4 gap-4` (4 kolom admin).

### 8.3 Info Box / Callout

Untuk informasi penting atau penjelasan business rule:

```html
<div class="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs">
  <strong>Judul Info:</strong> Teks penjelasan.
</div>
```

Varian warna:
- **Info** (default): `bg-blue-50 border-blue-200 text-blue-700`
- **Success:** `bg-green-50 border-green-200 text-green-700`
- **Warning:** `bg-yellow-50 border-yellow-200 text-yellow-700`

### 8.4 Card dengan Ikon di Dashboard Siswa

Card statistik dengan ikon latar belakang transparan (warna dengan opacity ~8%):
```html
<div class="p-2.5 rounded-lg" style="background-color: #16a34a15">
  <Icon class="w-5 h-5" style="color: #16a34a" />
</div>
```

---

## 9. MODALS

Untuk konfirmasi aksi (simpan presensi, setujui/tolak izin, hapus jadwal):

```html
<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4">
    <h3 class="font-semibold text-lg">Judul Modal</h3>
    <p class="text-sm text-gray-600">Pesan konfirmasi...</p>
    <div class="flex justify-end gap-3 pt-2">
      <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm">Batal</button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Konfirmasi</button>
    </div>
  </div>
</div>
```

| Elemen | Styling |
|---|---|
| Overlay | `fixed inset-0 bg-black/50 z-50` |
| Container | `bg-white rounded-lg shadow-xl w-full max-w-md p-6` |
| Title | `font-semibold text-lg` |
| Body | `text-sm text-gray-600` |
| Action buttons | Flex `justify-end gap-3`, tombol Batal Secondary, tombol Konfirmasi Primary/Danger |

---

## 10. EMPTY STATES

Tampilan ketika tidak ada data untuk ditampilkan:

```html
<div class="text-center py-12 text-gray-500">
  Tidak ada data untuk filter yang dipilih.
</div>
```

Varian pesan sesuai konteks:
- **Presensi:** "Tidak ada jadwal presensi untuk hari ini."
- **Izin:** "Belum ada pengajuan izin."
- **Riwayat:** "Belum ada data presensi."
- **Filter:** "Tidak ada data untuk filter yang dipilih."
- **Kehadiran:** "Tidak ada data kehadiran."

Semua empty state: `text-center`, `py-12`, `text-gray-500 text-sm`.

---

## 11. ERROR STATES

### 11.1 Error Banner (Login/Form)

```html
<div class="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
  <AlertCircle class="w-4 h-4 shrink-0" />
  Pesan error
</div>
```

### 11.2 Inline Field Error

```html
<div>
  <label class="block text-sm font-medium mb-1">Email</label>
  <input class="w-full border border-red-300 rounded-lg px-3 py-2 text-sm" />
  <p class="text-xs text-red-600 mt-1">Email sudah terdaftar.</p>
</div>
```

| State | Border | Helper Text |
|---|---|---|
| Default | `border-gray-300` | — |
| Fokus | `border-blue-600` | — |
| Error | `border-red-300` | `text-xs text-red-600 mt-1` |
| Disabled | `border-gray-200 bg-gray-50` | — |

### 11.3 Error Messages

| Context | Message |
|---|---|
| Login gagal | "Email atau password salah." |
| Email duplikat | "Email sudah terdaftar." |
| Form tidak lengkap | Validasi HTML native (`required`) |
| Izin duplikat | "Anda sudah memiliki pengajuan izin untuk tanggal ini." (belum diimplementasikan) |

---

## 12. LOADING STATES

### 12.1 Button Loading

Untuk tombol yang memicu operasi async (simpan presensi, generate laporan):

```html
<button disabled class="flex items-center gap-1.5 px-4 py-2 bg-blue-400 text-white rounded-lg text-sm cursor-not-allowed">
  <span class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
  Menyimpan...
</button>
```

### 12.2 Full-Page Loading

Untuk skeleton loading halaman (jika data async):

```html
<div class="space-y-4 animate-pulse">
  <div class="h-8 bg-gray-200 rounded w-1/3"></div>
  <div class="h-32 bg-gray-200 rounded"></div>
  <div class="h-64 bg-gray-200 rounded"></div>
</div>
```

**Catatan:** Karena prototype saat ini menggunakan data in-memory (mock-data) yang sinkron, loading states jarang muncul. Implementasi loading states menjadi prioritas jika data berpindah ke API/server async.

---

## 13. RESPONSIVE BEHAVIOR

### 13.1 Breakpoints

| Breakpoint | Tailwind | Target Perangkat |
|---|---|---|
| Default (< 640px) | — | Ponsel |
| `sm` (640px) | `sm:` | Ponsel landscape |
| `md` (768px) | `md:` | Tablet |
| `lg` (1024px) | `lg:` | Desktop (lab komputer) |
| `xl` (1280px) | `xl:` | Desktop besar |

### 13.2 Layout Responsif

| Komponen | Mobile | Tablet | Desktop |
|---|---|---|---|
| **Sidebar** | Overlay (fixed, `w-72`, slide from left) | Overlay | Static (`w-64`, selalu visible) |
| **Dashboard grid** | 1 kolom | 2–3 kolom | 3–4 kolom |
| **Presensi grid** | 1 kolom | 2 kolom | 3–4 kolom |
| **Table** | `overflow-x-auto` (horizontal scroll) | Full width | Full width |
| **Filter bar** | Stack vertikal (wrap) | Inline row | Inline row |
| **Modal** | `p-4` (padding lebih kecil) | `p-6` | `p-6` |

### 13.3 Mobile Navigation

- Tombol hamburger (Menu) di header muncul hanya pada `lg:hidden`
- Sidebar mobile: `fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-200`
- Overlay: `fixed inset-0 bg-black/50 z-40 lg:hidden`
- Transisi: `-translate-x-full` (tersembunyi) ↔ `translate-x-0` (terbuka)

### 13.4 NF-07 Compliance

Sistem harus dapat digunakan di:
- **Komputer laboratorium** (layar ≥ 1024px): layout penuh dengan sidebar statis
- **Tablet** (layar 768–1023px): sidebar overlay, grid 2–3 kolom
- **Ponsel guru** (layar < 768px): sidebar overlay, grid 1 kolom, tabel dengan scroll horizontal, filter bertumpuk vertikal

---

## 14. COMPONENT MATRIX

Pemetaan komponen desain ke halaman di IA:

| Komponen | P-03/06/10/16 Dashboard | P-04 Izin | P-05 Riwayat | P-07/11 Presensi | P-08/12 Kehadiran | P-13/18 Verif Izin | P-14 Pantau Rekap | P-17 Jadwal | P-20 Laporan | P-21 Hak Akses |
|---|---|---|---|---|---|---|---|---|---|---|
| StatCard | ✅ | — | — | — | — | — | — | — | — | — |
| Table | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| StatusBadge | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | — | ✅ | — |
| ProgressBar | ✅ | — | — | — | — | — | ✅ | — | ✅ | — |
| Form Input | — | ✅ | — | — | — | — | — | ✅ | — | — |
| Date/Select Filter | — | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Primary Button | ✅ | ✅ | — | ✅ | — | ✅ | — | ✅ | ✅ | — |
| Secondary Button | — | — | — | ✅ | — | — | — | ✅ | — | — |
| Danger Button | — | — | — | — | — | ✅ | — | ✅ | — | — |
| Info Box | — | — | — | ✅ | — | — | ✅ | — | ✅ | — |
| Success Banner | — | ✅ | — | ✅ | — | — | — | — | — | — |
| Empty State | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Modal | — | — | — | — | — | ✅ | — | ✅ | — | — |
| Card (info-only) | — | — | — | — | — | — | — | — | — | ✅ |

---

*Dokumen ini merupakan artefak Design System yang diturunkan dari SRS.md v1.0 dan information_architecture.md v1.0. Seluruh keputusan visual dan komponen mengacu pada aktor (Section 3), kebutuhan fungsional (Section 4), business rules (Section 7), dan non-fungsional requirements (Section 5) SRS. Dokumen ini menjadi acuan untuk fase implementasi frontend (Phase 2B).*
