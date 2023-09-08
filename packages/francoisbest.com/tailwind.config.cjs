const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx,mjs,cjs}'],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('@mertasan/tailwindcss-variables'),
  ],
}
