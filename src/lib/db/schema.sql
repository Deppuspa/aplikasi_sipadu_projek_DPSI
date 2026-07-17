-- ============================================================
-- SIPADU - SQLite Database Schema
-- Sistem Informasi Padu (Presensi Siswa)
-- ============================================================

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- ---- Users (Authentication) ----
CREATE TABLE IF NOT EXISTS users (
  email    TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  role     TEXT NOT NULL CHECK (role IN ('siswa','guru_mapel','wali_kelas','admin')),
  ref_id   TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- ---- Kelas (Classes) ----
CREATE TABLE IF NOT EXISTS kelas (
  id_kelas   TEXT PRIMARY KEY,
  nama_kelas TEXT NOT NULL,
  id_guru    TEXT
);

-- ---- Guru (Teachers) ----
CREATE TABLE IF NOT EXISTS guru (
  id_guru   TEXT PRIMARY KEY,
  nama_guru TEXT NOT NULL,
  email     TEXT NOT NULL UNIQUE,
  role      TEXT NOT NULL CHECK (role IN ('guru_mapel','wali_kelas','keduanya')),
  id_kelas  TEXT,
  FOREIGN KEY (id_kelas) REFERENCES kelas(id_kelas) ON DELETE SET NULL
);

-- ---- Siswa (Students) ----
CREATE TABLE IF NOT EXISTS siswa (
  nis           TEXT PRIMARY KEY,
  nama_lengkap  TEXT NOT NULL,
  jenis_kelamin TEXT NOT NULL CHECK (jenis_kelamin IN ('L','P')),
  id_kelas      TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  FOREIGN KEY (id_kelas) REFERENCES kelas(id_kelas) ON DELETE RESTRICT
);

-- ---- Admin ----
CREATE TABLE IF NOT EXISTS admin (
  id_admin   TEXT PRIMARY KEY,
  nama_admin TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  username   TEXT NOT NULL UNIQUE
);

-- ---- Jadwal Pelajaran (Schedules) ----
CREATE TABLE IF NOT EXISTS jadwal_pelajaran (
  id_jadwal      TEXT PRIMARY KEY,
  id_kelas       TEXT NOT NULL,
  id_guru        TEXT NOT NULL,
  hari           TEXT NOT NULL CHECK (hari IN ('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu')),
  jam_mulai      TEXT NOT NULL,
  jam_selesai    TEXT NOT NULL,
  mata_pelajaran TEXT NOT NULL,
  semester       TEXT NOT NULL,
  FOREIGN KEY (id_kelas) REFERENCES kelas(id_kelas) ON DELETE CASCADE,
  FOREIGN KEY (id_guru)  REFERENCES guru(id_guru)   ON DELETE CASCADE
);

-- ---- Presensi (Attendance) ----
CREATE TABLE IF NOT EXISTS presensi (
  id_presensi  TEXT PRIMARY KEY,
  nis          TEXT NOT NULL,
  id_jadwal    TEXT NOT NULL,
  id_guru      TEXT NOT NULL,
  tanggal      TEXT NOT NULL,
  status_hadir INTEGER NOT NULL DEFAULT 1,
  status_manual TEXT NOT NULL CHECK (status_manual IN ('hadir','tidak_hadir','sakit','izin')),
  FOREIGN KEY (nis)       REFERENCES siswa(nis)           ON DELETE CASCADE,
  FOREIGN KEY (id_jadwal) REFERENCES jadwal_pelajaran(id_jadwal) ON DELETE CASCADE,
  FOREIGN KEY (id_guru)   REFERENCES guru(id_guru)         ON DELETE CASCADE
);

-- ---- Izin (Permits / Excuse Letters) ----
CREATE TABLE IF NOT EXISTS izin (
  id_izin         TEXT PRIMARY KEY,
  nis             TEXT NOT NULL,
  tanggal_izin    TEXT NOT NULL,
  jenis_izin      TEXT NOT NULL CHECK (jenis_izin IN ('sakit','izin','lainnya')),
  keterangan      TEXT NOT NULL,
  bukti_pendukung TEXT NOT NULL DEFAULT '',
  status_izin     TEXT NOT NULL CHECK (status_izin IN ('menunggu','disetujui','ditolak')) DEFAULT 'menunggu',
  FOREIGN KEY (nis) REFERENCES siswa(nis) ON DELETE CASCADE
);

-- ---- Laporan Absensi (Attendance Reports) ----
CREATE TABLE IF NOT EXISTS laporan_absensi (
  id_laporan    TEXT PRIMARY KEY,
  id_kelas      TEXT NOT NULL,
  periode_awal  TEXT NOT NULL,
  periode_akhir TEXT NOT NULL,
  jenis_laporan TEXT NOT NULL CHECK (jenis_laporan IN ('harian','bulanan')),
  data_laporan  TEXT NOT NULL DEFAULT '{}',
  FOREIGN KEY (id_kelas) REFERENCES kelas(id_kelas) ON DELETE CASCADE
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_siswa_kelas    ON siswa(id_kelas);
CREATE INDEX IF NOT EXISTS idx_jadwal_kelas   ON jadwal_pelajaran(id_kelas);
CREATE INDEX IF NOT EXISTS idx_jadwal_guru    ON jadwal_pelajaran(id_guru);
CREATE INDEX IF NOT EXISTS idx_presensi_nis   ON presensi(nis);
CREATE INDEX IF NOT EXISTS idx_presensi_jadwal_tanggal ON presensi(id_jadwal, tanggal);
CREATE INDEX IF NOT EXISTS idx_presensi_guru  ON presensi(id_guru);
CREATE INDEX IF NOT EXISTS idx_izin_nis       ON izin(nis);
CREATE INDEX IF NOT EXISTS idx_izin_status    ON izin(status_izin);
CREATE INDEX IF NOT EXISTS idx_laporan_kelas  ON laporan_absensi(id_kelas);

-- ============================================================
-- Seed Data
-- ============================================================

INSERT OR IGNORE INTO kelas (id_kelas, nama_kelas, id_guru) VALUES
  ('KLS01', 'VII A',  'G002'),
  ('KLS02', 'VII B',  'G005'),
  ('KLS03', 'VII C',  'G007'),
  ('KLS04', 'VIII A', NULL),
  ('KLS05', 'VIII B', 'G004'),
  ('KLS06', 'VIII C', NULL),
  ('KLS07', 'IX A',   'G006'),
  ('KLS08', 'IX B',   NULL),
  ('KLS09', 'IX C',   NULL);

INSERT OR IGNORE INTO guru (id_guru, nama_guru, email, role, id_kelas) VALUES
  ('G001', 'Siti Rahma, S.Pd.',       'siti.rahma@guru.sch.id',    'guru_mapel', NULL),
  ('G002', 'Ahmad Hidayat, S.Pd.',    'ahmad.hidayat@guru.sch.id', 'keduanya',   'KLS01'),
  ('G003', 'Dwi Susanto, S.Pd.',      'dwi.susanto@guru.sch.id',   'guru_mapel', NULL),
  ('G004', 'Rina Fitriani, S.Pd.',    'rina.fitriani@guru.sch.id', 'wali_kelas', 'KLS05'),
  ('G005', 'Drs. Bambang Supriyono',  'bambang.supriyono@guru.sch.id', 'keduanya',   'KLS02'),
  ('G006', 'Dra. Kartika Dewi, M.Pd.','kartika.dewi@guru.sch.id',  'wali_kelas', 'KLS07'),
  ('G007', 'Yasmin Nuraini, S.Pd.',   'yasmin.nuraini@guru.sch.id','wali_kelas', 'KLS03'),
  ('G008', 'Fajar Hidayat, S.Kom.',   'fajar.hidayat@guru.sch.id', 'guru_mapel', NULL);

INSERT OR IGNORE INTO siswa (nis, nama_lengkap, jenis_kelamin, id_kelas, email) VALUES
  -- VII A (KLS01)
  ('2001', 'Ahmad Fauzi',         'L', 'KLS01', 'ahmad.fauzi@siswa.sch.id'),
  ('2002', 'Siti Nurhaliza',      'P', 'KLS01', 'siti.nurhaliza@siswa.sch.id'),
  ('2003', 'Dimas Ardiansyah',    'L', 'KLS01', 'dimas.ardiansyah@siswa.sch.id'),
  -- VII B (KLS02)
  ('2004', 'Putri Wulandari',     'P', 'KLS02', 'putri.wulandari@siswa.sch.id'),
  ('2005', 'Rizky Pratama',       'L', 'KLS02', 'rizky.pratama@siswa.sch.id'),
  ('2006', 'Nanda Safira',        'P', 'KLS02', 'nanda.safira@siswa.sch.id'),
  -- VII C (KLS03)
  ('2007', 'Andika Pramudya',     'L', 'KLS03', 'andika.pramudya@siswa.sch.id'),
  ('2008', 'Fitriani Ramadhani',  'P', 'KLS03', 'fitriani.ramadhani@siswa.sch.id'),
  ('2009', 'Gilang Permana',      'L', 'KLS03', 'gilang.permana@siswa.sch.id'),
  -- VIII A (KLS04)
  ('2010', 'Intan Permata Sari',  'P', 'KLS04', 'intan.permata@siswa.sch.id'),
  ('2011', 'Joko Susilo',         'L', 'KLS04', 'joko.susilo@siswa.sch.id'),
  ('2012', 'Kartika Dewi',        'P', 'KLS04', 'kartika.dewi@siswa.sch.id'),
  -- VIII B (KLS05)
  ('2013', 'Lestari Handayani',   'P', 'KLS05', 'lestari.handayani@siswa.sch.id'),
  ('2014', 'Maulana Ibrahim',     'L', 'KLS05', 'maulana.ibrahim@siswa.sch.id'),
  ('2015', 'Nindy Ayu Safitri',   'P', 'KLS05', 'nindy.ayu@siswa.sch.id'),
  -- VIII C (KLS06)
  ('2016', 'Oka Saputra',         'L', 'KLS06', 'oka.saputra@siswa.sch.id'),
  ('2017', 'Putu Widiastuti',     'P', 'KLS06', 'putu.widiastuti@siswa.sch.id'),
  ('2018', 'Raka Prasetya',       'L', 'KLS06', 'raka.prasetya@siswa.sch.id'),
  -- IX A (KLS07)
  ('2019', 'Ratna Sari Dewi',     'P', 'KLS07', 'ratna.sari@siswa.sch.id'),
  ('2020', 'Sandi Maulana',       'L', 'KLS07', 'sandi.maulana@siswa.sch.id'),
  ('2021', 'Tari Lestari',        'P', 'KLS07', 'tari.lestari@siswa.sch.id'),
  -- IX B (KLS08)
  ('2022', 'Ujang Kosasih',       'L', 'KLS08', 'ujang.kosasih@siswa.sch.id'),
  ('2023', 'Vina Amalia',         'P', 'KLS08', 'vina.amalia@siswa.sch.id'),
  ('2024', 'Wawan Setiawan',      'L', 'KLS08', 'wawan.setiawan@siswa.sch.id'),
  -- IX C (KLS09)
  ('2025', 'Yuni Rahmawati',      'P', 'KLS09', 'yuni.rahmawati@siswa.sch.id'),
  ('2026', 'Zaki Ahmad Fauzi',    'L', 'KLS09', 'zaki.ahmad@siswa.sch.id'),
  ('2027', 'Bella Safitri',       'P', 'KLS09', 'bella.safitri@siswa.sch.id');

INSERT OR IGNORE INTO admin (id_admin, nama_admin, email, username) VALUES
  ('A001', 'Dewi Sartika, S.Pd.', 'dewi.sartika@admin.sch.id', 'admin_bk');

INSERT OR IGNORE INTO users (email, password, role, ref_id) VALUES
  -- Siswa (password: siswa123)
  ('ahmad.fauzi@siswa.sch.id',      'siswa123', 'siswa', '2001'),
  ('siti.nurhaliza@siswa.sch.id',   'siswa123', 'siswa', '2002'),
  ('dimas.ardiansyah@siswa.sch.id', 'siswa123', 'siswa', '2003'),
  ('putri.wulandari@siswa.sch.id',  'siswa123', 'siswa', '2004'),
  ('rizky.pratama@siswa.sch.id',    'siswa123', 'siswa', '2005'),
  ('nanda.safira@siswa.sch.id',     'siswa123', 'siswa', '2006'),
  ('andika.pramudya@siswa.sch.id',  'siswa123', 'siswa', '2007'),
  ('fitriani.ramadhani@siswa.sch.id','siswa123', 'siswa', '2008'),
  ('gilang.permana@siswa.sch.id',   'siswa123', 'siswa', '2009'),
  ('intan.permata@siswa.sch.id',    'siswa123', 'siswa', '2010'),
  ('joko.susilo@siswa.sch.id',      'siswa123', 'siswa', '2011'),
  ('kartika.dewi@siswa.sch.id',     'siswa123', 'siswa', '2012'),
  ('lestari.handayani@siswa.sch.id','siswa123', 'siswa', '2013'),
  ('maulana.ibrahim@siswa.sch.id',  'siswa123', 'siswa', '2014'),
  ('nindy.ayu@siswa.sch.id',        'siswa123', 'siswa', '2015'),
  ('oka.saputra@siswa.sch.id',      'siswa123', 'siswa', '2016'),
  ('putu.widiastuti@siswa.sch.id',  'siswa123', 'siswa', '2017'),
  ('raka.prasetya@siswa.sch.id',    'siswa123', 'siswa', '2018'),
  ('ratna.sari@siswa.sch.id',       'siswa123', 'siswa', '2019'),
  ('sandi.maulana@siswa.sch.id',    'siswa123', 'siswa', '2020'),
  ('tari.lestari@siswa.sch.id',     'siswa123', 'siswa', '2021'),
  ('ujang.kosasih@siswa.sch.id',    'siswa123', 'siswa', '2022'),
  ('vina.amalia@siswa.sch.id',      'siswa123', 'siswa', '2023'),
  ('wawan.setiawan@siswa.sch.id',   'siswa123', 'siswa', '2024'),
  ('yuni.rahmawati@siswa.sch.id',   'siswa123', 'siswa', '2025'),
  ('zaki.ahmad@siswa.sch.id',       'siswa123', 'siswa', '2026'),
  ('bella.safitri@siswa.sch.id',    'siswa123', 'siswa', '2027'),
  -- Guru (password: guru123)
  ('siti.rahma@guru.sch.id',       'guru123', 'guru_mapel', 'G001'),
  ('ahmad.hidayat@guru.sch.id',    'guru123', 'wali_kelas', 'G002'),
  ('dwi.susanto@guru.sch.id',      'guru123', 'guru_mapel', 'G003'),
  ('rina.fitriani@guru.sch.id',    'guru123', 'wali_kelas', 'G004'),
  ('bambang.supriyono@guru.sch.id','guru123', 'wali_kelas', 'G005'),
  ('kartika.dewi@guru.sch.id',     'guru123', 'wali_kelas', 'G006'),
  ('yasmin.nuraini@guru.sch.id',   'guru123', 'wali_kelas', 'G007'),
  ('fajar.hidayat@guru.sch.id',    'guru123', 'guru_mapel', 'G008'),
  -- Admin (password: admin123)
  ('dewi.sartika@admin.sch.id',    'admin123','admin',      'A001');

INSERT OR IGNORE INTO jadwal_pelajaran (id_jadwal, id_kelas, id_guru, hari, jam_mulai, jam_selesai, mata_pelajaran, semester) VALUES
  -- KLS01 (VII A)
  ('JDP101', 'KLS01', 'G001', 'Senin', '07:00', '08:30', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP102', 'KLS01', 'G002', 'Senin', '08:30', '10:00', 'Bahasa Indonesia', '2025/2026-Ganjil'),
  ('JDP103', 'KLS01', 'G003', 'Senin', '10:15', '11:45', 'IPA',              '2025/2026-Ganjil'),
  ('JDP104', 'KLS01', 'G003', 'Selasa','07:00', '08:30', 'IPA',              '2025/2026-Ganjil'),
  ('JDP105', 'KLS01', 'G001', 'Selasa','08:30', '10:00', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP112', 'KLS01', 'G003', 'Rabu',  '07:00', '08:30', 'IPA',              '2025/2026-Ganjil'),
  ('JDP128', 'KLS01', 'G001', 'Kamis', '07:00', '08:30', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP203', 'KLS01', 'G005', 'Rabu',  '10:15', '11:45', 'IPS',              '2025/2026-Ganjil'),
  ('JDP210', 'KLS01', 'G007', 'Kamis', '08:30', '10:00', 'Seni Budaya',      '2025/2026-Ganjil'),
  -- KLS02 (VII B)
  ('JDP106', 'KLS02', 'G001', 'Senin', '07:00', '08:30', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP107', 'KLS02', 'G003', 'Senin', '08:30', '10:00', 'IPA',              '2025/2026-Ganjil'),
  ('JDP108', 'KLS02', 'G002', 'Selasa','07:00', '08:30', 'Bahasa Indonesia', '2025/2026-Ganjil'),
  ('JDP113', 'KLS02', 'G001', 'Rabu',  '08:30', '10:00', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP129', 'KLS02', 'G003', 'Kamis', '08:30', '10:00', 'IPA',              '2025/2026-Ganjil'),
  ('JDP201', 'KLS02', 'G005', 'Senin', '10:15', '11:45', 'IPS',              '2025/2026-Ganjil'),
  -- KLS03 (VII C)
  ('JDP109', 'KLS03', 'G002', 'Senin', '07:00', '08:30', 'Bahasa Inggris',   '2025/2026-Ganjil'),
  ('JDP110', 'KLS03', 'G001', 'Senin', '08:30', '10:00', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP111', 'KLS03', 'G003', 'Selasa','07:00', '08:30', 'IPA',              '2025/2026-Ganjil'),
  ('JDP114', 'KLS03', 'G002', 'Rabu',  '10:15', '11:45', 'Bahasa Inggris',   '2025/2026-Ganjil'),
  ('JDP130', 'KLS03', 'G002', 'Kamis', '10:15', '11:45', 'Bahasa Inggris',   '2025/2026-Ganjil'),
  ('JDP209', 'KLS03', 'G007', 'Selasa','08:30', '10:00', 'Seni Budaya',      '2025/2026-Ganjil'),
  -- KLS04 (VIII A)
  ('JDP115', 'KLS04', 'G001', 'Senin', '07:00', '08:30', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP116', 'KLS04', 'G003', 'Senin', '08:30', '10:00', 'IPA',              '2025/2026-Ganjil'),
  ('JDP126', 'KLS04', 'G002', 'Kamis', '07:00', '08:30', 'Bahasa Indonesia', '2025/2026-Ganjil'),
  ('JDP202', 'KLS04', 'G005', 'Selasa','08:30', '10:00', 'IPS',              '2025/2026-Ganjil'),
  ('JDP206', 'KLS04', 'G006', 'Selasa','07:00', '08:30', 'Bahasa Inggris',   '2025/2026-Ganjil'),
  ('JDP213', 'KLS04', 'G008', 'Senin', '10:15', '11:45', 'Informatika',      '2025/2026-Ganjil'),
  -- KLS05 (VIII B)
  ('JDP117', 'KLS05', 'G001', 'Senin', '07:00', '08:30', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP118', 'KLS05', 'G004', 'Senin', '08:30', '10:00', 'PKN',              '2025/2026-Ganjil'),
  ('JDP119', 'KLS05', 'G003', 'Selasa','07:00', '08:30', 'IPA',              '2025/2026-Ganjil'),
  ('JDP127', 'KLS05', 'G001', 'Kamis', '07:00', '08:30', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP207', 'KLS05', 'G006', 'Rabu',  '07:00', '08:30', 'Bahasa Inggris',   '2025/2026-Ganjil'),
  ('JDP214', 'KLS05', 'G008', 'Selasa','10:15', '11:45', 'Informatika',      '2025/2026-Ganjil'),
  -- KLS06 (VIII C)
  ('JDP120', 'KLS06', 'G002', 'Senin', '07:00', '08:30', 'Bahasa Indonesia', '2025/2026-Ganjil'),
  ('JDP121', 'KLS06', 'G001', 'Senin', '08:30', '10:00', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP211', 'KLS06', 'G007', 'Jumat', '07:00', '08:30', 'Seni Budaya',      '2025/2026-Ganjil'),
  ('JDP215', 'KLS06', 'G008', 'Rabu',  '08:30', '10:00', 'Informatika',      '2025/2026-Ganjil'),
  -- KLS07 (IX A)
  ('JDP122', 'KLS07', 'G003', 'Senin', '07:00', '08:30', 'IPA',              '2025/2026-Ganjil'),
  ('JDP123', 'KLS07', 'G001', 'Rabu',  '07:00', '08:30', 'Matematika',       '2025/2026-Ganjil'),
  ('JDP204', 'KLS07', 'G005', 'Kamis', '07:00', '08:30', 'IPS',              '2025/2026-Ganjil'),
  ('JDP205', 'KLS07', 'G006', 'Senin', '08:30', '10:00', 'Bahasa Inggris',   '2025/2026-Ganjil'),
  -- KLS08 (IX B)
  ('JDP124', 'KLS08', 'G002', 'Selasa','07:00', '08:30', 'Bahasa Inggris',   '2025/2026-Ganjil'),
  ('JDP212', 'KLS08', 'G007', 'Rabu',  '07:00', '08:30', 'Seni Budaya',      '2025/2026-Ganjil'),
  ('JDP216', 'KLS08', 'G008', 'Kamis', '10:15', '11:45', 'Informatika',      '2025/2026-Ganjil'),
  -- KLS09 (IX C)
  ('JDP125', 'KLS09', 'G003', 'Rabu',  '08:30', '10:00', 'IPA',              '2025/2026-Ganjil'),
  ('JDP208', 'KLS09', 'G006', 'Kamis', '08:30', '10:00', 'Bahasa Inggris',   '2025/2026-Ganjil'),
  ('JDP217', 'KLS09', 'G008', 'Jumat', '07:00', '08:30', 'Informatika',      '2025/2026-Ganjil');
