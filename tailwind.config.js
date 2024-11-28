/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#262B15',
          light: '#464B37',
        },
        charcoal: '#3F3F3F',
        olive: '#464B37',
        sage: '#848871',
        mist: {
          DEFAULT: '#AFB4AD',
          light: '#E8EAE7',
        },
      },
    },
  },
  plugins: [],
};