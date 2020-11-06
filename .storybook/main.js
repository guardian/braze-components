const path = require('path');

module.exports = {
    stories:
        process.env.NODE_ENV === 'development'
            ? ['../src/**/*.stories.tsx']
            : ['../src/!(AppBanner)/*.stories.tsx'],
    addons: ['@storybook/addon-knobs', '@storybook/addon-viewport', './gu-preview/register.js'],
};
