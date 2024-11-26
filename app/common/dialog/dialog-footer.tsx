import React, { ReactNode, CSSProperties } from "react";

type DialogFooterProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function DialogFooter(props: DialogFooterProps) {
  const { children } = props;
  return <div>{children}</div>;
}
