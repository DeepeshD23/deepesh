/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff6b00',
          orangeLight: '#ff8c38',
          orangeDark: '#cc5500',
          red: '#e63000',
          dark: '#0a0a0a',
          darker: '#050505',
          surface: '#111111',
          surfaceLight: '#1a1a1a',
          border: '#222222',
          borderLight: '#333333',
          text: '#f0f0f0',
          muted: '#888888',
          dimmed: '#444444',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'asphalt': "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23ffffff' fill-opacity='0.015'/%3E%3C/svg%3E\")",
        'speed-lines': 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,107,0,0.015) 2px, rgba(255,107,0,0.015) 3px)',
        'hero-grad': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,0,0.12) 0%, transparent 70%)',
        'orange-glow': 'radial-gradient(circle at center, rgba(255,107,0,0.15) 0%, transparent 70%)',
      },
      animation: {
        'speed-right': 'speedRight 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'pulse-orange': 'pulseOrange 2s ease-in-out infinite',
        'rev': 'rev 3s ease-in-out infinite',
      },
      keyframes: {
        speedRight: {
          '0%': { transform: 'translateX(-60px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,107,0,0)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(255,107,0,0.25)' },
        },
        rev: {
          '0%': { transform: 'rotate(-2deg) scale(1)' },
          '50%': { transform: 'rotate(2deg) scale(1.02)' },
          '100%': { transform: 'rotate(-2deg) scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
};
