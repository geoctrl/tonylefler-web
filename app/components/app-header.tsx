import React from "react";
import { Logo } from "../components/logo";
import { Button } from "../common/button/button";
import { Link } from "@remix-run/react";

export default function AppHeader() {
  return (
    <div className="flex items-center justify-between border-b app-border">
      <div className="flex items-center">
        <Logo />
      </div>

      <div className="mr-2 flex items-center gap-2">
        <Button as={Link} to="/root" intent="tertiary" formSize="sm">
          RootUI
        </Button>
        {/* <Button intent="tertiary" formSize="sm"> */}
        {/* Projects */}
        {/* </Button> */}
        <Button
          iconOnly="linkedin"
          as="a"
          intent="tertiary"
          formSize="sm"
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/tonylefler/"
        />
        <Button
          iconOnly="bluesky"
          as="a"
          intent="tertiary"
          formSize="sm"
          target="_blank"
          rel="noreferrer"
          href="https://bsky.app/profile/geoctrl.bsky.social"
        />
      </div>
    </div>
  );
}
