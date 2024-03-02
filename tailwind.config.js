/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        logo: '#FF0000',
        mainColor: '#121212',
        subColor: '#D0D0D0',
        searchBtnColor: '#222222',
        borderCorlor: '#303030',
      }
    },
  },
  plugins: [],
}

