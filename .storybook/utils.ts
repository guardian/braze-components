const matchesHostname = (hostname: string): boolean =>
	window.location.hostname === hostname;

const isDevelopment = (): boolean =>
	matchesHostname('braze-storybook.local.dev-gutools.co.uk');
const isCode = (): boolean =>
	matchesHostname('braze-components.code.dev-gutools.co.uk');
const isProduction = (): boolean =>
	matchesHostname('braze-components.gutools.co.uk');

const GRID_URL =
	isDevelopment() || isCode()
		? 'https://media.test.dev-gutools.co.uk'
		: 'https://media.gutools.co.uk';

export { GRID_URL };
