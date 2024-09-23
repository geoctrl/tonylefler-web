import { useState } from "react";
import { Button } from "~/common";
import { Outlet, useLocation } from "@remix-run/react";
import { Link } from "react-router-dom";

export default function () {
  const [html, setHtml] = useState<string>("");
  const location = useLocation();
  const isDocs = location.pathname.endsWith("docs");
  const isCode = location.pathname.endsWith("code");

  return (
    <div>
      <div className="docs">
        <h1>
          <code>Button</code>
        </h1>
      </div>
      <div className="flex gap-4">
        <Button
          intent={isDocs ? "secondaryColor" : "secondary"}
          isActive
          as={Link}
          to="docs"
        >
          Documentation
        </Button>
        <Button
          intent={isCode ? "secondaryColor" : "secondary"}
          as={Link}
          to="code"
        >
          Code
        </Button>
      </div>
      <Outlet />

      {/* <Tabs>
        <TabsItem id="ex1">Docs</TabsItem>
        <TabsItem id="ex1">Examples</TabsItem>
        <TabsItem id="ex1">Props</TabsItem>
      </Tabs>
      <div className="docs">
        <p>A Button!</p>

        <h2>Props</h2>

        <h3>
          <code>alignContent</code>
        </h3>
        <pre>alignContent?: "left" | "right" | "center"; </pre>
      </div>

      <Demo raw={ex1Raw} preview={ex1} /> */}
    </div>
  );
}
