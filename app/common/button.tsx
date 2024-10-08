import React, { ComponentProps } from "react";
import { Link, LinkProps } from "@remix-run/react";
import { tv } from "tailwind-variants";

import { always } from "~/utils/classname-helpers";
import { inlineSwitch } from "~/utils/inline-switch";
import { RenderIconOrElement } from "~/common/icon/render-icon-or-element";
import { IconOrElement } from "~/types/icons";

type ButtonButtonProps = {
  as?: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  ComponentProps<"button">;

type ButtonAnchorProps = {
  as?: "a";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonLinkProps = {
  as?: typeof Link;
} & LinkProps;

type ButtonAs = ButtonButtonProps | ButtonAnchorProps | ButtonLinkProps;

export type ButtonProps = ButtonAs & {
  alignContent?: "left" | "right" | "center";
  block?: boolean;
  disabled?: boolean;
  formSize?: "sm" | "md" | "lg";
  iconLeft?: IconOrElement;
  iconOnly?: IconOrElement;
  iconRight?: IconOrElement;
  intent?:
    | "primary"
    | "secondary"
    | "secondaryColor"
    | "outline"
    | "tertiary"
    | "listItem";
  isActive?: boolean;
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      as = "button",
      formSize = "md",
      intent = "secondary",
      iconOnly,
      iconLeft,
      iconRight,
      alignContent,
      isActive,
      block,
      className,
      children,
      disabled,
      ...rest
    } = props;
    const Wrapper = as === "a" ? "a" : as === "button" ? "button" : Link;

    const iconSize = tv({
      base: "size-4",
      variants: {
        formSize: {
          sm: "size-3.5",
          md: "size-4",
          lg: "size-5",
        },
      },
    })({ formSize });

    return (
      <Wrapper
        {...(rest as any)}
        ref={ref}
        disabled={disabled}
        role={intent === "listItem" ? "menuitem" : undefined}
        className={tv({
          base: "relative inline-flex shrink-0 cursor-pointer select-none items-center whitespace-nowrap rounded-lg align-middle font-medium transition ease-out",
          variants: {
            intent: {
              primary:
                "bg-primary-500 text-grey-100 hover:bg-primary-600 active:bg-primary-700",
              secondary: always(
                "bg-grey-500/10 text-grey-900 hover:bg-grey-500/20 active:bg-grey-500/25 dark:text-grey-100",
                "dark:bg-grey-500/10 dark:text-grey-100 dark:hover:bg-grey-500/20 active:dark:bg-grey-500/25",
              ),
              secondaryColor:
                "bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 active:bg-primary-500/25",
              outline: always(
                "border border-solid border-grey-900/30 text-grey-500 hover:border-grey-900/40 hover:bg-grey-500/10 active:border-grey-900/50 active:bg-grey-500/15 dark:text-grey-100",
                "dark:border-grey-100/50 dark:text-grey-100 dark:hover:bg-grey-500/10 dark:active:bg-grey-100/15",
              ),
              tertiary: always(
                "text-grey-900",
                "hover:bg-grey-500/10 active:bg-grey-500/15 dark:hover:bg-grey-100/10",
                "dark:text-grey-100 dark:active:bg-grey-100/15",
              ),
              listItem: always(
                "rounded-none text-grey-900 shadow-none outline-none focus:bg-grey-500/15 active:bg-grey-500/15",
                "dark:text-grey-100 dark:focus:bg-grey-100/15 dark:active:bg-grey-100/15",
              ),
            },
            formSize: {
              sm: "h-8 gap-1.5 px-2.5 text-sm",
              md: "h-10 gap-2 px-3 text-base",
              lg: "h-12 gap-3 px-4 text-lg",
            },
            alignContent: {
              left: "justify-start",
              right: "justify-end",
              center: "justify-center",
            },
            block: {
              true: "flex w-full",
            },
            isActive: {
              true: "",
            },
            disabled: {
              true: "",
            },
            iconOnly: {
              true: "justify-center p-0",
            },
          },
          compoundVariants: [
            // list item AND size "md"
            { intent: "listItem", formSize: "md", class: "px-4" },

            // icon only width
            { formSize: "sm", iconOnly: true, class: `size-8 p-0` },
            { formSize: "md", iconOnly: true, class: `size-10 p-0` },
            { formSize: "lg", iconOnly: true, class: `size-12 p-0` },
            // isActive
            {
              intent: "primary",
              isActive: true,
              class: "bg-primary-700 hover:bg-primary-700",
            },
            {
              intent: "secondary",
              isActive: true,
              class: always(
                "bg-grey-500/25 hover:bg-grey-500/25",
                "dark:bg-grey-500/25 dark:hover:bg-grey-500/25",
              ),
            },
            {
              intent: "secondaryColor",
              isActive: true,
              class: "bg-primary-500/25 hover:bg-primary-500/25",
            },
            {
              intent: "outline",
              isActive: true,
              class: always(
                "border-grey-900/50 bg-grey-500/15 hover:border-grey-900/50 hover:bg-grey-500/15",
                "dark:bg-grey-100/15 dark:hover:bg-grey-100/15",
              ),
            },
            {
              intent: "tertiary",
              isActive: true,
              class: always(
                "bg-grey-500/15 hover:bg-grey-500/15",
                "dark:bg-grey-100/15 dark:hover:bg-grey-100/15",
              ),
            },
          ],
        })({
          intent,
          formSize,
          iconOnly: !!iconOnly,
          block: !!block,
          alignContent,
          isActive,
          className,
          disabled,
        })}
      >
        {!!iconOnly ? (
          <RenderIconOrElement iconOrElement={iconOnly} className={iconSize} />
        ) : (
          <>
            {iconLeft && (
              <RenderIconOrElement
                iconOrElement={iconLeft}
                className={iconSize}
              />
            )}
            {children}
            {iconRight && (
              <RenderIconOrElement
                iconOrElement={iconRight}
                className={iconSize}
              />
            )}
          </>
        )}
      </Wrapper>
    );
  },
);
