'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  jadwalList, presensiList, getSiswaByKelas, getKelas, getGuru,
  getJadwalByGuru, addPresensi,
} from '@/lib/mock-data';
import { getHariName, todayStr, HARI_LIST, type Role } from '@/lib/types';
import { Check, X, Save, ArrowLeft, AlertCircle } from 'lucide-react';

const ALLOWED_ROLES: Role[] = ['guru_mapel', 'wali_kelas'];

export default function PresensiPage() {
  const router = useRouter();
  const { user } = useApp();
  const [step, setStep] = useState<'select' | 'presensi'>('select');
  const [selectedJadwal, setSelectedJadwal] = useState<string | null>(null);
  const [presensiData, setPresensiData] = useState<Record<string, boolean>>({});
  const [hariFilter, setHariFilter] = useState(getHariName(new Date()));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);
  useEffect(() => { if (saved) setTimeout(() => setSaved(false), 3000); }, [saved]);

  if (!user) return null;
  if (user.role === 'siswa' || user.role === 'admin') return null;
  const u = user;

  const jadwalTersedia = getJadwalByGuru(u.idGuru);
  const jadwalFiltered = jadwalTersedia.filter(j => j.hari === hariFilter);

  function mulaiPresensi(idJadwal: string) {
    const j = jadwalList.find(x => x.idJadwal === idJadwal);
    if (!j) return;
    setSelectedJadwal(idJadwal);

    const existing = presensiList.filter(p => p.idJadwal === idJadwal && p.tanggal === todayStr());
    const data: Record<string, boolean> = {};
    const siswa = getSiswaByKelas(j.idKelas);
    if (existing.length > 0) {
      existing.forEach(p => { data[p.nis] = p.statusHadir; });
      siswa.forEach(s => { if (data[s.nis] === undefined) data[s.nis] = true; });
    } else {
      siswa.forEach(s => { data[s.nis] = true; });
    }
    setPresensiData(data);
    setStep('presensi');
  }

  function toggleSiswa(nis: string) {
    setPresensiData(prev => ({ ...prev, [nis]: !prev[nis] }));
  }

  function resetAll() {
    const newData: Record<string, boolean> = {};
    Object.keys(presensiData).forEach(k => { newData[k] = true; });
    setPresensiData(newData);
  }

  function simpanPresensi() {
    if (!selectedJadwal) return;
    addPresensi(selectedJadwal, u.idGuru, todayStr(), presensiData);
    setSaved(true);
  }

  if (step === 'presensi' && selectedJadwal) {
    const j = jadwalList.find(x => x.idJadwal === selectedJadwal);
    if (!j) return null;
    const siswa = getSiswaByKelas(j.idKelas);
    const kelas = getKelas(j.idKelas);
    const guru = getGuru(j.idGuru);
    const jmlHadir = Object.values(presensiData).filter(v => v).length;
    const jmlTH = Object.values(presensiData).filter(v => !v).length;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Presensi: {kelas?.namaKelas || '-'} — {j.mataPelajaran}</h2>
            <p className="text-sm text-gray-500">{j.hari}, {j.jamMulai} - {j.jamSelesai} | Guru: {guru?.namaGuru || '-'}</p>
          </div>
          <button onClick={() => setStep('select')} className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        </div>

        {saved && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
            <Check className="w-4 h-4" /> Presensi tersimpan! {Object.keys(presensiData).length} siswa diproses.
          </div>
        )}

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center flex-1"><span className="text-2xl font-bold text-green-600">{jmlHadir}</span><p className="text-xs text-gray-500">Hadir (Default)</p></div>
          <div className="text-center flex-1"><span className="text-2xl font-bold text-red-600">{jmlTH}</span><p className="text-xs text-gray-500">Tidak Hadir (Uncheck)</p></div>
          <div className="text-center flex-1"><span className="text-2xl font-bold">{siswa.length}</span><p className="text-xs text-gray-500">Total Siswa</p></div>
        </div>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <div><strong>Logika Default-Hadir:</strong> Semua siswa otomatis tercentang HADIR. Uncheck hanya pada siswa yang benar-benar tidak hadir.</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {siswa.map(s => {
            const checked = presensiData[s.nis] !== false;
            return (
              <div key={s.nis}
                onClick={() => toggleSiswa(s.nis)}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all
                  ${checked ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}
              >
                {checked ? <Check className="w-4 h-4 text-green-600 shrink-0" /> : <X className="w-4 h-4 text-red-600 shrink-0" />}
                <div className="min-w-0">
                  <div className="text-sm font-medium">{s.namaLengkap}</div>
                  <div className="text-xs text-gray-500">{s.nis}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={simpanPresensi} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer">
            <Save className="w-4 h-4" /> Simpan Presensi
          </button>
          <button onClick={resetAll} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium cursor-pointer">
            Reset ke Default (Semua Hadir)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pilih Jadwal Presensi</h2>
      <p className="text-sm text-gray-500">Hari ini: <strong>{getHariName(new Date())}</strong></p>

      <div className="flex gap-2 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Filter Hari</label>
          <select value={hariFilter} onChange={e => setHariFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            {HARI_LIST.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
      </div>

      {jadwalFiltered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Tidak ada jadwal presensi untuk hari ini.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
              <th className="p-3">Jam</th><th className="p-3">Kelas</th><th className="p-3">Mapel</th><th className="p-3">Guru</th><th className="p-3">Aksi</th>
            </tr></thead>
            <tbody>
              {jadwalFiltered.map(j => {
                const kelas = getKelas(j.idKelas);
                const guru = getGuru(j.idGuru);
                const sudah = presensiList.some(p => p.idJadwal === j.idJadwal && p.tanggal === todayStr());
                return (
                  <tr key={j.idJadwal} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{j.jamMulai} - {j.jamSelesai}</td>
                    <td className="p-3">{kelas?.namaKelas || '-'}</td>
                    <td className="p-3">{j.mataPelajaran}</td>
                    <td className="p-3">{guru?.namaGuru || '-'}</td>
                    <td className="p-3">
                      <button onClick={() => mulaiPresensi(j.idJadwal)}
                        className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer
                          ${sudah ? 'bg-gray-100 text-gray-600 border border-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        {sudah ? 'Edit Presensi' : 'Mulai Presensi'}
                      </button>
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
