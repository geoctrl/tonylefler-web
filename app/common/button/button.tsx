import React from "react";
import { Link, LinkProps } from "@remix-run/react";
import { tv } from "tailwind-variants";

import { always } from "../../utils/classname-helpers";
import { RenderIconOrElement } from "../../common/icon/render-icon-or-element";
import { IconOrElement } from "../../types/icons";
import { Loader, LoaderSize, LoaderIntent } from "../../common/loader/loader";

type ButtonButtonProps = {
  as?: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAnchorProps = {
  as?: "a";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonLinkProps = {
  as?: typeof Link;
} & LinkProps;

type ButtonAs = ButtonButtonProps | ButtonAnchorProps | ButtonLinkProps;

type ButtonIntent =
  | "primary"
  | "secondary"
  | "secondaryColor"
  | "outline"
  | "tertiary"
  | "listItem";

type ButtonFormSize = "sm" | "md" | "lg";

const intentToIntentMap: Record<ButtonIntent, LoaderIntent> = {
  primary: "onColor",
  secondary: "grey",
  secondaryColor: "primary",
  outline: "grey",
  tertiary: "grey",
  listItem: "grey",
};

const formSizeToSizeMap: Record<ButtonFormSize, LoaderSize> = {
  sm: "xs",
  md: "sm",
  lg: "md",
};

export type ButtonProps = ButtonAs & {
  alignContent?: "left" | "right" | "center";
  block?: boolean;
  disabled?: boolean;
  formSize?: ButtonFormSize;
  iconLeft?: IconOrElement;
  iconOnly?: IconOrElement;
  iconRight?: IconOrElement;
  intent?: ButtonIntent;
  isActive?: boolean;
  isLoading?: boolean;
  isSquare?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      alignContent = "center",
      as = "button",
      children,
      className,
      block,
      disabled,
      formSize = "md",
      iconLeft,
      iconRight,
      iconOnly,
      intent = "secondary",
      isActive,
      isLoading,
      isSquare,
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

    let isDisabled = isLoading || disabled;

    const renderLoader = (
      <Loader
        intent={intentToIntentMap[intent]}
        formSize={formSizeToSizeMap[formSize]}
      />
    );

    return (
      <Wrapper
        {...(rest as any)}
        ref={ref}
        disabled={isDisabled}
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
                "border border-solid border-grey-900/30 hover:bg-grey-500/10 active:bg-grey-500/15 dark:text-grey-100",
                "dark:border-grey-100/50 dark:text-grey-100 dark:hover:bg-grey-100/10 dark:active:bg-grey-100/15",
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
            asAnchor: {
              true: "no-underline",
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
              true: "cursor-default opacity-50",
            },
            iconOnly: {
              true: "justify-center p-0",
            },
            isSquare: {
              true: "rounded-none",
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
                "dark:bg-grey-100/15 dark:hover:bg-grey-100/25",
              ),
            },
            // disabled
            {
              disabled: true,
              intent: "primary",
              class:
                "cursor hover:bg-primary-500 focus:bg-primary-500 active:bg-primary-500",
            },
            {
              disabled: true,
              intent: "secondary",
              class:
                "hover:bg-grey-500/10 focus:bg-grey-500/10 active:bg-grey-500/10 dark:hover:bg-grey-500/10 dark:focus:bg-grey-500/10 dark:active:bg-grey-500/10",
            },
            {
              disabled: true,
              intent: "secondaryColor",
              class:
                "hover:bg-primary-500/10 focus:bg-primary-500/10 active:bg-primary-500/10",
            },
            {
              disabled: true,
              intent: "outline",
              class:
                "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
            },
            {
              disabled: true,
              intent: "tertiary",
              class:
                "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
            },
            {
              disabled: true,
              intent: "listItem",
              class:
                "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
            },
          ],
        })({
          asAnchor: as === "a",
          intent,
          formSize,
          iconOnly: !!iconOnly,
          block: !!block,
          alignContent,
          isActive,
          isSquare,
          className,
          disabled: isDisabled,
        })}
      >
        {!!iconOnly ? (
          <>
            {isLoading ? (
              renderLoader
            ) : (
              <RenderIconOrElement
                iconOrElement={iconOnly}
                className={iconSize}
              />
            )}
          </>
        ) : (
          <>
            {iconLeft && !isLoading && (
              <RenderIconOrElement
                iconOrElement={iconLeft}
                className={iconSize}
              />
            )}
            {isLoading && renderLoader}
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
