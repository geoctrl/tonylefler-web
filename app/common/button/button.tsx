import React from "react";
import { Link, LinkProps } from "@remix-run/react";
import { tv } from "tailwind-variants";

import { RenderIconOrElement } from "../../common/icon/render-icon-or-element";
import { IconOrElement } from "../../types/icons";
import { Loader, LoaderSize, LoaderIntent } from "../../common/loader/loader";
import { buttonVariants } from "./button-variants";

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
        size={formSizeToSizeMap[formSize]}
      />
    );

    return (
      <Wrapper
        {...(rest as any)}
        ref={ref}
        disabled={isDisabled}
        role={intent === "listItem" ? "menuitem" : undefined}
        className={buttonVariants({
          asAnchor: as === "a",
          intent,
          formSize,
          iconOnly: !!iconOnly,
          block: !!block,
          alignContent,
          isActive,
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
