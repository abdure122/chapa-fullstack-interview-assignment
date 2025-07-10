/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
     extend: {
     colors: {
        brand: {
          DEFAULT: '#7dc400',     
          dark: '#5f9e00',       
          light: '#e8f9cc',   
             primary: '#7dc400',       
        white: '#ffffff',       
        },
       
      },
    },
  },
  plugins: [],
}

