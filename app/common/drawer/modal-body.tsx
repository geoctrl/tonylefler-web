import React, { ReactNode, CSSProperties } from "react";

type ModalBodyProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ModalBody(props: ModalBodyProps) {
  const { children } = props;
  return <div className="p-4">{children}</div>;
}
