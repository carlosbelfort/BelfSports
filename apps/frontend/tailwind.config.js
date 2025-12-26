/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#67917a",
        color2: "#170409",
        color3: "#b8af03",
        color4: "#ccbf82",
        color5: "#e33258",
      },
    },
  },
  plugins: [],
};