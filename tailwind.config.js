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
      colors: {
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
        mainColor: "#721013",
        removeButton: "#E14B4B",
        skin: "#A78E78",
        addressDetails: "#AF754D"
      },
    },
  },
  plugins: [],
};
