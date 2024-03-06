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
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000'
    },
    letterSpacing: {
      tightest: '-.08em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.08em',
      xlwidest: '.34em',
    }
  },
  plugins: [],
}
