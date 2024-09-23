import React from "react";
import { isClient } from "~/utils/is-client";
import { Clickable } from "~/common/clickable";
import { Button } from "~/common/button";
import { Link } from "@remix-run/react";

type Props = {
  className?: string;
};

export function Logo(props: Props) {
  const { className } = props;
  if (isClient()) {
    if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
      console.log("dark mode");
    } else {
      console.log("light mode");
    }
  }
  return (
    <Button as={Link} to="/" className="font-mono">
      tonylefler.com
    </Button>
  );
}
