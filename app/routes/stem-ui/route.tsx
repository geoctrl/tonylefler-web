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
            <NavHeader>Inputs</NavHeader>
            <NavButton to="button">Button</NavButton>
            <div className="pl-8">
              <NavButton to="button/docs">API</NavButton>
              <NavButton to="button/code">Code</NavButton>
            </div>
            <NavButton to="input/docs">Input</NavButton>
            <NavHeader>Data Display</NavHeader>
            <NavButton to="avatar/docs">Avatar</NavButton>
            <NavButton to="badge/docs">Badge</NavButton>
            <NavHeader>Feedback</NavHeader>
            <NavButton to="modal/docs">Modal</NavButton>
          </div>
          <div className="grow overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
