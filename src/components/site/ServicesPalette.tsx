'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Service } from './types';

type Kind = 'web' | 'ai' | 'api' | 'mobile' | 'design';

/** Picks which live demo fits a service, from its own words. */
function kindOf(s: Service): Kind {
  const AI = /\b(ai|llm|gpt|openai|chat|chatbots?|bots?|voice|rag|langchain|agents?|ml)\b/;
  const MOBILE = /\b(mobile|native|ios|android|react native|flutter|expo|app store|play store)\b/;
  const DESIGN = /\b(ux|ui\/ux|design|designs|figma|prototyp\w*|research|strategy|brand\w*|wireframes?)\b/;
  const API = /\b(api|apis|backend|data|database|mongo|mysql|server|node|laravel|aws|devops|integrations?|systems?)\b/;
  const WEB = /\b(web|site|websites?|apps?|frontend|front-end|dashboards?|stores?|ecommerce|saas|landing|ecosystems?)\b/;
  const order: [RegExp, Kind][] = [[AI, 'ai'], [MOBILE, 'mobile'], [DESIGN, 'design'], [API, 'api'], [WEB, 'web']];
  // The title says what the service is; the description and tags are only a tie-breaker.
  const title = s.title.toLowerCase();
  for (const [re, k] of order) if (re.test(title)) return k;
  const rest = `${s.description} ${(s.details || []).join(' ')}`.toLowerCase();
  for (const [re, k] of order) if (re.test(rest)) return k;
  return 'web';
}

// Extra search words per kind, so "chatbot" or "dashboard" finds the right row.
const SYNONYMS: Record<Kind, string> = {
  web: 'website web app dashboard saas store shop ecommerce portal frontend landing next react',
  ai: 'ai chatbot chat bot assistant voice image gpt openai llm automation agent',
  api: 'api backend server database data integration webhook crm deploy performance',
  mobile: 'mobile app ios android iphone react native phone cross-platform',
  design: 'ux ui design figma prototype wireframe research user experience interface redesign',
};

export default function ServicesPalette({ services }: { services: Service[] }) {
  const items = useMemo(() => {
    const used = new Set<string>();
    return services.map((s) => {
      const kind = kindOf(s);
      // first unused letter of the title becomes its shortcut key
      const key = (s.title.toUpperCase().match(/[A-Z]/g) || []).find((c) => !used.has(c)) || '';
      if (key) used.add(key);
      return { ...s, kind, key, haystack: `${s.title} ${s.description} ${(s.details || []).join(' ')} ${SYNONYMS[kind]}`.toLowerCase() };
    });
  }, [services]);

  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const visible = items.map((it, i) => (!q || it.haystack.includes(q) ? i : -1)).filter((i) => i >= 0);
  const active = visible.includes(sel) ? sel : visible[0];
  const cur = active !== undefined ? items[active] : undefined;

  // Ctrl/Cmd + K jumps to the palette from anywhere on the page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        inputRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!visible.length) return;
    const at = Math.max(0, visible.indexOf(active!));
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(visible[(at + 1) % visible.length]); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(visible[(at - 1 + visible.length) % visible.length]); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('site:goto', { detail: '#contact' }));
    } else if (e.target !== inputRef.current && !e.ctrlKey && !e.metaKey && e.key.length === 1) {
      const hit = items.findIndex((it) => it.key === e.key.toUpperCase());
      if (hit >= 0) setSel(hit);
    }
  };

  return (
    <div className="pal" ref={rootRef} onKeyDown={onKeyDown}>
      <div className="pal-search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <label htmlFor="pal-q" className="sr-only">Search what I build</label>
        <input id="pal-q" ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What do you need built?" autoComplete="off" />
        <kbd>Ctrl K</kbd>
      </div>

      <div className="pal-body">
        <div className="pal-list" role="listbox" aria-label="Services">
          <div className="pal-group">What I build</div>
          {items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              role="option"
              aria-selected={i === active}
              className="pal-row"
              hidden={!visible.includes(i)}
              onMouseEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
              onClick={() => setSel(i)}
            >
              <span className="ic" aria-hidden="true"><Icon kind={it.kind} /></span>
              {it.title}
              {it.key && <kbd>{it.key}</kbd>}
            </button>
          ))}
          {!visible.length && (
            <p className="pal-empty">Nothing matches that yet. <a href="#contact">Tell me about it</a> and I&apos;ll say if I can build it.</p>
          )}
        </div>

        <div className="pal-detail" aria-live="polite">
          {cur && (
            <>
              <h3>{cur.title}</h3>
              <p>{cur.description}</p>
              {!!cur.details?.length && <div className="pal-tags">{cur.details.slice(0, 4).map((t) => <span key={t}>{t}</span>)}</div>}
              <Demo kind={cur.kind} key={cur.title} />
            </>
          )}
        </div>
      </div>

      <div className="pal-foot" aria-hidden="true">
        <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
        <span><kbd>Enter</kbd> start a project</span>
        {items.some((i) => i.key) && <span>{items.filter((i) => i.key).map((i) => <kbd key={i.key}>{i.key}</kbd>)} jump</span>}
      </div>
    </div>
  );
}

