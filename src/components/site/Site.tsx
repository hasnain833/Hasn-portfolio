import Hero from './Hero';
import SiteMotion from './SiteMotion';
import CopyEmail from './CopyEmail';
import ServicesPalette from './ServicesPalette';
import { BackToTop, FitName, LocalTime } from './FooterBits';
import { hostOf, splitTitle, tidyCase, tidyPeriod } from './data';
import type { Job, Project, Service, SiteData } from './types';

const EMAIL = 'contact@has-nain.dev';
const WHATSAPP = 'https://wa.me/923318787833';
const GITHUB = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/hasnain833';
const LINKEDIN = 'https://linkedin.com/in/hasnainaftab';
const INSTAGRAM = 'https://instagram.com/nothasn_';
const RESUME =
  process.env.NEXT_PUBLIC_RESUME_LINK && !process.env.NEXT_PUBLIC_RESUME_LINK.includes('your-resume')
    ? process.env.NEXT_PUBLIC_RESUME_LINK
    : 'https://drive.google.com/file/d/1nRNyTThlNpX6LQX5nNEKfYHSsv71wsxT/view?usp=sharing';

const STATEMENT =
  'Most of my work starts as a rough brief and ends as something people use every day: an AI coach that talks back by voice, a lead bot that answers roofing enquiries at 2am, a CRM that checks seven data providers before it gives up on an email.';

const TINTS = [
  { tint: '#1A0F1C', glow: '#F28DC0' },
  { tint: '#0B1426', glow: '#6FA0FF' },
  { tint: '#121519', glow: '#C9D1DC' },
  { tint: '#0B1A19', glow: '#5FD3B8' },
];

const FALLBACK_SERVICES: Service[] = [
  { title: 'Web apps', description: 'Dashboards, SaaS products and storefronts in Next.js, from the database schema to the deploy.', details: ['Next.js', 'React', 'Tailwind'] },
  { title: 'AI features', description: 'Chat, voice and image generation wired into real products, plus the workflows that keep them useful.', details: ['OpenAI', 'LangChain', 'RAG'] },
  { title: 'APIs and data', description: 'REST and GraphQL APIs in Node and Laravel, tuned MongoDB and MySQL queries, CI/CD to Vercel and AWS.', details: ['Node', 'Laravel', 'AWS'] },
];

const FREELANCE: Job = {
  title: 'Freelance Developer', company: 'remote', period: 'Jul 2023 – now', year: '2023',
  description: ['AI products, CRMs and storefronts for clients in three countries, from first call to production.'], current: true,
};
const EDUCATION: Job = {
  title: 'BS Information Technology', company: 'NUML Islamabad', period: '2026', year: '2026',
  description: ['Graduating early 2026.'],
};

const STACK = ['React', 'Next.js', 'TypeScript', 'Node', 'Express', 'MongoDB', 'MySQL', 'Laravel', 'Tailwind', 'Framer Motion', 'AWS', 'Docker', 'OpenAI', 'LangChain'];

