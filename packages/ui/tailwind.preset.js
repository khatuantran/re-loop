/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#F4F6F4',
        },
      },
      boxShadow: {
        soft: '0 2px 6px -2px rgba(15,23,42,0.06)',
        lift: '0 12px 28px -12px rgba(4,120,87,0.22)',
        primary: '0 8px 20px -6px rgba(16,185,129,0.55)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.6)', opacity: '0.4' },
        },
        pingSlow: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite linear',
        'slide-in': 'slideInUp 0.5s cubic-bezier(.2,.8,.2,1) both',
        'pulse-dot': 'pulseDot 1.6s infinite ease-in-out',
        'ping-slow': 'pingSlow 2s infinite cubic-bezier(0,0,0.2,1)',
      },
    },
  },
  plugins: [],
};
