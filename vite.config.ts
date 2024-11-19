import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import path from "path";
import rehypeShiki from "./rehype-shiki";
import rehypeSlug from "rehype-slug";
import rehypeLead from "./rehype-lead";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import kebabCase from "lodash/kebabCase";

export default defineConfig({
  resolve: {
    alias: {
      "stem-ui": path.resolve(__dirname, "app/common"),
    },
  },
  plugins: [
    iconsSpritesheet({
      withTypes: true,
      typesOutputFile: path.resolve(__dirname, "app/types/icon-gen.ts"),
      inputDir: path.resolve(__dirname, "icons"),
      outputDir: path.resolve(__dirname, "public"),
      fileName: "icons.svg",
      formatter: "prettier",
      iconNameTransformer: (fileName) => kebabCase(fileName),
    }),
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
