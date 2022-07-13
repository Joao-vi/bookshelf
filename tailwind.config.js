/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#55423d",
        headline: "#fffffe",
        paragraph: "#fff3ec",
        button: "#ffc0ad",
        "text-button": "#271c19",
        stroke: "#140d0b",
      },
    },
  },
  plugins: [],
};
