'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/**
 * All scroll and pointer choreography for the home page.
 * The sections themselves are plain server-rendered markup, so everything
 * here works on the DOM once it exists and is reverted on unmount.
 */
export default function SiteMotion() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: Array<() => void> = [];

    /* ---------- smooth scroll ---------- */
    let lenis: Lenis | null = null;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const onAnchor = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        if (goTo(a.getAttribute('href')!)) e.preventDefault();
      };
      document.addEventListener('click', onAnchor);
      cleanups.push(() => { document.removeEventListener('click', onAnchor); gsap.ticker.remove(tick); lenis!.destroy(); });
    }

    /* ---------- in-page navigation (also used by the palette and footer) ---------- */
    // The footer is sticky under the page, so "contact" means the very bottom.
    function goTo(id: string) {
      const target = id === '#top' ? 0
        : id === '#contact' ? document.documentElement.scrollHeight
        : (document.querySelector(id) as HTMLElement | null);
      if (target === null) return false;
      if (lenis) lenis.scrollTo(target as number | HTMLElement);
      else if (typeof target === 'number') window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
      else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      return true;
    }
    const onGoto = (e: Event) => goTo((e as CustomEvent<string>).detail);
    window.addEventListener('site:goto', onGoto);
    cleanups.push(() => window.removeEventListener('site:goto', onGoto));

    /* ---------- browser frames scroll the real page on hover ---------- */
    const measure = () => {
      document.querySelectorAll<HTMLElement>('.browser .vp').forEach((vp) => {
        const im = vp.querySelector('img');
        if (!im) return;
        const go = () => {
          const d = im.offsetHeight - vp.clientHeight;
          vp.classList.toggle('short', d < 20);
          vp.style.setProperty('--shift', -Math.max(0, d) + 'px');
          vp.style.setProperty('--dur', Math.max(2.5, d / 380) + 's');
          const hint = vp.querySelector<HTMLElement>('.scrollhint');
          if (hint) hint.hidden = d < 20;
        };
        if (im.complete && im.naturalWidth) go(); else im.addEventListener('load', go, { once: true });
      });
    };
    measure();
    window.addEventListener('resize', measure);
    cleanups.push(() => window.removeEventListener('resize', measure));

    /* ---------- project cursor ---------- */
    const cur = cursorRef.current;
    if (fine && cur) {
      let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
      const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
      const loop = () => { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cur.style.translate = `${cx}px ${cy}px`; raf = requestAnimationFrame(loop); };
      loop();
      window.addEventListener('pointermove', onMove);
      const shots = Array.from(document.querySelectorAll<HTMLElement>('.browser'));
      const on = () => cur.classList.add('on');
      const off = () => cur.classList.remove('on');
      shots.forEach((s) => { s.addEventListener('pointerenter', on); s.addEventListener('pointerleave', off); });
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onMove);
        shots.forEach((s) => { s.removeEventListener('pointerenter', on); s.removeEventListener('pointerleave', off); });
      });
    }

    if (reduce) return () => cleanups.forEach((f) => f());

    const ctx = gsap.context(() => {
      /* ---------- intro ---------- */
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.marquee', { y: 120, opacity: 0, duration: 1.6 }, 0.1)
        .from('.top > *', { y: -20, opacity: 0, duration: 1, stagger: 0.08 }, 0.9)
        .from('.hero-rule', { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }, 1.1)
        .from('.hero-foot > :not(.hero-rule)', { y: 30, opacity: 0, duration: 1.1, stagger: 0.12 }, 1.4);

      /* ---------- magnetic buttons ---------- */
      if (fine) {
        document.querySelectorAll<HTMLElement>('.magnet').forEach((b) => {
          const xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3.out' });
          const yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3.out' });
          const move = (e: PointerEvent) => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.3); yTo((e.clientY - r.top - r.height / 2) * 0.4); };
          const leave = () => { xTo(0); yTo(0); };
          b.addEventListener('pointermove', move);
          b.addEventListener('pointerleave', leave);
          cleanups.push(() => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', leave); });
        });
      }

      /* ---------- hero parallax out ---------- */
      gsap.to('.marquee', { yPercent: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('#glyphs', { yPercent: 12, scale: 0.96, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

      /* ---------- statement lights up as you read ---------- */
      gsap.fromTo('#statement .w', { opacity: 0.16 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '#statement', start: 'top 80%', end: 'bottom 50%', scrub: true } });

      /* ---------- facts count up ---------- */
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((b) => {
        const n = Number(b.dataset.count), o = { v: 0 };
        gsap.to(o, { v: n, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: b, start: 'top 90%' }, onUpdate: () => { b.textContent = Math.round(o.v) + '+'; } });
      });

      /* ---------- editor types itself as you scroll ---------- */
      const lines = gsap.utils.toArray<HTMLElement>('#code .ln');
      const paint = (p: number) => {
        const k = Math.round(p * lines.length);
        lines.forEach((l, i) => { l.classList.toggle('dim', i >= k); l.classList.toggle('cur', i === Math.max(0, k - 1)); });
      };
      paint(0);
      ScrollTrigger.create({ trigger: '.about-grid', start: 'top 70%', end: 'bottom 60%', scrub: true, onUpdate: (s) => paint(s.progress), onLeave: () => paint(1) });

      /* ---------- services palette rises in ---------- */
      gsap.from('.pal', { y: 70, opacity: 0, scale: 0.97, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.pal', start: 'top 88%' } });
      gsap.from('.pal-row', { x: -20, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: '.pal', start: 'top 75%' } });

      /* ---------- footer: name letters rise as the curtain lifts ---------- */
      gsap.from('.end-name i', { yPercent: 70, opacity: 0, duration: 1.1, stagger: 0.035, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.curtain', start: 'bottom 70%' } });
      gsap.from('.end-head > *', { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.curtain', start: 'bottom 85%' } });

      /* ---------- stacking project cards ---------- */
      const mm = gsap.matchMedia();
      const cards = gsap.utils.toArray<HTMLElement>('.card');
      mm.add('(min-width: 821px)', () => {
        cards.forEach((c, i) => {
          const next = cards[i + 1];
          if (next) gsap.to(c, { scale: 0.9 - (cards.length - i) * 0.01, '--shade': 0.55, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: `top ${88 + (i + 1) * 16}px`, scrub: true } });
          gsap.from(c.querySelector('.vp'), { clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: c, start: 'top 75%' } });
          gsap.from(c.querySelectorAll('.card-info > *'), { y: 40, opacity: 0, duration: 1.1, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 70%' } });
        });
      });
      mm.add('(max-width: 820px)', () => {
        cards.forEach((c) => gsap.from(c, { y: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 92%' } }));
      });

      /* ---------- experience rows ---------- */
      gsap.utils.toArray<HTMLElement>('.job').forEach((j) => gsap.from(j.children, { y: 24, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: j, start: 'top 88%' } }));
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
      cleanups.forEach((f) => f());
    };
  }, []);

  return <div className="cursor" ref={cursorRef} aria-hidden="true">Open</div>;
}
