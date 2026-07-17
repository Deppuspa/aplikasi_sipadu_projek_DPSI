import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function POST(req: Request) {
  try {
    const { jadwalId, guruId, tanggal, data } = await req.json();
    const db = getDb();

    // Remove existing presensi for same jadwal+tanggal
    db.prepare('DELETE FROM presensi WHERE id_jadwal = ? AND tanggal = ?').run(jadwalId, tanggal);

    const insert = db.prepare(`INSERT INTO presensi (id_presensi, nis, id_jadwal, id_guru, tanggal, status_hadir, status_manual)
      VALUES (?, ?, ?, ?, ?, ?, ?)`);

    const transaction = db.transaction(() => {
      for (const [nis, hadir] of Object.entries(data)) {
        const idPresensi = `PRS${Date.now()}${Math.random().toString(36).slice(2, 6)}`;
        const izinDisetujui = db.prepare(
          `SELECT COUNT(*) as cnt FROM izin WHERE nis = ? AND tanggal_izin = ? AND status_izin = 'disetujui'`
        ).get(nis, tanggal) as any;

        let statusManual = !hadir ? 'tidak_hadir' : (izinDisetujui.cnt > 0 ? 'izin' : 'hadir');
        insert.run(idPresensi, nis, jadwalId, guruId, tanggal, hadir ? 1 : 0, statusManual);
      }
    });

    transaction();

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Gagal menyimpan presensi.' }, { status: 500 });
  }
}
