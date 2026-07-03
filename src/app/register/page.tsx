'use client';

import { useState, createElement, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { kelasList, siswaList } from '@/lib/mock-data';
import { GraduationCap, BookOpen, Users, ShieldCheck, UserPlus, AlertCircle } from 'lucide-react';
import type { Role } from '@/lib/types';

const ROLE_ICON: Record<string, typeof GraduationCap> = {
  siswa: GraduationCap,
  guru_mapel: BookOpen,
  wali_kelas: Users,
  admin: ShieldCheck,
};

const ROLE_LABEL: Record<string, string> = {
  siswa: 'Siswa',
  guru_mapel: 'Guru Mapel',
  wali_kelas: 'Wali Kelas',
  admin: 'Admin (Guru BK)',
};

const ROLE_COLORS: Record<string, string> = {
  siswa: 'border-green-300 bg-green-50 text-green-700',
  guru_mapel: 'border-blue-300 bg-blue-50 text-blue-700',
  wali_kelas: 'border-purple-300 bg-purple-50 text-purple-700',
  admin: 'border-orange-300 bg-orange-50 text-orange-700',
};

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, error, clearError } = useApp();
  const [regError, setRegError] = useState('');

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  const [regRole, setRegRole] = useState<Role>('siswa');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [siswaNama, setSiswaNama] = useState('');
  const [siswaNis, setSiswaNis] = useState('');
  const [siswaJK, setSiswaJK] = useState('L');
  const [siswaKelas, setSiswaKelas] = useState('KLS01');

  const [guruNama, setGuruNama] = useState('');
  const [guruMapel, setGuruMapel] = useState('');
  const [guruKelas, setGuruKelas] = useState('');

  const [adminNama, setAdminNama] = useState('');
  const [adminUsername, setAdminUsername] = useState('');

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError('');
    clearError();
    if (!regEmail || !regPassword) return;

    if (regRole === 'siswa' && siswaNis) {
      const dup = siswaList.find(s => s.nis === siswaNis);
      if (dup) { setRegError('NIS sudah terdaftar.'); return; }
    }

    const base = { email: regEmail, password: regPassword, role: regRole };

    let data: Record<string, unknown>;
    if (regRole === 'siswa') {
      if (!siswaNama || !siswaNis) return;
      data = { ...base, namaLengkap: siswaNama, nis: siswaNis, jenisKelamin: siswaJK, idKelas: siswaKelas };
    } else if (regRole === 'guru_mapel') {
      if (!guruNama) return;
      data = { ...base, namaGuru: guruNama, mataPelajaran: guruMapel, idKelas: guruKelas || undefined };
    } else if (regRole === 'wali_kelas') {
      if (!guruNama) return;
      data = { ...base, namaGuru: guruNama, idKelas: guruKelas || undefined };
    } else {
      if (!adminNama) return;
      data = { ...base, namaAdmin: adminNama, username: adminUsername || regEmail.split('@')[0] };
    }

    const result = register(data as never);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setRegError(result.error || 'Gagal mendaftarkan akun. Silakan coba lagi.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)' }}>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white mb-1">SIPADU</h1>
        <p className="text-blue-200">Sistem Presensi Digital Siswa SMP N 4 Banguntapan</p>
      </div>

      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5" /> Daftar Akun Baru
        </h2>

        {(error || regError) && (
          <div className="flex items-start gap-2 p-3 mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{regError || error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Daftar Sebagai</label>
            <div className="grid grid-cols-2 gap-2">
              {(['siswa', 'guru_mapel', 'wali_kelas', 'admin'] as Role[]).map(r => (
                <button key={r} type="button" onClick={() => setRegRole(r)}
                  className={`flex items-center gap-1.5 p-2 rounded-lg border-2 text-xs font-medium transition-all cursor-pointer
                    ${regRole === r ? ROLE_COLORS[r] : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  {createElement(ROLE_ICON[r], { className: 'w-4 h-4 shrink-0' })}
                  {ROLE_LABEL[r]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)}
              placeholder="email@contoh.sch.id" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)}
              placeholder="Minimal 6 karakter" required minLength={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>

          {regRole === 'siswa' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input type="text" value={siswaNama} onChange={e => setSiswaNama(e.target.value)}
                  placeholder="Nama lengkap siswa" required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">NIS</label>
                  <input type="text" value={siswaNis} onChange={e => setSiswaNis(e.target.value)}
                    placeholder="Nomor Induk Siswa" required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jenis Kelamin</label>
                  <select value={siswaJK} onChange={e => setSiswaJK(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kelas</label>
                <select value={siswaKelas} onChange={e => setSiswaKelas(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  {kelasList.map(k => <option key={k.idKelas} value={k.idKelas}>{k.namaKelas}</option>)}
                </select>
              </div>
            </>
          )}

          {(regRole === 'guru_mapel' || regRole === 'wali_kelas') && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input type="text" value={guruNama} onChange={e => setGuruNama(e.target.value)}
                  placeholder="Nama lengkap guru" required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              {regRole === 'guru_mapel' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Mata Pelajaran</label>
                  <input type="text" value={guruMapel} onChange={e => setGuruMapel(e.target.value)}
                    placeholder="Contoh: Matematika"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">ID Kelas (opsional)</label>
                <input type="text" value={guruKelas} onChange={e => setGuruKelas(e.target.value)}
                  placeholder={regRole === 'wali_kelas' ? 'Kelas binaan, contoh: KLS01' : 'Kelas diampu (opsional)'}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
            </>
          )}

          {regRole === 'admin' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input type="text" value={adminNama} onChange={e => setAdminNama(e.target.value)}
                  placeholder="Nama lengkap admin" required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input type="text" value={adminUsername} onChange={e => setAdminUsername(e.target.value)}
                  placeholder="Nama pengguna (biarkan kosong untuk otomatis)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
            </>
          )}

          <button type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer">
            Daftar & Masuk
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{' '}
          <button onClick={() => router.push('/login')}
            className="text-blue-600 hover:underline font-medium cursor-pointer">
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
}
