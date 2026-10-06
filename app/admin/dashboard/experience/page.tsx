'use client';

import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { Chips, DeleteButton, Drawer, Field, PageHead, Reorder, Skeleton, Toast, Toggle, move, useSection } from '@/components/admin/ui';

interface Role {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  year: string;
  description: string[];
  technologies: string[];
  current: boolean;
}

const blank = (): Role => ({ id: '', title: '', company: '', location: '', period: '', year: '', description: [], technologies: [], current: false });

export default function ExperienceAdmin() {
  const { data: roles, loading, saving, save, status } = useSection<Role[]>('experience', []);
  const [editing, setEditing] = useState<Role | null>(null);
  const [bullets, setBullets] = useState('');
  const [index, setIndex] = useState<number | null>(null);

  const open = (r: Role | null, i: number | null) => {
    const v = r ? { ...blank(), ...r } : blank();
    setEditing(v); setBullets(v.description.join('\n')); setIndex(i);
  };
  const close = () => { setEditing(null); setIndex(null); };
  const set = <K extends keyof Role>(k: K, v: Role[K]) => editing && setEditing({ ...editing, [k]: v });

  const submit = async () => {
    if (!editing) return;
    const r: Role = {
      ...editing,
      description: bullets.split('\n').map((s) => s.trim()).filter(Boolean),
      id: editing.id || editing.company.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
      year: editing.year || (editing.period.match(/\d{4}/)?.[0] ?? ''),
    };
    const next = index === null ? [...roles, r] : roles.map((x, i) => (i === index ? r : x));
    if (await save(next)) close();
  };

  return (
    <>
      <PageHead title="Experience" lead="Shown under “Where I've worked”. Current roles come first, followed by your freelance work, then past roles in this order.">
        <button className="adm-btn solid" onClick={() => open(null, null)}><Plus size={16} />Add role</button>
      </PageHead>

      {loading ? <Skeleton rows={3} /> : roles.length === 0 ? (
        <div className="adm-empty"><b>No roles yet</b>Add your current job first.</div>
      ) : (
        <div className="adm-list">
          {roles.map((r, i) => (
            <div className="adm-row" key={`${r.company}-${i}`} style={{ gridTemplateColumns: 'minmax(0,1fr) auto' }}>
              <div style={{ minWidth: 0 }}>
                <h3>{r.title}{r.current && <span className="adm-pill now">Current</span>}</h3>
                <p className="sub">{r.company}{r.location ? `, ${r.location}` : ''} · {r.period}</p>
                <p className="sub" style={{ color: 'var(--dim)' }}>{r.description[0] || 'No description yet'}</p>
              </div>
              <div className="tools">
                <Reorder i={i} n={roles.length} label={r.title} onMove={(to) => save(move(roles, i, to))} />
                <button className="adm-icon" onClick={() => open(r, i)} aria-label={`Edit ${r.title}`}><Pencil size={16} /></button>
                <DeleteButton label={r.company || 'role'} onConfirm={() => save(roles.filter((_, j) => j !== i))} />
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Drawer title={index === null ? 'New role' : 'Edit role'} onClose={close} onSave={submit} saving={saving} saveLabel={index === null ? 'Add role' : 'Save changes'}>
          <div className="adm-grid">
            <Field id="r-title" label="Job title"><input id="r-title" className="adm-input" value={editing.title} onChange={(e) => set('title', e.target.value)} required /></Field>
            <Field id="r-co" label="Company"><input id="r-co" className="adm-input" value={editing.company} onChange={(e) => set('company', e.target.value)} required /></Field>
            <Field id="r-loc" label="Location"><input id="r-loc" className="adm-input" value={editing.location} onChange={(e) => set('location', e.target.value)} placeholder="Islamabad, Pakistan" /></Field>
            <Field id="r-per" label="Period" hint='e.g. "Aug 2025 – Present"'><input id="r-per" className="adm-input" value={editing.period} onChange={(e) => set('period', e.target.value)} required /></Field>
            <div className="full"><Toggle checked={editing.current} onChange={(v) => set('current', v)} label="I work here now" /></div>
            <div className="full"><Field id="r-desc" label="What you did" hint="One point per line. The first line is shown on the site.">
              <textarea id="r-desc" className="adm-textarea" rows={5} value={bullets} onChange={(e) => setBullets(e.target.value)} />
            </Field></div>
            <div className="full"><Field id="r-tech" label="Technologies"><Chips id="r-tech" value={editing.technologies} onChange={(v) => set('technologies', v)} placeholder="React" /></Field></div>
          </div>
        </Drawer>
      )}

      <Toast status={status} />
    </>
  );
}
