import React, { ReactNode } from "react";
import { always, maybe } from "~/utils/classname-helpers";

export interface ExampleProps {
  /** Content to display in the example */
  children: ReactNode;
  /** Optional label for the example */
  label?: string;
  /** Whether to center the content */
  center?: boolean;
  /** Custom className for the container */
  className?: string;
}

/**
 * Container for live component examples in documentation.
 * Provides consistent styling and spacing for demo components.
 */
export function Example({
  children,
  label,
  center = false,
  className = "",
}: ExampleProps) {
  return (
    <div className="not-prose my-6">
      {label && (
        <div className="text-grey-700 dark:text-grey-300 mb-2 text-sm font-medium">
          {label}
        </div>
      )}
      <div
        className={always(
          "app-border dark:bg-grey-900 rounded-lg border bg-white p-6",
          maybe(center, "flex items-center justify-center"),
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
