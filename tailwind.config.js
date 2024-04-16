/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./assets/global.js"
  ],
  theme: {
    extend: {},
    fontFamily: {
      helveticaThinCond: ['"Helvetica Neue LT Std"', "sans-serif"],
      coutureBoldIt: ['"Couture BoldItalic"', "sans-serif"],
      coutureBold: ['"Couture Bold"', "sans-serif"],
      open: ['"Open Sans"', "sans-serif"],
      axis: ['"AXIS Extra"', "sans-serif"]
    },
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gray:{
        10: '#fafafa',
        100: '#a7a7a7',
        200: '#5f5f5f',
        600: '#5b5b5b',
        700: '#1b1919',
        800: '#212121',
        850: '#292929',
        900: '#191919'
      }
    },
    letterSpacing: {
      tightest: '-.08em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.02em',
      wider: '.04em',
      widerx: '.06em',
      widest: '.08em',
      xwidest: '.12em',
      xlwidest: '.34em',
    }
  },
  plugins: [],
}
