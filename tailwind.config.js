/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
         footer: '#15192a',
      },
      fontFamily:{
        Dm: ['DM Serif Display', 'serif'],
        DmSans: ['DM Sans', 'sans-serif']
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
