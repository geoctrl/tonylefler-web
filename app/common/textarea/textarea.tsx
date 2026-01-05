import {
  HTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";

import { RenderIconOrElement } from "../icon/render-icon-or-element";
import { IconOrElement } from "../../types/icons";
import { Label } from "../label/label";
import { always, maybe } from "../../utils/classname-helpers";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fieldError?: FieldError;
  error?: string | ReactNode;
  formSize?: "sm" | "md" | "lg";
  iconLeft?: IconOrElement;
  iconRight?: IconOrElement;
  label?: string | ReactNode;
  onValueChange?: (val: string) => void;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  iconRightAllowClick?: boolean;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  ref?: React.Ref<HTMLTextAreaElement>;
};

export const Textarea = (props: TextareaProps) => {
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
    onValueChange,
    autoResize = true,
    minRows = 2,
    maxRows,
    ref,
    ...rest
  } = props;

  const internalRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef =
    (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

  const hasError = !!error || !!fieldError;

  const adjustHeight = () => {
    const element = textareaRef.current;
    if (!element || !autoResize) return;

    element.style.height = "auto";
    const scrollHeight = element.scrollHeight;

    if (maxRows) {
      const lineHeight = parseInt(getComputedStyle(element).lineHeight) || 20;
      const maxHeight = lineHeight * maxRows;
      element.style.height = Math.min(scrollHeight, maxHeight) + "px";
      element.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
    } else {
      element.style.height = scrollHeight + "px";
      element.style.overflowY = "hidden";
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [rest.value, rest.defaultValue]);

  return (
    <div {...wrapperProps}>
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <textarea
          ref={textareaRef}
          id={id}
          disabled={disabled}
          rows={minRows}
          className={twMerge(
            tv({
              base: always(
                "form-base form-border form-bg app-border form-focus",
                "focus:ring-grey-990/20 focus:border-grey-400",
                "dark:focus:ring-grey-10/20 dark:focus:border-grey-400",
              ),
              variants: {
                size: {
                  sm: "form-px-sm form-radius-sm form-text-sm py-1.5",
                  md: "form-px-md form-radius-md py-2",
                  lg: "form-px-lg form-radius-lg form-text-lg py-3",
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
            onValueChange?.(e.target.value);
            adjustHeight();
          }}
          {...rest}
        />
        {iconLeft && (
          <div className="pointer-events-none absolute top-0 left-0 flex min-w-10 items-start justify-center pt-2">
            <RenderIconOrElement iconOrElement={iconLeft} className="size-4" />
          </div>
        )}
        {iconRight && (
          <div
            className={always(
              "absolute top-0 right-0 flex min-w-10 items-start justify-center pt-2",
              maybe(!iconRightAllowClick, "pointer-events-none"),
            )}
          >
            <RenderIconOrElement iconOrElement={iconRight} className="size-4" />
          </div>
        )}
      </div>
      {hasError && (
        <div className="text-danger-500 pt-1 text-sm">
          {fieldError?.message || error}
        </div>
      )}
    </div>
  );
};
