import React from "react";
import { Link, NavLink, NavLinkProps, NavLinkRenderProps } from "react-router";
import type { LinkProps } from "react-router";

import { RenderIconOrElement } from "../icon/render-icon-or-element";
import { IconOrElement } from "../../types/icons";
import { Loader, LoaderSize, LoaderIntent } from "../loader/loader";
import { FormSize } from "../../types/form-sizes";
import { useIconFormSize } from "../../hooks/use-icon-form-size";
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

type ButtonNavLinkProps = {
  as?: typeof NavLink;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
} & Omit<NavLinkProps, "className" | "style" | "children">;

type ButtonAs =
  | ButtonButtonProps
  | ButtonAnchorProps
  | ButtonLinkProps
  | ButtonNavLinkProps;

type ButtonIntent =
  | "primary"
  | "secondary"
  | "secondaryColor"
  | "outline"
  | "tertiary"
  | "tertiaryReverse"
  | "listItem";

const intentToIntentMap: Record<ButtonIntent, LoaderIntent> = {
  primary: "primary",
  secondary: "grey",
  secondaryColor: "primary",
  outline: "grey",
  tertiary: "grey",
  tertiaryReverse: "greyReverse",
  listItem: "grey",
};

const formSizeToSizeMap: Record<FormSize, LoaderSize> = {
  sm: "xs",
  md: "sm",
  lg: "md",
};

export type ButtonProps = ButtonAs & {
  /**
   * The element or component to render as
   * @default "button"
   */
  as?: "button" | "a" | typeof Link | typeof NavLink;

  /**
   * Horizontal alignment of button content
   * @default "center"
   */
  alignContent?: "left" | "right" | "center";

  /** Makes the button full-width of its container */
  block?: boolean;

  /** Disables the button and prevents user interaction */
  disabled?: boolean;

  /**
   * Size of the button
   * @default "md"
   */
  formSize?: FormSize;

  /**
   * Icon to display on the left side of the button text
   * @docType IconName | ReactElement
   */
  iconLeft?: IconOrElement;

  /**
   * Icon to display as the only content (removes text and centers icon)
   */
  iconOnly?: IconOrElement;

  /**
   * Icon to display on the right side of the button text
   */
  iconRight?: IconOrElement;

  /**w
   * Visual style of the button
   * @default "secondary"
   */
  intent?: ButtonIntent;

  /** Shows the button in an active/selected state */
  isActive?: boolean;

  /** Shows a loading spinner and disables the button */
  isLoading?: boolean;

  /** HTML button type attribute */
  type?: "button" | "submit" | "reset";
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
      type = "button",
      intent = "secondary",
      isActive,
      isLoading,
      ...rest
    } = props;
    const Wrapper = as === "a" ? "a" : as === "button" ? "button" : as;

    const iconSize = useIconFormSize(formSize);

    const isDisabled = isLoading || disabled;

    const renderLoader = (
      <Loader
        intent={intentToIntentMap[intent]}
        size={formSizeToSizeMap[formSize]}
      />
    );

    function renderClassName(navLinkRenderProps?: NavLinkRenderProps) {
      return buttonVariants({
        intent,
        formSize,
        className,
        iconOnly: !!iconOnly,
        block: !!block,
        alignContent,
        isActive: isActive || navLinkRenderProps?.isActive,
        disabled: isDisabled,
      });
    }

    const isNavLink = as === NavLink;

    return (
      <Wrapper
        {...(rest as any)}
        type={type}
        ref={ref}
        disabled={isDisabled}
        role={intent === "listItem" ? "menuitem" : undefined}
        className={
          isNavLink
            ? (navLinkRenderProps: NavLinkRenderProps) =>
                renderClassName(navLinkRenderProps)
            : renderClassName()
        }
      >
        {iconOnly ? (
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
            {isLoading ? (
              <span className="truncate">{children}</span>
            ) : (
              children
            )}
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
