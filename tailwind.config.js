/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#f9f4ef",
        headline: "#020826",
        paragraph: "#716040",
        button: "#8c7851",
        "text-button": "#fffffe",
        stroke: "#020826",
        "button-secondary": "#ede8e2",
        card: "#eaddcf",
        "card-p": "#716040",
        highlight: "#f25042",
        "card-border": "rgba(0,0,0,0.07)",
      },
    },
  },
  plugins: [],
};
