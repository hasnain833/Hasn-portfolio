import type { Metadata, Viewport } from 'next';
import './globals.css';

const description =
  'Hasnain Aftab builds web products and the AI inside them. Full-stack developer at BitzSol, Islamabad, freelancing for clients in three countries.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://has-nain.dev'),
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
