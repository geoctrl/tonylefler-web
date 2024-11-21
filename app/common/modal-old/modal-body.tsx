import { ReactNode, CSSProperties } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ModalBody(props: Props) {
  const { children } = props;
  return <div className="px-4 pb-4">{children}</div>;
}
