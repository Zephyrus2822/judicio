const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // your paths
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "450% 50%, 450% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};


function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let selectedColors = {
    "--black": allColors.black,
    "--white": allColors.white,
    "--blue-500": allColors["blue-500"],
    "--indigo-300": allColors["indigo-300"],
    "--blue-300": allColors["blue-300"],
    "--violet-200": allColors["violet-200"],
    "--blue-400": allColors["blue-400"],
    "--transparent": "transparent", 
  };
  
  addBase({
    ":root": selectedColors,
  });
}
