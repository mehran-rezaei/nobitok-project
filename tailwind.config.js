/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundLogin: {
        'hero-pattern': "linear-gradient(to right bottom, rgba('#3A4EFF',0.8), rgba('#8D0BAD',0.8)), url('../src/images/icon-bg.jpg')",
     },
    },
  },
  plugins: [],
})
