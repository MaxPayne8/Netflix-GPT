/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      md: "1150px",
      // => @media (min-width: 1440px) { ... }
      sm: "500px",
      lg: "800px",
    },
    extend: {},
  },
  plugins: [],
};
