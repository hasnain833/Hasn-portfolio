'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, X } from 'lucide-react';

/* ---------- data: load + save one section ---------- */
type Status = { kind: 'ok' | 'err'; text: string } | null;

export function useSection<T>(section: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const flash = useCallback((s: Status) => {
    setStatus(s);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), s?.kind === 'err' ? 6000 : 2600);
  }, []);

  useEffect(() => {
    let alive = true;
    fetch(`/api/admin/data/${section}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { if (alive) setData((d ?? fallback) as T); })
      .catch(() => alive && flash({ kind: 'err', text: `Couldn't load ${section}. Check the database connection and reload.` }))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  /** Saves the whole section. Returns true on success. */
  const save = useCallback(async (next: T) => {
    const prev = data;
    setData(next);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/data/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stripIds(next)),
      });
      if (res.status === 401) throw new Error('Your session expired. Sign in again to save.');
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Save failed.');
      flash({ kind: 'ok', text: 'Saved. The site is updated.' });
      return true;
    } catch (e) {
      setData(prev);
      flash({ kind: 'err', text: e instanceof Error ? e.message : 'Save failed.' });
      return false;
    } finally {
      setSaving(false);
    }
  }, [data, section, flash]);

  return { data, setData, loading, saving, save, status };
}

// Mongo adds _id on insert; sending it back would collide on re-insert.
function stripIds<T>(v: T): T {
  if (Array.isArray(v)) return v.map((x) => stripIds(x)) as T;
  if (v && typeof v === 'object') {
    const { _id, ...rest } = v as Record<string, unknown>;
    void _id;
    return rest as T;
  }
  return v;
}

export function move<T>(list: T[], from: number, to: number) {
  const next = list.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/* ---------- pieces ---------- */
export function PageHead({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <div className="adm-head">
      <div>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
      {children && <div className="actions">{children}</div>}
    </div>
  );
}

export function Toast({ status }: { status: Status }) {
  return (
    <div className={`adm-toast${status ? ' on' : ''}${status?.kind === 'err' ? ' err' : ''}`} role="status" aria-live="polite">
      {status?.text}
    </div>
  );
}

export function Reorder({ i, n, onMove, label }: { i: number; n: number; onMove: (to: number) => void; label: string }) {
  return (
    <>
      <button type="button" className="adm-icon" disabled={i === 0} onClick={() => onMove(i - 1)} aria-label={`Move ${label} up`}><ArrowUp size={16} /></button>
      <button type="button" className="adm-icon" disabled={i === n - 1} onClick={() => onMove(i + 1)} aria-label={`Move ${label} down`}><ArrowDown size={16} /></button>
    </>
  );
}

export function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="adm-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

export function Chips({ id, value, onChange, placeholder }: { id: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState('');
  const add = (raw: string) => {
    const parts = raw.split(',').map((s) => s.trim()).filter(Boolean).filter((s) => !value.includes(s));
    if (parts.length) onChange([...value, ...parts]);
    setDraft('');
  };
  return (
    <div className="adm-chips" onClick={() => document.getElementById(id)?.focus()}>
      {value.map((v, i) => (
        <span className="adm-chip" key={`${v}-${i}`}>
          {v}
          <button type="button" aria-label={`Remove ${v}`} onClick={(e) => { e.stopPropagation(); onChange(value.filter((_, j) => j !== i)); }}><X size={12} /></button>
        </span>
      ))}
      <input
        id={id}
        value={draft}
        placeholder={value.length ? '' : placeholder}
        onChange={(e) => (e.target.value.includes(',') ? add(e.target.value) : setDraft(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); add(draft); }
          if (e.key === 'Backspace' && !draft && value.length) onChange(value.slice(0, -1));
        }}
        onBlur={() => draft && add(draft)}
      />
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className="adm-toggle" onClick={() => onChange(!checked)}>
      <i />{label}
    </button>
  );
}

export function Drawer({ title, onClose, onSave, saving, saveLabel = 'Save', children }: {
  title: string; onClose: () => void; onSave: () => void; saving?: boolean; saveLabel?: string; children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <>
      <div className="adm-scrim" onClick={onClose} />
      <section className="adm-drawer" role="dialog" aria-modal="true" aria-label={title}>
        <header>
          <h2>{title}</h2>
          <button type="button" className="adm-icon" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </header>
        <form className="body" id="adm-form" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
          {children}
        </form>
        <footer>
          <button type="button" className="adm-btn line" onClick={onClose}>Cancel</button>
          <button type="submit" form="adm-form" className="adm-btn solid" disabled={saving}>
            {saving ? <span className="adm-spin" /> : null}{saving ? 'Saving' : saveLabel}
          </button>
        </footer>
      </section>
    </>
  );
}

/** Two-step delete: first click arms it, second click within 3s deletes. */
export function DeleteButton({ label, onConfirm }: { label: string; onConfirm: () => void }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 3000);
    return () => clearTimeout(t);
  }, [armed]);
  return armed ? (
    <button type="button" className="adm-btn danger" style={{ minHeight: 36, padding: '0 12px' }} onClick={onConfirm}>Delete {label}?</button>
  ) : (
    <button type="button" className="adm-icon bad" onClick={() => setArmed(true)} aria-label={`Delete ${label}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>
    </button>
  );
}

export function Skeleton({ rows = 4 }: { rows?: number }) {
  return <div aria-busy="true" aria-label="Loading">{Array.from({ length: rows }, (_, i) => <div className="adm-skel" key={i} />)}</div>;
}
