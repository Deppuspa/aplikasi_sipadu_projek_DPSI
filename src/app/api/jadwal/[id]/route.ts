import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const data = await req.json();
    const db = getDb();

    const existing = db.prepare('SELECT * FROM jadwal_pelajaran WHERE id_jadwal = ?').get(id) as any;
    if (!existing) {
      return NextResponse.json({ error: 'Jadwal tidak ditemukan.' }, { status: 404 });
    }

    const fields: string[] = [];
    const values: any[] = [];

    const fieldMap: Record<string, string> = {
      idKelas: 'id_kelas', idGuru: 'id_guru', hari: 'hari',
      jamMulai: 'jam_mulai', jamSelesai: 'jam_selesai',
      mataPelajaran: 'mata_pelajaran', semester: 'semester',
    };

    for (const [key, col] of Object.entries(fieldMap)) {
      if (data[key] !== undefined) {
        fields.push(`${col} = ?`);
        values.push(data[key]);
      }
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: 'Tidak ada field yang diupdate.' }, { status: 400 });
    }

    values.push(id);
    db.prepare(`UPDATE jadwal_pelajaran SET ${fields.join(', ')} WHERE id_jadwal = ?`).run(...values);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Gagal mengupdate jadwal.' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = getDb();
    const existing = db.prepare('SELECT * FROM jadwal_pelajaran WHERE id_jadwal = ?').get(id) as any;

    if (!existing) {
      return NextResponse.json({ error: 'Jadwal tidak ditemukan.' }, { status: 404 });
    }

    db.prepare('DELETE FROM jadwal_pelajaran WHERE id_jadwal = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Gagal menghapus jadwal.' }, { status: 500 });
  }
}
