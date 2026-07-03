'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { addIzin, getIzinSiswa, izinList } from '@/lib/mock-data';
import { formatDateShort, todayStr, type Role } from '@/lib/types';
import { Send, AlertCircle } from 'lucide-react';

const ALLOWED_ROLES: Role[] = ['siswa'];

export default function IzinPage() {
  const router = useRouter();
  const { user } = useApp();
  const [tanggal, setTanggal] = useState('');
  const [jenis, setJenis] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [bukti, setBukti] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);

  if (!user) return null;
  if (user.role !== 'siswa') return null;

  const nisSaya = user.nis;
  const izinSaya = getIzinSiswa(nisSaya);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg('');
    if (!tanggal || !jenis || !keterangan) return;

    // VR-03: Future date check
    if (tanggal > todayStr()) {
      setErrMsg('Tanggal izin tidak boleh di masa depan.');
      return;
    }

    // VR-04: Duplicate date check
    const dup = izinList.some(i =>
      i.nis === nisSaya && i.tanggalIzin === tanggal &&
      (i.statusIzin === 'menunggu' || i.statusIzin === 'disetujui')
    );
    if (dup) {
      setErrMsg('Anda sudah memiliki pengajuan izin untuk tanggal ini.');
      return;
    }

    addIzin(nisSaya, tanggal, jenis as 'sakit' | 'izin' | 'lainnya', keterangan, bukti || '(tanpa file)');
    setSubmitted(true);
    setTanggal(''); setJenis(''); setKeterangan(''); setBukti('');
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Ajukan Izin Ketidakhadiran</h2>
      <p className="text-sm text-gray-500">Izin diajukan <strong>per hari</strong> — berlaku untuk seluruh jam pelajaran pada tanggal yang dipilih.</p>

      {submitted && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
          <Send className="w-4 h-4" /> Izin berhasil diajukan! Status: Menunggu verifikasi.
        </div>
      )}

      {errMsg && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Izin</label>
            <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)}
              required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jenis Izin</label>
            <select value={jenis} onChange={e => setJenis(e.target.value)}
              required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="">-- Pilih --</option>
              <option value="sakit">Sakit</option>
              <option value="izin">Izin</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Keterangan</label>
            <textarea value={keterangan} onChange={e => setKeterangan(e.target.value)}
              placeholder="Deskripsikan alasan ketidakhadiran..." required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[80px]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bukti Pendukung</label>
            <input type="text" value={bukti} onChange={e => setBukti(e.target.value)}
              placeholder="Nama file bukti (contoh: surat_dokter.pdf)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            <p className="text-xs text-gray-500 mt-1">Format: PDF, JPG, PNG (simulasi — masukkan nama file)</p>
          </div>
          <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer">
            <Send className="w-4 h-4" /> Ajukan Izin
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold mb-3">Riwayat Pengajuan Izin</h3>
        {izinSaya.length === 0 ? (
          <p className="text-gray-500 text-sm py-4 text-center">Belum ada pengajuan izin.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                <th className="pb-2 pr-3">Tanggal</th><th className="pb-2 pr-3">Jenis</th><th className="pb-2 pr-3">Status</th><th className="pb-2 pr-3">Keterangan</th><th className="pb-2">Bukti</th>
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
                    <td className="py-2 pr-3 text-gray-600">{i.keterangan}</td>
                    <td className="py-2 text-xs text-gray-500">{i.buktiPendukung}</td>
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
