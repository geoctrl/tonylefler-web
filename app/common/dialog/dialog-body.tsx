import React, { ReactNode, CSSProperties } from "react";

type DialogBodyProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function DialogBody(props: DialogBodyProps) {
  const { children } = props;
  return <div>{children}</div>;
}
