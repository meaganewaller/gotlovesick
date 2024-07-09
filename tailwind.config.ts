import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        header: '6.75rem',
        'header-buffer': '5.5rem',
        'screen-content': 'calc(100vh - 2.5rem)',
        'screen-content-minus-header': 'calc(100vh - 8rem)',
        'blog-preamble': 'calc(4.5rem + 3rem)'
      },
      maxWidth: {
        '3xs': '12rem', 
        '2xs': '16rem' 
      },
      screens: {
        xs: '475px',
        nav: '700px'
      },
      boxShadow: {
        'halo-primary-sm': '0 0 15px -5px rgba(255, 239, 20, 1)',
        'halo-secondary-sm': '0 0 20px 0 rgba(5, 105, 243, 1)',
        'halo-secondary': '0 0 25px 0 rgba(5, 105, 243, 1)',
        'halo-error-sm': '0 0 20px 0 rgba(255, 71, 20, 1)',
        'halo-error': '0 0 25px 0 rgba(255, 71, 20, 1)'
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        debut: {
        },
        fearless: {
        },
        speaknow: {
        },
        red: {
        },
        nineteen89: {
        },
        reputation: {
        },
        lover: {
        },
        folklore: {
        },
        evermore: {
        },
        midnights: {
        },
        ttpd: {
        }
      }
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: '',
    logs: true
  }
} satisfies Config;
