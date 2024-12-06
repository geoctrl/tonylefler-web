import React from "react";
import AppHeader from "../components/app-header";

export default function () {
  return (
    <>
      <AppHeader />

      <div className="app-container-padding pt-24">
        <div>
          <div className="font-bold typo-title-1">Hi 👋 I'm Tony</div>
          <div className="mb-4 typo-title-3 typo-subdue">
            I like to build web things.
          </div>
        </div>
      </div>
    </>
  );
}
