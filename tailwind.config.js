/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./auth/**/*.html",
    "./rights/**/*.html",
    "./resources/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-purple': '#8b5cf6',
        'primary-blue': '#3b82f6',
        'accent-yellow': '#fbbf24',
        'success-green': '#10b981',
        'warning-red': '#ef4444',
        'dark-primary': '#1a1a1a',
        'dark-secondary': '#2d2d2d'
      },
      fontFamily: {
        'poppins': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        float: 'float 3s ease-in-out infinite',
        slideIn: 'slideIn 0.5s ease-out'
      }
    },
  },
  plugins: [],
}

