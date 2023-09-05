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
      profileOtherText: "1rem",
      navBottomDsk: "1rem",
      navBottomMob: "1rem",
      signInOrsignUpDsk: "1rem",
      signInOrsignUpMob: "0.9rem",
      errorFont: "0.8rem"
    },
    borderRadius: {
      circular: "50%",
      round: "25%",
      button: "12px",
      input: "20px",
      post: "8px"
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
        "userProfileFriendsTabPhotoHeight": "3rem",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%"
      },
      colors: {
        "var-1": "#fff",
        "var-2": "#bbb",
        "var-3": "#F4BE4D",
        "var-4": "#eee",
        "var-1-dark": "#000111",
        "var-2-dark": "#aaa",
        "var-3-hovered": "#F39F1F",
        "facebook": "#3b5998",
        "facebook-hover": "#1C53a9",
        "black-inactive": "#555"
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
        "15": "15%",
        "85": "85%",
        "95": "95%"
      }
    },
  },
  plugins: [],
}
