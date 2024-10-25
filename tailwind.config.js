/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-light": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 4px 8px rgba(0, 0, 0, 0.2)",
      },
      fontFamily: {
        mainFontFamily: ['Playfair Display', 'serif'], // Main Font 
        secondFontFamily: ['Poppins', 'sans-serif'], // M
        playball: ['Playball', 'cursive'], // home page 
        instrument: ['Instrument Sans', 'sans-serif'],
        instrumentSerif: ['"Instrument Serif"', 'serif'],
      },
      fontSize: {
        'Nav-Font-size': '24px', // Custom font size
      },
      colors: {
        mainColor:"#f4eee8",
        secondColor:"#710e12",
        ThirdColor:"#A78E78",
        ForthColor:"#A78E78",
        FifthColor:"#E14B4B",
        sixColor:"#af754d",
        sevenColor:"#3d3128",
        eightColor:"#E5D4C6",
        primary: "#1da1f2",
        secondary: "#14171a",
        customGray: {
          light: "#f7fafc",
          DEFAULT: "#edf2f7",
          dark: "#2d3748",
        },
      },
    },
  },
  plugins: [],
};
