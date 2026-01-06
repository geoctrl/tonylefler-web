import React, { ReactNode, CSSProperties } from "react";
import { always } from "../../utils/classname-helpers";

export type BadgeAffixProps = {
  /**
   * The element to wrap with a badge
   */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * The badge content to display (typically a Badge component)
   */
  badge?: ReactNode;
  /**
   * Position of the badge relative to the wrapped element
   * @default "top-right"
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * Fine-tune badge position with [x, y] offset in pixels
   * Positive values move right/down, negative values move left/up
   * @example offset={[4, -2]} // Move 4px right, 2px up
   */
  offset?: [number, number];
};

export function BadgeAffix(props: BadgeAffixProps) {
  const {
    children,
    className,
    style,
    badge,
    position = "top-right",
    offset = [0, 0],
  } = props;

  // Calculate positioning classes based on position prop
  const positionClasses = {
    "top-left": "-left-2 -top-2",
    "top-right": "-right-2 -top-2",
    "bottom-left": "-bottom-2 -left-2",
    "bottom-right": "-bottom-2 -right-2",
  }[position];

  // Apply offset if provided
  const offsetStyle: CSSProperties =
    offset[0] !== 0 || offset[1] !== 0
      ? {
          transform: `translate(${offset[0]}px, ${offset[1]}px)`,
        }
      : {};

  return (
    <div
      className={always("relative inline-flex align-middle", className)}
      style={style}
    >
      {children}
      <div
        className={always(
          "pointer-events-none absolute flex",
          positionClasses,
        )}
        style={offsetStyle}
      >
        {badge}
      </div>
    </div>
  );
}
