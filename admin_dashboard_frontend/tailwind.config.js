/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        secondary: '#6B7280',
        success: '#16A34A',
        error: '#EF4444',
      },
      fontSize: {
        'base': '14px',
      },
      spacing: {
        'grid': '8px',
      },
    },
  },
  plugins: [],
}
