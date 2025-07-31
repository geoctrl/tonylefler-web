import React, { ReactNode, CSSProperties } from "react";
import { tv } from "tailwind-variants";

export type BadgeProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  intent?:
    | "important"
    | "success"
    | "info"
    | "notice"
    | "important-solid"
    | "success-solid"
    | "info-solid"
    | "notice-solid";
  size?: "sm" | "md" | "lg";
  circle?: boolean;
  round?: boolean;
};

export function Badge(props: BadgeProps) {
  const {
    children,
    className,
    circle,
    round,
    style,
    size = "md",
    intent = "info",
  } = props;
  return (
    <div
      className={tv({
        base: "inline-flex items-center rounded-md border px-1.5",
        variants: {
          intent: {
            info: "border-info-500 bg-info-500/20 text-info-500",
            success: "border-success-500 bg-success-500/20 text-success-500",
            notice: "border-notice-500 bg-notice-500/20 text-notice-500",
            important:
              "border-important-500 bg-important-500/20 text-important-500",
            "info-solid":
              "border-none bg-info-500 text-grey-10 dark:bg-info-800",
            "success-solid":
              "border-none bg-success-500 text-grey-10 dark:bg-success-800",
            "notice-solid":
              "border-none bg-notice-500 text-grey-10 dark:bg-notice-800",
            "important-solid":
              "border-none bg-important-500 text-grey-10 dark:bg-important-800",
          },
          solid: {
            true: "border-none text-grey-10",
          },
          size: {
            sm: "h-5 text-[10px] leading-none",
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
    >
      {children}
    </div>
  );
}
