import React, { ReactNode, CSSProperties } from "react";

type NavHeaderProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function NavHeader(props: NavHeaderProps) {
  const { children } = props;
  return (
    <div className="cursor-default py-2 text-xs font-bold uppercase">
      {children}
    </div>
  );
}
