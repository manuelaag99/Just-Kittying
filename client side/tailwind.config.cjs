/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      dropShadow: {
        "card": "1px 1px 5px #111",
        "navbar": "1px 1px 2px #111"
      },
      height: {
        "nav-height-dsk": "5rem",
        "nav-height-mob": "4rem"
      },
      colors: {
        "var-1": "#fffeee",
        "var-2": "#bbb",
        "var-3": "#F4BE4D",
        "var-1-dark": "#000111",
        "var-2-dark": "#aaa"
      },
      margin: {
        "top-margin-dsk": "6rem",
        "top-margin-mob": "5rem"
      },
      width: {
        "9/10": "90%",
        "95": "95%"
      }
    },
  },
  plugins: [],
}
