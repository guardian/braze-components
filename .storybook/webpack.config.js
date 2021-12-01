const path = require('path');
module.exports = ({ config, mode }) => {
    config.module.rules.push({
        test: /\.m?(j|t)sx?$/,
        loader: require.resolve('babel-loader'),
        exclude: {
            test: /node_modules/,

            // don't exclude '@guardian' node_modules
            exclude: /@guardian\//,
        },
        options: {
            presets: [
                '@babel/preset-typescript',
                '@emotion/babel-preset-css-prop',
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            esmodules: true,
                        },
                    },
                ],
            ],
            plugins: [],
        },
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
