'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  presensiList, jadwalList, izinList, getSiswaByKelas, getKelas, getJadwalByKelas,
} from '@/lib/mock-data';
import { getHariName, formatDateShort, type Role } from '@/lib/types';

export default function PantauRekapPage() {
  const router = useRouter();
  const { user } = useApp();
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const [tgl, setTgl] = useState(yesterday.toISOString().split('T')[0]);

  const ALLOWED_ROLES: Role[] = ['wali_kelas'];

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);

  if (!user) return null;
  if (user.role !== 'wali_kelas') return null;

  const kelasBinaan = getKelas(user.idKelas || '');
  if (!kelasBinaan) {
    return <div className="text-center py-12 text-gray-500">Anda tidak memiliki kelas binaan.</div>;
  }

  const siswa = getSiswaByKelas(kelasBinaan.idKelas);
  const dayName = getHariName(new Date(tgl + 'T00:00:00'));
  const jadwalTgl = getJadwalByKelas(kelasBinaan.idKelas).filter(j => j.hari === dayName);

  const rows = siswa.map(s => {
    const totalJam = jadwalTgl.length || 1;
    const hadirJam = jadwalTgl.filter(j => {
      const p = presensiList.find(pr => pr.idJadwal === j.idJadwal && pr.nis === s.nis && pr.tanggal === tgl);
      if (p && p.statusHadir) return true;
      if (!p) return true;
      const izin = izinList.find(i => i.nis === s.nis && i.tanggalIzin === tgl && i.statusIzin === 'disetujui');
      return !!izin;
    }).length;
    const pct = Math.round((hadirJam / totalJam) * 100);
    const statusHari = pct >= 60;
    const detailJam = jadwalTgl.map(j => {
      const p = presensiList.find(pr => pr.idJadwal === j.idJadwal && pr.nis === s.nis && pr.tanggal === tgl);
      const hadir = p ? p.statusHadir : true;
      const punyaIzin = izinList.some(i => i.nis === s.nis && i.tanggalIzin === tgl && i.statusIzin === 'disetujui');
      let st = hadir ? 'H' : 'TH';
      if (punyaIzin && !hadir) st = 'I*';
      return `${j.mataPelajaran.slice(0, 4)}:${st}`;
    }).join(' | ');

    return { siswa: s, pct, hadirJam, totalJam, statusHari, detailJam };
  });

  const totalHadir = rows.filter(r => r.statusHari).length;
  const totalTH = rows.filter(r => !r.statusHari).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Pantau Rekap Kelas {kelasBinaan.namaKelas}</h2>
          <p className="text-sm text-gray-500">Real-time — {dayName}</p>
        </div>
      </div>

      <div className="flex gap-2 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Filter Tanggal</label>
          <input type="date" value={tgl} onChange={e => setTgl(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span>Total Siswa: <strong>{siswa.length}</strong></span>
        <span>Hadir: <strong className="text-green-600">{totalHadir}</strong></span>
        <span>Tidak Hadir: <strong className="text-red-600">{totalTH}</strong></span>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs">
        <strong>Rumus Rekap Harian (BR-12, BR-13, BR-14):</strong>
        Persentase = (Jam Hadir* / Total Jam) &times; 100%. Threshold: &gt;= 60% = Hadir.
        Izin/sakit disetujui dihitung sebagai Hadir (*). Default siswa tanpa presensi manual = Hadir.
      </div>

      {jadwalTgl.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Tidak ada jadwal pelajaran pada tanggal ini.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
              <th className="p-3">NIS</th><th className="p-3">Nama</th><th className="p-3">Hadir/Total</th>
              <th className="p-3">Persentase</th><th className="p-3">Progress</th><th className="p-3">Status Hari</th><th className="p-3">Detail Per Jam</th>
            </tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.siswa.nis} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">{r.siswa.nis}</td>
                  <td className="p-3">{r.siswa.namaLengkap}</td>
                  <td className="p-3">{r.hadirJam}/{r.totalJam}</td>
                  <td className="p-3 font-medium">{r.pct}%</td>
                  <td className="p-3 w-32">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${r.pct >= 60 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${r.pct}%` }} />
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                      ${r.statusHari ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {r.statusHari ? 'Hadir' : 'Tidak Hadir'}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-500 max-w-[240px]">{r.detailJam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
