import {
  BundledLanguage,
  BundledTheme,
  createHighlighter,
  HighlighterGeneric,
} from "shiki";
import rehypeParse from "rehype-parse";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";

type supportedLanguages = "scss" | "tsx" | "shell";

// Cache highlighter at module level to prevent creating multiple instances
let cachedHighlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null;

async function getHighlighter() {
  if (!cachedHighlighter) {
    cachedHighlighter = await createHighlighter({
      langs: ["tsx", "scss", "shell"],
      themes: ["github-dark", "github-light"],
    });
  }
  return cachedHighlighter;
}

export async function generateRehypeShikiPlugin() {
  const highlighter = await getHighlighter();

  return () => {
    return async (tree: any) => {
      visit(tree, "element", (node: any) => {
        const className = node?.children?.[0]?.properties?.className?.[0];

        if (node.tagName === "pre" && className?.startsWith("language-")) {
          const lang = className.replace("language-", "") as supportedLanguages;

          // Check if this is a supported language
          if (["tsx", "scss", "shell"].includes(lang)) {
            const html = highlighter.codeToHtml(toString(node), {
              lang,
              themes: {
                light: "github-light",
                dark: "github-dark",
              },
            });

            const rehypeTree = unified()
              .use(rehypeParse, { fragment: true })
              .use(rehypeStringify)
              .parse(html) as any;

            const el = rehypeTree.children[0];
            node.type = el.type;
            node.tagName = el.tagName;
            node.properties = el.properties;
            node.children = el.children;
          }
        } else if (node.tagName === "pre") {
          // add classname "simple" to pre
          node.properties.className = ["simple"];
        }
      });
    };
  };
}
