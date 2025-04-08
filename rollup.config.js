import { terser } from "rollup-plugin-terser";

export default [
  // UMD (Universal Module Definition) format
  {
    input: "src/index.js",
    output: {
      file: "dist/titanium-animate.js",
      format: "umd",
      name: "TitaniumAnimate",
      sourcemap: true,
    },
    plugins: [terser()], // Minification for production
  },
  // ESM (ES Modules) format
  {
    input: "src/index.js",
    output: {
      file: "dist/titanium-animate.esm.js",
      format: "esm",
      sourcemap: true,
    },
  },
];
