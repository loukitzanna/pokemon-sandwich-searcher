const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  // darkMode: 'class', // or 'media' or 'class'
  theme: {
    // extend: {
    //   colors: {
    //     ...colors,
    //   },
    // },
  },
  variants: {},
  plugins: [
  ],
};