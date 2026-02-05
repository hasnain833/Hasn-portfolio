import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hasnain - Portfolio',
  description: 'Portfolio of Hasnain Aftab - Full Stack Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/img/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
