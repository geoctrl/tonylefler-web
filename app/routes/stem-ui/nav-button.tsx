import React, { ReactNode, CSSProperties } from "react";
import { NavLink } from "@remix-run/react";
import { always, maybe } from "~/utils/classname-helpers";
import { twMerge } from "tailwind-merge";

type NavButtonProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  to: string;
};

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
              "border-primary-500 text-primary-500 font-bold",
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
