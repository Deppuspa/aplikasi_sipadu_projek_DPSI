import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDb();

    const existing = db.prepare('SELECT email FROM users WHERE email = ?').get(body.email);
    if (existing) {
      return NextResponse.json({ error: 'Email sudah terdaftar.' }, { status: 409 });
    }

    let refId = '';

    if (body.role === 'siswa') {
      refId = body.nis || `REG${Date.now()}`;
      db.prepare(`INSERT INTO siswa (nis, nama_lengkap, jenis_kelamin, id_kelas, email)
        VALUES (?, ?, ?, ?, ?)`).run(refId, body.namaLengkap || '', body.jenisKelamin || 'L', body.idKelas || 'KLS01', body.email);
    } else if (body.role === 'guru_mapel' || body.role === 'wali_kelas') {
      refId = `GRU${Date.now()}`;
      const guruRole = body.role === 'guru_mapel' ? 'guru_mapel' : body.role === 'wali_kelas' ? 'wali_kelas' : 'keduanya';
      db.prepare(`INSERT INTO guru (id_guru, nama_guru, email, role, id_kelas)
        VALUES (?, ?, ?, ?, ?)`).run(refId, body.namaGuru || '', body.email, guruRole, body.idKelas || null);
    } else if (body.role === 'admin') {
      refId = `ADM${Date.now()}`;
      db.prepare(`INSERT INTO admin (id_admin, nama_admin, email, username)
        VALUES (?, ?, ?, ?)`).run(refId, body.namaAdmin || '', body.email, body.username || '');
    } else {
      return NextResponse.json({ error: 'Role tidak valid.' }, { status: 400 });
    }

    db.prepare(`INSERT INTO users (email, password, role, ref_id) VALUES (?, ?, ?, ?)`)
      .run(body.email, body.password, body.role, refId);

    return NextResponse.json({ success: true, refId });
  } catch (e) {
    return NextResponse.json({ error: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}
