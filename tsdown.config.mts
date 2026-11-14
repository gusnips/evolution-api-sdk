import { defineConfig } from "tsdown";

// tsup built every file in src on its own, so the package ships lib/<same path>.{js,mjs,d.ts,d.mts}
// plus sourcemaps for each of them. `unbundle` keeps that layout: one output file per source file.
// File names stay the ones tsup wrote: .js (CommonJS), .mjs, .d.ts, .d.mts.
export default defineConfig({
  entry: ["src/**/*.ts"],
  unbundle: true,
  outDir: "lib",
  format: ["cjs", "esm"],
  dts: { sourcemap: false },
  sourcemap: true,
  target: "es2020",
  outExtensions: ({ format }) =>
    format === "cjs" ? { js: ".js", dts: ".d.ts" } : { js: ".mjs", dts: ".d.mts" },
});
