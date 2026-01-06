import { ReactNode } from "react";
import { NavLink, NavLinkProps } from "react-router";
import { twMerge } from "tailwind-merge";
import { always, maybe } from "../../utils/classname-helpers.ts";

type TabNavLinkProps = Omit<NavLinkProps, "className" | "children"> & {
  className?: string;
  children: ReactNode;
};

export function TabNavLink({ className, children, ...props }: TabNavLinkProps) {
  return (
    <NavLink
      end
      className={({ isActive }) =>
        twMerge(
          always(
            "text-grey-500 dark:text-grey-400 relative inline-flex h-10 items-center justify-center rounded-lg px-3 no-underline",
            "hover:bg-grey-990/10 dark:hover:bg-grey-10/10",
            maybe(
              isActive,
              "dark:text-grey-10 text-grey-990",
              "before:bg-primary-500 before:absolute before:right-0 before:-bottom-[9px] before:left-0 before:h-[3px] before:content-['']",
            ),
          ),
          className,
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}
