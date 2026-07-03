import type {
  Siswa, Guru, Admin, Kelas, JadwalPelajaran, Presensi, Izin,
  User, StatusIzin, StatusManual,
} from './types';

// ---- localStorage Persistence ----
const STORAGE_KEY = 'sipadu_data';

interface SipaduStorage {
  siswaList: Siswa[];
  guruList: Guru[];
  adminList: Admin[];
  kelasList: Kelas[];
  jadwalList: JadwalPelajaran[];
  presensiList: Presensi[];
  izinList: Izin[];
  registeredAccounts: RegisteredAccount[];
  counters: Record<string, number>;
}

function saveToStorage() {
  try {
    const data: SipaduStorage = {
      siswaList, guruList, adminList, kelasList, jadwalList,
      presensiList, izinList, registeredAccounts, counters: _counters,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Gagal menyimpan data ke localStorage', e);
  }
}

function loadFromStorage(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data: SipaduStorage = JSON.parse(raw);
    siswaList = data.siswaList ?? siswaList;
    guruList = data.guruList ?? guruList;
    adminList = data.adminList ?? adminList;
    kelasList = data.kelasList ?? kelasList;
    jadwalList = data.jadwalList ?? jadwalList;
    presensiList = data.presensiList ?? presensiList;
    izinList = data.izinList ?? izinList;
    registeredAccounts = data.registeredAccounts ?? registeredAccounts;
    _counters = data.counters ?? {};
    return true;
  } catch (e) {
    console.error('Gagal memuat data dari localStorage', e);
    return false;
  }
}

// ---- ID Generator ----
let _counters: Record<string, number> = {};
function nextId(prefix: string): string {
  _counters[prefix] = (_counters[prefix] || 100) + 1;
  return `${prefix}${_counters[prefix]}`;
}
export function resetCounters() { _counters = {}; }

// ---- Initial Data ----
export let siswaList: Siswa[] = [
  { nis: '1001', namaLengkap: 'Budi Santoso', jenisKelamin: 'L', idKelas: 'KLS01', email: 'budi@siswa.sch.id' },
  { nis: '1002', namaLengkap: 'Siti Aisyah', jenisKelamin: 'P', idKelas: 'KLS01', email: 'siti@siswa.sch.id' },
  { nis: '1003', namaLengkap: 'Adi Pratama', jenisKelamin: 'L', idKelas: 'KLS01', email: 'adi@siswa.sch.id' },
  { nis: '1004', namaLengkap: 'Dewi Lestari', jenisKelamin: 'P', idKelas: 'KLS02', email: 'dewi@siswa.sch.id' },
  { nis: '1005', namaLengkap: 'Rudi Hermawan', jenisKelamin: 'L', idKelas: 'KLS02', email: 'rudi@siswa.sch.id' },
  { nis: '1006', namaLengkap: 'Ani Rahmawati', jenisKelamin: 'P', idKelas: 'KLS02', email: 'ani@siswa.sch.id' },
  { nis: '1007', namaLengkap: 'Fajar Nugroho', jenisKelamin: 'L', idKelas: 'KLS03', email: 'fajar@siswa.sch.id' },
  { nis: '1008', namaLengkap: 'Rina Marlina', jenisKelamin: 'P', idKelas: 'KLS03', email: 'rina@siswa.sch.id' },
  { nis: '1009', namaLengkap: 'Dodi Saputra', jenisKelamin: 'L', idKelas: 'KLS03', email: 'dodi@siswa.sch.id' },
  { nis: '1010', namaLengkap: 'Maya Sari', jenisKelamin: 'P', idKelas: 'KLS01', email: 'maya@siswa.sch.id' },
];

export let guruList: Guru[] = [
  { idGuru: 'G001', namaGuru: 'Siti Rahma, S.Pd.', email: 'siti.rahma@guru.sch.id', role: 'guru_mapel', idKelas: null },
  { idGuru: 'G002', namaGuru: 'Ahmad Hidayat, S.Pd.', email: 'ahmad.hidayat@guru.sch.id', role: 'keduanya', idKelas: 'KLS01' },
  { idGuru: 'G003', namaGuru: 'Dwi Susanto, S.Pd.', email: 'dwi.susanto@guru.sch.id', role: 'guru_mapel', idKelas: null },
  { idGuru: 'G004', namaGuru: 'Rina Fitriani, S.Pd.', email: 'rina.fitriani@guru.sch.id', role: 'wali_kelas', idKelas: 'KLS02' },
];

