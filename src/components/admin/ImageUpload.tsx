'use client';

import { useEffect, useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';

export default function ImageUpload({ id, value, onChange }: { id: string; value: string; onChange: (url: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(value);

  useEffect(() => setPreview(value), [value]);

  const upload = async (file: File) => {
    setError('');
    if (!/^image\/(jpe?g|png|webp|gif)$/.test(file.type)) { setError('Use a JPG, PNG, WebP or GIF image.'); return; }
    setBusy(true);
    setPreview(URL.createObjectURL(file));
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Upload failed.');
      onChange(data.url);
      setPreview(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.');
      setPreview(value);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-field">
      <label htmlFor={id}>Screenshot</label>
      <button
        type="button"
        className={`adm-drop${over ? ' over' : ''}`}
        onClick={() => !busy && input.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); const f = e.dataTransfer.files[0]; if (f) upload(f); }}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="pv"><img src={preview} alt="Screenshot preview" onError={() => setPreview('')} /></div>
        ) : (
          <div className="ph"><ImagePlus size={22} />Drop an image or click to upload<small>A full-page screenshot scrolls on hover on the site</small></div>
        )}
        {busy && <div className="busy"><span className="adm-spin" />Uploading</div>}
      </button>
      <input
        id={id}
        className="adm-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL or /img/path.png"
      />
      {error && <span className="hint" style={{ color: 'var(--bad)' }}>{error}</span>}
      <input ref={input} type="file" hidden accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }} />
    </div>
  );
}
