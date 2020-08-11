import babel from "@rollup/plugin-babel";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import filesize from "rollup-plugin-filesize";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import externalGlobals from "rollup-plugin-external-globals";

const extensions = [...DEFAULT_EXTENSIONS, ".ts", ".tsx"];

const globals = {
  react: "guardian.automat.preact",
  "@emotion/core": "guardian.automat.emotionCore",
};

const configs = [["./index.ts", "./dist/index.js"]].map(([input, file]) => ({
  input: input,
  output: {
    file: file,
    format: "cjs",
    sourcemap: false,
  },
  external: (id) => Object.keys(globals).some((key) => id == key),
  plugins: [
    peerDepsExternal(),
    // alias({
    //   entries: [
    //     { find: "react", replacement: "preact-x/compat" },
    //     { find: "react-dom", replacement: "preact-x/compat" },
    //   ],
    // }),
    resolve({ extensions: extensions }),
    commonjs(),
    replace({ "process.env.NODE_ENV": '"production"' }),
    babel({
      babelHelpers: "bundled",
      extensions: extensions,
    }),
    terser(),
    filesize(),
    externalGlobals(globals),
  ],
}));

export default configs;
