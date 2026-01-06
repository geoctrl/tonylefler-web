import React from "react";
import { always } from "../../utils/classname-helpers";
import { RenderIconOrElement } from "../icon/render-icon-or-element";
import { IconOrElement } from "~/types/icons";
import { breadcrumbItemVariants } from "./breadcrumb-variants";
import { useBreadcrumbContext } from "./breadcrumb";

export type BreadcrumbTextProps = {
  /**
   * Text content for the current page
   */
  children?: React.ReactNode;
  /**
   * Icon to display on the left side
   */
  iconLeft?: IconOrElement;
  /**
   * Icon to display on the right side
   */
  iconRight?: IconOrElement;
  className?: string;
};

export function BreadcrumbText(props: BreadcrumbTextProps) {
  const { size } = useBreadcrumbContext();
  const { children, className, iconLeft, iconRight } = props;

  return (
    <span
      aria-current="page"
      className={always(
        breadcrumbItemVariants({ size, isLink: false }),
        className,
      )}
    >
      {iconLeft && <RenderIconOrElement iconOrElement={iconLeft} size="sm" />}
      {children}
      {iconRight && <RenderIconOrElement iconOrElement={iconRight} size="sm" />}
    </span>
  );
}
