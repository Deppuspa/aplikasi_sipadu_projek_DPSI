'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, error, clearError } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    if (!email || !password) return;
    if (login(email, password)) {
      router.push('/dashboard');
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
          <LogIn className="w-5 h-5" /> Masuk ke Sistem
        </h2>

        {error && (
          <div className="flex items-start gap-2 p-3 mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="contoh@email.sch.id" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Masukkan password" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <button type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer">
            Masuk
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Belum punya akun?{' '}
          <button onClick={() => router.push('/register')}
            className="text-blue-600 hover:underline font-medium cursor-pointer">
            Daftar di sini
          </button>
        </p>

        <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-700">
          <strong>Akun Demo:</strong><br />
          Siswa: budi@siswa.sch.id / siswa123<br />
          Guru: siti.rahma@guru.sch.id / guru123<br />
          Wali Kelas: ahmad.hidayat@guru.sch.id / guru123<br />
          Admin: dewi.sartika@admin.sch.id / admin123
        </div>
      </div>
    </div>
  );
}
