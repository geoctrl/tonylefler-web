import {
  ComponentProps,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { tv } from "tailwind-variants";

import { RenderIconOrElement } from "../icon/render-icon-or-element";
import { IconOrElement } from "../../types/icons";
import { Label } from "../label/label";
import { always, maybe } from "../../utils/classname-helpers";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";
import { Badge } from "../badge/badge";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  fieldError?: FieldError;
  error?: string | ReactNode;
  formSize?: "sm" | "md" | "lg";
  iconLeft?: IconOrElement;
  iconRight?: IconOrElement;
  label?: string | ReactNode;
  onChangeValue?: (val: string) => void;
  wrapperProps?: ComponentProps<"div">;
  iconRightAllowClick?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    error,
    fieldError,
    iconLeft,
    iconRight,
    iconRightAllowClick,
    id,
    wrapperProps,
    formSize = "md",
    onChange,
    label,
    style,
    required,
    disabled,
    onChangeValue,
    ...rest
  } = props;

  const hasError = !!error || !!fieldError;

  return (
    <div {...wrapperProps}>
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <div className="app-focus-border-within relative">
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          className={twMerge(
            tv({
              base: always(
                "form-base form-border form-bg app-border form-focus",
                "focus:ring-grey-990/20 focus:border-grey-400",
                "dark:focus:ring-grey-10/20 dark:focus:border-grey-400",
              ),
              variants: {
                size: {
                  sm: "form-h-sm form-px-sm form-radius-sm form-text-sm",
                  md: "form-h-md form-px-md form-radius-md",
                  lg: "form-h-lg form-px-lg form-radius-lg form-text-lg",
                },
                iconLeft: {
                  true: "pl-10",
                },
                iconRight: {
                  true: "pr-10",
                },
                disabled: {
                  true: "opacity-50",
                },
              },
            })({
              size: formSize,
              iconLeft: !!iconLeft,
              iconRight: !!iconRight,
              disabled: !!disabled,
            }),
            className,
          )}
          required={required}
          style={style}
          onChange={(e) => {
            onChange?.(e);
            onChangeValue?.(e.target.value);
          }}
          {...rest}
        />
        {iconLeft && (
          <div
            className={always(
              "pointer-events-none absolute top-0 bottom-0 left-0 flex min-w-10 items-center justify-center",
              formSize === "sm"
                ? "form-h-sm"
                : formSize === "lg"
                  ? "form-h-lg"
                  : "form-h-md",
            )}
          >
            <RenderIconOrElement iconOrElement={iconLeft} className="size-4" />
          </div>
        )}
        {iconRight && (
          <div
            className={always(
              "absolute top-0 right-0 bottom-0 flex min-w-10 items-center justify-center",
              formSize === "sm"
                ? "form-h-sm"
                : formSize === "lg"
                  ? "form-h-lg"
                  : "form-h-md",
              maybe(!iconRightAllowClick, "pointer-events-none"),
            )}
          >
            <RenderIconOrElement iconOrElement={iconRight} className="size-4" />
          </div>
        )}
      </div>
      {hasError && (
        <Badge size="sm" intent="danger">
          {fieldError?.message || error}
        </Badge>
      )}
    </div>
  );
});
