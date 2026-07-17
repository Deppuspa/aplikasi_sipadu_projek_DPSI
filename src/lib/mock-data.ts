'use client';

import type {
  Siswa, Guru, Admin, Kelas, JadwalPelajaran, Presensi, Izin,
  User, StatusIzin, StatusManual,
} from './types';

// ---- Seed Data ----
export let siswaList: Siswa[] = [
  { nis: '2001', namaLengkap: 'Ahmad Fauzi',         jenisKelamin: 'L', idKelas: 'KLS01', email: 'ahmad.fauzi@siswa.sch.id' },
  { nis: '2002', namaLengkap: 'Siti Nurhaliza',      jenisKelamin: 'P', idKelas: 'KLS01', email: 'siti.nurhaliza@siswa.sch.id' },
  { nis: '2003', namaLengkap: 'Dimas Ardiansyah',    jenisKelamin: 'L', idKelas: 'KLS01', email: 'dimas.ardiansyah@siswa.sch.id' },
  { nis: '2004', namaLengkap: 'Putri Wulandari',     jenisKelamin: 'P', idKelas: 'KLS02', email: 'putri.wulandari@siswa.sch.id' },
  { nis: '2005', namaLengkap: 'Rizky Pratama',       jenisKelamin: 'L', idKelas: 'KLS02', email: 'rizky.pratama@siswa.sch.id' },
  { nis: '2006', namaLengkap: 'Nanda Safira',        jenisKelamin: 'P', idKelas: 'KLS02', email: 'nanda.safira@siswa.sch.id' },
  { nis: '2007', namaLengkap: 'Andika Pramudya',     jenisKelamin: 'L', idKelas: 'KLS03', email: 'andika.pramudya@siswa.sch.id' },
  { nis: '2008', namaLengkap: 'Fitriani Ramadhani',  jenisKelamin: 'P', idKelas: 'KLS03', email: 'fitriani.ramadhani@siswa.sch.id' },
  { nis: '2009', namaLengkap: 'Gilang Permana',      jenisKelamin: 'L', idKelas: 'KLS03', email: 'gilang.permana@siswa.sch.id' },
  { nis: '2010', namaLengkap: 'Intan Permata Sari',  jenisKelamin: 'P', idKelas: 'KLS04', email: 'intan.permata@siswa.sch.id' },
  { nis: '2011', namaLengkap: 'Joko Susilo',         jenisKelamin: 'L', idKelas: 'KLS04', email: 'joko.susilo@siswa.sch.id' },
  { nis: '2012', namaLengkap: 'Kartika Dewi',        jenisKelamin: 'P', idKelas: 'KLS04', email: 'kartika.dewi@siswa.sch.id' },
  { nis: '2013', namaLengkap: 'Lestari Handayani',   jenisKelamin: 'P', idKelas: 'KLS05', email: 'lestari.handayani@siswa.sch.id' },
  { nis: '2014', namaLengkap: 'Maulana Ibrahim',     jenisKelamin: 'L', idKelas: 'KLS05', email: 'maulana.ibrahim@siswa.sch.id' },
  { nis: '2015', namaLengkap: 'Nindy Ayu Safitri',   jenisKelamin: 'P', idKelas: 'KLS05', email: 'nindy.ayu@siswa.sch.id' },
  { nis: '2016', namaLengkap: 'Oka Saputra',         jenisKelamin: 'L', idKelas: 'KLS06', email: 'oka.saputra@siswa.sch.id' },
  { nis: '2017', namaLengkap: 'Putu Widiastuti',     jenisKelamin: 'P', idKelas: 'KLS06', email: 'putu.widiastuti@siswa.sch.id' },
  { nis: '2018', namaLengkap: 'Raka Prasetya',       jenisKelamin: 'L', idKelas: 'KLS06', email: 'raka.prasetya@siswa.sch.id' },
  { nis: '2019', namaLengkap: 'Ratna Sari Dewi',     jenisKelamin: 'P', idKelas: 'KLS07', email: 'ratna.sari@siswa.sch.id' },
  { nis: '2020', namaLengkap: 'Sandi Maulana',       jenisKelamin: 'L', idKelas: 'KLS07', email: 'sandi.maulana@siswa.sch.id' },
  { nis: '2021', namaLengkap: 'Tari Lestari',        jenisKelamin: 'P', idKelas: 'KLS07', email: 'tari.lestari@siswa.sch.id' },
  { nis: '2022', namaLengkap: 'Ujang Kosasih',       jenisKelamin: 'L', idKelas: 'KLS08', email: 'ujang.kosasih@siswa.sch.id' },
  { nis: '2023', namaLengkap: 'Vina Amalia',         jenisKelamin: 'P', idKelas: 'KLS08', email: 'vina.amalia@siswa.sch.id' },
  { nis: '2024', namaLengkap: 'Wawan Setiawan',      jenisKelamin: 'L', idKelas: 'KLS08', email: 'wawan.setiawan@siswa.sch.id' },
  { nis: '2025', namaLengkap: 'Yuni Rahmawati',      jenisKelamin: 'P', idKelas: 'KLS09', email: 'yuni.rahmawati@siswa.sch.id' },
  { nis: '2026', namaLengkap: 'Zaki Ahmad Fauzi',    jenisKelamin: 'L', idKelas: 'KLS09', email: 'zaki.ahmad@siswa.sch.id' },
  { nis: '2027', namaLengkap: 'Bella Safitri',       jenisKelamin: 'P', idKelas: 'KLS09', email: 'bella.safitri@siswa.sch.id' },
];
export let guruList: Guru[] = [
  { idGuru: 'G001', namaGuru: 'Siti Rahma, S.Pd.',       email: 'siti.rahma@guru.sch.id',    role: 'guru_mapel', idKelas: null },
  { idGuru: 'G002', namaGuru: 'Ahmad Hidayat, S.Pd.',    email: 'ahmad.hidayat@guru.sch.id', role: 'keduanya',   idKelas: 'KLS01' },
  { idGuru: 'G003', namaGuru: 'Dwi Susanto, S.Pd.',      email: 'dwi.susanto@guru.sch.id',   role: 'guru_mapel', idKelas: null },
  { idGuru: 'G004', namaGuru: 'Rina Fitriani, S.Pd.',    email: 'rina.fitriani@guru.sch.id', role: 'wali_kelas', idKelas: 'KLS05' },
  { idGuru: 'G005', namaGuru: 'Drs. Bambang Supriyono',  email: 'bambang.supriyono@guru.sch.id', role: 'keduanya',   idKelas: 'KLS02' },
  { idGuru: 'G006', namaGuru: 'Dra. Kartika Dewi, M.Pd.',email: 'kartika.dewi@guru.sch.id',  role: 'wali_kelas', idKelas: 'KLS07' },
  { idGuru: 'G007', namaGuru: 'Yasmin Nuraini, S.Pd.',   email: 'yasmin.nuraini@guru.sch.id',role: 'wali_kelas', idKelas: 'KLS03' },
  { idGuru: 'G008', namaGuru: 'Fajar Hidayat, S.Kom.',   email: 'fajar.hidayat@guru.sch.id', role: 'guru_mapel', idKelas: null },
];
export let adminList: Admin[] = [
  { idAdmin: 'A001', namaAdmin: 'Dewi Sartika, S.Pd.', email: 'dewi.sartika@admin.sch.id', username: 'admin_bk' },
];
export let kelasList: Kelas[] = [
  { idKelas: 'KLS01', namaKelas: 'VII A', idGuru: 'G002' },
  { idKelas: 'KLS02', namaKelas: 'VII B', idGuru: 'G005' },
  { idKelas: 'KLS03', namaKelas: 'VII C', idGuru: 'G007' },
  { idKelas: 'KLS04', namaKelas: 'VIII A', idGuru: null },
  { idKelas: 'KLS05', namaKelas: 'VIII B', idGuru: 'G004' },
  { idKelas: 'KLS06', namaKelas: 'VIII C', idGuru: null },
  { idKelas: 'KLS07', namaKelas: 'IX A', idGuru: 'G006' },
  { idKelas: 'KLS08', namaKelas: 'IX B', idGuru: null },
  { idKelas: 'KLS09', namaKelas: 'IX C', idGuru: null },
];
export let jadwalList: JadwalPelajaran[] = [
  { idJadwal: 'JDP101', idKelas: 'KLS01', idGuru: 'G001', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP102', idKelas: 'KLS01', idGuru: 'G002', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Bahasa Indonesia', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP103', idKelas: 'KLS01', idGuru: 'G003', hari: 'Senin', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP104', idKelas: 'KLS01', idGuru: 'G003', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP105', idKelas: 'KLS01', idGuru: 'G001', hari: 'Selasa', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP112', idKelas: 'KLS01', idGuru: 'G003', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP128', idKelas: 'KLS01', idGuru: 'G001', hari: 'Kamis', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP203', idKelas: 'KLS01', idGuru: 'G005', hari: 'Rabu', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'IPS', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP210', idKelas: 'KLS01', idGuru: 'G007', hari: 'Kamis', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Seni Budaya', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP106', idKelas: 'KLS02', idGuru: 'G001', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP107', idKelas: 'KLS02', idGuru: 'G003', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP108', idKelas: 'KLS02', idGuru: 'G002', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Indonesia', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP113', idKelas: 'KLS02', idGuru: 'G001', hari: 'Rabu', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP129', idKelas: 'KLS02', idGuru: 'G003', hari: 'Kamis', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP201', idKelas: 'KLS02', idGuru: 'G005', hari: 'Senin', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'IPS', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP109', idKelas: 'KLS03', idGuru: 'G002', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP110', idKelas: 'KLS03', idGuru: 'G001', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP111', idKelas: 'KLS03', idGuru: 'G003', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP114', idKelas: 'KLS03', idGuru: 'G002', hari: 'Rabu', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP130', idKelas: 'KLS03', idGuru: 'G002', hari: 'Kamis', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP209', idKelas: 'KLS03', idGuru: 'G007', hari: 'Selasa', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Seni Budaya', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP115', idKelas: 'KLS04', idGuru: 'G001', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP116', idKelas: 'KLS04', idGuru: 'G003', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP126', idKelas: 'KLS04', idGuru: 'G002', hari: 'Kamis', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Indonesia', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP202', idKelas: 'KLS04', idGuru: 'G005', hari: 'Selasa', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'IPS', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP206', idKelas: 'KLS04', idGuru: 'G006', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP213', idKelas: 'KLS04', idGuru: 'G008', hari: 'Senin', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'Informatika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP117', idKelas: 'KLS05', idGuru: 'G001', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP118', idKelas: 'KLS05', idGuru: 'G004', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'PKN', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP119', idKelas: 'KLS05', idGuru: 'G003', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP127', idKelas: 'KLS05', idGuru: 'G001', hari: 'Kamis', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP207', idKelas: 'KLS05', idGuru: 'G006', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP214', idKelas: 'KLS05', idGuru: 'G008', hari: 'Selasa', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'Informatika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP120', idKelas: 'KLS06', idGuru: 'G002', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Indonesia', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP121', idKelas: 'KLS06', idGuru: 'G001', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP211', idKelas: 'KLS06', idGuru: 'G007', hari: 'Jumat', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Seni Budaya', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP215', idKelas: 'KLS06', idGuru: 'G008', hari: 'Rabu', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Informatika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP122', idKelas: 'KLS07', idGuru: 'G003', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP123', idKelas: 'KLS07', idGuru: 'G001', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Matematika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP204', idKelas: 'KLS07', idGuru: 'G005', hari: 'Kamis', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'IPS', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP205', idKelas: 'KLS07', idGuru: 'G006', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP124', idKelas: 'KLS08', idGuru: 'G002', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP212', idKelas: 'KLS08', idGuru: 'G007', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Seni Budaya', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP216', idKelas: 'KLS08', idGuru: 'G008', hari: 'Kamis', jamMulai: '10:15', jamSelesai: '11:45', mataPelajaran: 'Informatika', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP125', idKelas: 'KLS09', idGuru: 'G003', hari: 'Rabu', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'IPA', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP208', idKelas: 'KLS09', idGuru: 'G006', hari: 'Kamis', jamMulai: '08:30', jamSelesai: '10:00', mataPelajaran: 'Bahasa Inggris', semester: '2025/2026-Ganjil' },
  { idJadwal: 'JDP217', idKelas: 'KLS09', idGuru: 'G008', hari: 'Jumat', jamMulai: '07:00', jamSelesai: '08:30', mataPelajaran: 'Informatika', semester: '2025/2026-Ganjil' },
];
export let presensiList: Presensi[] = [];
export let izinList: Izin[] = [];

export interface RegisteredAccount {
  email: string;
  password: string;
  role: User['role'];
  refId: string;
}
export let registeredAccounts: RegisteredAccount[] = [];

// ---- API helpers ----
const API = {
  async post<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
    return res.json();
  },
  async patch<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
    return res.json();
  },
  async delete<T>(url: string): Promise<T> {
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
    return res.json();
  },
};

