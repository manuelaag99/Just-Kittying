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
        "nav-height-mob": "8rem"
      },
      colors: {
        "var-1": "#fffeee",
        "var-2": "#bbb",
        "var-3": "#F4BE4D"
      }
    },
  },
  plugins: [],
}
