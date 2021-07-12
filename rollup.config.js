import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const isProd = process.env.BUILD === "production";

const banner = `/*
THIS IS A GENERATED FILE BUNDLED BY ROLLUP.
If you want to view the source, visit the package's GitHub repository.
*/
`;

export default {
  input: "src/plugin/main.ts",
  output: {
    dir: ".",
    sourcemap: "inline",
    sourcemapExcludeSources: isProd,
    format: "cjs",
    exports: "default",
    banner,
  },
  external: ["obsidian"],
  plugins: [typescript(), nodeResolve({ browser: true }), commonjs()],
};
