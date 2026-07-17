'use client';

import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import {
  presensiList, izinList, jadwalList, getIzinSiswa, getSiswaByKelas,
  getJadwalByGuru, getJadwalByKelas, getKelas, getGuru,
  siswaList, guruList, kelasList, resetAllData,
} from '@/lib/mock-data';
import { getHariName, formatDateShort, type User } from '@/lib/types';
import { BookOpen, Users, Calendar, FileText, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function StatCard({ icon: Icon, label, value, color, detail }: {
  icon: typeof BookOpen; label: string; value: string | number; color: string; detail?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold mt-1" style={{ color }}>{value}</p>
          {detail && <p className="text-xs text-gray-500 mt-1">{detail}</p>}
        </div>
        <div className="p-2.5 rounded-lg" style={{ backgroundColor: color + '15' }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  const hariIni = getHariName(new Date());
  if (user.role === 'siswa') return <SiswaDashboard user={user} />;
  if (user.role === 'guru_mapel') return <GuruDashboard user={user} hariIni={hariIni} />;
  if (user.role === 'wali_kelas') return <WaliDashboard user={user} hariIni={hariIni} />;
  return <AdminDashboard user={user} />;
}

function SiswaDashboard({ user }: { user: User & { role: 'siswa' } }) {
  const izinSaya = getIzinSiswa(user.nis);
  const pSaya = presensiList.filter(p => p.nis === user.nis);
  const hadir = pSaya.filter(p => p.statusHadir).length;
  const th = pSaya.length - hadir;
  const menunggu = izinSaya.filter(i => i.statusIzin === 'menunggu').length;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Dashboard Siswa</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={CheckCircle} label="Total Hadir" value={hadir} color="#16a34a" detail={`dari ${pSaya.length} sesi`} />
        <StatCard icon={AlertTriangle} label="Total Tidak Hadir" value={th} color="#dc2626" detail={`dari ${pSaya.length} sesi`} />
        <StatCard icon={FileText} label="Izin Menunggu" value={menunggu} color="#d97706" detail={`${izinSaya.length} total pengajuan`} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold mb-3">Pengajuan Izin Terbaru</h3>
        {izinSaya.length === 0 ? (
          <p className="text-gray-500 text-sm py-4 text-center">Belum ada pengajuan izin.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                <th className="pb-2 pr-3">Tanggal</th><th className="pb-2 pr-3">Jenis</th><th className="pb-2 pr-3">Status</th><th className="pb-2">Keterangan</th>
              </tr></thead>
              <tbody>
                {izinSaya.slice(-5).reverse().map(i => (
                  <tr key={i.idIzin} className="border-b border-gray-100">
                    <td className="py-2 pr-3">{formatDateShort(i.tanggalIzin)}</td>
                    <td className="py-2 pr-3"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                      ${i.jenisIzin === 'sakit' ? 'bg-blue-50 text-blue-700' : i.jenisIzin === 'izin' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{i.jenisIzin}</span></td>
                    <td className="py-2 pr-3"><StatusBadge status={i.statusIzin} /></td>
                    <td className="py-2 text-gray-600">{i.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold mb-3">Riwayat Presensi (5 Terakhir)</h3>
        {pSaya.length === 0 ? (
          <p className="text-gray-500 text-sm py-4 text-center">Belum ada data presensi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                <th className="pb-2 pr-3">Tanggal</th><th className="pb-2 pr-3">Mapel</th><th className="pb-2 pr-3">Guru</th><th className="pb-2">Status</th>
              </tr></thead>
              <tbody>
                {pSaya.slice(-5).reverse().map(p => {
                  const j = jadwalList.find(x => x.idJadwal === p.idJadwal);
                  const g = getGuru(p.idGuru);
                  return (
                    <tr key={p.idPresensi} className="border-b border-gray-100">
                      <td className="py-2 pr-3">{formatDateShort(p.tanggal)}</td>
                      <td className="py-2 pr-3">{j?.mataPelajaran || '-'}</td>
                      <td className="py-2 pr-3">{g?.namaGuru || '-'}</td>
                      <td className="py-2"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${p.statusHadir ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{p.statusHadir ? 'Hadir' : 'Tidak Hadir'}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function GuruDashboard({ user, hariIni }: { user: User & { role: 'guru_mapel' }; hariIni: string }) {
  const jadwalSaya = getJadwalByGuru(user.idGuru);
  const kelasDiampu = [...new Set(jadwalSaya.map(j => j.idKelas))].map(id => getKelas(id)).filter(Boolean);
  const jadwalHariIni = jadwalSaya.filter(j => j.hari === hariIni);
  const totalPresensiSaya = presensiList.filter(p => p.idGuru === user.idGuru).length;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Dashboard Guru Mapel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={BookOpen} label="Kelas Diampu" value={kelasDiampu.length} color="#2563eb" detail={kelasDiampu.map(k => k!.namaKelas).join(', ')} />
        <StatCard icon={Calendar} label="Jam Hari Ini" value={jadwalHariIni.length} color="#d97706" detail={hariIni} />
        <StatCard icon={CheckCircle} label="Presesi Tercatat" value={totalPresensiSaya} color="#16a34a" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold mb-3">Jadwal Mengajar Hari Ini ({hariIni})</h3>
        {jadwalHariIni.length === 0 ? (
          <p className="text-gray-500 text-sm py-4 text-center">Tidak ada jadwal mengajar hari ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                <th className="pb-2 pr-3">Jam</th><th className="pb-2 pr-3">Kelas</th><th className="pb-2 pr-3">Mapel</th><th className="pb-2">Aksi</th>
              </tr></thead>
              <tbody>
                {jadwalHariIni.map(j => {
                  const k = getKelas(j.idKelas);
                  return (
                    <tr key={j.idJadwal} className="border-b border-gray-100">
                      <td className="py-2 pr-3">{j.jamMulai} - {j.jamSelesai}</td>
                      <td className="py-2 pr-3">{k?.namaKelas || '-'}</td>
                      <td className="py-2 pr-3">{j.mataPelajaran}</td>
                      <td className="py-2">
                        <Link href="/presensi"
                          className="inline-block px-3 py-1.5 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                          Buka Presensi
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function WaliDashboard({ user, hariIni }: { user: User & { role: 'wali_kelas' }; hariIni: string }) {
  const kelasBinaan = getKelas(user.idKelas || '');
  const siswaBinaan = kelasBinaan ? getSiswaByKelas(kelasBinaan.idKelas) : [];
  const totalPresensiKelas = presensiList.filter(p => siswaBinaan.some(s => s.nis === p.nis));
  const jadwalHariIni = kelasBinaan ? getJadwalByKelas(kelasBinaan.idKelas).filter(j => j.hari === hariIni) : [];
  const izinMenunggu = izinList.filter(i => siswaBinaan.some(s => s.nis === i.nis) && i.statusIzin === 'menunggu').length;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Dashboard Wali Kelas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Kelas Binaan" value={kelasBinaan?.namaKelas || '-'} color="#7c3aed" detail={`${siswaBinaan.length} siswa`} />
        <StatCard icon={Calendar} label="Jam Hari Ini" value={jadwalHariIni.length} color="#d97706" detail={hariIni} />
        <StatCard icon={FileText} label="Izin Menunggu" value={izinMenunggu} color="#d97706" detail="Perlu verifikasi" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold mb-3">Rekap Cepat Kelas {kelasBinaan?.namaKelas || '-'}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
              <th className="pb-2 pr-3">Nama</th><th className="pb-2 pr-3">Hadir</th><th className="pb-2 pr-3">Tidak Hadir</th><th className="pb-2">Persentase</th>
            </tr></thead>
            <tbody>
              {siswaBinaan.map(s => {
                const pSiswa = totalPresensiKelas.filter(p => p.nis === s.nis);
                const h = pSiswa.filter(p => p.statusHadir).length;
                const total = pSiswa.length || 1;
                const pct = Math.round((h / total) * 100);
                return (
                  <tr key={s.nis} className="border-b border-gray-100">
                    <td className="py-2 pr-3">{s.namaLengkap}</td>
                    <td className="py-2 pr-3 font-semibold text-green-600">{h}</td>
                    <td className="py-2 pr-3 font-semibold text-red-600">{pSiswa.length - h}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${pct >= 60 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-medium">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ user: _user }: { user: User & { role: 'admin' } }) {
  const router = useRouter();
  const [confirmReset, setConfirmReset] = useState(false);
  const totalSiswa = siswaList.length;
  const totalGuru = guruList.length;
  const totalKelas = kelasList.length;
  const totalPresensi = presensiList.length;
  const izinMenunggu = izinList.filter(i => i.statusIzin === 'menunggu').length;
  const totalJadwal = jadwalList.length;

  async function handleReset() {
    await resetAllData();
    setConfirmReset(false);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Dashboard Admin (Guru BK)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Siswa" value={totalSiswa} color="#2563eb" detail={`${totalKelas} kelas`} />
        <StatCard icon={BookOpen} label="Total Guru" value={totalGuru} color="#7c3aed" detail={`${totalJadwal} jadwal`} />
        <StatCard icon={AlertTriangle} label="Izin Perlu Verifikasi" value={izinMenunggu} color="#d97706" detail={`${izinList.length} total`} />
        <StatCard icon={CheckCircle} label="Data Presensi" value={totalPresensi} color="#16a34a" detail="Record tersimpan" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold mb-3">Akses Cepat</h3>
        <div className="flex flex-wrap gap-3">
          <QuickLink href="/jadwal" label="Kelola Jadwal" color="blue" />
          <QuickLink href="/verifikasi-izin" label="Verifikasi Izin" color="amber" />
          <QuickLink href="/laporan" label="Lihat Laporan" color="green" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-5">
        <h3 className="font-semibold mb-2 text-red-700 flex items-center gap-2"><Trash2 className="w-4 h-4" /> Reset Data</h3>
        <p className="text-sm text-gray-600 mb-3">Hapus semua data yang tersimpan (presensi, izin, jadwal, akun registrasi) dan kembalikan ke data awal.</p>
        {!confirmReset ? (
          <button onClick={() => setConfirmReset(true)}
            className="px-4 py-2 text-sm font-medium rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer">
            Reset Semua Data
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-red-700">Yakin ingin mereset?</span>
            <button onClick={handleReset}
              className="px-4 py-2 text-sm font-medium rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer">
              Ya, Reset
            </button>
            <button onClick={() => setConfirmReset(false)}
              className="px-4 py-2 text-sm font-medium rounded bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer">
              Batal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    menunggu: 'bg-yellow-50 text-yellow-700',
    disetujui: 'bg-green-50 text-green-700',
    ditolak: 'bg-red-50 text-red-700',
  };
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
}

function QuickLink({ href, label, color }: { href: string; label: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    amber: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
    green: 'bg-green-50 text-green-700 hover:bg-green-100',
  };
  return (
    <Link href={href}
      className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${colors[color] || colors.blue}`}>
      {label}
    </Link>
  );
}

