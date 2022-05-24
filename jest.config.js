module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    modulePathIgnorePatterns: ['<rootDir>/src/factories/test.ts'],
    transformIgnorePatterns: ['/node_modules/(?!(@guardian)/)'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
};
