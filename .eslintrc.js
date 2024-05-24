module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:storybook/recommended',
    ],
    plugins: ['@emotion'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        curly: 2,
        '@typescript-eslint/no-inferrable-types': [
            'error',
            {
                ignoreParameters: true,
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'after-used',
            },
        ],
        '@emotion/pkg-renaming': 'error',
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['dist', 'cdk'],
};
