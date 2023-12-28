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
          100 : "#F3F3F3",
          200:"#C5E898",
          300 :"#29ADB2",
          400:"#0766AD"
        }
      }
    },
  },
  plugins: [],
}