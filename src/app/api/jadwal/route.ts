import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const db = getDb();

    const idJadwal = `JDP${Date.now()}`;
    db.prepare(`INSERT INTO jadwal_pelajaran (id_jadwal, id_kelas, id_guru, hari, jam_mulai, jam_selesai, mata_pelajaran, semester)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(idJadwal, data.idKelas, data.idGuru, data.hari, data.jamMulai, data.jamSelesai, data.mataPelajaran, data.semester || '2025/2026-Ganjil');

    return NextResponse.json({ success: true, idJadwal });
  } catch (e) {
    return NextResponse.json({ error: 'Gagal menambah jadwal.' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const guru = searchParams.get('guru');
    const kelas = searchParams.get('kelas');
    const db = getDb();

    let sql = 'SELECT * FROM jadwal_pelajaran';
    const params: string[] = [];

    if (guru) {
      sql += ' WHERE id_guru = ?';
      params.push(guru);
    } else if (kelas) {
      sql += ' WHERE id_kelas = ?';
      params.push(kelas);
    }

    sql += ' ORDER BY CASE hari WHEN \'Senin\' THEN 1 WHEN \'Selasa\' THEN 2 WHEN \'Rabu\' THEN 3 WHEN \'Kamis\' THEN 4 WHEN \'Jumat\' THEN 5 WHEN \'Sabtu\' THEN 6 ELSE 7 END, jam_mulai';

    const rows = db.prepare(sql).all(...params);
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json({ error: 'Gagal memuat jadwal.' }, { status: 500 });
  }
}
