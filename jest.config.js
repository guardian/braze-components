module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jest-environment-jsdom-sixteen',
    roots: ['<rootDir>/src'],
    modulePathIgnorePatterns: ['<rootDir>/src/factories/test.ts'],
    transformIgnorePatterns: ['/node_modules/(?!(@guardian)/)'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json',
        },
    },
};
