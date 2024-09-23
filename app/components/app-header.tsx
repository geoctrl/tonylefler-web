import React from "react";
import { Logo } from "~/components/logo";
import { Button } from "~/common/button";
import { Link } from "@remix-run/react";

export default function AppHeader() {
  return (
    <div className="">
      <div className="flex items-center justify-between py-5 app-layout-container-padding">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex items-center gap-2">
          <Button as={Link} to="/stem-ui">
            StemUI
          </Button>
          <Button>Projects</Button>
          <Button
            iconOnly="linkedin"
            as="a"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/tonylefler/"
          />
          <Button
            iconOnly="bluesky"
            as="a"
            target="_blank"
            rel="noreferrer"
            href="https://bsky.app/profile/geoctrl.bsky.social"
          />
        </div>
      </div>
    </div>
  );
}
