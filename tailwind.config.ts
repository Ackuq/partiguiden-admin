import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00796b',
        'elevated-dark': colors.slate[900],
        'elevated-light': colors.slate[100],
        'background-dark': colors.slate[950],
        'background-light': colors.slate[50],
        'foreground-primary': colors.slate[50],
        'foreground-dark': colors.slate[50],
        'foreground-light': colors.slate[950],
      },
      maxHeight: {
        modal: [
          'calc(100vh - 7rem)',
          'calc(100dvh - 7rem)',
        ] as unknown as string,
      },
      minWidth: {
        screen: '100vw',
        modal: '35rem',
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
