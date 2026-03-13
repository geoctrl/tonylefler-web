import React, { ComponentProps } from "react";
import { Icon } from "../icon/icon";
import { IconName } from "~/types/icon-gen";
import { chipVariants } from "./chip-variants";

export type ChipIntent = "default" | "primary" | "success" | "warning" | "error";
export type ChipSize = "sm" | "md" | "lg";

export type ChipProps = Omit<ComponentProps<"span">, "onClick"> & {
  /**
   * Visual style indicating the chip's semantic meaning
   * @default "default"
   */
  intent?: ChipIntent;

  /**
   * Size of the chip
   * @default "md"
   */
  size?: ChipSize;

  /**
   * Optional leading icon displayed before the label
   * @docType IconName
   */
  icon?: IconName;

  /**
   * Callback fired when the delete button is clicked.
   * When provided, a delete (×) button is rendered inside the chip.
   */
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Makes the chip interactive and clickable.
   * Adds hover/active states and appropriate cursor styling.
   */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;

  /**
   * Disables the chip and prevents all user interaction.
   * @default false
   */
  disabled?: boolean;
};

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  function Chip(props, ref) {
    const {
      intent = "default",
      size = "md",
      icon,
      onDelete,
      onClick,
      disabled = false,
      children,
      className,
      ...rest
    } = props;

    const isClickable = !!onClick;

    const { root, icon: iconClass, label, deleteButton } = chipVariants({
      intent,
      size,
      clickable: isClickable,
      disabled,
    });

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled) {
        onDelete?.(e);
      }
    };

    return (
      <span
        ref={ref}
        className={root({ class: className })}
        onClick={disabled ? undefined : onClick}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        onKeyDown={
          isClickable && !disabled
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.(e as unknown as React.MouseEvent<HTMLSpanElement>);
                }
              }
            : undefined
        }
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {icon && (
          <Icon name={icon} className={iconClass()} aria-hidden="true" />
        )}
        <span className={label()}>{children}</span>
        {onDelete && (
          <button
            type="button"
            className={deleteButton()}
            onClick={handleDelete}
            disabled={disabled}
            aria-label="Remove"
            tabIndex={disabled ? -1 : 0}
          >
            <Icon name="xmark" className="size-full" aria-hidden="true" />
          </button>
        )}
      </span>
    );
  },
);
