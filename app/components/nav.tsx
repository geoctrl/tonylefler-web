import React, { ReactNode, CSSProperties, Fragment } from "react";
import { Link } from "@remix-run/react";
import { Button, Icon } from "root";

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
        return (
          <Fragment key={crumb.label}>
            {crumb?.to ? (
              <Button intent="tertiary" formSize="sm" as={Link} to={crumb.to}>
                {crumb.label}
              </Button>
            ) : (
              <div className="px-2.5 text-sm font-bold opacity-50">
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
