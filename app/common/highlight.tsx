import React, { HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export type HighlightProps = HTMLAttributes<HTMLSpanElement> & {
  color?: "important" | "notice" | "success" | "info";
};

export function Highlight(props: HighlightProps) {
  const { color = "important", children, className, ...spanProps } = props;
  return (
    <span
      {...spanProps}
      className={tv({
        base: "rounded-[.2em] px-[.2em] py-[.1em]",
        variants: {
          color: {
            important: "bg-important-75",
            notice: "bg-notice-75",
            success: "bg-success-75",
            info: "bg-info-75",
          },
        },
      })({ color })}
    >
      {children}
    </span>
  );
}
