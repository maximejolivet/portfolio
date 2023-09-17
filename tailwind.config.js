/** @type {import("tailwindcss").Config} */

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{html,js}",
    "./components/**/*.{html,vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.{html,js,vue}",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "media", // or "media" or "class"
  theme: {
    container: {
      padding: "20px",
    },
    colors: {
      transparent: "transparent",
      mask: "rgba(45, 45, 45, .5)",
      white: "#ffffff",
      black: "#000000",
      primary: {
        default: "#2D2D2D",
        hover: "#1A1A1A",
        light: "#3F3F3F",
        lighter: "#4F4F4F",
        lightest: "#5F5F5F",
      },
      secondary: {
        default: "#F2F2F2",
        hover: "#E6E6E6",
        light: "#F9F9F9",
        lighter: "#FCFCFC",
        lightest: "#FFFFFF",
      },
      info: {
        default: "#2196F3",
        hover: "#1E88E5",
      },
      success: {
        default: "#00C48C",
        hover: "#00B27A",
      },
      warning: {
        default: "#FFB800",
        hover: "#FFA600",
      },
      danger: {
        default: "#FF3D00",
        hover: "#FF2D00",
      },
    },
    borderRadius: {
      none: "0",
      5: "5px",
      10: "10px",
      20: "20px",
      full: "999px",
    },
    boxShadow: {
      elevation: "0px 0px 12px rgba(0, 0, 0, 0.1)",
    },
    spacing: {
      0: "0",
      4: "4px",
      8: "8px",
      12: "12px",
      20: "20px",
      24: "24px",
      32: "32px",
      40: "40px",
      52: "52px",
      64: "64px",
      84: "84px",
      104: "104px",
      136: "136px",
      220: "220px",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    fontSize: {
      11: "11px",
      12: "12px",
      13: "13px",
      14: "14px",
      16: "16px",
      18: "18px",
      22: "22px",
      24: "24px",
      28: "28px",
    },
    lineHeight: {
      16: "16px",
      20: "20px",
      22: "22px",
      24: "24px",
      28: "28px",
      32: "33px",
    },
  },
  variants: {
    extend: {
      //
    },
  },
};
