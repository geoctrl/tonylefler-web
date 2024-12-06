import React from "react";
import { Logo } from "./logo";
import { Button } from "root";
import { Link } from "@remix-run/react";

export default function AppHeader() {
  return (
    <div className="fixed left-0 right-0 top-0 z-20 border-b app-bg app-border">
      <div className="app-container-padding flex h-12 items-center justify-between">
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
    </div>
  );
}
