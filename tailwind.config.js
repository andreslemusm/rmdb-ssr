const colors = require("tailwindcss/colors");
const { fontWeight } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  plugins: [
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
  theme: {
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    fontWeight: {
      bold: fontWeight.bold,
      normal: fontWeight.normal,
    },
    colors: {
      // Primary / Neutrals
      neutral: colors.neutral,
      // Supporting
      sky: colors.sky,
      cyan: colors.cyan,
      pink: colors.pink,
      red: colors.red,
      yellow: colors.yellow,
      teal: colors.teal,
      white: colors.white,
      transparent: colors.transparent,
      black: colors.black,
      inherit: colors.inherit,
    },
    extend: {
      aspectRatio: {
        "2/3": "2 / 3",
      },
    },
  },
};
