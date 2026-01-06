import React, { ReactNode, createContext, useContext } from "react";
import { always } from "../../utils/classname-helpers";
import type { BreadcrumbItem } from "~/hooks/use-breadcrumbs";

export type BreadcrumbProps = {
  /**
   * Breadcrumb items (BreadcrumbLink or BreadcrumbText components)
   */
  children?: ReactNode;
  /**
   * Auto-render breadcrumbs from data structure (alternative to children)
   */
  items?: BreadcrumbItem[];
  /**
   * Custom separator between breadcrumb items
   * @default "/"
   */
  separator?: ReactNode;
  /**
   * Size of breadcrumb text
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  className?: string;
};

type BreadcrumbContextValue = {
  size: "sm" | "md" | "lg";
};

const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  size: "md",
});

export const useBreadcrumbContext = () => useContext(BreadcrumbContext);

export function Breadcrumb(props: BreadcrumbProps) {
  const { children, items, separator = "/", size = "md", className } = props;

  // If items prop is provided, auto-render breadcrumbs
  if (items) {
    // Lazy import to avoid circular dependency
    const BreadcrumbLink = require("./breadcrumb-link").BreadcrumbLink;
    const BreadcrumbText = require("./breadcrumb-text").BreadcrumbText;

    return (
      <BreadcrumbContext.Provider value={{ size }}>
        <nav aria-label="breadcrumb" className={className}>
          <ol className="flex items-center">
            {items.map((item, index) => (
              <React.Fragment key={item.path}>
                {index > 0 && (
                  <li
                    role="presentation"
                    aria-hidden="true"
                    className={always(
                      "mx-2 flex items-center text-grey-500 dark:text-grey-500",
                      size === "sm" ? "text-xs" : "",
                      size === "md" ? "text-sm" : "",
                      size === "lg" ? "text-base" : "",
                    )}
                  >
                    {typeof separator === "string" ? (
                      <span>{separator}</span>
                    ) : (
                      separator
                    )}
                  </li>
                )}
                <li className="flex items-center">
                  {item.isCurrent ? (
                    <BreadcrumbText>{item.label}</BreadcrumbText>
                  ) : (
                    <BreadcrumbLink to={item.path}>{item.label}</BreadcrumbLink>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </BreadcrumbContext.Provider>
    );
  }

  const childrenArray = React.Children.toArray(children);

  return (
    <BreadcrumbContext.Provider value={{ size }}>
      <nav aria-label="breadcrumb" className={className}>
        <ol className="flex items-center">
          {childrenArray.map((child, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <li
                  role="presentation"
                  aria-hidden="true"
                  className={always(
                    "mx-2 flex items-center text-grey-500 dark:text-grey-500",
                    size === "sm" ? "text-xs" : "",
                    size === "md" ? "text-sm" : "",
                    size === "lg" ? "text-base" : "",
                  )}
                >
                  {typeof separator === "string" ? (
                    <span>{separator}</span>
                  ) : (
                    separator
                  )}
                </li>
              )}
              <li className="flex items-center">{child}</li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </BreadcrumbContext.Provider>
  );
}
