/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: { "pulse-fast": "pulse .85s linear infinite" },
    },
  },
  plugins: [],
};
