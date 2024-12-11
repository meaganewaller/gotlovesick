import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import svgDataUri from 'mini-svg-data-uri'
// import defaultTheme from 'tailwindcss/defaultTheme'
import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import type { PluginAPI } from 'tailwindcss/types/config'
import hocus from 'tailwindcss-hocus'

import { colors } from './config/tailwind/colors'

// eslint-disable-next-line
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

const sansFontFamily = ['var(--font-sans)', 'DM Sans', ...fontFamily.sans]
const monoFontFamily = ['var(--font-mono)', 'IBM Plex Mono', ...fontFamily.mono]

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  important: true,
  theme: {
    colors,
    extend: {
      fontSize: {
        md: '1rem',
      },
      opacity: {
        7: '.07',
        8: '.08',
        9: '.09',
        12: '.12',
        15: '.15',
        35: '.35',
        65: '.65',
        85: '.85',
        98: '.98',
      },
      borderWidth: {
        3: '3px',
      },
      outlineWidth: {
        3: '3px',
      },
      gridTemplateRows: {
        window: '21px auto 4px',
      },
      gridTemplateColumns: {
        window: '4px auto 4px',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        5: '5',
        15: '15',
      },
      spacing: {
        0.5: '2px',
        1.5: '0.375rem',
        1.6: '0.4375rem',
        2.1: '0.5625rem',
        2.5: '10px',
        3.2: '0.8125rem',
        4.5: '1.125rem',
        11: '2.75rem', // 44px (once)
      },
      animation: {
        'page-transition': 'page-transition 300ms ease-in-out backwards',
        scroll: 'scroll 15s linear infinite',
        wave: 'wave 2.5s infinite',
        bounce: 'bounce 2s infinite',
        glow: 'glow 1.2s linear forward',
        marquee: 'marquee 30s linear infinite',
        marquee2: 'marquee2 30s linear infinite',
      },
      backgroundImage: {
        bigPurpleCheck: "url('/images/bg/bigpurplecheck.png')",
        pinkPlaid: "url('/images/bg/pinkplaid.gif')",
        pinkScallopGrid: "url('/images/bg/pink-scallop-grid.jpg')",
        pinkButterflies: "url('/images/bg/pinkButterflies.png')",
        pinkHearts: "url('/images/bg/pinkHearts.gif')",
        floralLight: "url('/images/bg/floral-light.gif')",
        roses: "url('/images/bg/roses.gif')",
        blueStars: "url('/images/bg/blue-stars.gif')",
        stars: "url('/images/bg/celesestrellas.gif')",
        purplePuzzle: "url('/images/bg/purple-puzzle.gif')",
        purpleCheck: "url('/images/bg/purplecheck.gif')",
        clouds: "url('/images/bg/dayclouds.gif')",
        unicorns: "url('/images/bg/unicorn.jpeg')",
        nightsky: "url('/images/bg/nightsky.gif')",
        butterflies: "url('/images/bg/8f823bfe.png')",
        hearts: "url('/images/bg/hearts.jpg')",
        bows: "url('/images/bg/pinkbows.gif')",
        pinkCheck: "url('/images/bg/pinkcheck.gif')",
        pinkCherry: "url('/images/bg/pinkcherry.png')",
        pinkFlowers: "url('/images/bg/pinkflowers.gif')",
        purpleStars: "url('/images/bg/purple-stars.gif')",
        smallPurpleCheck: "url('/images/bg/smallpurplecheck.gif')",
        windowTitleBarButton: 'linear-gradient(to bottom right, #9c9c9c, #fff)',
        windowTitleBarButtonActive: 'linear-gradient(to bottom right, #444, #aaa)',
        windowTitleBar: 'repeating-linear-gradient(#fff, #000 2px)',
      },
      typography: ({ theme }: PluginAPI) => ({
        DEFAULT: {
          css: {
            color: theme('colors.espresso'),
            a: {
              color: theme('colors.accent'),
              textDecoration: 'wavy',
              '&:hover,&:focus': {
                color: theme('colors.accent-dark/1'),
              },
            },
            'h2,h3,h4,h5,h6': {
              position: 'relative',
              color: theme('colors.accent'),
            },
          },
        },
        quoteless: {
          css: {
            blockquote: { 'font-style': 'normal' },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      }),
      fontFamily: {
        sans: sansFontFamily,
        mono: monoFontFamily,
        serif: monoFontFamily,
        extra: ['basiic', ...fontFamily.sans],
        retro: ['gothicpixelsmedium', ...fontFamily.mono],
        cute: ['rainyhearts', ...fontFamily.serif],
        venice: ['Venice Classic', ...fontFamily.mono],
      },
      fontWeight: {
        normal: '400',
      },
      lineHeight: {
        relaxed: '1.75',
      },
      saturate: {
        125: '1.25',
      },
      dropShadow: {
        doodle: [
          '-4px -4px 2px var(--color-illustrations-shadow)',
          '4px 4px 2px var(--color-illustrations-shadow)',
          '4px -4px 2px var(--color-illustrations-shadow)',
          '-4px 4px 2px var(--color-illustrations-shadow)',
        ],
      },
      transformOrigin: {
        waving: '70% 70%',
      },
      transitionTimingFunction: { eio: 'ease-in-out', DEFAULT: 'ease-in-out' },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        bounce: {
          '0%, 100%': { top: '0', transform: 'translateY(-10%)' },
          '50%': { top: '-5px' },
        },
        glow: {
          '0%': {
            transform: 'scale(1.01)',
            opacity: '0.1',
          },
          '25%': {
            transform: 'scale(1.03)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.5',
          },
          '75%': {
            transform: 'scale(1.07)',
            opacity: '0.7',
          },
          '100%': {
            transform: 'scale(1.09)',
            opacity: '1',
          },
        },
        'page-transition': {
          '0%': { transform: 'scale(0.975)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scroll: {
          '0%': { transform: 'translateX(1.5rem)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        wave: {
          'from, 50%, to': { transform: 'rotate(0deg)' },
          '10%, 30%': { transform: 'rotate(-10deg)' },
          '20%': { transform: 'rotate(12deg)' },
          '40%': { transform: 'rotate(9deg)' },
        },
      },
      listStyleType: {
        flower: '"✿ "',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }: PluginAPI) {
      matchUtilities(
        {
          'text-shadow': (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      ),
        matchUtilities(
          {
            'grid-pattern': (value) => ({
              backgroundImage: `url("${svgDataUri(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="36" height="36" fill="none" stroke="${value}" stroke-dasharray="6 3" transform="scale(1)"><path d="M36 .5H1.5V36"/></svg>`,
              )}")`,
            }),
          },
          {
            values: flattenColorPalette(theme('backgroundColor')),
            type: 'color',
          },
        )
    }),
    typography,
    hocus,
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('tailwindcss-debug-screens'),
  ],
} satisfies Config

// const config = {
//   darkMode: ["selector"],
//   content: ["./src/**/*.{ts,tsx}"],
//   prefix: "",
//   theme: {
//     screens: {
//       sm: "640px",
//       md: "768px",
//       lg: "1024px",
//       xl: "1280px",
//       "2xl": "1536px",
//     },
//     container: {
//       padding: {
//         DEFAULT: "1rem",
//         sm: "2rem",
//         lg: "4rem",
//       },
//     },
//     extend: {
//       fontFamily: {
//         sans: ['basiic', ...defaultTheme.fontFamily.sans],
//         pixel: ['Romance A', ...defaultTheme.fontFamily.mono],
//         cute: ['rainyhearts', ...defaultTheme.fontFamily.mono],
//         doodle: ['papernotessketch', ...defaultTheme.fontFamily.sans],
//         gothic: ['gothicpixelsmedium', ...defaultTheme.fontFamily.serif],
//         jotted: ['wildy_sansregular', ...defaultTheme.fontFamily.sans],
//       },
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         sidebar: {
//           DEFAULT: "hsl(var(--sidebar-background))",
//           foreground: "hsl(var(--sidebar-foreground))",
//           primary: "hsl(var(--sidebar-primary))",
//           "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
//           accent: "hsl(var(--sidebar-accent))",
//           "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
//           border: "hsl(var(--sidebar-border))",
//           ring: "hsl(var(--sidebar-ring))",
//         },
//         chart: {
//           "1": "hsl(var(--chart-1))",
//           "2": "hsl(var(--chart-2))",
//           "3": "hsl(var(--chart-3))",
//           "4": "hsl(var(--chart-4))",
//           "5": "hsl(var(--chart-5))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: {
//             height: "0",
//           },
//           to: {
//             height: "var(--radix-accordion-content-height)",
//           },
//         },
//         "accordion-up": {
//           from: {
//             height: "var(--radix-accordion-content-height)",
//           },
//           to: {
//             height: "0",
//           },
//         },
//         orbit: {
//           "0%": {
//             transform: "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
//           },
//           "100%": {
//             transform: "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
//           },
//         },
//         marquee: {
//           from: {
//             transform: "translateX(0)",
//           },
//           to: {
//             transform: "translateX(calc(-100% - var(--gap)))",
//           },
//         },
//         "marquee-vertical": {
//           from: {
//             transform: "translateY(0)",
//           },
//           to: {
//             transform: "translateY(calc(-100% - var(--gap)))",
//           },
//         },
//         speedLeft: {
//           "0%": { transform: "translateX(-100%)", opacity: "0" },
//           "100%": { transform: "translateX(0)", opacity: "1" },
//         },
//         speedRight: {
//           "0%": { transform: "translateX(100%)", opacity: "0" },
//           "100%": { transform: "translateX(0)", opacity: "1" },
//         },
//         speedUp: {
//           "0%": { transform: "translateY(100%)", opacity: "0" },
//           "100%": { transform: "translateY(0)", opacity: "1" },
//         },
//         float: {
//           "0%, 100%": { transform: "translateY(0)" },
//           "50%": { transform: "translateY(-20px)" },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//         orbit: "orbit calc(var(--duration)*1s) linear infinite",
//         marquee: "marquee var(--duration) infinite linear",
//         "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
//         "speed-left": "speedLeft 1s ease-out forwards",
//         "speed-right": "speedRight 1s ease-out forwards",
//         "speed-up": "speedUp 1s ease-out forwards",
//         "pulse-fast": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
//         float: "float 6s ease-in-out infinite",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
// } satisfies Config;
//
// export default config;

// const config: Config = {
//   darkMode: 'class',
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}',
//     'node_modules/preline/dist/*.js',
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         flicker: {
//           '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
//             opacity: '0.99',
//             filter:
//               'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
//           },
//           '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
//             opacity: '0.4',
//             filter: 'none',
//           },
//         },
//         shimmer: {
//           '0%': {
//             backgroundPosition: '-700px 0',
//           },
//           '100%': {
//             backgroundPosition: '700px 0',
//           },
//         },
//         "gradient-animation": {
//           "0%": {
//             "background-position": "0% 50%",
//           },
//           "50%": {
//             "background-position": "100% 50%",
//           },
//           "100%": {
//             "background-position": "0% 50%",
//           },
//         },
//       },
//       animation: {
//         "gradient-animation": "gradient-animation 4s ease infinite",
//         flicker: 'flicker 3s linear infinite',
//         shimmer: 'shimmer 1.3s linear infinite',
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/typography')({ target: 'legacy' }),
//     require('@tailwindcss/forms'),
//     require('@tailwindcss/line-clamp'),
//   ],
// };
//
// export default config
