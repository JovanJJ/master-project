// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // These paths tell Tailwind where to look for your utility classes
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        slab: ['var(--font-slab)', 'serif'],
        roboto_italic: ['var(--font-roboto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}