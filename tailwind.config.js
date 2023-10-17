/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      animation: {
        'slide-down': 'animate-slide-down 2s ease-in-out',
      },
      keyframes: {
        'animate-slide-down': {
          '0%': { transform: 'translateY(0%)', opacity: '1' },
          '100%': { transform: 'translateY(500px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