// ---- Init & Refresh ----
let _loaded = false;

export async function refreshData() {
  try {
    const res = await fetch('/api/data');
    if (res.ok) {
      const data = await res.json();
      if (data.siswaList && data.siswaList.length) siswaList = data.siswaList;
      if (data.guruList && data.guruList.length) guruList = data.guruList;
      if (data.adminList && data.adminList.length) adminList = data.adminList;
      if (data.kelasList && data.kelasList.length) kelasList = data.kelasList;
      if (data.jadwalList && data.jadwalList.length) jadwalList = data.jadwalList;
      if (data.presensiList) presensiList = data.presensiList;
      if (data.izinList) izinList = data.izinList;
      if (data.registeredAccounts) {
        registeredAccounts = data.registeredAccounts.map((a: any) => ({ ...a, password: '' }));
      }
    }
  } catch {
    // API unavailable
  }
}

export async function initMockData() {
  if (_loaded) return;
  await refreshData();
  _loaded = true;
}

// ---- Helpers ----
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
export function getGuruByEmail(email: string): Guru | undefined {
  return guruList.find(g => g.email === email);
}

// ---- Auth ----
export async function authenticate(email: string, password: string): Promise<User | null> {
  try {
    const result = await API.post<{ user: any }>('/api/auth/login', { email, password });
    return result.user as User;
  } catch {
    return null;
  }
}

