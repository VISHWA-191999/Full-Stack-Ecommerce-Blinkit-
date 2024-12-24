/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#ffbb00",
        "primary-light":"#ffc929",
        secondary : "#ADD8E6",

      },
    },
  },
  plugins: [],
}

