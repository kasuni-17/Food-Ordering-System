/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1ee",
          100: "#ffe4de",
          200: "#ffc6b8",
          300: "#ffa28d",
          400: "#ff7a5f",
          500: "#ae311e",
          600: "#992a1a",
          700: "#7b2114",
          800: "#5a180f",
          900: "#3f100a"
        }
      }
    }
  },
  plugins: []
};