export async function registerAccount(data: {
  role: User['role']; email: string; password: string;
  namaLengkap?: string; nis?: string; jenisKelamin?: string; idKelas?: string;
  namaGuru?: string; mataPelajaran?: string;
  namaAdmin?: string; username?: string;
}): Promise<{ user: User | null; error?: string }> {
  try {
    await API.post('/api/auth/register', data);
    const user = await authenticate(data.email, data.password);
    if (user) await refreshData();
    return { user };
  } catch (e: any) {
    return { user: null, error: e.message || 'Registrasi gagal.' };
  }
}

export function findAccountByEmail(email: string): RegisteredAccount | undefined {
  return registeredAccounts.find(a => a.email === email);
}

// ---- CRUD: Presensi ----
export async function addPresensi(jadwalId: string, guruId: string, tanggal: string, data: Record<string, boolean>) {
  try {
    await API.post('/api/presensi', { jadwalId, guruId, tanggal, data });
    await refreshData();
  } catch (e) {
    console.error('Gagal menyimpan presensi', e);
  }
}

export async function togglePresensiStatus(idPresensi: string) {
  try {
    await API.patch(`/api/presensi/${idPresensi}`, {});
    const p = presensiList.find(pr => pr.idPresensi === idPresensi);
    if (p) {
      p.statusHadir = !p.statusHadir;
      p.statusManual = p.statusHadir ? 'hadir' : 'tidak_hadir';
    }
  } catch (e) {
    console.error('Gagal toggle presensi', e);
  }
}

