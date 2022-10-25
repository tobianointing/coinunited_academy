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
         'site-amber': '#ED8B18',
         'site-orange': '#FCE8D0',
      },
      fontFamily:{
        Dm: ['DM Serif Display', 'serif'],
        DmSans: ['DM Sans', 'sans-serif']
      },
      screens: {
        ssm:"778px",
        smm:"450px",
        ms: '860px',
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
