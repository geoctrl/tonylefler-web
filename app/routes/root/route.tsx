import AppHeader from "../../components/app-header";
import { Link, Outlet } from "@remix-run/react";
import { NavButton } from "./nav-button";
import { NavHeader } from "./nav-header";
import { Input } from "../../common/input/input";
import rootLogo from "../../assets/root-logo-banner-lg.png";
import { useState } from "react";
import { Button } from "root";

export default function () {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <AppHeader />
      <div className="flex overflow-auto">
        <div className="sticky top-0 w-[30rem] min-w-40 shrink-0 flex-col border-r app-border">
          <Link className="flex items-center justify-start p-10" to="/root">
            <img src={rootLogo} alt="root Logo" />
          </Link>
          <div className="p-4">
            <div className="mb-2">
              <Input placeholder="Quick find" iconLeft="magnifying-glass" />
            </div>
            <NavHeader>Components</NavHeader>
            <NavButton to="button">Button</NavButton>
            <NavButton to="icon">Icon</NavButton>
            <NavButton to="loader">Loader</NavButton>
            <NavHeader>Services</NavHeader>
            <NavButton to="dialog-service">Dialog</NavButton>
          </div>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}
