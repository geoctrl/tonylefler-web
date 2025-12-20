import React, { ReactNode } from "react";
import { Icon } from "../../common/icon/icon";

interface BaseProps {
  /** Content to display */
  children: ReactNode;
  /** Optional title for the example */
  title?: string;
}

/**
 * Shows a recommended practice or pattern.
 * Use this to highlight good examples in documentation.
 */
export function Do({ children, title }: BaseProps) {
  return (
    <div className="not-prose border-success-500 bg-success-50 dark:border-success-700 dark:bg-success-900 my-4 rounded-lg border-2 p-4">
      <div className="text-success-700 dark:text-grey-10 mb-2 flex items-center gap-2">
        <Icon name="xmark" className="h-5 w-5" />
        <span className="font-semibold">{title || "Do"}</span>
      </div>
      <div className="text-success-900 dark:text-grey-10 text-sm">
        {children}
      </div>
    </div>
  );
}

/**
 * Shows a discouraged practice or anti-pattern.
 * Use this to highlight what to avoid in documentation.
 */
export function Dont({ children, title }: BaseProps) {
  return (
    <div className="not-prose border-danger-500 bg-danger-50 dark:border-danger-700 dark:bg-danger-900 my-4 rounded-lg border-2 p-4">
      <div className="text-danger-700 dark:text-grey-10 mb-2 flex items-center gap-2">
        <Icon name="xmark" className="h-5 w-5" />
        <span className="font-semibold">{title || "Don't"}</span>
      </div>
      <div className="text-danger-900 dark:text-grey-10 text-sm">
        {children}
      </div>
    </div>
  );
}

/**
 * Container for side-by-side Do/Dont comparisons.
 */
export function DoDontGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid gap-4 md:grid-cols-2">{children}</div>
  );
}
