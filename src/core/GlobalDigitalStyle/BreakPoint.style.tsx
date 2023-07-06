const size = {
	screenXXL: '1920px',
	screen1680: '1680px',
	screen1440: '1440px',
	screen1366: '1366px',
	screen1280: '1280px',
	screen1024: '1024px',
	screen1050: '1050px',
	screen769: '769px',
	screen800: '800px',
	screen680: '680px',
	screen428: '428px',
	screen390: '390px',
	screen340: '340px',
};
const device = {
	screenXXL: `(max-width: ${size.screenXXL})`,
	screen1680: `(max-width: ${size.screen1680})`,
	screen1440: `(max-width: ${size.screen1440})`,
	screen1366: `(max-width: ${size.screen1366})`,
	screen1280: `(max-width: ${size.screen1280})`,
	screen1050: `(max-width: ${size.screen1050})`,
	screen1024: `(max-width: ${size.screen1024})`,
	screenM1: `(max-width: ${size.screen769})`,
};
export default device;
