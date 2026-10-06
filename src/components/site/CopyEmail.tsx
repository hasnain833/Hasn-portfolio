'use client';

import { useRef, useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [msg, setMsg] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const say = (m: string) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(''), 2200);
  };

  const selectText = () => {
    const el = document.getElementById('mail');
    if (!el) return;
    const r = document.createRange();
    r.selectNodeContents(el);
    const s = getSelection();
    s?.removeAllRanges();
    s?.addRange(r);
    say('Email selected, press Ctrl+C to copy');
  };

  const copy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(() => say('Email copied'), selectText);
    } else selectText();
  };

  return (
    <>
      <button className="btn btn-solid magnet" type="button" onClick={copy}>Copy email</button>
      <div className={`toast${msg ? ' on' : ''}`} role="status" aria-live="polite">{msg}</div>
    </>
  );
}
