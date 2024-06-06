/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'vs': '400px'
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.nav-hidden': {     // I created an extra class since the "hidden" property in Tailwind CSS wasn't working pefectly.
          'display': 'none',
        },
      })
    }),
    require('daisyui'),
  ],
}

