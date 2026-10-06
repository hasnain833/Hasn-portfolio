'use client';

import { useState } from 'react';
import { ImageIcon, Pencil, Plus } from 'lucide-react';
import { Chips, DeleteButton, Drawer, Field, PageHead, Reorder, Skeleton, Toast, move, useSection } from '@/components/admin/ui';
import ImageUpload from '@/components/admin/ImageUpload';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubLink: string | null;
  liveLink: string | null;
  year: string;
  highlights: string[];
}

const blank = (): Project => ({
  title: '', description: '', longDescription: '', image: '', technologies: [],
  githubLink: null, liveLink: null, year: String(new Date().getFullYear()), highlights: [],
});

const FEATURED = 4;

export default function ProjectsAdmin() {
  const { data: projects, loading, saving, save, status } = useSection<Project[]>('projects', []);
  const [editing, setEditing] = useState<Project | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (p: Project | null, i: number | null) => { setEditing(p ? { ...blank(), ...p } : blank()); setIndex(i); };
  const close = () => { setEditing(null); setIndex(null); };

  const submit = async () => {
    if (!editing) return;
    const clean = { ...editing, title: editing.title.trim(), githubLink: editing.githubLink?.trim() || null, liveLink: editing.liveLink?.trim() || null };
    const next = index === null ? [...projects, clean] : projects.map((p, i) => (i === index ? clean : p));
    if (await save(next)) close();
  };

  const set = <K extends keyof Project>(k: K, v: Project[K]) => editing && setEditing({ ...editing, [k]: v });

  return (
    <>
      <PageHead title="Projects" lead={`The first ${FEATURED} appear as large cards on the homepage, in this order. The rest are listed under "Also on GitHub".`}>
        <button className="adm-btn solid" onClick={() => open(null, null)}><Plus size={16} />Add project</button>
      </PageHead>

      {loading ? <Skeleton /> : projects.length === 0 ? (
        <div className="adm-empty"><b>No projects yet</b>Add one and it becomes the first card on the homepage.</div>
      ) : (
        <div className="adm-list">
          {projects.map((p, i) => (
            <div key={`${p.title}-${i}`}>
              {i === FEATURED && <div className="adm-divider">Listed under &ldquo;Also on GitHub&rdquo;</div>}
              <div className="adm-row">
                <div className="thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.image ? <img src={p.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} /> : <ImageIcon size={18} />}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3>{p.title || 'Untitled'}{i < FEATURED && <span className="adm-pill feat">Card {i + 1}</span>}</h3>
                  <p className="sub">{p.description || 'No short description'}</p>
                  <div className="meta">
                    <span className="adm-pill">{p.year}</span>
                    {p.liveLink && <span className="adm-pill">live</span>}
                    {p.githubLink && <span className="adm-pill">code</span>}
                    {p.technologies.slice(0, 3).map((t) => <span className="adm-pill" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="tools">
                  <Reorder i={i} n={projects.length} label={p.title} onMove={(to) => save(move(projects, i, to))} />
                  <button className="adm-icon" onClick={() => open(p, i)} aria-label={`Edit ${p.title}`}><Pencil size={16} /></button>
                  <DeleteButton label={p.title || 'project'} onConfirm={() => save(projects.filter((_, j) => j !== i))} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Drawer title={index === null ? 'New project' : 'Edit project'} onClose={close} onSave={submit} saving={saving} saveLabel={index === null ? 'Add project' : 'Save changes'}>
          <ImageUpload id="p-image" value={editing.image} onChange={(u) => set('image', u)} />
          <div className="adm-grid">
            <div className="full"><Field id="p-title" label="Title" hint='Use "Name - What it is" to show a subtitle, e.g. "Pink Pill - AI Dating Coach".'>
              <input id="p-title" className="adm-input" value={editing.title} onChange={(e) => set('title', e.target.value)} required />
            </Field></div>
            <div className="full"><Field id="p-desc" label="Short description" hint="One line under the title.">
              <input id="p-desc" className="adm-input" value={editing.description} onChange={(e) => set('description', e.target.value)} />
            </Field></div>
            <Field id="p-year" label="Year">
              <input id="p-year" className="adm-input" value={editing.year} onChange={(e) => set('year', e.target.value)} inputMode="numeric" />
            </Field>
            <Field id="p-live" label="Live site URL">
              <input id="p-live" className="adm-input" type="url" value={editing.liveLink ?? ''} onChange={(e) => set('liveLink', e.target.value)} placeholder="https://" />
            </Field>
            <div className="full"><Field id="p-git" label="GitHub URL">
              <input id="p-git" className="adm-input" type="url" value={editing.githubLink ?? ''} onChange={(e) => set('githubLink', e.target.value)} placeholder="https://github.com/…" />
            </Field></div>
            <div className="full"><Field id="p-long" label="Longer description" hint="Shown on the card instead of the short one when it's under 260 characters.">
              <textarea id="p-long" className="adm-textarea" value={editing.longDescription} onChange={(e) => set('longDescription', e.target.value)} />
            </Field></div>
            <div className="full"><Field id="p-hl" label="Highlights" hint="The first three appear as bullet points. Press Enter after each.">
              <Chips id="p-hl" value={editing.highlights} onChange={(v) => set('highlights', v)} placeholder="Real-time chat" />
            </Field></div>
            <div className="full"><Field id="p-tech" label="Technologies">
              <Chips id="p-tech" value={editing.technologies} onChange={(v) => set('technologies', v)} placeholder="Next.js" />
            </Field></div>
          </div>
        </Drawer>
      )}

      <Toast status={status} />
    </>
  );
}
