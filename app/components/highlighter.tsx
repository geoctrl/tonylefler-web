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

export function useCodeToHtmlTsx(code: string) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let h;
      if (!highlighterTsx) {
        h = highlighterTsx = await createHighlighter({
          langs: ["tsx"],
          themes: ["github-dark", "github-light"],
        });
      } else {
        h = highlighterTsx;
      }
      setHtml(
        h.codeToHtml(code, {
          lang: "tsx",
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
        }),
      );
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
          themes: ["github-dark", "github-light"],
        });
      } else {
        h = highlighterScss;
      }
      setHtml(
        h.codeToHtml(code, {
          lang: "scss",
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
        }),
      );
    })();
  }, [code]);
  return html;
}

type HighlighterProps = {
  code?: string;
  round?: boolean;
};

export function CodeTsx({ code = "", round = true }: HighlighterProps) {
  const result = useCodeToHtmlTsx(code);
  return (
    <div
      className={always(
        "not-prose overflow-auto bg-grey-10 p-4 dark:bg-[#24292e]",
        maybe(round, "rounded-lg"),
      )}
      dangerouslySetInnerHTML={{ __html: result || "" }}
    />
  );
}

export function CodeScss({ code = "", round = true }: HighlighterProps) {
  const result = useCodeToHtmlScss(code);
  return (
    <div
      style={{ backgroundColor: "#24292e" }}
      className={always(
        "not-prose overflow-auto  p-4",
        maybe(round, "rounded-lg"),
      )}
      dangerouslySetInnerHTML={{ __html: result || "" }}
    />
  );
}
