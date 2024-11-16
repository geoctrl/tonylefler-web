import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import path from "path";
import rehypeShiki from "./rehype-shiki";
import rehypeSlug from "rehype-slug";
import rehypeLead from "./rehype-lead";

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
        rehypePlugins: [rehypeShiki, rehypeSlug, rehypeLead],
      }),
      enforce: "pre",
    },
    remix(),
    tsconfigPaths(),
  ],
  clearScreen: false,
});
