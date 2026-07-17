import { getDb } from './database';

function runPresensiForKelas(db: any, kelasId: string, jadwalId: string, guruId: string, tgl: string, skipIndices: number[] = []) {
  const siswa = (db.prepare("SELECT nis FROM siswa WHERE id_kelas = ?").all(kelasId) as any[]);
  const insert = db.prepare(`INSERT OR IGNORE INTO presensi (id_presensi, nis, id_jadwal, id_guru, tanggal, status_hadir, status_manual) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const nextId = (prefix: string) => `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 6)}`;

  siswa.forEach((s: any, i: number) => {
    const absent = skipIndices.includes(i);
    insert.run(nextId('PRS'), s.nis, jadwalId, guruId, tgl, absent ? 0 : 1, absent ? 'tidak_hadir' : 'hadir');
  });
}

export function seedSampleData() {
  const db = getDb();

  const presensiCount = (db.prepare('SELECT COUNT(*) as c FROM presensi').get() as any).c;
  if (presensiCount > 0) return;

  const today = new Date();
  const day = today.getDay();

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - ((day + 6) % 7) - 7);

  const lastTuesday = new Date(lastMonday);
  lastTuesday.setDate(lastMonday.getDate() + 1);

  const lastThursday = new Date(lastMonday);
  lastThursday.setDate(lastMonday.getDate() + 3);

  const fmt = (d: Date) => d.toISOString().split('T')[0];

  // ── Presensi ──────────────────────────────────────────────
  // KLS01 (VII A) - Monday
  runPresensiForKelas(db, 'KLS01', 'JDP101', 'G001', fmt(lastMonday), [1]);  // Matematika
  runPresensiForKelas(db, 'KLS01', 'JDP102', 'G002', fmt(lastMonday), [2]);  // Bhs Indonesia
  runPresensiForKelas(db, 'KLS01', 'JDP103', 'G003', fmt(lastMonday), [0]);  // IPA

  // KLS02 (VII B) - Monday
  runPresensiForKelas(db, 'KLS02', 'JDP106', 'G001', fmt(lastMonday), [0]);  // Matematika
  runPresensiForKelas(db, 'KLS02', 'JDP107', 'G003', fmt(lastMonday), [2]);  // IPA
  runPresensiForKelas(db, 'KLS02', 'JDP201', 'G005', fmt(lastMonday), []);   // IPS (G005)

  // KLS03 (VII C) - Monday
  runPresensiForKelas(db, 'KLS03', 'JDP109', 'G002', fmt(lastMonday), [1]);  // Bhs Inggris
  runPresensiForKelas(db, 'KLS03', 'JDP110', 'G001', fmt(lastMonday), []);   // Matematika

  // KLS04 (VIII A) - Monday
  runPresensiForKelas(db, 'KLS04', 'JDP115', 'G001', fmt(lastMonday), []);   // Matematika
  runPresensiForKelas(db, 'KLS04', 'JDP213', 'G008', fmt(lastMonday), [2]);  // Informatika (G008)
  runPresensiForKelas(db, 'KLS04', 'JDP116', 'G003', fmt(lastMonday), [1]);  // IPA

  // KLS05 (VIII B) - Monday
  runPresensiForKelas(db, 'KLS05', 'JDP117', 'G001', fmt(lastMonday), [0]);  // Matematika
  runPresensiForKelas(db, 'KLS05', 'JDP118', 'G004', fmt(lastMonday), []);   // PKN (G004)

  // KLS06 (VIII C) - Monday
  runPresensiForKelas(db, 'KLS06', 'JDP120', 'G002', fmt(lastMonday), []);   // Bhs Indonesia

  // KLS07 (IX A) - Monday
  runPresensiForKelas(db, 'KLS07', 'JDP122', 'G003', fmt(lastMonday), [1]);  // IPA
  runPresensiForKelas(db, 'KLS07', 'JDP205', 'G006', fmt(lastMonday), []);   // Bhs Inggris (G006)

  // KLS03 (VII C) - Tuesday (Seni Budaya G007)
  runPresensiForKelas(db, 'KLS03', 'JDP209', 'G007', fmt(lastTuesday), [0]); // Seni Budaya

  // KLS04 (VIII A) - Tuesday (IPS G005)
  runPresensiForKelas(db, 'KLS04', 'JDP202', 'G005', fmt(lastTuesday), []);  // IPS

  // ── Izin ──────────────────────────────────────────────────
  const insertIzin = db.prepare(`INSERT OR IGNORE INTO izin (id_izin, nis, tanggal_izin, jenis_izin, keterangan, bukti_pendukung, status_izin) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const nextId = (prefix: string) => `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 6)}`;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  insertIzin.run(nextId('IZN'), '2003', fmt(yesterday), 'sakit',   'Demam tinggi',           'surat_dokter_2003.pdf', 'menunggu');
  insertIzin.run(nextId('IZN'), '2005', fmt(lastMonday), 'izin',   'Ada acara keluarga',     'surat_izin_2005.pdf',  'disetujui');
  insertIzin.run(nextId('IZN'), '2011', fmt(lastTuesday), 'lainnya','Keperluan pribadi',      'surat_2011.pdf',       'ditolak');
  insertIzin.run(nextId('IZN'), '2004', fmt(yesterday), 'sakit',   'Flu',                    'surat_dokter_2004.pdf','menunggu');
  insertIzin.run(nextId('IZN'), '2016', fmt(lastMonday), 'izin',   'Ikut lomba Pramuka',     'surat_2016.pdf',       'disetujui');
}
