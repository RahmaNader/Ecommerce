/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-light": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 4px 8px rgba(0, 0, 0, 0.2)",
      },
      colors: {
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
