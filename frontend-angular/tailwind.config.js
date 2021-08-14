const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
	mode: 'jit',
	prefix: '',
	purge: {
		enabled: guessProductionMode(),
		content: [
			'./src/**/*.{html,ts}',
		]
	},
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			animation: {
				pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				flow: "flow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite"
			},

			keyframes: {
				pulse: {
					"0%, 100%": {
						opacity: 0,
					},
					"50%": {
						opacity: 1,
					},
				},
				flow: {
					"0%, 100%": {
						opacity: 0,
						'background-position': '-50vw 0',
					},
					"50%": {
						opacity: 1,
						'background-position': '50vw 0',
					},
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
