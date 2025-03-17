/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#121A27",
        highlight: "#07BA4D",
        secondary: "#ECEFF3",
        tertiary: "#818795",
        "dark-blue": "#182335",
      },
      fontFamily: {
        'fontHeader': ['Luckiest Guy', 'sans-serif'],
        'fontMain-thin': ['BarlowSemiCondensed-Thin', 'sans-serif'],
        'fontMain-extralight': ['BarlowSemiCondensed-ExtraLight', 'sans-serif'],
        'fontMain-light': ['BarlowSemiCondensed-Light', 'sans-serif'],
        'fontMain-regular': ['BarlowSemiCondensed-Regular', 'sans-serif'],
        'fontMain-medium': ['BarlowSemiCondensed-Medium', 'sans-serif'],
        'fontMain-semibold': ['BarlowSemiCondensed-SemiBold', 'sans-serif'],
        'fontMain-bold': ['BarlowSemiCondensed-Bold', 'sans-serif'],
        'fontMain-extrabold': ['BarlowSemiCondensed-ExtraBold', 'sans-serif'],
        'fontMain-black': ['BarlowSemiCondensed-Black', 'sans-serif'],
      }
    },
  },
  plugins: [],
};