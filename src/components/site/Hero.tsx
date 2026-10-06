'use client';

import { useEffect, useRef, useState } from 'react';

const GLYPHS = '{}[]<>/=+*;:.#$&%@01';
const ROLES = ['AI', 'APIs', 'dashboards', 'chatbots', 'checkout'];
const PORTRAIT = '/img/portrait-cutout.webp';

type Particle = {
  tx: number; ty: number; x: number; y: number;
  c: string; col: string; lum: number; delay: number;
};

export default function Hero({ resumeUrl, company }: { resumeUrl?: string; company?: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [role, setRole] = useState(0);
  const roleRef = useRef<HTMLSpanElement>(null);

  /* rotating word in the lede */
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      const el = roleRef.current;
      if (!el) return;
      el.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-60%)', opacity: 0 }], { duration: 250, easing: 'ease-in', fill: 'forwards' })
        .finished.then(() => {
          setRole((r) => (r + 1) % ROLES.length);
          el.animate([{ transform: 'translateY(60%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 450, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' });
        })
        .catch(() => {});
    }, 2200);
    return () => clearInterval(id);
  }, []);

  /* glyph portrait */
  useEffect(() => {
    const hero = heroRef.current!;
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const monoFamily =
      getComputedStyle(hero).getPropertyValue('--font-jetbrains').trim() || 'ui-monospace, monospace';

    const img = new Image();
    let W = 0, H = 0;
    let parts: Particle[] = [];
    let rect = { x: 0, y: 0, w: 0, h: 0 };
    let photoAlpha = 0, t0 = 0, raf = 0, running = false, built = false, alive = true;
    const mouse = { x: -9999, y: -9999, r: 0, tr: 0 };

    const ease = (t: number) => 1 - Math.pow(1 - t, 4);

    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!img.naturalWidth) return;
      if (W < 820) {
        // Phones: keep the portrait above the text block so they don't overlap.
        const foot = hero.querySelector('.hero-foot') as HTMLElement | null;
        const footTop = foot ? foot.offsetTop : H * 0.6;
        const h = Math.max(220, Math.min(H * 0.58, footTop - 70));
        const w = (h * img.naturalWidth) / img.naturalHeight;
        rect = { x: (W - w) / 2, y: footTop - h + 24, w, h };
      } else {
        const h = H * 0.84;
        const w = (h * img.naturalWidth) / img.naturalHeight;
        rect = { x: (W - w) / 2, y: H - h, w, h };
      }
      sample();
    }

    function sample() {
      const cell = W < 820 ? 6 : 8;
      const cols = Math.floor(rect.w / cell), rows = Math.floor(rect.h / cell);
      if (cols < 2 || rows < 2) return;
      const oc = document.createElement('canvas');
      oc.width = cols; oc.height = rows;
      const o = oc.getContext('2d', { willReadFrequently: true })!;
      o.drawImage(img, 0, 0, cols, rows);
      const d = o.getImageData(0, 0, cols, rows).data;
      const old = parts;
      parts = [];
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        if (d[i + 3] < 90) continue;
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const tx = rect.x + x * cell + cell / 2, ty = rect.y + y * cell + cell / 2;
        const prev = built ? old[parts.length] : undefined;
        parts.push({
          tx, ty,
          x: prev ? tx : Math.random() * W,
          y: prev ? ty : Math.random() * H * 1.2 - H * 0.1,
          c: GLYPHS[(Math.random() * GLYPHS.length) | 0],
          col: `rgb(${Math.min(255, r * 1.35 + 40)},${Math.min(255, g * 1.35 + 44)},${Math.min(255, b * 1.3 + 60)})`,
          lum,
          delay: (y / rows) * 0.55 + Math.random() * 0.25,
        });
      }
      ctx.font = `${cell + 2}px ${monoFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      kick();
    }

    function frame(now: number) {
      if (!alive) return;
      running = true;
      const el = (now - t0) / 1000;
      const assemble = reduce ? 0 : 1.6;
      ctx.clearRect(0, 0, W, H);

      const target = el > assemble + 0.35 ? 1 : 0;
      photoAlpha += (target - photoAlpha) * (reduce ? 1 : 0.06);
      mouse.r += (mouse.tr - mouse.r) * 0.14;

      if (photoAlpha > 0.01) {
        ctx.globalAlpha = photoAlpha;
        ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
        ctx.globalAlpha = 1;
      }

      const lens = mouse.r > 2;
      if (lens && photoAlpha > 0.01) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.r);
        g.addColorStop(0, 'rgba(7,10,18,.92)');
        g.addColorStop(0.55, 'rgba(7,10,18,.7)');
        g.addColorStop(1, 'rgba(7,10,18,0)');
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - mouse.r, mouse.y - mouse.r, mouse.r * 2, mouse.r * 2);
      }

      let moving = false;
      const glyphAlpha = 1 - photoAlpha;
      for (const p of parts) {
        if (el >= assemble + 0.6 || reduce) { p.x = p.tx; p.y = p.ty; }
        else {
          const t = Math.min(1, Math.max(0, (el - p.delay) / (assemble - 0.55)));
          const e = ease(t);
          p.x += (p.tx - p.x) * (0.04 + e * 0.3);
          p.y += (p.ty - p.y) * (0.04 + e * 0.3);
          if (t < 1) moving = true;
        }
        let dx = 0, dy = 0, inLens = false, fall = 1;
        if (lens) {
          const ddx = p.tx - mouse.x, ddy = p.ty - mouse.y, dist = Math.hypot(ddx, ddy);
          if (dist < mouse.r) {
            inLens = true;
            const f = 1 - dist / mouse.r;
            fall = Math.pow(f, 0.7);
            dx = (ddx / (dist || 1)) * f * 10;
            dy = (ddy / (dist || 1)) * f * 10;
            if (Math.random() < 0.02) p.c = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
        }
        const base = glyphAlpha * (0.3 + p.lum * 0.8);
        const a = inLens ? Math.max(base, (0.35 + p.lum * 0.75) * fall) : base;
        if (a < 0.02) continue;
        ctx.globalAlpha = Math.min(1, a);
        ctx.fillStyle = inLens ? (p.lum > 0.45 ? '#EEEAE0' : '#8FB4E8') : p.col;
        ctx.fillText(p.c, p.x + dx, p.y + dy);
      }
      ctx.globalAlpha = 1;
      built = true;

      const settling = Math.abs(target - photoAlpha) > 0.005 || Math.abs(mouse.tr - mouse.r) > 0.5;
      if (moving || settling || lens || el < assemble + 0.7) raf = requestAnimationFrame(frame);
      else running = false;
    }

    function kick() { if (!running && img.naturalWidth) raf = requestAnimationFrame(frame); }

    const onMove = (e: PointerEvent) => {
      const b = hero.getBoundingClientRect();
      mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top;
      const over = mouse.x > rect.x && mouse.x < rect.x + rect.w && mouse.y > rect.y;
      mouse.tr = over ? Math.min(120, rect.w * 0.24) : 0;
      kick();
    };
    const onLeave = () => { mouse.tr = 0; kick(); };
    const onTap = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a,button')) return;
      const b = hero.getBoundingClientRect();
      mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top;
      mouse.tr = mouse.tr ? 0 : Math.min(130, rect.w * 0.4);
      kick();
    };
    if (fine) {
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
    } else {
      hero.addEventListener('click', onTap);
    }

    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(layout, 150); };
    window.addEventListener('resize', onResize);

    img.onload = () => { t0 = performance.now(); layout(); };
    img.src = PORTRAIT;
    document.fonts?.ready.then(() => { if (alive && img.naturalWidth) sample(); });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(rz);
      window.removeEventListener('resize', onResize);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      hero.removeEventListener('click', onTap);
    };
  }, []);

  return (
    <section className="hero" id="top" aria-label="Introduction" ref={heroRef}>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Hasnain</span><span>Aftab</span><span>Hasnain</span><span>Aftab</span>
        </div>
      </div>
      <canvas id="glyphs" ref={canvasRef} role="img" aria-label="Portrait of Hasnain Aftab, drawn from code characters" />
      <div className="hero-foot">
        <div className="hero-rule" aria-hidden="true" />
        <p className="lede">
          I build web products and the{' '}
          <span className="role" ref={roleRef}>{ROLES[role]}</span> inside them.
        </p>
        <div className="hint" aria-hidden="true"><i />Hover over the portrait</div>
        <div className="hero-side">
          <strong>Full-stack developer{company ? ` at ${company}` : ''}</strong>, Islamabad. Freelancing since 2023 for clients in three countries. Open to full-time roles and new projects.
          <div className="ctas">
            <a className="btn btn-solid magnet" href="#work">See my work</a>
            {resumeUrl ? (
              <a className="btn btn-line magnet" href={resumeUrl} target="_blank" rel="noopener">Résumé</a>
            ) : (
              <a className="btn btn-line magnet" href="#contact">Get in touch</a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
