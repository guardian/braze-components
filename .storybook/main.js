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
    '@storybook/addon-webpack5-compiler-babel'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