export let adminList: Admin[] = [
  { idAdmin: 'A001', namaAdmin: 'Dewi Sartika, S.Pd.', email: 'dewi.sartika@admin.sch.id', username: 'admin_bk' },
];

export let kelasList: Kelas[] = [
  { idKelas: 'KLS01', namaKelas: 'VII A', idGuru: 'G002' },
  { idKelas: 'KLS02', namaKelas: 'VIII B', idGuru: 'G004' },
  { idKelas: 'KLS03', namaKelas: 'IX C', idGuru: null },
];

export let jadwalList: JadwalPelajaran[] = [
  { idJadwal: 'JDP101', idKelas: 'KLS01', idGuru: 'G001', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP102', idKelas: 'KLS01', idGuru: 'G002', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Bahasa Indonesia', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP103', idKelas: 'KLS01', idGuru: 'G003', hari: 'Senin', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP104', idKelas: 'KLS01', idGuru: 'G003', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP105', idKelas: 'KLS01', idGuru: 'G001', hari: 'Selasa', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP106', idKelas: 'KLS02', idGuru: 'G001', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP107', idKelas: 'KLS02', idGuru: 'G003', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP108', idKelas: 'KLS02', idGuru: 'G002', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Indonesia', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP109', idKelas: 'KLS03', idGuru: 'G002', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP110', idKelas: 'KLS03', idGuru: 'G001', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP111', idKelas: 'KLS03', idGuru: 'G003', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP112', idKelas: 'KLS01', idGuru: 'G003', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP113', idKelas: 'KLS02', idGuru: 'G001', hari: 'Rabu', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP114', idKelas: 'KLS03', idGuru: 'G002', hari: 'Rabu', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
];

export let presensiList: Presensi[] = [];
export let izinList: Izin[] = [];

// ---- Initialize sample data ----
export function initMockData() {
  if (loadFromStorage()) return;
  resetCounters();
  initRegisteredAccounts();

  const today = new Date();
  const tgl = today.toISOString().split('T')[0];
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const yTgl = yesterday.toISOString().split('T')[0];

  const seninLalu = new Date(today);
  seninLalu.setDate(seninLalu.getDate() - seninLalu.getDay() - 7 + 1);
  const tgl1 = seninLalu.toISOString().split('T')[0];
  const selasaLalu = new Date(seninLalu); selasaLalu.setDate(selasaLalu.getDate() + 1);
  const tgl2 = selasaLalu.toISOString().split('T')[0];

  // VII A - Senin (Matematika - G001)
  getSiswaByKelas('KLS01').forEach((s, i) => {
    presensiList.push({
      idPresensi: nextId('PRS'), nis: s.nis, idJadwal: 'JDP101', idGuru: 'G001',
      tanggal: tgl1, statusHadir: i !== 2, statusManual: i === 2 ? 'tidak_hadir' : 'hadir',
    });
  });
  // VII A - Senin (Bahasa Indonesia - G002)
  getSiswaByKelas('KLS01').forEach((s, i) => {
    presensiList.push({
      idPresensi: nextId('PRS'), nis: s.nis, idJadwal: 'JDP102', idGuru: 'G002',
      tanggal: tgl1, statusHadir: i !== 1 && i !== 3, statusManual: i === 1 || i === 3 ? 'tidak_hadir' : 'hadir',
    });
  });
  // VII A - Selasa (IPA - G003)
  getSiswaByKelas('KLS01').forEach((s, i) => {
    presensiList.push({
      idPresensi: nextId('PRS'), nis: s.nis, idJadwal: 'JDP104', idGuru: 'G003',
      tanggal: tgl2, statusHadir: i !== 4, statusManual: i === 4 ? 'tidak_hadir' : 'hadir',
    });
  });
  // VIII B - Senin (Matematika - G001)
  getSiswaByKelas('KLS02').forEach((s, i) => {
    presensiList.push({
      idPresensi: nextId('PRS'), nis: s.nis, idJadwal: 'JDP106', idGuru: 'G001',
      tanggal: tgl1, statusHadir: i !== 0, statusManual: i === 0 ? 'tidak_hadir' : 'hadir',
    });
  });

  // Sample izin
  izinList.push({
    idIzin: nextId('IZN'), nis: '1003', tanggalIzin: yTgl, jenisIzin: 'sakit',
    keterangan: 'Demam tinggi', buktiPendukung: 'surat_dokter_1003.pdf', statusIzin: 'menunggu',
  });
  izinList.push({
    idIzin: nextId('IZN'), nis: '1005', tanggalIzin: tgl1, jenisIzin: 'izin',
    keterangan: 'Ada acara keluarga', buktiPendukung: 'surat_izin_1005.pdf', statusIzin: 'disetujui',
  });
  izinList.push({
    idIzin: nextId('IZN'), nis: '1007', tanggalIzin: tgl2, jenisIzin: 'lainnya',
    keterangan: 'Keperluan pribadi', buktiPendukung: 'surat_1007.pdf', statusIzin: 'ditolak',
  });
  izinList.push({
    idIzin: nextId('IZN'), nis: '1004', tanggalIzin: yTgl, jenisIzin: 'sakit',
    keterangan: 'Flu', buktiPendukung: 'surat_dokter_1004.pdf', statusIzin: 'menunggu',
  });
  saveToStorage();
}

// ---- Helper functions ----
export function getSiswaByKelas(idKelas: string): Siswa[] {
  return siswaList.filter(s => s.idKelas === idKelas);
}

export function getSiswa(nis: string): Siswa | undefined {
  return siswaList.find(s => s.nis === nis);
}

export function getKelas(idKelas: string): Kelas | undefined {
  return kelasList.find(k => k.idKelas === idKelas);
}

export function getGuru(idGuru: string): Guru | undefined {
  return guruList.find(g => g.idGuru === idGuru);
}

export function getJadwalByGuru(idGuru: string): JadwalPelajaran[] {
  return jadwalList.filter(j => j.idGuru === idGuru);
}

export function getJadwalByKelas(idKelas: string): JadwalPelajaran[] {
  return jadwalList.filter(j => j.idKelas === idKelas);
}

export function getIzinSiswa(nis: string): Izin[] {
  return izinList.filter(i => i.nis === nis);
}

// ---- CRUD operations ----
export function addPresensi(jadwalId: string, guruId: string, tanggal: string, data: Record<string, boolean>) {
  presensiList = presensiList.filter(p => !(p.idJadwal === jadwalId && p.tanggal === tanggal));
  Object.entries(data).forEach(([nis, hadir]) => {
    const punyaIzin = izinList.some(i => i.nis === nis && i.tanggalIzin === tanggal && i.statusIzin === 'disetujui');
    presensiList.push({
      idPresensi: nextId('PRS'), nis, idJadwal: jadwalId, idGuru: guruId,
      tanggal, statusHadir: hadir,
      statusManual: !hadir ? 'tidak_hadir' : (punyaIzin ? 'izin' : 'hadir') as StatusManual,
    });
  });
  saveToStorage();
}

export function addIzin(nis: string, tanggal: string, jenis: 'sakit' | 'izin' | 'lainnya', keterangan: string, bukti: string) {
  izinList.push({
    idIzin: nextId('IZN'), nis, tanggalIzin: tanggal, jenisIzin: jenis,
    keterangan, buktiPendukung: bukti, statusIzin: 'menunggu',
  });
  saveToStorage();
}

export function updateStatusIzin(idIzin: string, status: StatusIzin) {
  const izin = izinList.find(i => i.idIzin === idIzin);
  if (izin) { izin.statusIzin = status; saveToStorage(); }
}

export function togglePresensiStatus(idPresensi: string) {
  const p = presensiList.find(pr => pr.idPresensi === idPresensi);
  if (p) {
    p.statusHadir = !p.statusHadir;
    p.statusManual = p.statusHadir ? 'hadir' : 'tidak_hadir';
    saveToStorage();
  }
}

export function addJadwal(data: Omit<JadwalPelajaran, 'idJadwal'>) {
  jadwalList.push({ ...data, idJadwal: nextId('JDP') });
  saveToStorage();
}

export function updateJadwal(id: string, data: Partial<JadwalPelajaran>) {
  const j = jadwalList.find(x => x.idJadwal === id);
  if (j) { Object.assign(j, data); saveToStorage(); }
}

export function deleteJadwal(id: string) {
  jadwalList = jadwalList.filter(j => j.idJadwal !== id);
  saveToStorage();
}

// ---- Registration & Authentication ----
export interface RegisteredAccount {
  email: string;
  password: string;
  role: User['role'];
  refId: string;
}

export let registeredAccounts: RegisteredAccount[] = [];

export function initRegisteredAccounts() {
  registeredAccounts = [
    { email: 'budi@siswa.sch.id', password: 'siswa123', role: 'siswa', refId: '1001' },
    { email: 'siti.rahma@guru.sch.id', password: 'guru123', role: 'guru_mapel', refId: 'G001' },
    { email: 'ahmad.hidayat@guru.sch.id', password: 'guru123', role: 'wali_kelas', refId: 'G002' },
    { email: 'dewi.sartika@admin.sch.id', password: 'admin123', role: 'admin', refId: 'A001' },
  ];
}

export function findAccountByEmail(email: string): RegisteredAccount | undefined {
  return registeredAccounts.find(a => a.email === email);
}

export function authenticate(email: string, password: string): User | null {
  const acc = registeredAccounts.find(a => a.email === email && a.password === password);
  if (!acc) return null;
  return resolveUser(acc.role, acc.refId);
}

export function registerAccount(data: {
  role: User['role'];
  email: string;
  password: string;
  namaLengkap?: string;
  nis?: string;
  jenisKelamin?: string;
  idKelas?: string;
  namaGuru?: string;
  mataPelajaran?: string;
  namaAdmin?: string;
  username?: string;
}): User | null {
  const existing = findAccountByEmail(data.email);
  if (existing) return null;

  let refId = '';
  if (data.role === 'siswa') {
    refId = data.nis || nextId('REG');
    siswaList.push({
      nis: refId,
      namaLengkap: data.namaLengkap || '',
      jenisKelamin: (data.jenisKelamin as 'L' | 'P') || 'L',
      idKelas: data.idKelas || 'KLS01',
      email: data.email,
    });
  } else if (data.role === 'guru_mapel' || data.role === 'wali_kelas') {
    refId = nextId('GRU');
    const guruRole = data.role === 'guru_mapel' ? 'guru_mapel' as const : data.role === 'wali_kelas' ? 'wali_kelas' as const : 'keduanya' as const;
    guruList.push({
      idGuru: refId,
      namaGuru: data.namaGuru || '',
      email: data.email,
      role: guruRole,
      idKelas: data.idKelas || null,
    });
  } else if (data.role === 'admin') {
    refId = nextId('ADM');
    adminList.push({
      idAdmin: refId,
      namaAdmin: data.namaAdmin || '',
      email: data.email,
      username: data.username || '',
    });
  }

  registeredAccounts.push({ email: data.email, password: data.password, role: data.role, refId });
  saveToStorage();
  return resolveUser(data.role, refId);
}

export function resolveUser(role: User['role'], id: string): User | null {
  if (role === 'siswa') {
    const s = getSiswa(id);
    return s ? { role: 'siswa' as const, namaLengkap: s.namaLengkap, jenisKelamin: s.jenisKelamin, idKelas: s.idKelas, email: s.email, nis: s.nis } : null;
  }
  if (role === 'guru_mapel') {
    const g = getGuru(id);
    if (!g || (g.role !== 'guru_mapel' && g.role !== 'keduanya')) return null;
    return { role: 'guru_mapel', idGuru: g.idGuru, namaGuru: g.namaGuru, email: g.email, idKelas: g.idKelas };
  }
  if (role === 'wali_kelas') {
    const g = getGuru(id);
    if (!g || (g.role !== 'wali_kelas' && g.role !== 'keduanya')) return null;
    return { role: 'wali_kelas', idGuru: g.idGuru, namaGuru: g.namaGuru, email: g.email, idKelas: g.idKelas };
  }
  if (role === 'admin') {
    const a = adminList.find(x => x.idAdmin === id);
    return a ? { role: 'admin', idAdmin: a.idAdmin, namaAdmin: a.namaAdmin, email: a.email, username: a.username } : null;
  }
  return null;
}

export function getGuruByEmail(email: string): Guru | undefined {
  return guruList.find(g => g.email === email);
}

// ---- Reset ----
export function resetAllData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Gagal mereset localStorage', e);
  }
  _counters = {};
  // Re-initialize all arrays
  const s: Siswa[] = [
    { nis: '1001', namaLengkap: 'Budi Santoso', jenisKelamin: 'L', idKelas: 'KLS01', email: 'budi@siswa.sch.id' },
    { nis: '1002', namaLengkap: 'Siti Aisyah', jenisKelamin: 'P', idKelas: 'KLS01', email: 'siti@siswa.sch.id' },
    { nis: '1003', namaLengkap: 'Adi Pratama', jenisKelamin: 'L', idKelas: 'KLS01', email: 'adi@siswa.sch.id' },
    { nis: '1004', namaLengkap: 'Dewi Lestari', jenisKelamin: 'P', idKelas: 'KLS02', email: 'dewi@siswa.sch.id' },
    { nis: '1005', namaLengkap: 'Rudi Hermawan', jenisKelamin: 'L', idKelas: 'KLS02', email: 'rudi@siswa.sch.id' },
    { nis: '1006', namaLengkap: 'Ani Rahmawati', jenisKelamin: 'P', idKelas: 'KLS02', email: 'ani@siswa.sch.id' },
    { nis: '1007', namaLengkap: 'Fajar Nugroho', jenisKelamin: 'L', idKelas: 'KLS03', email: 'fajar@siswa.sch.id' },
    { nis: '1008', namaLengkap: 'Rina Marlina', jenisKelamin: 'P', idKelas: 'KLS03', email: 'rina@siswa.sch.id' },
    { nis: '1009', namaLengkap: 'Dodi Saputra', jenisKelamin: 'L', idKelas: 'KLS03', email: 'dodi@siswa.sch.id' },
    { nis: '1010', namaLengkap: 'Maya Sari', jenisKelamin: 'P', idKelas: 'KLS01', email: 'maya@siswa.sch.id' },
  ];
  const g: Guru[] = [
    { idGuru: 'G001', namaGuru: 'Siti Rahma, S.Pd.', email: 'siti.rahma@guru.sch.id', role: 'guru_mapel', idKelas: null },
    { idGuru: 'G002', namaGuru: 'Ahmad Hidayat, S.Pd.', email: 'ahmad.hidayat@guru.sch.id', role: 'keduanya', idKelas: 'KLS01' },
    { idGuru: 'G003', namaGuru: 'Dwi Susanto, S.Pd.', email: 'dwi.susanto@guru.sch.id', role: 'guru_mapel', idKelas: null },
    { idGuru: 'G004', namaGuru: 'Rina Fitriani, S.Pd.', email: 'rina.fitriani@guru.sch.id', role: 'wali_kelas', idKelas: 'KLS02' },
  ];
  const a: Admin[] = [
    { idAdmin: 'A001', namaAdmin: 'Dewi Sartika, S.Pd.', email: 'dewi.sartika@admin.sch.id', username: 'admin_bk' },
  ];
  const k: Kelas[] = [
    { idKelas: 'KLS01', namaKelas: 'VII A', idGuru: 'G002' },
    { idKelas: 'KLS02', namaKelas: 'VIII B', idGuru: 'G004' },
    { idKelas: 'KLS03', namaKelas: 'IX C', idGuru: null },
  ];
  const j: JadwalPelajaran[] = [
    { idJadwal: 'JDP101', idKelas: 'KLS01', idGuru: 'G001', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP102', idKelas: 'KLS01', idGuru: 'G002', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Bahasa Indonesia', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP103', idKelas: 'KLS01', idGuru: 'G003', hari: 'Senin', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP104', idKelas: 'KLS01', idGuru: 'G003', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP105', idKelas: 'KLS01', idGuru: 'G001', hari: 'Selasa', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP106', idKelas: 'KLS02', idGuru: 'G001', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP107', idKelas: 'KLS02', idGuru: 'G003', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP108', idKelas: 'KLS02', idGuru: 'G002', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Indonesia', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP109', idKelas: 'KLS03', idGuru: 'G002', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP110', idKelas: 'KLS03', idGuru: 'G001', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP111', idKelas: 'KLS03', idGuru: 'G003', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP112', idKelas: 'KLS01', idGuru: 'G003', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP113', idKelas: 'KLS02', idGuru: 'G001', hari: 'Rabu', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
    { idJadwal: 'JDP114', idKelas: 'KLS03', idGuru: 'G002', hari: 'Rabu', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  ];
  siswaList.length = 0; siswaList.push(...s);
  guruList.length = 0; guruList.push(...g);
  adminList.length = 0; adminList.push(...a);
  kelasList.length = 0; kelasList.push(...k);
  jadwalList.length = 0; jadwalList.push(...j);
  presensiList.length = 0;
  izinList.length = 0;
  registeredAccounts.length = 0;
  // Re-init registered accounts + sample data
  initRegisteredAccounts();
  // Re-generate sample data (same as initMockData but without localStorage check)
  const today = new Date();
  const tgl = today.toISOString().split('T')[0];
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const yTgl = yesterday.toISOString().split('T')[0];
  const seninLalu = new Date(today);
  seninLalu.setDate(seninLalu.getDate() - seninLalu.getDay() - 7 + 1);
  const tgl1 = seninLalu.toISOString().split('T')[0];
  const selasaLalu = new Date(seninLalu); selasaLalu.setDate(selasaLalu.getDate() + 1);
  const tgl2 = selasaLalu.toISOString().split('T')[0];
  getSiswaByKelas('KLS01').forEach((s, i) => {
    presensiList.push({ idPresensi: nextId('PRS'), nis: s.nis, idJadwal: 'JDP101', idGuru: 'G001', tanggal: tgl1, statusHadir: i !== 2, statusManual: i === 2 ? 'tidak_hadir' : 'hadir' });
  });
  getSiswaByKelas('KLS01').forEach((s, i) => {
    presensiList.push({ idPresensi: nextId('PRS'), nis: s.nis, idJadwal: 'JDP102', idGuru: 'G002', tanggal: tgl1, statusHadir: i !== 1 && i !== 3, statusManual: i === 1 || i === 3 ? 'tidak_hadir' : 'hadir' });
  });
  getSiswaByKelas('KLS01').forEach((s, i) => {
    presensiList.push({ idPresensi: nextId('PRS'), nis: s.nis, idJadwal: 'JDP104', idGuru: 'G003', tanggal: tgl2, statusHadir: i !== 4, statusManual: i === 4 ? 'tidak_hadir' : 'hadir' });
  });
  getSiswaByKelas('KLS02').forEach((s, i) => {
    presensiList.push({ idPresensi: nextId('PRS'), nis: s.nis, idJadwal: 'JDP106', idGuru: 'G001', tanggal: tgl1, statusHadir: i !== 0, statusManual: i === 0 ? 'tidak_hadir' : 'hadir' });
  });
  izinList.push({ idIzin: nextId('IZN'), nis: '1003', tanggalIzin: yTgl, jenisIzin: 'sakit', keterangan: 'Demam tinggi', buktiPendukung: 'surat_dokter_1003.pdf', statusIzin: 'menunggu' });
  izinList.push({ idIzin: nextId('IZN'), nis: '1005', tanggalIzin: tgl1, jenisIzin: 'izin', keterangan: 'Ada acara keluarga', buktiPendukung: 'surat_izin_1005.pdf', statusIzin: 'disetujui' });
  izinList.push({ idIzin: nextId('IZN'), nis: '1007', tanggalIzin: tgl2, jenisIzin: 'lainnya', keterangan: 'Keperluan pribadi', buktiPendukung: 'surat_1007.pdf', statusIzin: 'ditolak' });
  izinList.push({ idIzin: nextId('IZN'), nis: '1004', tanggalIzin: yTgl, jenisIzin: 'sakit', keterangan: 'Flu', buktiPendukung: 'surat_dokter_1004.pdf', statusIzin: 'menunggu' });
  saveToStorage();
}
