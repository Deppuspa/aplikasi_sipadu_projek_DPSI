'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { type Role } from '@/lib/types';
import { GraduationCap, BookOpen, Users, ShieldCheck, Check, X } from 'lucide-react';

export default function HakAksesPage() {
  const router = useRouter();
  const { user } = useApp();

  const ALLOWED_ROLES: Role[] = ['admin'];

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);

  if (!user || !ALLOWED_ROLES.includes(user.role)) return null;

  const roles = [
    {
      name: 'Siswa', icon: GraduationCap, color: 'green',
      permissions: [
        'Login terbatas (email/akun)',
        'Mengajukan izin ketidakhadiran',
        'Melihat riwayat kehadiran sendiri',
      ],
      restricted: [
        'Tidak dapat melakukan presensi',
        'Tidak dapat mengakses data siswa lain',
      ],
    },
    {
      name: 'Guru Mapel', icon: BookOpen, color: 'blue',
      permissions: [
        'Login akses guru',
        'Presensi pada kelas & jam yang diampu',
        'Lihat data kehadiran kelas diampu',
        'Lihat laporan absensi',
      ],
      restricted: [
        'Tidak dapat akses kelas lain',
      ],
    },
    {
      name: 'Wali Kelas', icon: Users, color: 'purple',
      permissions: [
        'Semua akses Guru Mapel (jika mengajar)',
        'Pantau rekap kehadiran kelas binaan (real-time)',
        'Verifikasi izin siswa kelas binaan',
        'Tindak lanjut siswa tidak hadir',
      ],
      restricted: [],
    },
    {
      name: 'Admin (Guru BK)', icon: ShieldCheck, color: 'orange',
      permissions: [
        'Akses penuh ke seluruh fitur sistem',
        'Kelola data presensi',
        'Atur jadwal pelajaran',
        'Verifikasi data presensi & izin',
        'Kelola hak akses pengguna',
        'Buat & unduh laporan',
      ],
      restricted: [],
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Kelola Hak Akses Pengguna</h2>
      <p className="text-sm text-gray-500">Admin (Guru BK) mengatur hak akses pengguna berdasarkan peran dalam sistem.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map(r => {
          const Icon = r.icon;
          const colorMap: Record<string, string> = {
            green: 'border-green-300',
            blue: 'border-blue-300',
            purple: 'border-purple-300',
            orange: 'border-orange-300',
          };
          const bgMap: Record<string, string> = {
            green: 'bg-green-50 text-green-700',
            blue: 'bg-blue-50 text-blue-700',
            purple: 'bg-purple-50 text-purple-700',
            orange: 'bg-orange-50 text-orange-700',
          };
          return (
            <div key={r.name} className={`bg-white rounded-lg shadow-sm border ${colorMap[r.color]} p-5`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${bgMap[r.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{r.name}</h3>
              </div>
              <div className="space-y-2">
                {r.permissions.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
                {r.restricted.map((p, i) => (
                  <div key={`r-${i}`} className="flex items-start gap-2 text-sm text-red-600">
                    <X className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
