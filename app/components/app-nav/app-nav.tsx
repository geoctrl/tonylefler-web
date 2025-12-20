import React, { useEffect } from "react";
import { useLocation } from "react-router";

import rootLogo from "../../assets/root-logo-banner-lg.png";
import { Input } from "../../common/input/input";
import { NavHeader } from "../../routes/root/nav-header";
import { NavButton } from "../../routes/root/nav-button";
import { always } from "~/app/utils/classname-helpers";

type AppNavProps = {
  onNavCallback?: () => void;
};

// Manual navigation structure
const navCategories = [
  {
    key: "components",
    label: "Components",
    items: [
      { title: "Button", path: "/components/button" },
      { title: "Floating Menu", path: "/components/floating-menu" },
      { title: "Icon", path: "/components/icon" },
      { title: "Input", path: "/components/input" },
      { title: "Input Field", path: "/components/input-field" },
      { title: "Loader", path: "/components/loader" },
    ],
  },
];

export function AppNav(props: AppNavProps) {
  const { onNavCallback } = props;
  const location = useLocation();
  useEffect(() => {
    onNavCallback?.();
  }, [location, onNavCallback]);

  return (
    <div
      id="desktop"
      className={always(
        "sticky top-[var(--app-header-height)] hidden h-[calc(100vh-var(--app-header-height))] w-[var(--app-menu-width)] shrink-0 overflow-auto",
        "lg:block",
      )}
    >
      <div className="px-4 pt-8">
        {/*<div className="flex items-center justify-start p-10">*/}
        {/*  <img src={rootLogo} alt="root Logo" />*/}
        {/*</div>*/}
        <div className="p-4">
          <div className="mb-2">
            <Input placeholder="Quick find" iconLeft="magnifying-glass" />
          </div>
          {navCategories.map((category) => {
            return (
              <div key={category.key}>
                <NavHeader>{category.label}</NavHeader>
                {category.items.map((item) => {
                  return (
                    <NavButton key={item.path} to={item.path}>
                      {item.title}
                    </NavButton>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
