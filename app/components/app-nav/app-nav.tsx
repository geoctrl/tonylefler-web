import React, { ReactNode, CSSProperties } from "react";
import { Link } from "@remix-run/react";

import rootLogo from "../../assets/root-logo-banner-lg.png";
import { Input } from "../../common/input/input";
import { NavHeader } from "../../routes/root/nav-header";
import { NavButton } from "../../routes/root/nav-button";

type AppNavProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function AppNav(props: AppNavProps) {
  const {} = props;
  return (
    <div className="sticky top-0 max-h-[calc(100%-49px)] w-[30rem] p-8">
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
        <NavHeader>Hooks</NavHeader>
        <NavButton to="use-dialog">useDialog</NavButton>
        <NavButton to="use-media">useMedia</NavButton>
        <NavHeader>Services</NavHeader>
        <NavButton to="dialog-service">dialogService</NavButton>
      </div>
    </div>
  );
}
