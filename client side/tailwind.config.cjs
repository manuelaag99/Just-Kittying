/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontSize: {
      postDisplayName: '1.1rem',
      postDate: '0.6rem',
      commentFontSizeDsk: '1rem',
      commentFontSizeMob: "0.9rem",
      logoSizeLarge: "2rem",
      logoSizeMedium: "1.4rem",
      profileDisplayName: "1.3rem",
      navBottomDsk: "1rem",
      navBottomMob: "1rem"
    },
    borderRadius: {
      circular: "50%",
      round: "25%",
      button: "12px"
    },
    extend: {
      dropShadow: {
        "card": "1px 1px 5px #111",
        "navbar": "1px 1px 2px #111",
        "button": "0.6px 0.6px 1px #111"
      },
      height: {
        "nav-height-mob": "4rem",
        "nav-height-dsk": "5rem",
        "userProfilePhotosTabPhotoHeight": "12rem",
        "userProfileFriendsTabPhotoHeight": "3rem"
      },
      colors: {
        "var-1": "#fff",
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
        "1/20": "5%",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "95": "95%"
      }
    },
  },
  plugins: [],
}
