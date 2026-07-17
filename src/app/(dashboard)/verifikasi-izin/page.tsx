'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { izinList, getSiswa, updateStatusIzin, getSiswaByKelas } from '@/lib/mock-data';
import { formatDateShort, type Role } from '@/lib/types';
import { Check, X, Filter } from 'lucide-react';

export default function VerifikasiIzinPage() {
  const router = useRouter();
  const { user } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  const ALLOWED_ROLES: Role[] = ['wali_kelas', 'admin'];

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);

  if (!user) return null;
  if (user.role !== 'wali_kelas' && user.role !== 'admin') return null;

  let dataIzin = [...izinList];
  if (user.role === 'wali_kelas' && user.idKelas) {
    const siswaKelas = getSiswaByKelas(user.idKelas).map(s => s.nis);
    dataIzin = dataIzin.filter(i => siswaKelas.includes(i.nis));
  }
  if (filterStatus !== 'all') {
    dataIzin = dataIzin.filter(i => i.statusIzin === filterStatus);
  }

  async function handleSetStatus(idIzin: string, status: 'disetujui' | 'ditolak') {
    await updateStatusIzin(idIzin, status);
    setRefreshKey(k => k + 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Verifikasi Izin Ketidakhadiran</h2>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
          <option value="all">Semua Status</option>
          <option value="menunggu">Menunggu</option>
          <option value="disetujui">Disetujui</option>
          <option value="ditolak">Ditolak</option>
        </select>
      </div>

      {dataIzin.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Tidak ada data izin.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
              <th className="p-3">Tanggal</th><th className="p-3">Siswa</th><th className="p-3">Jenis</th><th className="p-3">Keterangan</th><th className="p-3">Bukti</th><th className="p-3">Status</th><th className="p-3">Aksi</th>
            </tr></thead>
            <tbody>
              {dataIzin.map(i => {
                const siswa = getSiswa(i.nis);
                return (
                  <tr key={i.idIzin} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{formatDateShort(i.tanggalIzin)}</td>
                    <td className="p-3">{siswa?.namaLengkap || i.nis}<br /><span className="text-xs text-gray-500">{i.nis}</span></td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                        ${i.jenisIzin === 'sakit' ? 'bg-blue-50 text-blue-700' : i.jenisIzin === 'izin' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{i.jenisIzin}</span>
                    </td>
                    <td className="p-3 text-gray-600 max-w-[200px] truncate">{i.keterangan}</td>
                    <td className="p-3 text-xs text-gray-500">{i.buktiPendukung}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                        ${i.statusIzin === 'menunggu' ? 'bg-yellow-50 text-yellow-700' : i.statusIzin === 'disetujui' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{i.statusIzin}</span>
                    </td>
                    <td className="p-3">
                      {i.statusIzin === 'menunggu' ? (
                        <div className="flex gap-1.5">
                          <button onClick={() => handleSetStatus(i.idIzin, 'disetujui')}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 cursor-pointer">
                            <Check className="w-3 h-3" /> Setujui
                          </button>
                          <button onClick={() => handleSetStatus(i.idIzin, 'ditolak')}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 cursor-pointer">
                            <X className="w-3 h-3" /> Tolak
                          </button>
                        </div>
                      ) : <span className="text-xs text-gray-400">-</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
