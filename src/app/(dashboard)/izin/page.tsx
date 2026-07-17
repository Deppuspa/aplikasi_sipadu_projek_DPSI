'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { addIzin, getIzinSiswa, izinList } from '@/lib/mock-data';
import { formatDateShort, todayStr, type Role } from '@/lib/types';
import { Send, AlertCircle, Camera, Video, Upload, X, RefreshCw, Eye } from 'lucide-react';

const ALLOWED_ROLES: Role[] = ['siswa'];

function BuktiCapture({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [mode, setMode] = useState<'camera' | 'file'>('camera');
  const [camMode, setCamMode] = useState<'photo' | 'video'>('photo');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [err, setErr] = useState('');
  const [recording, setRecording] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const [facing, setFacing] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mrRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'camera') startCam();
    else stopCam();
    return stopCam;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, camMode, facing]);

  async function startCam() {
    stopCam();
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 640 }, height: { ideal: 480 } },
        audio: camMode === 'video',
      });
      setStream(s);
      setErr('');
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {
      setErr('Tidak dapat mengakses kamera. Periksa izin kamera.');
    }
  }

  function stopCam() {
    if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null); }
    if (mrRef.current && recording) { mrRef.current.stop(); setRecording(false); }
  }

  function capturePhoto() {
    const v = videoRef.current, c = canvasRef.current;
    if (!v || !c) return;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext('2d')?.drawImage(v, 0, 0);
    const dataUrl = c.toDataURL('image/jpeg', 0.8);
    setPreview(dataUrl); onChange(dataUrl);
  }

  function startRecord() {
    if (!stream) return;
    chunksRef.current = [];
    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus'
      : MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'video/mp4';
    const mr = new MediaRecorder(stream, { mimeType: mime });
    mrRef.current = mr;
    mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const r = new FileReader();
      r.onloadend = () => { const d = r.result as string; setPreview(d); onChange(d); };
      r.readAsDataURL(blob);
    };
    mr.start(); setRecording(true);
    setTimeout(() => { if (mrRef.current && mr.state === 'recording') mrRef.current.stop(); setRecording(false); }, 10000);
  }

  function stopRecord() {
    if (mrRef.current && mrRef.current.state === 'recording') { mrRef.current.stop(); setRecording(false); }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onloadend = () => { const d = r.result as string; setPreview(d); onChange(d); };
    r.readAsDataURL(f);
  }

  function clear() {
    setPreview(''); onChange('');
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button type="button" onClick={() => { setMode('camera'); setErr(''); }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${mode === 'camera' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <Camera className="w-3.5 h-3.5" /> Kamera
        </button>
        <button type="button" onClick={() => { setMode('file'); stopCam(); setErr(''); }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${mode === 'file' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <Upload className="w-3.5 h-3.5" /> File / Galeri
        </button>
      </div>

      {err && <div className="p-2 rounded bg-red-50 text-red-600 text-xs">{err}</div>}

      {mode === 'camera' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <button type="button" onClick={() => setCamMode('photo')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${camMode === 'photo' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-500'}`}>
              <Camera className="w-3.5 h-3.5" /> Foto
            </button>
            <button type="button" onClick={() => setCamMode('video')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${camMode === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-500'}`}>
              <Video className="w-3.5 h-3.5" /> Video
            </button>
          </div>

          {!preview ? (
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay playsInline muted className="w-full max-h-[280px] object-contain" />
              <canvas ref={canvasRef} className="hidden" />
              <button type="button" onClick={() => setFacing(f => f === 'user' ? 'environment' : 'user')}
                className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 cursor-pointer">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              {preview.startsWith('data:image') ? (
                <img src={preview} alt="Preview" className="w-full max-h-[280px] object-contain" />
              ) : (
                <video src={preview} controls className="w-full max-h-[280px]" />
              )}
              <button type="button" onClick={clear}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {!preview && camMode === 'photo' && (
            <button type="button" onClick={capturePhoto}
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer">
              Ambil Foto
            </button>
          )}
          {!preview && camMode === 'video' && (
            <button type="button" onClick={recording ? stopRecord : startRecord}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium cursor-pointer ${recording ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {recording ? '⏺ Rekam... (max 10 detik)' : 'Rekam Video (max 10 detik)'}
            </button>
          )}
        </div>
      )}

      {mode === 'file' && (
        <div className="space-y-2">
          <input ref={fileRef} type="file" accept="image/*,video/*" capture="environment"
            onChange={handleFile}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 file:text-xs file:font-medium cursor-pointer" />
          {preview && (
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              {preview.startsWith('data:image') ? (
                <img src={preview} alt="Preview" className="w-full max-h-[200px] object-contain" />
              ) : (
                <video src={preview} controls className="w-full max-h-[200px]" />
              )}
              <button type="button" onClick={clear}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <p className="text-xs text-gray-500">Atau pilih foto/video dari galeri perangkat Anda</p>
        </div>
      )}
    </div>
  );
}

function ModalPreview({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="max-w-2xl max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        {src.startsWith('data:image') ? (
          <img src={src} alt="Bukti" className="max-w-full max-h-[85vh] rounded-lg" />
        ) : (
          <video src={src} controls className="max-w-full max-h-[85vh] rounded-lg" />
        )}
        <button onClick={onClose}
          className="mt-3 px-4 py-2 bg-white text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 cursor-pointer">
          Tutup
        </button>
      </div>
    </div>
  );
}

export default function IzinPage() {
  const router = useRouter();
  const { user } = useApp();
  const [tanggal, setTanggal] = useState('');
  const [jenis, setJenis] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [bukti, setBukti] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [previewModal, setPreviewModal] = useState('');

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!ALLOWED_ROLES.includes(user.role)) router.push('/dashboard');
  }, [user, router]);

  if (!user) return null;
  if (user.role !== 'siswa') return null;

  const nisSaya = user.nis;
  const izinSaya = getIzinSiswa(nisSaya);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg('');
    if (!tanggal || !jenis || !keterangan) return;

    if (tanggal > todayStr()) {
      setErrMsg('Tanggal izin tidak boleh di masa depan.');
      return;
    }

    const dup = izinList.some(i =>
      i.nis === nisSaya && i.tanggalIzin === tanggal &&
      (i.statusIzin === 'menunggu' || i.statusIzin === 'disetujui')
    );
    if (dup) {
      setErrMsg('Anda sudah memiliki pengajuan izin untuk tanggal ini.');
      return;
    }

    await addIzin(nisSaya, tanggal, jenis as 'sakit' | 'izin' | 'lainnya', keterangan, bukti || '(tanpa file)');
    setSubmitted(true);
    setTanggal(''); setJenis(''); setKeterangan(''); setBukti('');
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Ajukan Izin Ketidakhadiran</h2>
      <p className="text-sm text-gray-500">Izin diajukan <strong>per hari</strong> — berlaku untuk seluruh jam pelajaran pada tanggal yang dipilih.</p>

      {submitted && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
          <Send className="w-4 h-4" /> Izin berhasil diajukan! Status: Menunggu verifikasi.
        </div>
      )}

      {errMsg && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Izin</label>
            <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)}
              required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jenis Izin</label>
            <select value={jenis} onChange={e => setJenis(e.target.value)}
              required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="">-- Pilih --</option>
              <option value="sakit">Sakit</option>
              <option value="izin">Izin</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Keterangan</label>
            <textarea value={keterangan} onChange={e => setKeterangan(e.target.value)}
              placeholder="Deskripsikan alasan ketidakhadiran..." required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[80px]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bukti Pendukung</label>
            <BuktiCapture value={bukti} onChange={setBukti} />
            <p className="text-xs text-gray-500 mt-1">Foto/video akan tersimpan sebagai lampiran pengajuan izin</p>
          </div>
          <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium cursor-pointer">
            <Send className="w-4 h-4" /> Ajukan Izin
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold mb-3">Riwayat Pengajuan Izin</h3>
        {izinSaya.length === 0 ? (
          <p className="text-gray-500 text-sm py-4 text-center">Belum ada pengajuan izin.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
                <th className="pb-2 pr-3">Tanggal</th><th className="pb-2 pr-3">Jenis</th><th className="pb-2 pr-3">Status</th><th className="pb-2 pr-3">Keterangan</th><th className="pb-2">Bukti</th>
              </tr></thead>
              <tbody>
                {izinSaya.slice().reverse().map(i => (
                  <tr key={i.idIzin} className="border-b border-gray-100">
                    <td className="py-2 pr-3">{formatDateShort(i.tanggalIzin)}</td>
                    <td className="py-2 pr-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                        ${i.jenisIzin === 'sakit' ? 'bg-blue-50 text-blue-700' : i.jenisIzin === 'izin' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{i.jenisIzin}</span>
                    </td>
                    <td className="py-2 pr-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                        ${i.statusIzin === 'menunggu' ? 'bg-yellow-50 text-yellow-700' : i.statusIzin === 'disetujui' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{i.statusIzin}</span>
                    </td>
                    <td className="py-2 pr-3 text-gray-600">{i.keterangan}</td>
                    <td className="py-2">
                      {i.buktiPendukung && i.buktiPendukung.startsWith('data:') ? (
                        <button onClick={() => setPreviewModal(i.buktiPendukung)}
                          className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer">
                          <Eye className="w-3 h-3" /> Lihat
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500">{i.buktiPendukung || '-'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {previewModal && <ModalPreview src={previewModal} onClose={() => setPreviewModal('')} />}
    </div>
  );
}
