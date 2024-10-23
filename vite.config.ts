import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import path from "path";
import shikiMdxPlugin from "./shiki-mdx-plugin";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
      "stem-ui": path.resolve(__dirname, "app/common"),
    },
  },
  plugins: [
    {
      ...mdx({
        rehypePlugins: [shikiMdxPlugin],
      }),
      enforce: "pre",
    },
    remix(),
    tsconfigPaths(),
  ],
  clearScreen: false,
});
