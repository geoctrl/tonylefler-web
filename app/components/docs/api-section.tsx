import React, { ReactNode } from "react";

export interface ApiSectionProps {
  /** Content to display (typically PropsTable) */
  children: ReactNode;
  /** Optional custom title */
  title?: string;
  /** Optional description */
  description?: string;
}

/**
 * Wrapper for API documentation sections (like props tables).
 * Provides consistent styling and optional intro text.
 */
export function ApiSection({
  children,
  title = "Props",
  description,
}: ApiSectionProps) {
  return (
    <>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </>
  );
}
