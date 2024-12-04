import AppHeader from "../../components/app-header";
import { Link, Outlet } from "@remix-run/react";
import { NavButton } from "./nav-button";
import { NavHeader } from "./nav-header";
import { Input } from "../../common/input/input";
import rootLogo from "../../assets/root-logo-banner-lg.png";
import { useState } from "react";
import { Button } from "root";
import { AppNav } from "../../components/app-nav/app-nav";

export default function () {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      {/*<div className="flex flex-1 overflow-hidden">*/}
      {/*  <div className="p-8">*/}
      {/*    <Outlet />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="bg-gray-100">
          <AppNav />
        </aside>

        {/* Middle Section */}
        <main className="bg-white flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <aside className="bg-gray-100 w-64 p-4">
          <div className="sticky top-0 max-h-screen overflow-y-auto">
            <h2 className="text-lg font-semibold">Right Sidebar</h2>
            <ul>
              <li>Widget 1</li>
              <li>Widget 2</li>
              <li>Widget 3</li>
              <li>Widget 4</li>
              <li>Widget 5</li>
            </ul>
          </div>
        </aside>
      </div>{" "}
    </div>
  );
}
