import React, { ReactNode, CSSProperties } from "react";

type ModalFooterProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ModalFooter(props: ModalFooterProps) {
  const { children } = props;
  return (
    <div className="flex items-center justify-end gap-4 border-t p-4 app-border">
      {children}
    </div>
  );
}
