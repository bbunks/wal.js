import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      typescript({
        tsconfig: "../../tsconfig.json",
        compilerOptions: {
          outDir: "dist",
          rootDir: "./packages/vue",
          sourceMap: true,
          declaration: true,
        },
        exclude: ["node_modules"],
      }),
    ],
    external: ["vue", "@wal.js/core"],
  },
  {
    input: "dist/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
