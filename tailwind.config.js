/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",    // Dark blue background
        secondary: "#1E293B",  // Slightly lighter blue
        accent: "#0EA5E9",     // Bright blue accent
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to bottom, rgba(15, 23, 42, 0), rgba(15, 23, 42, 1))',
      },
    },
  },
  plugins: [],
}
