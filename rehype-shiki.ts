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

let highlighterTsx: any;
let highlighterScss: any;

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

async function getHighlighterScss() {
  if (!highlighterScss) {
    return (highlighterScss = await createHighlighter({
      langs: ["scss"],
      themes: ["github-dark", "github-light"],
    }));
  } else {
    return highlighterScss;
  }
}

function highlight(
  code: string,
  lang: supportedLanguages,
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>,
) {
  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}

export default function rehypeShiki() {
  return async (tree: any) => {
    const highlighterTsx = await getHighlighterTsx();
    const highlighterScss = await getHighlighterScss();

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
        const html = highlight(toString(node), lang, highlighter);

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
}
