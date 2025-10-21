/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9", // sky blue
        secondary: "#1E293B", // slate blue-gray
        accent: "#22D3EE", // cyan highlight
        dark: "#0F172A", // deep navy
      },
      backgroundImage: {
        "gradient-main": "linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)",
        "gradient-dark": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      },
    },
  },
  plugins: [],
};

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
