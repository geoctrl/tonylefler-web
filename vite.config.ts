import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import path from "path";
import rehypeSlug from "rehype-slug";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import kebabCase from "lodash/kebabCase";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

import rehypeLead from "./rehype-lead";
import { generateRehypeShikiPlugin } from "./rehype-shiki";

export default defineConfig(async () => {
  const rehypeShikiPlugin = await generateRehypeShikiPlugin();

  return {
    resolve: {
      alias: {
        root: path.resolve(__dirname, "app/common"),
      },
    },
    plugins: [
      tailwindcss(),
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
          rehypePlugins: [rehypeShikiPlugin, rehypeSlug, rehypeLead],
        }),
        enforce: "pre",
      },
      dts({
        insertTypesEntry: true,
      }),
      remix(),
      tsconfigPaths(),
    ],
    clearScreen: false,
  };
});
