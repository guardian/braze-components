import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';
import logicPkg from './logic/package.json';
import visualizer from 'rollup-plugin-visualizer';
import { resolve as resolvePath } from 'path';

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

const commonConfig = {
    plugins: [
        peerDepsExternal(),
        resolve({ extensions: extensions }),
        commonjs(),
        replace({ 'process.env.NODE_ENV': '"production"' }),
        babel({
            babelHelpers: 'bundled',
            extensions: extensions,
        }),
        terser(),
        filesize(),
        // Note, visualizer is useful for *relative* sizes, but reports
        // pre-minification.
        visualizer({ gzipSize: true }),
    ],
};

const configs = [
    {
        input: './index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
            },
            {
                file: pkg.module,
                format: 'esm',
                sourcemap: false,
            },
        ],
        ...commonConfig,
    },
    {
        input: './logic-index.ts',
        output: [
            {
                file: resolvePath('./logic', logicPkg.main),
                format: 'cjs',
            },
            {
                file: resolvePath('./logic', logicPkg.module),
                format: 'esm',
                sourcemap: false,
            },
        ],
        ...commonConfig,
    },
];

export default configs;
