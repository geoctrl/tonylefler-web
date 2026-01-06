import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { FieldError } from "react-hook-form";

import { always, maybe, toggle } from "../../utils/classname-helpers";
import { Icon } from "../icon/icon";
import { tv } from "tailwind-variants";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactNode;
  onChangeValue?: (val: boolean) => void;
  error?: string | ReactNode;
  fieldError?: FieldError;
  displayBoxError?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const {
      label,
      error,
      fieldError,
      onChangeValue,
      onChange,
      checked,
      onBlur,
      onFocus,
      className,
      style,
      disabled,
      ...rest
    } = props;

    const hasError = !!error || !!fieldError;

    return (
      <div className={className} style={style}>
        <label className={always("flex gap-3", disabled ? "cursor-not-allowed" : "cursor-pointer")}>
          <div className={always("relative", maybe(!!label, "mt-[2px]"))}>
            <input
              type="checkbox"
              ref={ref}
              {...rest}
              onBlur={(e) => {
                onBlur?.(e);
              }}
              onFocus={(e) => {
                onFocus?.(e);
              }}
              disabled={disabled}
              checked={checked}
              className="peer sr-only"
              onChange={(e) => {
                onChange?.(e);
                onChangeValue?.(e.target.checked);
              }}
            />
            <div
              className={tv({
                base: always(
                  "inline-flex size-5 items-center justify-center rounded-md border transition-colors",
                  "peer-focus:ring-grey-990/20 peer-focus:shadow-none peer-focus:ring-3",
                  "dark:peer-focus:ring-grey-10/20 dark:peer-focus:shadow-none dark:peer-focus:ring-3",
                ),
                variants: {
                  hasError: {
                    true: "peer-focus:ring-danger-500",
                  },
                  checked: {
                    true: always(
                      "bg-primary-500 border-primary-500",
                      "dark:bg-primary-500 dark:border-primary-500",
                      "peer-hover:bg-primary-600 peer-hover:border-primary-600",
                      "dark:peer-hover:bg-primary-600 dark:peer-hover:border-primary-600",
                    ),
                    false: always(
                      "bg-white border-grey-450",
                      "dark:bg-transparent dark:border-grey-600",
                      "peer-hover:bg-grey-50 peer-hover:border-grey-600",
                      "dark:peer-hover:bg-grey-900/20 dark:peer-hover:border-grey-500",
                    ),
                  },
                  disabled: {
                    true: "peer-hover:bg-transparent peer-hover:border-grey-450 dark:peer-hover:bg-transparent dark:peer-hover:border-grey-600",
                  },
                },
                compoundVariants: [
                  {
                    checked: true,
                    disabled: true,
                    class: "bg-grey-300 border-grey-300 dark:bg-grey-700 dark:border-grey-700 opacity-50 peer-hover:bg-grey-300 dark:peer-hover:bg-grey-700",
                  },
                  {
                    checked: false,
                    disabled: true,
                    class: "opacity-50",
                  },
                ],
              })({
                hasError: hasError,
                checked: !!checked,
                disabled: !!disabled,
              })}
            >
              {checked && (
                <Icon name="check-small" className="fill-white size-5" />
              )}
            </div>
          </div>
          {label && (
            <div
              className={always("select-none", maybe(disabled, "opacity-50"))}
            >
              {label}
            </div>
          )}
        </label>
        {hasError && (
          <div className="text-danger-500 pt-1 text-sm">
            {fieldError?.message || error}
          </div>
        )}
      </div>
    );
  },
);
