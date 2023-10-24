import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  dts: true,
  external: ["vue", "pinia"],
  format: ["cjs", "esm"],
});
