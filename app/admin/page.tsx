'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { SITE_URL } from '@/lib/site-url';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(res.status === 401 ? 'That password is wrong. Try again.' : data.error || 'Sign-in failed.');
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="adm-login">
      <div className="art" aria-hidden="true">
        <div className="word">Admin</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/portrait-cutout.webp" alt="" />
      </div>
      <div className="form">
        <form onSubmit={submit}>
          <h1>Sign in</h1>
          <p>Manage the projects, experience and services shown on has-nain.dev.</p>
          <div className="adm-field">
            <label htmlFor="pw">Password</label>
            <div className="adm-pw">
              <input
                id="pw"
                className="adm-input"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                autoFocus
                required
                style={{ paddingRight: 46 }}
              />
              <button type="button" className="adm-icon" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <div className="adm-err" role="alert">{error}</div>}
          <button type="submit" className="adm-btn solid" disabled={loading || !password} style={{ minHeight: 48 }}>
            {loading ? <span className="adm-spin" /> : null}{loading ? 'Signing in' : 'Sign in'}
          </button>
          <a href={SITE_URL} style={{ color: 'var(--mute)', fontSize: 14 }}>Back to the site</a>
        </form>
      </div>
    </main>
  );
}
