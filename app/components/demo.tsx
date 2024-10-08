import React from "react";
import { Tabs } from "~/common/tabs/tabs";
import { TabsItem } from "~/common/tabs/tabs-item";
import { CodeTsx } from "./highlighter";
import { useState } from "react";
import { always } from "~/utils/classname-helpers";

type DemoProps = {
  raw?: string;
  children?: React.ReactNode;
};

type DemoTab = "preview" | "exAlignContent";

export function Demo({ raw, children }: DemoProps) {
  const [tab, setTab] = useState<DemoTab>("preview");

  return (
    <div className="not-prose mb-8 overflow-hidden rounded-lg border app-border">
      <Tabs value={tab} onChange={(value) => setTab(value as DemoTab)}>
        <TabsItem id="preview">Preview</TabsItem>
        <TabsItem id="exAlignContent">Code</TabsItem>
      </Tabs>
      {tab === "preview" ? (
        <div className="p-4">{children}</div>
      ) : (
        <CodeTsx code={raw} round={false} />
      )}
    </div>
  );
}
