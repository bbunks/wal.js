import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/common.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: false,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "../../tsconfig.json",
        compilerOptions: { outDir: "dist/cjs" },
        sourceMap: false,
        declaration: false,
        emitDeclarationOnly: false,
      }),
    ],
  },
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
          outDir: "dist/esm",
          rootDir: "./packages/react",
          sourceMap: true,
          declaration: true,
        },
        exclude: ["node_modules"],
      }),
    ],
    external: ["react", "@wal.js/core"],
  },
  {
    input: "dist/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
