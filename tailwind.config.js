/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid"
  ],
  theme: {
    extend: {},
    fontFamily: {
      helvetica: ['"Helvetica Thin"', "sans-serif"],
      helveticaThinCond: ['"Helvetica ThinCond"', "sans-serif"],
      helveticaThinCondObl: ['"Helvetica ThinCondObl"', "sans-serif"],
      helveticaThinItalic: ['"Helvetica ThinItalic"', "sans-serif"],
      helveticaThinExtObl: ['"Helvetica ThinExtObl"', "sans-serif"],
      helveticaThinExt: ['"Helvetica ThinExt"', "sans-serif"],
      coutureBoldIt: ['"Couture BoldItalic"', "sans-serif"],
      coutureBold: ['"Couture Bold"', "sans-serif"],
      open: ['"Open Sans"', "sans-serif"],
      axis: ['"AXIS Extra"', "sans-serif"]
    },
  },
  plugins: [],
}
