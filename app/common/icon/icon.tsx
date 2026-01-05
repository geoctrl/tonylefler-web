import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import spriteHref from "/icons.svg";
import { Icons } from "~/types/icons";

export type IconProps = ComponentProps<"svg"> & {
  /**
   * Icon name from the icon sprite. Available icons are auto-generated from the icons directory.
   */
  name?: Icons;
  ref?: React.Ref<SVGSVGElement>;
};

export const Icon = (props: IconProps) => {
  const { name, className, fill, style, ref, ...rest } = props;

    return (
      <svg
        ref={ref}
        className={twMerge("inline-block size-5 fill-current", className)}
        style={{
          flexShrink: 0,
          ...(fill ? { fill } : {}),
          ...(style || {}),
        }}
        viewBox="0 0 24 24"
        {...rest}
      >
        <use
          href={`${spriteHref}#${name}`}
          xlinkHref={`${spriteHref}#${name}`}
        />
      </svg>
    );
};
