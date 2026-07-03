'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  presensiList, jadwalList, izinList, kelasList, getSiswaByKelas,
  getKelas, getSiswa, getJadwalByKelas, getJadwalByGuru,
} from '@/lib/mock-data';
import { getHariName, HARI_LIST, type Role, type User } from '@/lib/types';
import { Download, BarChart3 } from 'lucide-react';

function downloadCSV(filename: string, headers: string[], rows: string[][]) {
  const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function LaporanPage() {
  const router = useRouter();
  const { user } = useApp();
  const [tab, setTab] = useState<'bulanan' | 'harian'>('bulanan');

  const ALLOWED_ROLES: Role[] = ['guru_mapel', 'wali_kelas', 'admin'];

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);

  if (!user) return null;
  if (user.role !== 'guru_mapel' && user.role !== 'wali_kelas' && user.role !== 'admin') return null;

  const canViewHarian = user.role === 'wali_kelas' || user.role === 'admin';

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Laporan Rekapitulasi Kehadiran</h2>

      <div className="flex gap-1 border-b border-gray-200">
        <button onClick={() => setTab('bulanan')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer
            ${tab === 'bulanan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
          Rekap Bulanan Per Mapel
        </button>
        {canViewHarian && (
          <button onClick={() => setTab('harian')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer
              ${tab === 'harian' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Rekap Harian (Persentase 60%)
          </button>
        )}
      </div>

      {tab === 'bulanan' ? <RekapBulanan user={user} /> : canViewHarian ? <RekapHarian /> : <RekapBulanan user={user} />}
    </div>
  );
}

function RekapBulanan({ user }: { user: User }) {
  const [filterKelas, setFilterKelas] = useState('all');
  const [filterMapel, setFilterMapel] = useState('all');
  const [filterBulan, setFilterBulan] = useState('');

  const isGuruMapel = user.role === 'guru_mapel';
  const guruJadwal = isGuruMapel && user.idGuru ? getJadwalByGuru(user.idGuru) : null;
  const guruKelasIds = guruJadwal ? [...new Set(guruJadwal.map(j => j.idKelas))] : null;
  const guruMapelSet = guruJadwal ? new Set(guruJadwal.map(j => j.mataPelajaran)) : null;

  const availableKelas = guruKelasIds
    ? kelasList.filter(k => guruKelasIds.includes(k.idKelas))
    : kelasList;

  const mapelList = guruMapelSet
    ? [...guruMapelSet]
    : [...new Set(jadwalList.map(j => j.mataPelajaran))];

  let data = [...presensiList];
  let jadwalTerkait = [...jadwalList];

  if (isGuruMapel && guruJadwal) {
    const guruIdJadwal = new Set(guruJadwal.map(j => j.idJadwal));
    data = data.filter(p => guruIdJadwal.has(p.idJadwal));
    jadwalTerkait = jadwalTerkait.filter(j => guruIdJadwal.has(j.idJadwal));
  }

  if (filterKelas !== 'all') {
    const siswaKelas = getSiswaByKelas(filterKelas).map(s => s.nis);
    data = data.filter(p => siswaKelas.includes(p.nis));
    jadwalTerkait = jadwalTerkait.filter(j => j.idKelas === filterKelas);
  }
  if (filterMapel !== 'all') {
    const jadwalMapel = jadwalTerkait.filter(j => j.mataPelajaran === filterMapel).map(j => j.idJadwal);
    data = data.filter(p => jadwalMapel.includes(p.idJadwal));
  }
  if (filterBulan) {
    data = data.filter(p => p.tanggal.startsWith(filterBulan));
  }

  const bySiswa: Record<string, { hadir: number; tidakHadir: number }> = {};
  data.forEach(p => {
    if (!bySiswa[p.nis]) bySiswa[p.nis] = { hadir: 0, tidakHadir: 0 };
    if (p.statusHadir) bySiswa[p.nis].hadir++;
    else bySiswa[p.nis].tidakHadir++;
  });

  const rows = Object.entries(bySiswa).map(([nis, d]) => {
    const s = getSiswa(nis);
    const k = s ? getKelas(s.idKelas) : null;
    const total = d.hadir + d.tidakHadir;
    const pct = total > 0 ? Math.round((d.hadir / total) * 100) : 0;
    return { nis, nama: s?.namaLengkap || nis, kelas: k?.namaKelas || '-', hadir: d.hadir, tidakHadir: d.tidakHadir, total, pct };
  });

  function handleDownload() {
    downloadCSV(
      `laporan_bulanan_${filterBulan || 'semua'}.csv`,
      ['NIS', 'Nama', 'Kelas', 'Hadir', 'Tidak Hadir', 'Total', 'Persentase'],
      rows.map(r => [r.nis, r.nama, r.kelas, String(r.hadir), String(r.tidakHadir), String(r.total), `${r.pct}%`])
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end flex-wrap">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Kelas</label>
          <select value={filterKelas} onChange={e => setFilterKelas(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            <option value="all">Semua Kelas</option>
            {availableKelas.map(k => <option key={k.idKelas} value={k.idKelas}>{k.namaKelas}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Mata Pelajaran</label>
          <select value={filterMapel} onChange={e => setFilterMapel(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            <option value="all">Semua Mapel</option>
            {mapelList.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Bulan</label>
          <input type="month" value={filterBulan} onChange={e => setFilterBulan(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm" />
        </div>
        <button onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm cursor-pointer">
          <Download className="w-4 h-4" /> Unduh CSV
        </button>
      </div>

      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs">
        <strong>Rekap Bulanan Per Mata Pelajaran (BR-16, BR-17):</strong> Acuan penilaian oleh guru mapel.
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Tidak ada data untuk filter yang dipilih.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
              <th className="p-3">NIS</th><th className="p-3">Nama</th><th className="p-3">Kelas</th>
              <th className="p-3">Hadir</th><th className="p-3">Tidak Hadir</th><th className="p-3">Total</th><th className="p-3">Persentase</th>
            </tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.nis} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">{r.nis}</td>
                  <td className="p-3">{r.nama}</td>
                  <td className="p-3">{r.kelas}</td>
                  <td className="p-3 font-semibold text-green-600">{r.hadir}</td>
                  <td className="p-3 font-semibold text-red-600">{r.tidakHadir}</td>
                  <td className="p-3">{r.total}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${r.pct >= 60 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="text-xs font-medium">{r.pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RekapHarian() {
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const [tgl, setTgl] = useState(yesterday.toISOString().split('T')[0]);
  const [filterKelas, setFilterKelas] = useState('all');

  let kelasFiltered = [...kelasList];
  if (filterKelas !== 'all') kelasFiltered = kelasFiltered.filter(k => k.idKelas === filterKelas);

  const dayName = getHariName(new Date(tgl + 'T00:00:00'));
  const allRows: { nis: string; nama: string; kelas: string; hadirJam: number; totalJam: number; pct: number; statusHari: boolean }[] = [];

  kelasFiltered.forEach(k => {
    const siswa = getSiswaByKelas(k.idKelas);
    const jadwalTgl = getJadwalByKelas(k.idKelas).filter(j => j.hari === dayName);
    siswa.forEach(s => {
      const totalJam = jadwalTgl.length || 1;
      const hadirJam = jadwalTgl.filter(j => {
        const p = presensiList.find(pr => pr.idJadwal === j.idJadwal && pr.nis === s.nis && pr.tanggal === tgl);
        if (p && p.statusHadir) return true;
        if (!p) return true;
        const izin = izinList.find(i => i.nis === s.nis && i.tanggalIzin === tgl && i.statusIzin === 'disetujui');
        return !!izin;
      }).length;
      const pct = Math.round((hadirJam / totalJam) * 100);
      allRows.push({ nis: s.nis, nama: s.namaLengkap, kelas: k.namaKelas, hadirJam, totalJam, pct, statusHari: pct >= 60 });
    });
  });

  const totalHadir = allRows.filter(r => r.statusHari).length;
  const totalTH = allRows.filter(r => !r.statusHari).length;

  function handleDownload() {
    downloadCSV(
      `laporan_harian_${tgl}.csv`,
      ['NIS', 'Nama', 'Kelas', 'Hadir/Total', 'Persentase', 'Status Hari'],
      allRows.map(r => [r.nis, r.nama, r.kelas, `${r.hadirJam}/${r.totalJam}`, `${r.pct}%`, r.statusHari ? 'Hadir' : 'Tidak Hadir'])
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end flex-wrap">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Tanggal</label>
          <input type="date" value={tgl} onChange={e => setTgl(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Kelas</label>
          <select value={filterKelas} onChange={e => setFilterKelas(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            <option value="all">Semua Kelas</option>
            {kelasList.map(k => <option key={k.idKelas} value={k.idKelas}>{k.namaKelas}</option>)}
          </select>
        </div>
        <button onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm cursor-pointer">
          <Download className="w-4 h-4" /> Unduh CSV
        </button>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span>Total Siswa: <strong>{allRows.length}</strong></span>
        <span>Hadir: <strong className="text-green-600">{totalHadir}</strong></span>
        <span>Tidak Hadir: <strong className="text-red-600">{totalTH}</strong></span>
      </div>

      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs">
        <strong>Rekap Harian (BR-12, BR-13, BR-14):</strong> Persentase = (Jam Hadir* / Total Jam) &times; 100%.
        Threshold: &gt;= 60% = Hadir. Izin/sakit disetujui dihitung sebagai Hadir (*).
      </div>

      {allRows.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Tidak ada data untuk tanggal tersebut.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
              <th className="p-3">NIS</th><th className="p-3">Nama</th><th className="p-3">Kelas</th>
              <th className="p-3">Hadir/Total</th><th className="p-3">Persentase</th><th className="p-3">Progress</th><th className="p-3">Status Hari</th>
            </tr></thead>
            <tbody>
              {allRows.map(r => (
                <tr key={r.nis} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">{r.nis}</td>
                  <td className="p-3">{r.nama}</td>
                  <td className="p-3">{r.kelas}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
