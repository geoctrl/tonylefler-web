import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import path from "path";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import kebabCase from "lodash/kebabCase";
import tailwindcss from "@tailwindcss/vite";

import rehypeLead from "./rehype-lead";
import { generateRehypeShikiPlugin } from "./rehype-shiki";

export default defineConfig(async () => {
  const rehypeShikiPlugin = await generateRehypeShikiPlugin();

  return {
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
        pathToPublicDir: path.resolve(__dirname, "public"),
      }),
      {
        ...mdx({
          rehypePlugins: [
            rehypeShikiPlugin,
            rehypeSlug,
            rehypeLead,
            [
              rehypeExternalLinks,
              { target: "_blank", rel: ["noopener", "noreferrer"] },
            ],
          ],
        }),
        enforce: "pre",
      },
      reactRouter(),
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        root: path.resolve(__dirname, "app/common"),
      },
    },
    server: {
      port: 3000,
    },
    clearScreen: false,
  };
});
