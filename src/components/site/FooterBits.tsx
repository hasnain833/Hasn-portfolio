'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/** Live time in Islamabad, e.g. "14:56". */
export function LocalTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <time suppressHydrationWarning>{t || '--:--'}</time>;
}

/** Your name, sized so it always spans the full width without being cut off. Letters lift on hover. */
export function FitName({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;

  useIso(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner) return;
      inner.style.fontSize = '100px';
      const w = inner.scrollWidth;
      const cs = getComputedStyle(el);
      const avail = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (w > 0) inner.style.fontSize = `${Math.floor((100 * avail) / w * 0.995)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div className="end-name" ref={ref} aria-hidden="true">
      <span>
        {text.split('').map((ch, i) => (ch === ' ' ? <i key={i}>&nbsp;</i> : <i key={i}>{ch}</i>))}
      </span>
    </div>
  );
}

export function BackToTop() {
  return (
    <button type="button" className="end-top" onClick={() => window.dispatchEvent(new CustomEvent('site:goto', { detail: '#top' }))}>
      Back to top
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}
