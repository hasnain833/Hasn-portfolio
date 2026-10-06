import { Archivo, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';

// Shared by the public site and the admin so both load the same font files once.
export const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
export const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-hanken', display: 'swap' });
export const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' });

export const fontVars = `${archivo.variable} ${hanken.variable} ${jetbrains.variable}`;
