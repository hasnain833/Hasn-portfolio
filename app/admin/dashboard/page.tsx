'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageHead, Skeleton } from '@/components/admin/ui';

type Project = { title: string; image: string; liveLink: string | null; githubLink: string | null; year: string; highlights?: string[]; description?: string };
type Job = { title: string; company: string; description?: string[]; current?: boolean };
type Service = { title: string; description?: string };
type Skills = { additionalSkills?: string[] };

type Data = { projects: Project[]; experience: Job[]; services: Service[]; skills: Skills };

async function get<T>(s: string, fb: T): Promise<T> {
  try {
    const r = await fetch(`/api/admin/data/${s}`, { cache: 'no-store' });
    return r.ok ? ((await r.json()) ?? fb) : fb;
  } catch {
    return fb;
  }
}

export default function Overview() {
  const [d, setD] = useState<Data | null>(null);

  useEffect(() => {
    Promise.all([get<Project[]>('projects', []), get<Job[]>('experience', []), get<Service[]>('services', []), get<Skills>('skills', {})])
      .then(([projects, experience, services, skills]) => setD({ projects, experience, services, skills }));
  }, []);

  const featured = d?.projects.slice(0, 4) ?? [];
  const checks = d ? buildChecks(d) : [];

  return (
    <>
      <PageHead title="Overview" lead="Everything on the public site comes from here. Changes go live as soon as you save.">
        <a className="adm-btn line" href="/" target="_blank" rel="noopener">View live site</a>
        <Link className="adm-btn solid" href="/admin/dashboard/projects">Edit projects</Link>
      </PageHead>

      <div className="adm-stats">
        {[
          { label: 'Projects', n: d?.projects.length, href: '/admin/dashboard/projects' },
          { label: 'Roles', n: d?.experience.length, href: '/admin/dashboard/experience' },
          { label: 'Services', n: d?.services.length, href: '/admin/dashboard/services' },
          { label: 'Tools', n: d?.skills.additionalSkills?.length, href: '/admin/dashboard/skills' },
        ].map((s) => (
          <Link className="adm-stat" href={s.href} key={s.label}>
            <b>{d ? s.n ?? 0 : '–'}</b>
            <span>{s.label}<span aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </div>

      <div className="adm-two">
        <section>
          <h2>On the homepage</h2>
          <p className="lead">The first four projects become the large cards, in this order.</p>
          {!d ? <Skeleton rows={4} /> : featured.length === 0 ? (
            <div className="adm-empty"><b>No projects yet</b>Add your first project and it will appear here.</div>
          ) : featured.map((p, i) => (
            <Link className="adm-feat" href="/admin/dashboard/projects" key={p.title + i}>
              <span className="n">{i + 1}</span>
              <span className="thumb">{/* eslint-disable-next-line @next/next/no-img-element */}{p.image && <img src={p.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}</span>
              <span><b>{p.title}</b><small>{p.year}{p.liveLink ? ` · ${host(p.liveLink)}` : ''}</small></span>
            </Link>
          ))}
        </section>

        <section>
          <h2>Content check</h2>
          <p className="lead">Small gaps that make the site weaker.</p>
          {!d ? <Skeleton rows={3} /> : (
            <ul className="adm-checks">
              {checks.length === 0 && <li><span className="ok">●</span><span><b>All good.</b> Nothing missing.</span></li>}
              {checks.map((c) => (
                <li key={c.text}><span className="warn">●</span><span><b>{c.title}</b> {c.text}</span></li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

function host(u: string) {
  try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u; }
}

function buildChecks({ projects, experience, services, skills }: Data) {
  const out: { title: string; text: string }[] = [];
  projects.slice(0, 4).forEach((p) => {
    if (!p.image) out.push({ title: p.title, text: 'has no screenshot, so its card shows an empty frame.' });
    if (!p.liveLink) out.push({ title: p.title, text: 'has no live link. Featured cards work best with one.' });
    if (!p.highlights?.length) out.push({ title: p.title, text: 'has no highlights to list on its card.' });
  });
  if (projects.length < 4) out.push({ title: 'Projects:', text: `only ${projects.length} of 4 featured slots are filled.` });
  experience.forEach((j) => {
    if (!j.description?.length) out.push({ title: `${j.title} at ${j.company}`, text: 'has no description line.' });
    if (/[@#]$/.test(j.company)) out.push({ title: j.company, text: 'ends with a stray symbol. Check the company name.' });
  });
  if (!services.length) out.push({ title: 'Services:', text: 'none saved, so the site shows its default three.' });
  if (!skills.additionalSkills?.length) out.push({ title: 'Tools:', text: 'none saved, so the tools band shows the default list.' });
  return out;
}
