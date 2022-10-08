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
         glossary: '#F8F8F8',
      },
      fontFamily:{
        Dm: ['DM Serif Display', 'serif'],
        DmSans: ['DM Sans', 'sans-serif']
      },
      screens: {
        ssm:"778px",
        ms: '860px',
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
