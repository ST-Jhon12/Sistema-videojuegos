/**@type {import { 'tailwindcss' }.Config} */
export default {
   content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
      "../pages/*.{js,ts,jsx,tsx}" ],
   theme: {
     extend: {
     fontfamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
     }
   }
},
   plugins: [],
 }
