'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  jadwalList, kelasList, guruList, getKelas, getGuru,
  addJadwal, updateJadwal, deleteJadwal, getJadwalByKelas, getJadwalByGuru,
} from '@/lib/mock-data';
import { HARI_LIST, type Role } from '@/lib/types';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

export default function JadwalPage() {
  const router = useRouter();
  const { user } = useApp();
  const [filterKelas, setFilterKelas] = useState('all');
  const [filterHari, setFilterHari] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ idKelas: '', idGuru: '', hari: 'Senin', jamMulai: '', jamSelesai: '', mataPelajaran: '', semester: '2025/2026-Ganjil' });

  const ALLOWED_ROLES: Role[] = ['admin'];

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);

  if (!user || !ALLOWED_ROLES.includes(user.role)) return null;

  let data = [...jadwalList];
  if (filterKelas !== 'all') data = data.filter(j => j.idKelas === filterKelas);
  if (filterHari !== 'all') data = data.filter(j => j.hari === filterHari);
  data.sort((a, b) => HARI_LIST.indexOf(a.hari) - HARI_LIST.indexOf(b.hari) || a.jamMulai.localeCompare(b.jamMulai));

  function openAdd() {
    setEditId(null);
    setForm({ idKelas: kelasList[0]?.idKelas || '', idGuru: '', hari: 'Senin', jamMulai: '', jamSelesai: '', mataPelajaran: '', semester: '2025/2026-Ganjil' });
    setShowModal(true);
  }

  function openEdit(id: string) {
    const j = jadwalList.find(x => x.idJadwal === id);
    if (!j) return;
    setEditId(id);
    setForm({ idKelas: j.idKelas, idGuru: j.idGuru, hari: j.hari, jamMulai: j.jamMulai, jamSelesai: j.jamSelesai, mataPelajaran: j.mataPelajaran, semester: j.semester });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.idKelas || !form.idGuru || !form.jamMulai || !form.jamSelesai || !form.mataPelajaran) return;
    if (editId) {
      await updateJadwal(editId, form);
    } else {
      await addJadwal(form);
    }
    setShowModal(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus jadwal ini?')) return;
    await deleteJadwal(id);
  }

  const filteredGuru = guruList.filter(g => g.role === 'guru_mapel' || g.role === 'keduanya');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Jadwal Pelajaran</h2>
        <button onClick={openAdd} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer">
          <Plus className="w-4 h-4" /> Tambah Jadwal
        </button>
      </div>

      <div className="flex gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Filter Kelas</label>
          <select value={filterKelas} onChange={e => setFilterKelas(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            <option value="all">Semua Kelas</option>
            {kelasList.map(k => <option key={k.idKelas} value={k.idKelas}>{k.namaKelas}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Filter Hari</label>
          <select value={filterHari} onChange={e => setFilterHari(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            <option value="all">Semua Hari</option>
            {HARI_LIST.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Tidak ada jadwal.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
              <th className="p-3">Hari</th><th className="p-3">Jam</th><th className="p-3">Kelas</th><th className="p-3">Mapel</th><th className="p-3">Guru</th><th className="p-3">Semester</th><th className="p-3">Aksi</th>
            </tr></thead>
            <tbody>
              {data.map(j => {
                const kelas = getKelas(j.idKelas);
                const guru = getGuru(j.idGuru);
                return (
                  <tr key={j.idJadwal} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{j.hari}</td>
                    <td className="p-3">{j.jamMulai} - {j.jamSelesai}</td>
                    <td className="p-3">{kelas?.namaKelas || '-'}</td>
                    <td className="p-3 font-medium">{j.mataPelajaran}</td>
                    <td className="p-3 text-gray-600">{guru?.namaGuru || '-'}</td>
                    <td className="p-3 text-xs text-gray-500">{j.semester}</td>
                    <td className="p-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEdit(j.idJadwal)}
                          className="p-1.5 rounded hover:bg-gray-100 text-gray-500 cursor-pointer">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(j.idJadwal)}
                          className="p-1.5 rounded hover:bg-red-50 text-red-500 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editId ? 'Edit Jadwal' : 'Tambah Jadwal'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded hover:bg-gray-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Kelas</label>
                  <select value={form.idKelas} onChange={e => setForm({ ...form, idKelas: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    {kelasList.map(k => <option key={k.idKelas} value={k.idKelas}>{k.namaKelas}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hari</label>
                  <select value={form.hari} onChange={e => setForm({ ...form, hari: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    {HARI_LIST.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Jam Mulai</label>
                  <input type="time" value={form.jamMulai} onChange={e => setForm({ ...form, jamMulai: e.target.value })}
                    required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jam Selesai</label>
                  <input type="time" value={form.jamSelesai} onChange={e => setForm({ ...form, jamSelesai: e.target.value })}
                    required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mata Pelajaran</label>
                <input type="text" value={form.mataPelajaran} onChange={e => setForm({ ...form, mataPelajaran: e.target.value })}
                  placeholder="Contoh: Matematika" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Guru Pengampu</label>
                <select value={form.idGuru} onChange={e => setForm({ ...form, idGuru: e.target.value })}
                  required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">-- Pilih --</option>
                  {filteredGuru.map(g => <option key={g.idGuru} value={g.idGuru}>{g.namaGuru}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Semester</label>
                <input type="text" value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">Batal</button>
                <button type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm cursor-pointer">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
