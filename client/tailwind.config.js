/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#24919b',
        primaryTextColor: '#27282E',
        secondaryTextColor: '#6F7074',
        primaryHoverColor: '#1a6092',
        skeletonLoaderColor: '#cfcfd1',
      },
    },
    screens: {
      // Add your screen size here
      'xs': '340px', // => @media (min-width: 340px) { ... }
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}

