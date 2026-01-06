import React from "react";
import { Link } from "react-router";
import type { LinkProps } from "react-router";
import { always } from "../../utils/classname-helpers";
import { RenderIconOrElement } from "../icon/render-icon-or-element";
import { IconOrElement } from "~/types/icons";
import { breadcrumbItemVariants } from "./breadcrumb-variants";
import { useBreadcrumbContext } from "./breadcrumb";

type BreadcrumbLinkAnchorProps = {
  as: "a";
  children?: React.ReactNode;
  iconLeft?: IconOrElement;
  iconRight?: IconOrElement;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type BreadcrumbLinkLinkProps = {
  as?: typeof Link;
  children?: React.ReactNode;
  iconLeft?: IconOrElement;
  iconRight?: IconOrElement;
} & LinkProps;

export type BreadcrumbLinkProps =
  | BreadcrumbLinkAnchorProps
  | BreadcrumbLinkLinkProps;

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>((props, ref) => {
  const { size } = useBreadcrumbContext();
  const { children, className, iconLeft, iconRight, as, ...rest } = props;

  const Component = (as || Link) as React.ElementType;

  const classes = always(
    breadcrumbItemVariants({ size, isLink: true }),
    className,
  );

  return (
    <Component ref={ref} className={classes} {...rest}>
      {iconLeft && <RenderIconOrElement iconOrElement={iconLeft} size="sm" />}
      {children}
      {iconRight && <RenderIconOrElement iconOrElement={iconRight} size="sm" />}
    </Component>
  );
});

BreadcrumbLink.displayName = "BreadcrumbLink";
