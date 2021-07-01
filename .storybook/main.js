const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-knobs',
        '@storybook/addon-viewport',
        './gu-auth/register.js',
        './gu-preview/register.js',
        './grid/register.js',
    ],
};
