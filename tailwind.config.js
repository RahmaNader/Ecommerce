/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        "custom-light": "0 0 14.4px -1px rgba(167, 142, 120, 0.46)",
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
        customBeige: "#F4EEE8",
        
        customGray: {
          light: "#f7fafc",
          DEFAULT: "#edf2f7",
          dark: "#2d3748",
        },
        primary: "#1da1f2",
        secondary: "#14171a",
        darkGrey: "#141414",
        wine: "#721013",
        mutedGray: "#A78E78",
        shadowColor: "rgba(167, 142, 120, 0.46)",
      },
    },
  },
  plugins: [],
};
