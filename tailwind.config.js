module.exports = {
  plugins: [require("daisyui")],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  daisyui: {
    darkTheme: "business",
    themes: ["autumn", "business"],
  },
};
