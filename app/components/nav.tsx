import React, { ReactNode, CSSProperties, Fragment } from "react";
import { Link } from "react-router";
import { Button, Icon } from "root";
import { formSizes } from "../types/form-sizes";
import { always, maybe } from "../utils/classname-helpers";

type NavProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  crumbs?: { label: string; to?: string }[];
};

export function Nav(props: NavProps) {
  const { crumbs } = props;
  return (
    <div className="flex items-center gap-1">
      {crumbs?.map((crumb, index) => {
        const showCaret = index < crumbs.length - 1;
        const isActive = index === crumbs.length - 1;
        return (
          <Fragment key={crumb.label}>
            {crumb?.to ? (
              <Button intent="tertiary" formSize="sm" as={Link} to={crumb.to}>
                {crumb.label}
              </Button>
            ) : (
              <div
                className={always(
                  `px-2.5 text-sm font-bold ${formSizes.sm.h} flex cursor-default items-center`,
                  maybe(!isActive, "opacity-50"),
                )}
              >
                {crumb.label}
              </div>
            )}
            {showCaret && <Icon name="angle-right" className="size-4" />}
          </Fragment>
        );
      })}
    </div>
  );
}
