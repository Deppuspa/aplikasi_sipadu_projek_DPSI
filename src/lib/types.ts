export type Role = 'siswa' | 'guru_mapel' | 'wali_kelas' | 'admin';
export type GuruRole = 'guru_mapel' | 'wali_kelas' | 'keduanya';
export type JenisKelamin = 'L' | 'P';
export type StatusIzin = 'menunggu' | 'disetujui' | 'ditolak';
export type JenisIzin = 'sakit' | 'izin' | 'lainnya';
export type StatusManual = 'hadir' | 'tidak_hadir' | 'sakit' | 'izin';
export type JenisLaporan = 'harian' | 'bulanan';

export interface Siswa {
  nis: string;
  namaLengkap: string;
  jenisKelamin: JenisKelamin;
  idKelas: string;
  email: string;
}

export interface Guru {
  idGuru: string;
  namaGuru: string;
  email: string;
  role: GuruRole;
  idKelas: string | null;
}

export interface Admin {
  idAdmin: string;
  namaAdmin: string;
  email: string;
  username: string;
}

export interface Kelas {
  idKelas: string;
  namaKelas: string;
  idGuru: string | null;
}

export interface JadwalPelajaran {
  idJadwal: string;
  idKelas: string;
  idGuru: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
  mataPelajaran: string;
  semester: string;
}

export interface Presensi {
  idPresensi: string;
  nis: string;
  idJadwal: string;
  idGuru: string;
  tanggal: string;
  statusHadir: boolean;
  statusManual: StatusManual;
}

export interface Izin {
  idIzin: string;
  nis: string;
  tanggalIzin: string;
  jenisIzin: JenisIzin;
  keterangan: string;
  buktiPendukung: string;
  statusIzin: StatusIzin;
}

export interface LaporanAbsensi {
  idLaporan: string;
  idKelas: string;
  periodeAwal: string;
  periodeAkhir: string;
  jenisLaporan: JenisLaporan;
  dataLaporan: string;
}

export type User =
  | ({ role: 'siswa' } & Siswa)
  | ({ role: 'guru_mapel' } & Guru)
  | ({ role: 'wali_kelas' } & Guru)
  | ({ role: 'admin' } & Admin);

export const HARI_LIST = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const DAY_MAP: Record<string, string> = {
  Minggu: 'Minggu',
  Senin: 'Senin',
  Selasa: 'Selasa',
  Rabu: 'Rabu',
  Kamis: 'Kamis',
  Jumat: 'Jumat',
  Sabtu: 'Sabtu',
};

export function getHariName(date: Date): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return days[date.getDay()];
}

export function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID');
}

export const ROLE_LABEL: Record<Role, string> = {
  siswa: 'Siswa',
  guru_mapel: 'Guru Mapel',
  wali_kelas: 'Wali Kelas',
  admin: 'Admin (Guru BK)',
};
