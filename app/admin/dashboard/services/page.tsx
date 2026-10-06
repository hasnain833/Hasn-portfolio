'use client';

import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { Chips, DeleteButton, Drawer, Field, PageHead, Reorder, Skeleton, Toast, move, useSection } from '@/components/admin/ui';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  details: string[];
}

const blank = (): Service => ({ id: '', icon: 'Globe', title: '', description: '', color: 'blue', details: [] });

export default function ServicesAdmin() {
  const { data: services, loading, saving, save, status } = useSection<Service[]>('services', []);
  const [editing, setEditing] = useState<Service | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (s: Service | null, i: number | null) => { setEditing(s ? { ...blank(), ...s } : blank()); setIndex(i); };
  const close = () => { setEditing(null); setIndex(null); };
  const set = <K extends keyof Service>(k: K, v: Service[K]) => editing && setEditing({ ...editing, [k]: v });

  const submit = async () => {
    if (!editing) return;
    const s = { ...editing, id: editing.id || editing.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') };
    const next = index === null ? [...services, s] : services.map((x, i) => (i === index ? s : x));
    if (await save(next)) close();
  };

  return (
    <>
      <PageHead title="Services" lead="Shown in the “What do you need built?” command menu on the homepage. Visitors can search them, so clear titles and tags help. Up to six are shown.">
        <button className="adm-btn solid" onClick={() => open(null, null)}><Plus size={16} />Add service</button>
      </PageHead>

      {loading ? <Skeleton rows={3} /> : services.length === 0 ? (
        <div className="adm-empty"><b>No services saved</b>The site is showing its default three: Web apps, AI features, APIs and data.</div>
      ) : (
        <div className="adm-list">
          {services.map((s, i) => (
            <div key={s.id || i}>
              {i === 6 && <div className="adm-divider">Not shown on the site (only the first six are)</div>}
              <div className="adm-row" style={{ gridTemplateColumns: 'minmax(0,1fr) auto' }}>
                <div style={{ minWidth: 0 }}>
                  <h3>{s.title}</h3>
                  <p className="sub">{s.description}</p>
                  <div className="meta">{s.details.slice(0, 3).map((t) => <span className="adm-pill" key={t}>{t}</span>)}</div>
                </div>
                <div className="tools">
                  <Reorder i={i} n={services.length} label={s.title} onMove={(to) => save(move(services, i, to))} />
                  <button className="adm-icon" onClick={() => open(s, i)} aria-label={`Edit ${s.title}`}><Pencil size={16} /></button>
                  <DeleteButton label={s.title || 'service'} onConfirm={() => save(services.filter((_, j) => j !== i))} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Drawer title={index === null ? 'New service' : 'Edit service'} onClose={close} onSave={submit} saving={saving} saveLabel={index === null ? 'Add service' : 'Save changes'}>
          <Field id="s-title" label="Name" hint="Short and clear, e.g. “AI features”. Words in the name pick which live demo plays: AI, Mobile, UX or Design, Data or API, otherwise a web dashboard.">
            <input id="s-title" className="adm-input" value={editing.title} onChange={(e) => set('title', e.target.value)} required />
          </Field>
          <Field id="s-desc" label="Description" hint="One or two sentences.">
            <textarea id="s-desc" className="adm-textarea" value={editing.description} onChange={(e) => set('description', e.target.value)} />
          </Field>
          <Field id="s-tags" label="Tags" hint="The first four are shown, and they are searchable.">
            <Chips id="s-tags" value={editing.details} onChange={(v) => set('details', v)} placeholder="Next.js" />
          </Field>
        </Drawer>
      )}

      <Toast status={status} />
    </>
  );
}