// ---- CRUD: Izin ----
export async function addIzin(nis: string, tanggal: string, jenis: 'sakit' | 'izin' | 'lainnya', keterangan: string, bukti: string) {
  try {
    const result = await API.post<{ idIzin: string }>('/api/izin', { nis, tanggal, jenis, keterangan, bukti });
    izinList.push({
      idIzin: result.idIzin, nis, tanggalIzin: tanggal, jenisIzin: jenis,
      keterangan, buktiPendukung: bukti, statusIzin: 'menunggu',
    });
  } catch (e) {
    console.error('Gagal menambah izin', e);
  }
}

export async function updateStatusIzin(idIzin: string, status: StatusIzin) {
  try {
    await API.patch(`/api/izin/${idIzin}`, { status });
    const izin = izinList.find(i => i.idIzin === idIzin);
    if (izin) izin.statusIzin = status;
  } catch (e) {
    console.error('Gagal update status izin', e);
  }
}

// ---- CRUD: Jadwal ----
export async function addJadwal(data: Omit<JadwalPelajaran, 'idJadwal'>) {
  try {
    const result = await API.post<{ idJadwal: string }>('/api/jadwal', data);
    jadwalList.push({ ...data, idJadwal: result.idJadwal });
  } catch (e) {
    console.error('Gagal menambah jadwal', e);
  }
}

export async function updateJadwal(id: string, data: Partial<JadwalPelajaran>) {
  try {
    await API.patch(`/api/jadwal/${id}`, data);
    const j = jadwalList.find(x => x.idJadwal === id);
    if (j) Object.assign(j, data);
  } catch (e) {
    console.error('Gagal mengupdate jadwal', e);
  }
}

export async function deleteJadwal(id: string) {
  try {
    await API.delete(`/api/jadwal/${id}`);
    jadwalList = jadwalList.filter(j => j.idJadwal !== id);
  } catch (e) {
    console.error('Gagal menghapus jadwal', e);
  }
}

// ---- Reset ----
export async function resetAllData() {
  try {
    await API.delete('/api/data');
    window.location.reload();
  } catch (e) {
    console.error('Gagal mereset data', e);
  }
}

// ---- Compatibility ----
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

export function initRegisteredAccounts() {}
export function resetCounters() {}
