/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    extend: {
      colors: { accent: '#ff4500' },
      borderWidth: { '3': '3px' },
      letterSpacing: { 'widest2': '0.14em' },
      lineHeight: { 'tighter': '0.92' },
    },
  },
}
