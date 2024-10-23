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

let highlighterTsx: HighlighterGeneric<BundledLanguage, BundledTheme>;
let highlighterScss: HighlighterGeneric<BundledLanguage, BundledTheme>;

async function getHighlighterTsx() {
  if (!highlighterTsx) {
    return (highlighterTsx = await createHighlighter({
      langs: ["tsx"],
      themes: ["github-dark", "github-light"],
    }));
  } else {
    return highlighterTsx;
  }
}

function highlightTsx(
  code: string,
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>,
) {
  return highlighter.codeToHtml(code, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}

export default function shikiMdxPlugin() {
  return async (tree: any) => {
    const highlighter = await getHighlighterTsx();

    visit(tree, "element", (node: any) => {
      if (
        node.tagName !== "pre" ||
        node.children[0]?.properties?.className?.[0] !== "language-tsx"
      ) {
        return;
      }

      const html = highlightTsx(toString(node), highlighter);

      const rehypeTree = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeStringify)
        .parse(html) as any;

      const el = rehypeTree.children[0];
      node.type = el.type;
      node.tagName = el.tagName;
      node.properties = el.properties;
      node.children = el.children;
    });
  };
}
