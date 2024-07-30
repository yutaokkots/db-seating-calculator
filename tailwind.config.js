/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        "sans": ['Nunito', 'sans-serif']
      },
      keyframes: {
        refine: {
          "0%": {
            left: "0%",
          },
          "100%": {
            left: "100%",
          },
        },
      },
      animation: {
        "refine-slide": "refine 0.5s",
      },
    },
  },
  plugins: [],
}
