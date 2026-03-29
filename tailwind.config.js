/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgBase: '#060910',
        bgCard: '#0d1117',
        accentBlue: '#2563eb',
        accentViolet: '#7c3aed',
        textPrimary: '#f0f6fc',
        textSecondary: '#8b949e',
        textTertiary: '#484f58',
        borderSubtle: 'rgba(48, 54, 61, 0.8)',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444'
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        blueGlow: '0 0 24px rgba(37, 99, 235, 0.35)',
        violetGlow: '0 0 24px rgba(124, 58, 237, 0.35)'
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 1.5s linear infinite',
        fadeSlideUp: 'fadeSlideUp 0.4s ease forwards'
      },
      backdropBlur: {
        xl: '20px'
      }
    }
  },
  plugins: []
};
