import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();
    const db = getDb();

    const izin = db.prepare('SELECT * FROM izin WHERE id_izin = ?').get(id) as any;
    if (!izin) {
      return NextResponse.json({ error: 'Izin tidak ditemukan.' }, { status: 404 });
    }

    if (!['menunggu', 'disetujui', 'ditolak'].includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid.' }, { status: 400 });
    }

    db.prepare('UPDATE izin SET status_izin = ? WHERE id_izin = ?').run(status, id);
    return NextResponse.json({ success: true, status });
  } catch (e) {
    return NextResponse.json({ error: 'Gagal mengupdate status izin.' }, { status: 500 });
  }
}
