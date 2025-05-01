/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{html,ts}"
    ],
    theme: {
      extend: {
        colors: {
        },
        animation: {
          'fadeIn': 'fadeIn 0.3s ease-in-out',
          'modalEnter': 'modalEnter 0.3s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(-10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          modalEnter: {
            '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
            '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
          },
        },
      },
    },
    plugins: [],
  }
  