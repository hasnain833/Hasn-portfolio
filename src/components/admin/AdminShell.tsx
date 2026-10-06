'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, Layers, FolderKanban, Wrench, Briefcase, ExternalLink, LogOut } from 'lucide-react';
import { SITE_URL } from '@/lib/site-url';

const NAV = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutGrid },
  { label: 'Projects', href: '/admin/dashboard/projects', icon: FolderKanban },
  { label: 'Experience', href: '/admin/dashboard/experience', icon: Briefcase },
  { label: 'Services', href: '/admin/dashboard/services', icon: Layers },
  { label: 'Tools', href: '/admin/dashboard/skills', icon: Wrench },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin') return <>{children}</>;

  const signOut = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <div className="adm-brand">
          <b>Hasnain Aftab</b>
          <span>Site admin</span>
        </div>
        <nav className="adm-nav" aria-label="Admin sections">
          {NAV.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>
              <Icon size={18} />{label}
            </Link>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href={SITE_URL} target="_blank" rel="noopener"><ExternalLink size={18} />View live site</a>
          <button type="button" onClick={signOut}><LogOut size={18} />Sign out</button>
        </div>
      </aside>

      <nav className="adm-top" aria-label="Admin sections">
        {NAV.map(({ label, href }) => (
          <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>
        ))}
        <a href={SITE_URL} target="_blank" rel="noopener">Site</a>
        <button type="button" onClick={signOut}>Sign out</button>
      </nav>

      <main className="adm-main">
        <div className="adm-wrap">{children}</div>
      </main>
    </div>
  );
}
