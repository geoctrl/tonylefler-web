import { ComponentProps, useRef, Ref } from "react";
import { always, maybe, toggle } from "~/utils/classname-helpers";
import { twMerge } from "tailwind-merge";

export type ToggleProps = ComponentProps<"input"> & {
  checked: boolean;
  onValueChange?: (checked: boolean) => void;
  formSize?: "sm" | "md" | "lg";
  wrapperProps?: ComponentProps<"div">;
  ref?: Ref<HTMLDivElement>;
};

export const Toggle = (props: ToggleProps) => {
  const {
    checked,
    onChange,
    onValueChange,
    className,
    formSize = "md",
    wrapperProps,
    ref,
    ...rest
  } = props;

  let toggleRef = useRef<HTMLInputElement>(null);

  return (
    <div
      ref={ref}
      {...wrapperProps}
      className={twMerge(
        "relative inline-flex rounded-full",
        maybe(formSize === "sm", "h-6"),
        maybe(formSize === "md", "h-7"),
        maybe(formSize === "lg", "h-8"),
        wrapperProps?.className,
      )}
    >
      <input
        ref={toggleRef}
        checked={checked}
        onChange={(e) => {
          onChange?.(e);
          onValueChange?.(e.target.checked);
        }}
        type="checkbox"
        className={twMerge("absolute top-2 left-2 opacity-0", className)}
        {...rest}
      />
      <div
        className={always(
          "relative inline-block h-full cursor-pointer rounded-full align-middle transition-colors",
          toggle(
            !checked,
            "bg-grey-900/25 dark:bg-grey-100/25",
            "bg-primary-500",
          ),
          maybe(formSize === "sm", "w-10"),
          maybe(formSize === "md", "w-12"),
          maybe(formSize === "lg", "w-14"),
        )}
        onClick={() => {
          if (toggleRef) {
            toggleRef.current?.focus();
            toggleRef.current?.click();
          }
        }}
      >
        <div
          className={always(
            "bg-grey-10 absolute top-1 left-1 rounded-full transition-transform",
            maybe(checked, "translate-x-full"),
            maybe(formSize === "sm", "h-4 w-4"),
            maybe(formSize === "md", "h-5 w-5"),
            maybe(formSize === "lg", "h-6 w-6"),
          )}
        />
      </div>
    </div>
  );
};
