module.exports = {
	content: ["./index.html", "./src/**/*.tsx", "./src/components/*.tsx", 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        'gray01': '#D9D9D9',
        'gray02': '#D1D1D1',

        'black01': '#2C2830',
        'black02': '#221F26',

        'purple01': '#AB5CFA',

        'orange01': '#EC7410'
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
