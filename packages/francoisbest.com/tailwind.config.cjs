const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx,mjs,cjs}'],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        // 50% mix between slate.900 and slate.950
        // https://meyerweb.com/eric/tools/color-blend/#111827:030712:1:hex
        bgDark: '#0a101d',
        bgLight: 'white'
      }
    }
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')]
}
