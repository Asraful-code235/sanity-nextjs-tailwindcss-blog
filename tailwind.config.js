/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          100: '#d1d0d1',
          200: '#a3a2a4',
          300: '#747376',
          400: '#464549',
          500: '#18161b',
          600: '#131216',
          700: '#0e0d10',
          800: '#0a090b',
          900: '#050405',
        },
        yellow: {
          100: '#fff7e9',
          200: '#feeed3',
          300: '#fee6be',
          400: '#fddda8',
          500: '#fdd592',
          600: '#caaa75',
          700: '#988058',
          800: '#65553a',
          900: '#332b1d',
        },
      },
      backgroundSize: {
        130: '190%',
      },
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '1060px',
    },
  },
  plugins: [],
};
