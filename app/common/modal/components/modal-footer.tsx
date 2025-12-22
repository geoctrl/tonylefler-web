import { ReactNode, CSSProperties } from "react";

type ModalFooterProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ModalFooter(props: ModalFooterProps) {
  const { children } = props;
  return (
    <div className="flex items-center justify-end gap-4 p-6">{children}</div>
  );
}
