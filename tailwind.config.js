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
        customGray: {
          "light": "#f7fafc",
          "DEFAULT": "#edf2f7",
          "dark": "#2d3748",
        },
        "primary": "#1da1f2",
        "secondary": "#14171a",
        "dark-grey": "#141414",
        "wine":"#721013",
      },
    },
  },
  plugins: [],
};
