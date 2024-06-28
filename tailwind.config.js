/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./main.html",
      "./src/**/*.{html,js,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'bounce-custom': 'bounce-custom 1s infinite',
      },
      keyframes: {
        'bounce-custom': {
          '0%, 100%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
        },
      },
    },
  },
  plugins: [
  ],
}

