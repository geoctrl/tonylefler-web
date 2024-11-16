import React, { ReactNode, CSSProperties } from "react";
import { NavLink, NavLinkProps } from "@remix-run/react";
import { always, maybe } from "~/utils/classname-helpers";
import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "~/common/button";

type NavButtonProps = Omit<ButtonProps, "as"> & NavLinkProps;

export function NavButton(props: NavButtonProps) {
  const { children, to } = props;
  return (
    <NavLink
      className={({ isActive }) =>
        twMerge(
          always(
            "block border-l border-grey-990/20 px-4 py-1 text-grey-990/50",
            "dark:border-grey-10/20 dark:text-grey-10/50",
            "hover:border-grey-990 hover:text-grey-990",
            "dark:hover:border-grey-10 dark:hover:text-grey-10",
            maybe(
              isActive,
              "border-primary-500 font-bold text-primary-500",
              "dark:border-primary-500 dark:text-primary-500",
              "hover:border-primary-500 hover:text-primary-500",
              "dark:hover:border-primary-500 dark:hover:text-primary-500",
            ),
          ),
        )
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}
