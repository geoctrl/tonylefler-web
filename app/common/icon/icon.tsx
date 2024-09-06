import React, { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Icons } from "~/types/icon-gen";

export type IconProps = {
  name: Icons;
  className?: string;
  fill?: string;
  style?: React.StyleHTMLAttributes<any>;
};

export const Icon = forwardRef(function Icon(
  props: IconProps,
  ref: ForwardedRef<any>,
) {
  const { name, className, fill, style, ...rest } = props;

  return (
    <svg
      ref={ref}
      className={twMerge("inline-block size-4 fill-current", className)}
      style={{
        flexShrink: 0,
        ...(fill ? { fill } : {}),
        ...(style || {}),
      }}
      viewBox="0 0 24 24"
      {...rest}
    >
      <use href={`#${name}`} xlinkHref={`#${name}`} />
    </svg>
  );
});
