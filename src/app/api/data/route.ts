import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { seedSampleData } from '@/lib/db/seed';
import fs from 'fs';
import path from 'path';

function toCamel(rows: any[]): any[] {
  return rows.map((r: any) => {
    const obj: any = {};
    for (const key of Object.keys(r)) {
      const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      obj[camel] = r[key];
    }
    return obj;
  });
}

export async function GET() {
  try {
    const db = getDb();
    seedSampleData();

    const siswaList = toCamel(db.prepare('SELECT * FROM siswa').all() as any[]);
    const guruList = toCamel(db.prepare('SELECT * FROM guru').all() as any[]);
    const adminList = toCamel(db.prepare('SELECT * FROM admin').all() as any[]);
    const kelasList = toCamel(db.prepare('SELECT * FROM kelas').all() as any[]);
    const jadwalList = toCamel(db.prepare('SELECT * FROM jadwal_pelajaran').all() as any[]);
    const presensiList = toCamel(db.prepare('SELECT * FROM presensi').all() as any[]);
    const izinList = toCamel(db.prepare('SELECT * FROM izin').all() as any[]);
    const users = toCamel(db.prepare('SELECT email, role, ref_id FROM users').all() as any[]);

    return NextResponse.json({
      siswaList, guruList, adminList, kelasList, jadwalList, presensiList, izinList,
      registeredAccounts: users,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Gagal memuat data.' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const dbPath = path.join(process.cwd(), 'sipadu.db');
    const walPath = dbPath + '-wal';
    const shmPath = dbPath + '-shm';

    const db = getDb();
    db.close();

    for (const p of [dbPath, walPath, shmPath]) {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }

    const freshDb = getDb();
    seedSampleData();

    return NextResponse.json({ success: true, message: 'Data berhasil di-reset.' });
  } catch (e) {
    return NextResponse.json({ error: 'Gagal mereset data.' }, { status: 500 });
  }
}
