import React from "react";
import logo from "../assets/neon-transfer-logo.svg";
import { isClient } from "~/utils/is-client";
console.log(logo);

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
    <div>
      <img src={logo} style={{ height: 20 }} />
    </div>
    // width={120}
    // height={30}
  );
}
