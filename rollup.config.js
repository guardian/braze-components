import babel from "@rollup/plugin-babel";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import filesize from "rollup-plugin-filesize";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";

const extensions = [...DEFAULT_EXTENSIONS, ".ts", ".tsx"];

const configs = [["./index.ts", "./dist/index.js"]].map(([input, file]) => ({
  input: input,
  output: {
    file: file,
    format: "cjs",
    sourcemap: false,
  },
  plugins: [
    alias({
      entries: [
        { find: "react", replacement: "preact/compat" },
        { find: "react-dom", replacement: "preact/compat" },
      ],
    }),
    resolve({ extensions: extensions }),
    commonjs(),
    replace({ "process.env.NODE_ENV": '"production"' }),
    babel({
      babelHelpers: "bundled",
      extensions: extensions,
    }),
    terser(),
    filesize(),
  ],
}));

export default configs;
