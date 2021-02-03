import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import externalGlobals from 'rollup-plugin-external-globals';
import pkg from './package.json';
import visualizer from 'rollup-plugin-visualizer';

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

const globals = {
	react: 'guardian.automat.preact',
	'@emotion/core': 'guardian.automat.emotionCore',
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
		external: (id) => Object.keys(globals).some((key) => id == key),
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
			externalGlobals(globals),
			// Note, visualizer is useful for *relative* sizes, but reports
			// pre-minification.
			visualizer({ gzipSize: true }),
		],
	},
];

export default configs;
