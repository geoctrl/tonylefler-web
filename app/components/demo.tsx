import React from "react";
import { Tabs } from "~/common/tabs/tabs";
import { TabsItem } from "~/common/tabs/tabs-item";
import { CodeTsx } from "./highlighter";
import { useState } from "react";

type DemoProps = {
  raw: string;
  preview: () => React.ReactNode;
};

type TDemoTab = "preview" | "exAlignContent";

export function Demo({ raw, preview }: DemoProps) {
  const [tab, setTab] = useState<TDemoTab>("preview");
  const Preview = preview;
  return (
    <div className="overflow-hidden rounded-lg border border-grey-10/20">
      <Tabs value={tab} onChange={(value) => setTab(value as TDemoTab)}>
        <TabsItem id="preview">Preview</TabsItem>
        <TabsItem id="exAlignContent">Code</TabsItem>
      </Tabs>
      {tab === "preview" ? (
        <div className="p-4">
          <Preview />
        </div>
      ) : (
        <CodeTsx code={raw} round={false} />
      )}
    </div>
  );
}
