import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function POST(req: Request) {
  try {
    const { nis, tanggal, jenis, keterangan, bukti } = await req.json();
    const db = getDb();

    const idIzin = `IZN${Date.now()}${Math.random().toString(36).slice(2, 6)}`;
    db.prepare(`INSERT INTO izin (id_izin, nis, tanggal_izin, jenis_izin, keterangan, bukti_pendukung, status_izin)
      VALUES (?, ?, ?, ?, ?, ?, 'menunggu')`)
      .run(idIzin, nis, tanggal, jenis, keterangan, bukti || '');

    return NextResponse.json({ success: true, idIzin });
  } catch (e) {
    return NextResponse.json({ error: 'Gagal mengajukan izin.' }, { status: 500 });
  }
}
