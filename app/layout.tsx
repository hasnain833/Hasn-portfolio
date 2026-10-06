import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_URL } from '@/lib/site-url';

const description =
  'Hasnain Aftab builds web products and the AI inside them. Full-stack developer based in Islamabad, working with clients in three countries.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Hasnain Aftab, full-stack developer',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Hasnain Aftab',
    title: 'Hasnain Aftab, full-stack developer',
    description,
  },
  twitter: { card: 'summary_large_image', title: 'Hasnain Aftab, full-stack developer', description },
};

export const viewport: Viewport = { themeColor: '#070A12' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
