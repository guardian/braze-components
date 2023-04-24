const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-controls',
        '@storybook/addon-viewport',
        './gu-auth/register.js',
        './gu-preview/register.js',
        './grid/register.js',
        './article-context/register.js',
    ],
    core: {
        builder: '@storybook/builder-webpack5',
    },
};
