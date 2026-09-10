/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CYBERX Franchise palette (fixed by brand guide — do not alter)
        cyberx: {
          red: '#E32124',          // Official Brand Red (RGB: 227 33 36)
          redBright: '#FF2A2E',    // Hover / Active
          redDeep: '#8A0F12',
          redDark: '#590507',
          ink: '#050507',          // Page background (obsidian)
          surface: '#0A0A0F',      // Cards
          raised: '#101017',       // Elevated surfaces
          line: 'rgba(255,255,255,0.08)',
          lineStrong: 'rgba(255,255,255,0.16)',
          text: '#F4F4F6',
          muted: '#A1A1AA',
          faint: '#63636B',
          white: '#FEFEFE',
          black: '#000000',
        },
      },
      fontFamily: {
        // Franchise display type: Tactic Sans first, Montserrat fallback (always loaded)
        display: ['"Tactic Sans"', 'Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      boxShadow: {
        // Premium = soft depth, no neon glows
        soft: '0 24px 70px -20px rgba(0,0,0,0.65)',
        lift: '0 14px 40px -14px rgba(0,0,0,0.55)',
        modal: '0 40px 120px -20px rgba(0,0,0,0.8)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'ken-burns': 'kenBurns 14s ease-in-out infinite alternate',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1.02) translateY(0)' },
          '100%': { transform: 'scale(1.09) translateY(-1.5%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
