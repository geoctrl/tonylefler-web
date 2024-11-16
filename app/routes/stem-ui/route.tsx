import AppHeader from "~/components/app-header";
import { NavLink, Outlet } from "@remix-run/react";
import { NavButton } from "~/routes/stem-ui/nav-button";
import { NavHeader } from "~/routes/stem-ui/nav-header";

export default function () {
  return (
    <>
      <AppHeader />

      <div>
        <div className="flex items-start gap-16">
          <div className="wrap w-32 min-w-40 shrink-0 p-8">
            {/* Stem-ui */}
            {/* <NavHeader>Inputs</NavHeader> */}
            <NavButton to="button">Button</NavButton>
            <NavButton to="button-raw">Button Code</NavButton>
          </div>
          <div className="grow overflow-hidden p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
