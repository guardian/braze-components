const isDevelopment = (): boolean => process.env.NODE_ENV === 'development';

const GRID_URL = isDevelopment()
    ? 'https://media.test.dev-gutools.co.uk'
    : 'https://media.gutools.co.uk';

export { isDevelopment, GRID_URL };
