'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PageHead, Skeleton, Toast, move, useSection } from '@/components/admin/ui';

interface SkillsData {
  // `technologies` belonged to the old design; it is kept as-is when saving.
  technologies?: unknown[];
  additionalSkills: string[];
}

export default function ToolsAdmin() {
  const { data, loading, saving, save, status } = useSection<SkillsData>('skills', { additionalSkills: [] });
  const [list, setList] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [drag, setDrag] = useState<number | null>(null);

  useEffect(() => setList(data.additionalSkills ?? []), [data]);

  const dirty = JSON.stringify(list) !== JSON.stringify(data.additionalSkills ?? []);

  const add = () => {
    const parts = draft.split(',').map((s) => s.trim()).filter((s) => s && !list.includes(s));
    if (parts.length) setList([...list, ...parts]);
    setDraft('');
  };

  return (
    <>
      <PageHead title="Tools" lead="The scrolling band of technologies above the contact section. Drag to reorder.">
        {dirty && <button className="adm-btn line" onClick={() => setList(data.additionalSkills ?? [])}>Discard</button>}
        <button className="adm-btn solid" disabled={!dirty || saving} onClick={() => save({ ...data, additionalSkills: list })}>
          {saving ? <span className="adm-spin" /> : null}{saving ? 'Saving' : 'Save tools'}
        </button>
      </PageHead>

      {loading ? <Skeleton rows={2} /> : (
        <>
          <form
            onSubmit={(e) => { e.preventDefault(); add(); }}
            style={{ display: 'flex', gap: 10, margin: '28px 0 22px', flexWrap: 'wrap' }}
          >
            <label htmlFor="t-new" className="sr-only">Add a tool</label>
            <input id="t-new" className="adm-input" style={{ flex: '1 1 260px' }} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a tool, e.g. Supabase (comma for several)" />
            <button type="submit" className="adm-btn line" disabled={!draft.trim()}>Add</button>
          </form>

          {list.length === 0 ? (
            <div className="adm-empty"><b>No tools saved</b>The site is showing its default list until you add some.</div>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {list.map((t, i) => (
                <li
                  key={t}
                  draggable
                  onDragStart={() => setDrag(i)}
                  onDragOver={(e) => { e.preventDefault(); if (drag !== null && drag !== i) { setList(move(list, drag, i)); setDrag(i); } }}
                  onDragEnd={() => setDrag(null)}
                  className="adm-chip"
                  style={{ fontSize: 14, padding: '7px 6px 7px 14px', cursor: 'grab', opacity: drag === i ? 0.4 : 1 }}
                >
                  {t}
                  <button type="button" aria-label={`Remove ${t}`} onClick={() => setList(list.filter((_, j) => j !== i))}><X size={13} /></button>
                </li>
              ))}
            </ul>
          )}
          {dirty && <p style={{ color: 'var(--mute)', marginTop: 20, fontSize: 14 }}>You have unsaved changes.</p>}
        </>
      )}

      <Toast status={status} />
    </>
  );
}
