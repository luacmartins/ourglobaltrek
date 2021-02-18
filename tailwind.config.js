module.exports = {
  purge: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{css}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        84: "21rem",
        92: "23rem",
        100: "25rem",
        104: "26rem",
        120: "30rem",
        128: "32rem",
        132: "33rem",
        160: "40rem",
        164: "41rem",
        176: "44rem",
        260: "65rem",
      },
      minHeight: {
        176: "44rem",
      },
      maxHeight: {
        128: "32rem",
        160: "40rem",
        "1/2": "50%",
        "3/4": "75%",
      },
      width: {},
      zIndex: {
        "-10": -10,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
