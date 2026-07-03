'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { presensiList, jadwalList, getIzinSiswa, getGuru } from '@/lib/mock-data';
import { formatDateShort, type Role } from '@/lib/types';

const ALLOWED_ROLES: Role[] = ['siswa'];

export default function RiwayatPage() {
  const router = useRouter();
  const { user } = useApp();

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);

  if (!user) return null;
  if (user.role !== 'siswa') return null;

  const pSaya = presensiList.filter(p => p.nis === user.nis);
  const izinSaya = getIzinSiswa(user.nis);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Riwayat Kehadiran</h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold mb-3">Riwayat Presensi</h3>
        {pSaya.length === 0 ? (
          <p className="text-gray-500 text-sm py-4 text-center">Belum ada data presensi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                <th className="pb-2 pr-3">Tanggal</th><th className="pb-2 pr-3">Jam</th><th className="pb-2 pr-3">Mapel</th><th className="pb-2 pr-3">Guru</th><th className="pb-2">Status</th>
              </tr></thead>
              <tbody>
                {pSaya.slice().reverse().map(p => {
                  const j = jadwalList.find(x => x.idJadwal === p.idJadwal);
                  const g = getGuru(p.idGuru);
                  return (
                    <tr key={p.idPresensi} className="border-b border-gray-100">
                      <td className="py-2 pr-3">{formatDateShort(p.tanggal)}</td>
                      <td className="py-2 pr-3">{j ? `${j.jamMulai} - ${j.jamSelesai}` : '-'}</td>
                      <td className="py-2 pr-3">{j?.mataPelajaran || '-'}</td>
                      <td className="py-2 pr-3">{g?.namaGuru || '-'}</td>
                      <td className="py-2">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${p.statusHadir ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {p.statusHadir ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold mb-3">Riwayat Izin</h3>
        {izinSaya.length === 0 ? (
          <p className="text-gray-500 text-sm py-4 text-center">Belum ada pengajuan izin.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                <th className="pb-2 pr-3">Tanggal</th><th className="pb-2 pr-3">Jenis</th><th className="pb-2 pr-3">Status</th><th className="pb-2">Keterangan</th>
              </tr></thead>
              <tbody>
                {izinSaya.slice().reverse().map(i => (
                  <tr key={i.idIzin} className="border-b border-gray-100">
                    <td className="py-2 pr-3">{formatDateShort(i.tanggalIzin)}</td>
                    <td className="py-2 pr-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                        ${i.jenisIzin === 'sakit' ? 'bg-blue-50 text-blue-700' : i.jenisIzin === 'izin' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{i.jenisIzin}</span>
                    </td>
                    <td className="py-2 pr-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                        ${i.statusIzin === 'menunggu' ? 'bg-yellow-50 text-yellow-700' : i.statusIzin === 'disetujui' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{i.statusIzin}</span>
                    </td>
                    <td className="py-2 text-gray-600">{i.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
