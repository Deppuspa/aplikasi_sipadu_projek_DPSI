import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const db = getDb();

    const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password) as any;
    if (!user) {
      return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 });
    }

    const profile = resolveProfile(db, user.role, user.ref_id);
    if (!profile) {
      return NextResponse.json({ error: 'Data pengguna tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ user: { ...profile, role: user.role } });
  } catch (e: any) {
    console.error('Login error:', e.message || e);
    return NextResponse.json({ error: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}

function toCamel(r: any): any {
  const obj: any = {};
  for (const key of Object.keys(r)) {
    const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    obj[camel] = r[key];
  }
  return obj;
}

function resolveProfile(db: ReturnType<typeof getDb>, role: string, refId: string) {
  if (role === 'siswa') {
    const r = db.prepare('SELECT * FROM siswa WHERE nis = ?').get(refId) as any;
    return r ? toCamel(r) : null;
  }
  if (role === 'guru_mapel' || role === 'wali_kelas') {
    const r = db.prepare('SELECT * FROM guru WHERE id_guru = ?').get(refId) as any;
    return r ? toCamel(r) : null;
  }
  if (role === 'admin') {
    const r = db.prepare('SELECT * FROM admin WHERE id_admin = ?').get(refId) as any;
    return r ? toCamel(r) : null;
  }
  return null;
}
