import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { FieldError } from "react-hook-form";

import { always, maybe, toggle } from "../../utils/classname-helpers";
import { Badge } from "../badge/badge";
import { Icon } from "../icon/icon";
import { tv } from "tailwind-variants";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactNode;
  onChangeValue?: (val: boolean) => void;
  error?: string | ReactNode;
  fieldError?: FieldError;
  displayBoxError?: boolean;
  indeterminate?: boolean;
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
      indeterminate,
      onBlur,
      onFocus,
      className,
      style,
      disabled,
      ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const setRef = useCallback(
      (el: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
          el;
        if (typeof ref === "function") ref(el);
        else if (ref)
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      },
      [ref],
    );

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    const hasError = !!error || !!fieldError;

    return (
      <div className={className} style={{ ...style, ["--checkbox-size" as string]: "1.25rem" }}>
        <label
          className={always(
            "flex items-start gap-3",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          )}
        >
          <div className={always("relative flex")}>
            <input
              type="checkbox"
              ref={setRef}
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
                  "relative size-(--checkbox-size) rounded-md border transition-colors",
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
                      "border-grey-450 bg-white",
                      "dark:border-grey-600 dark:bg-transparent",
                      "peer-hover:bg-grey-50 peer-hover:border-grey-600",
                      "dark:peer-hover:bg-grey-900/20 dark:peer-hover:border-grey-500",
                    ),
                  },
                  indeterminate: {
                    true: always(
                      "bg-primary-500 border-primary-500",
                      "dark:bg-primary-500 dark:border-primary-500",
                      "peer-hover:bg-primary-600 peer-hover:border-primary-600",
                      "dark:peer-hover:bg-primary-600 dark:peer-hover:border-primary-600",
                    ),
                  },
                  disabled: {
                    true: "peer-hover:border-grey-450 dark:peer-hover:border-grey-600 peer-hover:bg-transparent dark:peer-hover:bg-transparent",
                  },
                },
                compoundVariants: [
                  {
                    checked: true,
                    disabled: true,
                    class:
                      "bg-grey-300 border-grey-300 dark:bg-grey-700 dark:border-grey-700 peer-hover:bg-grey-300 dark:peer-hover:bg-grey-700 opacity-50",
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
                indeterminate: !!indeterminate,
                disabled: !!disabled,
              })}
            >
              <span className="absolute inset-0 flex items-center justify-center">
                {indeterminate ? (
                  <Icon name="minus" className="size-3.5 fill-white" />
                ) : checked ? (
                  <Icon name="check-small" className="size-5 fill-white" />
                ) : null}
              </span>
            </div>
          </div>
          {label && (
            <div
              className={always("select-none leading-(--checkbox-size)", maybe(disabled, "opacity-50"))}
            >
              {label}
            </div>
          )}
        </label>
        {hasError && (
          <Badge size="sm" intent="danger" className="mt-1">
            {fieldError?.message || error}
          </Badge>
        )}
      </div>
    );
  },
);
