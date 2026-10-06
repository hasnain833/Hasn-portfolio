import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';
import { fontVars } from '@/lib/fonts';
import '@/components/admin/admin.css';

export const metadata: Metadata = {
  title: 'Admin · Hasnain Aftab',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`adm ${fontVars}`}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
