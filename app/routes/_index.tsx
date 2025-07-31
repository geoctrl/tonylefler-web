import React from "react";
import AppHeader from "../components/app-header";
import { Button } from "root";

export default function () {
  return (
    <>
      <AppHeader />

      <div className="app-container-padding pt-24">
        <div>
          <div className="font-bold">Hi 👋 I'm Tony</div>
          <div className="typo-subdue mb-4">I like to build web things.</div>
        </div>
      </div>
    </>
  );
}
