import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = getDb();
    const presensi = db.prepare('SELECT * FROM presensi WHERE id_presensi = ?').get(id) as any;
    if (!presensi) {
      return NextResponse.json({ error: 'Presensi tidak ditemukan.' }, { status: 404 });
    }

    const newStatus = presensi.status_hadir ? 0 : 1;
    const newManual = newStatus ? 'hadir' : 'tidak_hadir';
    db.prepare('UPDATE presensi SET status_hadir = ?, status_manual = ? WHERE id_presensi = ?')
      .run(newStatus, newManual, id);

    return NextResponse.json({ success: true, statusHadir: !!newStatus, statusManual: newManual });
  } catch (e) {
    return NextResponse.json({ error: 'Gagal mengubah status presensi.' }, { status: 500 });
  }
}
