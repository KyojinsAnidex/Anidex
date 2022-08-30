const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			'solarizedBase02' : '#073642',
			'solarizedBase2' : '#eee8d5',
			'solarizedBase3' : '#fdf6e3',
			'solarizedBase00' : '#657b83',
			'solarizedBase01' : '#586e75',
			'solarizedRed' : '#dc322f',
			'solarizedYellow':'#b58900',
			'solarizedBlue' : '#268bd2'
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
module.exports = config;
