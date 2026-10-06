/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Service card colors come from the DB and are composed at runtime
  // (e.g. `bg-${color}-500/10`), so Tailwind can't see them statically.
  // Safelist the variants used so they survive the production purge.
  safelist: [
    {
      pattern: /(bg|text|border)-(blue|emerald|indigo|purple|pink|orange|red|cyan|amber|teal|rose)-(400|500)(\/(10|20))?/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
