module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'lg':'500px',
      },
      colors: {
        'primary': 'rgba(255, 69, 0)',
        'secondary': '#8b0000',
        'input': '#4ffc05'
      },
      fontFamily: {
        'poppins': ['Poppins', 'italic'],
      },
    },
  },
  plugins: [],
}