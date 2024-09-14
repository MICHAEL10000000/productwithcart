/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "RedHat-B": ["RedHat-B"],
        "RedHat-SB": ["RedHat-SB"],
        "RedHat-R": ["RedHat-R"],
        "RedHat-V": ["RedHat-V"],
      },
      colors:{
        SCred: "hsl(14, 86%, 42%)",
        SCGreen: "hsl(159, 69%, 38%)",

        SCRose50: "hsl(20, 50%, 98%)",
        SCRose100: "hsl(13, 31%, 94%)",
        SCRose300: "hsl(14, 25%, 72%)",
        SCRose400: "hsl(7, 20%, 60%)",
        SCRose500: "hsl(12, 20%, 44%)",
        SCRose900: "hsl(14, 65%, 9%),"
      }
    },
  },
  plugins: [],
}

