/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			primary: '#01ABC1',
			white: '#fff',
			...colors,
		},
		extend: {
			height: {
				85: '22.5rem',
				165: '45rem',
			},
		},
		fontFamily: {
			manrope: ['Manrope', 'sans-serif'],
			libreBaskerville: ['LibreBaskerville', 'sans-serif'],
		},
		screens: {
			sm: { min: '800px', max: '1023px' },
			md: { min: '1024px', max: '1365px' },
			lg: { min: '1366px', max: '1439px' },
			xl: { min: '1440px', max: '1535px' },
			'2xl': { min: '1536px', max: '1680px' },
			'3xl': { min: '1681px' },
		},
	},
	plugins: [],
};
