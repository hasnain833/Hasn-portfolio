import localFont from 'next/font/local';

// Self-hosted copies of the Google Fonts latin subsets (variable fonts, woff2).
// next/font/google downloads fonts at build time and Next 14 crashes when Google
// answers with extension-less /l/font?kit= URLs, which made deploys fail at random.
// Shared by the public site and the admin so both load the same font files once.
export const archivo = localFont({
  src: '../fonts/archivo-latin.woff2',
  weight: '100 900',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
  variable: '--font-archivo',
  display: 'swap',
});
export const hanken = localFont({ src: '../fonts/hanken-grotesk-latin.woff2', weight: '400 600', variable: '--font-hanken', display: 'swap' });
export const jetbrains = localFont({ src: '../fonts/jetbrains-mono-latin.woff2', weight: '400 500', variable: '--font-jetbrains', display: 'swap' });

export const fontVars = `${archivo.variable} ${hanken.variable} ${jetbrains.variable}`;
