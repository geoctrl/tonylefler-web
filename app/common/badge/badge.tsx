import { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { always } from "../../utils/classname-helpers";

export type BadgeProps = ComponentProps<"div"> & {
  intent?: "success" | "grey" | "primary" | "danger" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  circle?: boolean;
  round?: boolean;
};

export function Badge(props: BadgeProps) {
  const {
    children,
    className,
    circle,
    size = "md",
    intent = "grey",
    ...rest
  } = props;
  return (
    <div
      className={tv({
        base: always(
          "inline-flex items-center rounded-full px-2 py-1 text-xs",
          className,
        ),
        variants: {
          intent: {
            success:
              "bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-200",
            grey: "bg-grey-100 text-grey-700 dark:bg-grey-800 dark:text-grey-200",
            primary:
              "bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200",
            danger:
              "bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-200",
            warning:
              "bg-warning-100 text-warning-700 dark:bg-warning-800 dark:text-warning-200",
            info: "bg-info-100 text-info-700 dark:bg-info-900 dark:text-info-200",
          },
          solid: {
            true: "text-grey-10 border-none",
          },
          size: {
            sm: "h-5 text-xs leading-none",
            md: "h-6 text-xs leading-none",
            lg: "h-7 text-sm leading-none",
          },
          circle: {
            true: "justify-center rounded-full p-0",
          },
        },
        compoundVariants: [
          {
            circle: true,
            size: "sm",
            class: "size-5",
          },
          {
            circle: true,
            size: "md",
            class: "size-6",
          },
          {
            circle: true,
            size: "lg",
            class: "size-8",
          },
        ],
      })({ intent, size, circle })}
      {...rest}
    >
      {children}
    </div>
  );
}
