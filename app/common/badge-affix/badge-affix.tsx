import React, { ReactNode, CSSProperties } from "react";
import { always } from "../../utils/classname-helpers";

type BadgeAddProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  badge?: ReactNode;
};

export function BadgeAffix(props: BadgeAddProps) {
  const { children, className, style, badge } = props;
  return (
    <div className={always("relative align-middle", className)} style={style}>
      {children}
      <div className="pointer-events-none absolute -right-2 -top-2 flex">
        {badge}
      </div>
    </div>
  );
}