function Icon({ kind }: { kind: Kind }) {
  const p = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'ai') return <svg {...p}><path d="M12 3l2.4 5.6L20 11l-5.6 2.4L12 19l-2.4-5.6L4 11l5.6-2.4z" /></svg>;
  if (kind === 'api') return <svg {...p}><path d="M8 6 2 12l6 6M16 6l6 6-6 6" /></svg>;
  if (kind === 'mobile') return <svg {...p}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>;
  if (kind === 'design') return <svg {...p}><path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20z" /><path d="M13.5 6.5l3 3" /></svg>;
  return <svg {...p}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18" /></svg>;
}

function Demo({ kind }: { kind: Kind }) {
  if (kind === 'mobile') {
    return (
      <div className="demo demo-mobile" aria-hidden="true">
        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-toast"><b /> <span>Order confirmed</span></div>
          <div className="phone-head"><s /><i /></div>
          <div className="phone-feed">
            {[0, 1, 2, 3].map((n) => <div className="phone-card" key={n}><u /><span><s /><s /></span></div>)}
          </div>
          <div className="phone-tabs"><i /><i /><i /><i /><b /></div>
        </div>
        <div className="phone phone-back"><div className="phone-notch" /><div className="phone-head"><s /><i /></div><div className="phone-hero" /></div>
      </div>
    );
  }
  if (kind === 'design') {
    return (
      <div className="demo demo-design" aria-hidden="true">
        <div className="demo-bar"><i /><i /><i /><span>checkout.fig</span></div>
        <div className="canvas">
          <div className="layers"><s /><s className="on" /><s /><s /></div>
          <div className="artboard">
            <div className="ab-img" />
            <div className="ab-line w1" /><div className="ab-line w2" />
            <div className="ab-btn" />
            <div className="sel"><i /><i /><i /><i /></div>
          </div>
          <svg className="cursor-arrow" width="18" height="18" viewBox="0 0 24 24"><path d="M4 3l7 18 2.5-7.5L21 11z" fill="#EEEAE0" stroke="#070A12" strokeWidth="1.5" strokeLinejoin="round" /></svg>
        </div>
      </div>
    );
  }
  if (kind === 'ai') {
    return (
      <div className="demo" aria-hidden="true">
        <div className="demo-bar"><i /><i /><i /><span>assistant</span></div>
        <div className="chat">
          <div className="msg u">Can you qualify this roofing lead?</div>
          <div className="msg a">Yes. 2,400 sq ft, storm damage, wants an inspection this week. Booking Thursday 10am.</div>
          <div className="msg a"><span className="typing"><u /><u /><u /></span></div>
        </div>
      </div>
    );
  }
  if (kind === 'api') {
    return (
      <div className="demo" aria-hidden="true">
        <div className="demo-bar"><i /><i /><i /><span>GET /api/leads</span></div>
        <div className="api">
          <span className="api-ln req">GET /api/leads?status=new <b>200</b> 38ms</span>
          <span className="api-ln">{'{'}</span>
          <span className="api-ln">  <span className="tk-k">&quot;count&quot;</span>: <span className="tk-n">128</span>,</span>
          <span className="api-ln">  <span className="tk-k">&quot;source&quot;</span>: <span className="tk-s">&quot;apollo&quot;</span>,</span>
          <span className="api-ln">  <span className="tk-k">&quot;verified&quot;</span>: <span className="tk-n">true</span>,</span>
          <span className="api-ln">  <span className="tk-k">&quot;next&quot;</span>: <span className="tk-s">&quot;/api/leads?page=2&quot;</span></span>
          <span className="api-ln">{'}'}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="demo" aria-hidden="true">
      <div className="demo-bar"><i /><i /><i /><span>app/dashboard</span></div>
      <div className="dash">
        <nav><s /><s /><s /><s /></nav>
        <main>
          <div className="kpis"><div /><div /><div /></div>
          <div className="bars">{[0, .3, .6, .2, .9, .5, .1, .7].map((d, i) => <b key={i} style={{ animationDelay: `${d}s` }} />)}</div>
        </main>
      </div>
    </div>
  );
}
