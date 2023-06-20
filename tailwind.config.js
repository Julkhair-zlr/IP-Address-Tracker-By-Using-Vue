/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      // backgroundImage: {
      //   "hero-pattern": "url('./src/assets/bgImg.png')",
      // },
      backgroundImage:{
        "hero-pattern": "url('bgImg.png')",
      },
    },
  },
  plugins: [],
};
