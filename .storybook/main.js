const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-knobs", "@storybook/addon-viewport","./gu-preview/register.js"],
};
