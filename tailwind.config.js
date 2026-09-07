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
        cyberx: {
          red: '#E32124',        // Official Brand Red (RGB: 227 33 36)
          redGlow: '#FF1F23',
          redDark: '#930E10',
          redDeep: '#590507',
          black: '#000000',      // Official Brand Black (RGB: 0 0 0)
          white: '#FEFEFE',      // Official Brand White (RGB: 254 254 254)
          card: '#0B0B0F',
          cardHover: '#13131A',
          surface: '#101015',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(227, 33, 36, 0.45)',
          muted: '#8A8A93',
        }
      },
      fontFamily: {
        display: ['"Tactic Sans"', 'Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #E32124 0%, #8A003E 100%)',
        'brand-orange': 'linear-gradient(135deg, #E32124 0%, #FF6200 100%)',
        'brand-blue': 'linear-gradient(135deg, #0055FF 0%, #00C2FF 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar': 'radarSweep 6s linear infinite',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'fadeOut': 'fadeOut 0.2s ease-in',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
