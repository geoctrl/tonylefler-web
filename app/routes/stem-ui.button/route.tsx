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
    <div className="docs p-8">
      <h1>Button</h1>
      <Outlet />
    </div>
  );
}
