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

type supportedLanguages = "scss" | "tsx";

async function getHighlighterTsx() {
  console.log("how many?");
  return await createHighlighter({
    langs: ["tsx"],
    themes: ["github-dark", "github-light"],
  });
}

async function getHighlighterScss() {
  return await createHighlighter({
    langs: ["scss"],
    themes: ["github-dark", "github-light"],
  });
}

export async function generateRehypeShikiPlugin() {
  const highlighterTsx = await getHighlighterTsx();
  const highlighterScss = await getHighlighterScss();

  return () => {
    return async (tree: any) => {
      visit(tree, "element", (node: any) => {
        const className = node?.children?.[0]?.properties?.className?.[0];
        const highlighter = (
          {
            "language-tsx": highlighterTsx,
            "language-scss": highlighterScss,
          } as Record<string, HighlighterGeneric<BundledLanguage, BundledTheme>>
        )[className];

        if (node.tagName === "pre" && highlighter) {
          const lang = className.replace("language-", "") as supportedLanguages;
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
        } else if (node.tagName === "pre") {
          // add classname "simple" to pre
          node.properties.className = ["simple"];
        }
      });
    };
  };
}
