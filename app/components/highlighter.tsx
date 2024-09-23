import { useEffect, useState } from "react";
import {
  createHighlighter,
  HighlighterGeneric,
  BundledLanguage,
  BundledTheme,
} from "shiki";
import { always, maybe } from "~/utils/classname-helpers";

let highlighterTsx: HighlighterGeneric<BundledLanguage, BundledTheme>;
let highlighterScss: HighlighterGeneric<BundledLanguage, BundledTheme>;

function useCodeToHtmlTsx(code: string) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let h;
      if (!highlighterTsx) {
        h = highlighterTsx = await createHighlighter({
          langs: ["typescript"],
          themes: ["github-dark"],
        });
      } else {
        h = highlighterTsx;
      }
      setHtml(h.codeToHtml(code, { lang: "typescript", theme: "github-dark" }));
    })();
  }, [code]);
  return html;
}
function useCodeToHtmlScss(code: string) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let h;
      if (!highlighterScss) {
        h = highlighterScss = await createHighlighter({
          langs: ["scss"],
          themes: ["github-dark"],
        });
      } else {
        h = highlighterScss;
      }
      setHtml(h.codeToHtml(code, { lang: "scss", theme: "github-dark" }));
    })();
  }, [code]);
  return html;
}

type HighlighterProps = {
  code: string;
  round?: boolean;
};

export function CodeTsx({ code, round = true }: HighlighterProps) {
  const result = useCodeToHtmlTsx(code);
  return (
    <div
      style={{ backgroundColor: "#24292e" }}
      className={always("overflow-auto  p-4", maybe(round, "rounded-lg"))}
      dangerouslySetInnerHTML={{ __html: result || "" }}
    />
  );
}

export function CodeScss({ code, round = true }: HighlighterProps) {
  const result = useCodeToHtmlScss(code);
  return (
    <div
      style={{ backgroundColor: "#24292e" }}
      className={always("overflow-auto  p-4", maybe(round, "rounded-lg"))}
      dangerouslySetInnerHTML={{ __html: result || "" }}
    />
  );
}
