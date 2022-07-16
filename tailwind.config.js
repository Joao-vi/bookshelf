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
      animation: {
        "shake-x": "shake-x 200ms ease-in-out",
        "go-left": "go-left 1s cubic-bezier(0.18, 0.89, 0.3, 1.4) infinite",
      },
      keyframes: {
        "shake-x": {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(5px)" },
          "50%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
          "100%": { transform: "translateX(0)" },
        },
        "go-left": {
          from: { transform: "translateX(0px)", opacity: 0.8 },
          to: { transform: "translateX(5px)", opacity: 1 },
        },
      },
      boxShadow: {
        "hover-focus-idle":
          "inset 0px 0px 0px 0px rgb(0 0 0 / 30%), 0px 0px 0px 0px rgb(0 0 0 / 18%)",
        "hover-on":
          "inset 0px 0px 0px 2px rgb(0 0 0 / 30%), 0px 0px 0px 0px rgb(0 0 0 / 18%)",
        "focus-on":
          "inset 0px 0px 0px 2px rgb(0 0 0 / 30%), 0px 0px 0px 3px rgb(0 0 0 / 18%)!important",
      },
      transitionProperty: {
        "hover-focus":
          "box-shadow 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};
