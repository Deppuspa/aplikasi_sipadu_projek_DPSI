'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  presensiList, jadwalList, izinList, kelasList, getSiswaByKelas,
  getKelas, getSiswa, getJadwalByKelas, getJadwalByGuru,
  togglePresensiStatus,
} from '@/lib/mock-data';
import { getHariName, formatDateShort, type Role } from '@/lib/types';
import { Filter } from 'lucide-react';

const ALLOWED_ROLES: Role[] = ['guru_mapel', 'wali_kelas', 'admin'];

export default function KehadiranPage() {
  const router = useRouter();
  const { user } = useApp();
  const [filterKelas, setFilterKelas] = useState('all');
  const [filterTanggal, setFilterTanggal] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);

  if (!user) return null;
  if (user.role !== 'guru_mapel' && user.role !== 'wali_kelas' && user.role !== 'admin') return null;

  const isAdmin = user.role === 'admin';

  async function handleTogglePresensi(idPresensi: string) {
    await togglePresensiStatus(idPresensi);
    setRefreshKey(k => k + 1);
  }

  let dataPresensi = [...presensiList];
  let jadwalFilter = [...jadwalList];

  if (user.role === 'guru_mapel') {
    const idGuru = user.idGuru;
    jadwalFilter = getJadwalByGuru(idGuru);
    const idJadwalSet = new Set(jadwalFilter.map(j => j.idJadwal));
    dataPresensi = dataPresensi.filter(p => idJadwalSet.has(p.idJadwal));
  } else if (user.role === 'wali_kelas') {
    const idKelas = user.idKelas;
    if (idKelas) {
      const siswaKelas = getSiswaByKelas(idKelas).map(s => s.nis);
      dataPresensi = dataPresensi.filter(p => siswaKelas.includes(p.nis));
      jadwalFilter = getJadwalByKelas(idKelas);
    }
  }

  if (filterKelas !== 'all') {
    const siswaKelas = getSiswaByKelas(filterKelas).map(s => s.nis);
    dataPresensi = dataPresensi.filter(p => siswaKelas.includes(p.nis));
  }
  if (filterTanggal) {
    dataPresensi = dataPresensi.filter(p => p.tanggal === filterTanggal);
  }

  const rows = dataPresensi.map(p => {
    const j = jadwalList.find(x => x.idJadwal === p.idJadwal);
    const s = getSiswa(p.nis);
    return {
      idPresensi: p.idPresensi,
      tanggal: p.tanggal,
      nis: p.nis,
      nama: s?.namaLengkap || p.nis,
      kelas: s ? getKelas(s.idKelas)?.namaKelas || '-' : '-',
      mapel: j?.mataPelajaran || '-',
      jam: j ? `${j.jamMulai} - ${j.jamSelesai}` : '-',
      statusHadir: p.statusHadir,
      statusManual: p.statusManual,
    };
  });

  rows.sort((a, b) => b.tanggal.localeCompare(a.tanggal) || a.nis.localeCompare(b.nis));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Data Kehadiran</h2>
      </div>

      <div className="flex gap-3 items-end flex-wrap">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Filter Kelas</label>
          <select value={filterKelas} onChange={e => setFilterKelas(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            <option value="all">Semua Kelas</option>
            {kelasList.map(k => <option key={k.idKelas} value={k.idKelas}>{k.namaKelas}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Filter Tanggal</label>
          <input type="date" value={filterTanggal} onChange={e => setFilterTanggal(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm" />
        </div>
        <div className="text-sm text-gray-500">
          <Filter className="w-4 h-4 inline mr-1" />
          {rows.length} record ditemukan
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Tidak ada data kehadiran.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
                <th className="p-3">Tanggal</th><th className="p-3">NIS</th><th className="p-3">Nama</th>
                <th className="p-3">Kelas</th><th className="p-3">Mapel</th><th className="p-3">Jam</th>
                <th className="p-3">Status</th><th className="p-3">Keterangan</th>
              </tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 whitespace-nowrap">{formatDateShort(r.tanggal)}</td>
                    <td className="p-3">{r.nis}</td>
                    <td className="p-3">{r.nama}</td>
                    <td className="p-3">{r.kelas}</td>
                    <td className="p-3">{r.mapel}</td>
                    <td className="p-3 text-xs">{r.jam}</td>
                    <td className="p-3">
                      {isAdmin ? (
                        <button onClick={() => handleTogglePresensi(r.idPresensi)}
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-all hover:opacity-80 ${r.statusHadir ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>
                          {r.statusHadir ? 'Hadir' : 'Tidak Hadir'}
                        </button>
                      ) : (
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${r.statusHadir ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {r.statusHadir ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-xs text-gray-500">{r.statusManual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
