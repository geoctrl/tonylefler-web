import React from "react";
import { twMerge } from "tailwind-merge";
import { dividerVariants } from "./divider-variants";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerIntent = "default" | "strong" | "subtle";

export type DividerProps = Omit<React.ComponentProps<"hr">, "children"> & {
  /**
   * Orientation of the divider line
   * @default "horizontal"
   */
  orientation?: DividerOrientation;

  /**
   * Line style of the divider
   * @default "solid"
   */
  variant?: DividerVariant;

  /**
   * Optional text label centered on the divider
   */
  label?: string;

  /**
   * Controls the color intensity of the divider line and label
   * @default "default"
   */
  intent?: DividerIntent;
};

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  function Divider(props, ref) {
    const {
      orientation = "horizontal",
      variant = "solid",
      label,
      intent = "default",
      className,
      ...rest
    } = props;

    const slots = dividerVariants({ orientation, variant, intent });

    return (
      <div
        role="separator"
        aria-orientation={orientation}
        className={twMerge(slots.root(), className)}
      >
        <hr
          ref={ref}
          aria-hidden="true"
          className={slots.line()}
          {...rest}
        />
        {label && (
          <>
            <span className={slots.label()}>{label}</span>
            <hr aria-hidden="true" className={slots.line()} />
          </>
        )}
      </div>
    );
  },
);
