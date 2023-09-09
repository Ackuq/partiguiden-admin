import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00796b',
      },
      minHeight: {
        screen: [
          '100vh', // For browsers not supporting new viewport units
          '100dvh',
        ] as unknown as string,
      },
      aria: {
        'current-page': 'current=page',
        'current-false': 'current=false',
      },
    },
  },
};
export default config;
