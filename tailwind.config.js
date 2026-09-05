/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#05070A',
          surface: '#0B1118',
          card: '#101923',
          line: '#1B2634',
        },
        accent: {
          DEFAULT: '#E02424',
          bright: '#FF4D4D',
        },
        steel: {
          DEFAULT: '#9AA7B5',
          light: '#C6D1DD',
        },
      },
      fontFamily: {
        heading: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(224, 36, 36, 0.24)',
        'glow-sm': '0 0 24px rgba(224, 36, 36, 0.24)',
        card: '0 8px 32px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'blue-glow': 'radial-gradient(circle at center, rgba(224, 36, 36, 0.24), transparent 65%)',
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
