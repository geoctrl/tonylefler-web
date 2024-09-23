import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "stem-ui": path.resolve(__dirname, "app/common"),
    },
  },
  plugins: [remix(), tsconfigPaths()],
  clearScreen: false,
});
