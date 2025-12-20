import React, { ReactNode } from "react";
import { always } from "../utils/classname-helpers";
import { Button } from "root";
import { Nav } from "./nav";

type LayoutProps = {
  children?: ReactNode;
  name?: string;
};

export function Layout(props: LayoutProps) {
  const { children, name } = props;
  return (
    <>
      <div
        className={always(
          "bg-grey-50 app-border dark:bg-grey-800 sticky top-[var(--app-header-height)] z-10 flex items-center gap-2 border-b",
          "lg:hidden",
        )}
      >
        <Button
          intent="tertiary"
          iconOnly="bars"
          className="rounded-none"
          formSize="lg"
        />
        <Nav
          crumbs={
            [{ label: "RootUI" }, name ? { label: name } : undefined].filter(
              Boolean,
            ) as { label: string; to?: string }[]
          }
        />
      </div>
      <div className="app-container-padding">
        <div
          className={always(
            "pt-[var(--app-header-height)]",
            "lg:ml-[var(--app-menu-width)]",
          )}
        >
          <main>
            <div className="docs pt-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
