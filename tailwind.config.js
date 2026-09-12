/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hood: {
          bg: '#101211',
          card: '#1A1D1B',
          surface: '#202B23',
          border: '#343936',
          cyan: '#00E5FF',
          'cyan-hover': '#00C8E0',
          'cyan-dark': '#008394',
          muted: '#A5ADA6',
          accent: '#00F0FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(0, 229, 255, 0.4)',
        'cyan-sm': '0 0 12px -2px rgba(0, 229, 255, 0.3)',
      }
    },
  },
  plugins: [],
}

