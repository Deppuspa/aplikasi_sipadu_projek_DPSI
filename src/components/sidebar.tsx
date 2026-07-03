'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import type { User, Role } from '@/lib/types';
import {
  LayoutDashboard, CheckSquare, FileText, ClipboardCheck, Eye, Calendar,
  BarChart3, Shield, LogOut, GraduationCap, Menu, X, Database,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
  roles: Role[];
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', roles: ['siswa', 'guru_mapel', 'wali_kelas', 'admin'] },

  // Siswa
  { id: 'izin', label: 'Ajukan Izin', icon: FileText, href: '/izin', roles: ['siswa'] },
  { id: 'riwayat', label: 'Riwayat Kehadiran', icon: ClipboardCheck, href: '/riwayat', roles: ['siswa'] },

  // Guru Mapel
  { id: 'presensi', label: 'Presensi Jam Pelajaran', icon: CheckSquare, href: '/presensi', roles: ['guru_mapel', 'wali_kelas'] },
  { id: 'kehadiran', label: 'Data Kehadiran', icon: Eye, href: '/kehadiran', roles: ['guru_mapel', 'wali_kelas', 'admin'] },

  // Wali Kelas
  { id: 'verifikasi-izin', label: 'Verifikasi Izin', icon: FileText, href: '/verifikasi-izin', roles: ['wali_kelas', 'admin'] },
  { id: 'pantau-rekap', label: 'Pantau Rekap Kelas', icon: ClipboardCheck, href: '/pantau-rekap', roles: ['wali_kelas'] },

  // Admin
  { id: 'jadwal', label: 'Jadwal Pelajaran', icon: Calendar, href: '/jadwal', roles: ['admin'] },
  { id: 'laporan', label: 'Laporan Rekapitulasi', icon: BarChart3, href: '/laporan', roles: ['guru_mapel', 'wali_kelas', 'admin'] },
  { id: 'hak-akses', label: 'Hak Akses', icon: Shield, href: '/hak-akses', roles: ['admin'] },
];

function getInitial(name: string): string {
  return name?.charAt(0) || '?';
}

function getUserDisplay(user: User): string {
  if (user.role === 'siswa') return user.namaLengkap;
  if (user.role === 'admin') return user.namaAdmin;
  return user.namaGuru;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();

  if (!user) return null;

  const items = NAV_ITEMS.filter(it => it.roles.includes(user.role));
  const displayName = getUserDisplay(user);

  const handleNav = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
    onClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-600">SIPADU</h2>
            <p className="text-xs text-gray-500">SMP N 4 Banguntapan</p>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
          {getInitial(displayName)}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">{displayName}</div>
          <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
            {user.role === 'siswa' ? 'Siswa' : user.role === 'guru_mapel' ? 'Guru Mapel' : user.role === 'wali_kelas' ? 'Wali Kelas' : 'Admin (Guru BK)'}
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.href || (it.href !== '/dashboard' && pathname.startsWith(it.href));
          return (
            <button
              key={it.id}
              onClick={() => handleNav(it.href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left cursor-pointer
                ${active ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{it.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 border-r border-gray-200 bg-white">
        <div className="flex flex-col h-full">{sidebarContent.props.children}</div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-200 lg:hidden
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
