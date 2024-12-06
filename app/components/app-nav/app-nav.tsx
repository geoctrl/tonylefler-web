import React, { useEffect } from "react";
import { useLocation } from "@remix-run/react";

import rootLogo from "../../assets/root-logo-banner-lg.png";
import { Input } from "../../common/input/input";
import { NavHeader } from "../../routes/root/nav-header";
import { NavButton } from "../../routes/root/nav-button";
import { navGroups } from "./nav-groups";

type AppNavProps = {
  onNavCallback?: () => void;
};

export function AppNav(props: AppNavProps) {
  const { onNavCallback } = props;
  const location = useLocation();
  useEffect(() => {
    onNavCallback?.();
  }, [location, onNavCallback]);

  return (
    <div className="overflow-auto px-4">
      <div className="flex items-center justify-start p-10">
        <img src={rootLogo} alt="root Logo" />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <Input placeholder="Quick find" iconLeft="magnifying-glass" />
        </div>
        {navGroups.map((group) => {
          return (
            <div key={group.label}>
              <NavHeader>{group.label}</NavHeader>
              {group.children.map((child) => {
                return (
                  <NavButton key={child.label} to={child.to}>
                    {child.label}
                  </NavButton>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
