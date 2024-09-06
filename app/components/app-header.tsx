import React from "react";
import { Logo } from "~/components/logo";

export default function AppHeader() {
  return (
    <div className="">
      <div className="flex items-center justify-between py-5 app-layout-container-padding">
        <div className="flex items-center">
          <Logo />
        </div>
      </div>
    </div>
  );
}
