/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "custom_green":{
          100 : "#D2E3C8",
          200:"#86A789",
          300 :"#739072",
          400:"#4F6F52"
        }
      }
    },
  },
  plugins: [],
}