export default function Site({ projects, experience, services, tools }: SiteData) {
  const featured = projects.slice(0, 4);
  const rest = projects.slice(4);
  const svc = services.length ? services.slice(0, 6) : FALLBACK_SERVICES;
  const current = experience.filter((j) => j.current);
  const past = experience.filter((j) => !j.current);
  const jobs = [...current, FREELANCE, ...past, EDUCATION];
  // Current employer comes from Experience in the admin, so changing jobs there updates the hero too.
  const company = current[0]?.company?.replace(/[@#]+$/, '').trim() || undefined;
  const stack = tools.length ? tools : STACK;

  return (
    <>
      <header className="top">
        <a className="brand" href="#top">Hasnain Aftab</a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#log">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="curtain">
        <Hero resumeUrl={RESUME} company={company} />

        {/* ---------- about ---------- */}
        <section className="about wrap" id="about" aria-label="About">
          <div className="about-grid">
            <div>
              <h2>Brief in,<br />product out</h2>
              <p className="statement" id="statement">
                {STATEMENT.split(' ').map((w, i) => (
                  <span key={i}><span className="w">{w}</span>{' '}</span>
                ))}
              </p>
              <div className="facts">
                <div className="fact"><b data-count="3">3+</b><span>years shipping production code</span></div>
                <div className="fact"><b data-count="35">35+</b><span>projects delivered</span></div>
                <div className="fact"><b data-count="20">20+</b><span>clients and partners</span></div>
              </div>
            </div>
            <aside className="editor" aria-label="Profile as code">
              <div className="editor-bar"><i /><i /><i /><span>hasnain.ts</span></div>
              <Code company={company} />
            </aside>
          </div>

          <div className="services">
            <ServicesPalette services={svc} />
          </div>
        </section>

        {/* ---------- work ---------- */}
        <section className="work" id="work" aria-label="Selected work">
          <div className="work-head wrap">
            <h2>Selected<br />work</h2>
            <p>Products that are live right now. Hover a screen to scroll through the real site.</p>
          </div>
          <div className="deck wrap">
            {featured.map((p, i) => <Card key={p.title} p={p} i={i} />)}
          </div>
          {rest.length > 0 && (
            <div className="more wrap">
              <h3>Also on GitHub</h3>
              <ul>
                {rest.map((p) => {
                  const { name, kind } = splitTitle(p.title);
                  const href = p.githubLink || p.liveLink || GITHUB;
                  return (
                    <li key={p.title}>
                      <a href={href} target="_blank" rel="noopener">{name}{kind ? `, ${kind.toLowerCase()}` : p.description ? `, ${p.description.charAt(0).toLowerCase()}${p.description.slice(1)}` : ''}</a>
                      <small>{p.year}</small>
                    </li>
                  );
                })}
                <li><a href={GITHUB} target="_blank" rel="noopener">Everything else</a><small>{hostOf(GITHUB)}</small></li>
              </ul>
            </div>
          )}
        </section>

        <div className="band" aria-label="Tools I use">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span key={k} aria-hidden={k === 1 || undefined}>
                {stack.map((t, ti) => <span key={`${t}-${ti}`}>{t}<em>/</em></span>)}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- experience ---------- */}
        <section className="log wrap" id="log" aria-label="Experience">
          <h2>Where I&apos;ve<br />worked</h2>
          {jobs.map((j, i) => (
            <div className={`job${j.current ? ' now' : ''}`} key={`${j.title}-${i}`}>
              <time>{tidyPeriod(j.period)}</time>
              <h3>{j.title} <span>{j.company === 'remote' || j === EDUCATION ? j.company : `at ${j.company.replace(/@$/, '')}`}</span></h3>
              <p>{j.description?.[0]}</p>
            </div>
          ))}
        </section>

      </main>

      {/* ---------- footer: revealed from under the page ---------- */}
      <footer className="end" id="contact" aria-label="Contact">
        <div className="end-in wrap">
          <div className="end-head">
            <h2>Got something<br />to build?</h2>
            <div className="end-cta">
              <span className="mail" id="mail">{EMAIL}</span>
              <CopyEmail email={EMAIL} />
              <a className="btn btn-line magnet" href={WHATSAPP} target="_blank" rel="noopener">Message on WhatsApp</a>
            </div>
          </div>
          <div className="end-meta">
            <a href={GITHUB} target="_blank" rel="noopener">GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener">Instagram</a>
            <a href={RESUME} target="_blank" rel="noopener">Résumé</a>
            <span className="end-avail"><i />Rawalpindi / Islamabad, open to Lahore and Remote</span>
            <span className="end-time"><LocalTime /> local time</span>
            <BackToTop />
          </div>
        </div>
        <FitName text="Hasnain Aftab" />
      </footer>

      <SiteMotion />
    </>
  );
}

function Card({ p, i }: { p: Project; i: number }) {
  const { name, kind } = splitTitle(p.title);
  const { tint, glow } = TINTS[i % TINTS.length];
  const blurb = p.longDescription && p.longDescription.length < 260 ? p.longDescription : p.description;
  const host = hostOf(p.liveLink);
  const href = p.liveLink || p.githubLink || '#work';
  return (
    <article className="card" style={{ ['--i' as string]: i, ['--tint' as string]: tint, ['--glow' as string]: glow }}>
      <div className="card-in">
        <div className="card-info">
          <span className="yr">{p.year}{kind ? `, ${kind}` : ''}</span>
          <h3>{name}</h3>
          {blurb && <p>{blurb}</p>}
          {p.highlights?.length > 0 && (
            <ul className="hl">{p.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}</ul>
          )}
          <div className="stack">{p.technologies?.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="card-actions">
            {p.liveLink && <a className="btn btn-solid magnet" href={p.liveLink} target="_blank" rel="noopener">Visit site</a>}
            {p.githubLink && <a className="btn btn-line magnet" href={p.githubLink} target="_blank" rel="noopener">View code</a>}
          </div>
        </div>
        <a className="browser" href={href} target="_blank" rel="noopener" aria-label={`Open ${name}`}>
          <div className="bar"><i /><i /><i /><span>{host || tidyCase(name)}</span></div>
          <div className="vp">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={`Full page of ${name}`} loading="lazy" />
            <span className="scrollhint">Hover to scroll</span>
          </div>
        </a>
      </div>
    </article>
  );
}

function Code({ company }: { company?: string }) {
  const L = (n: number, children: React.ReactNode) => (
    <span className="ln" data-n={n} key={n}>{children}</span>
  );
  const k = (t: string) => <span className="tk-k">{t}</span>;
  const p = (t: string) => <span className="tk-p">{t}</span>;
  const s = (t: string) => <span className="tk-s">&quot;{t}&quot;</span>;
  const n = (t: string) => <span className="tk-n">{t}</span>;
  return (
    <pre id="code">
      {L(1, <>{k('const')} hasnain = {'{'}</>)}
      {L(2, <>  {p('role')}: {s('Full-stack developer')},</>)}
      {company ? L(3, <>  {p('company')}: {s(company)},</>) : L(3, <>  {p('available')}: {n('true')},</>)}
      {L(4, <>  {p('based')}: {s('Islamabad, PK')},</>)}
      {L(5, <>  {p('freelance')}: {'{'} {p('since')}: {n('2023')}, {p('countries')}: {n('3')} {'}'},</>)}
      {L(6, <>  {p('stack')}: [{s('Next.js')}, {s('React')}, {s('Node')}, {s('MongoDB')}],</>)}
      {L(7, <>  {p('ai')}: [{s('OpenAI')}, {s('LangChain')}, {s('RAG')}],</>)}
      {L(8, <>  {p('shipped')}: {n('35')},</>)}
      {L(9, <>  {p('openTo')}: [{s('full-time')}, {s('freelance')}],</>)}
      {L(10, <>{'};'}</>)}
      {L(11, <> </>)}
      {L(12, <span className="tk-c">{'// the rest is on GitHub'}</span>)}
      {L(13, <>{k('export default')} hasnain;</>)}
    </pre>
  );
}
