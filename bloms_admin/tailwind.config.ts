import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Lora', 'serif'],
        barcode: ['"Libre Barcode 39"', 'cursive'],
      },
      colors: {
        green: '#90aa86',
        yellow: '#dccca3',
        red: '#bb0a21',
        lightpurple: '#a6808c',
        darkpurple: '#2a1f2d',
        black: '#000000',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};

export default config;
