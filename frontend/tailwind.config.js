
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: ["class"], // Enable dark mode with class toggle
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Purge unused styles
  theme: {
    extend: {
      colors: {
        teal: colors.teal, // Default teal
        customTeal: '#00b5a2', // Optional custom teal color
      },
      borderRadius: {
        lg: 'var(--radius)',  // Custom border radius variable
        md: 'calc(var(--radius) - 2px)', // Smaller radius based on custom variable
        sm: 'calc(var(--radius) - 4px)', // Even smaller radius based on custom variable
      },
    },
  },
  plugins: [require("tailwindcss-animate")], 
}
