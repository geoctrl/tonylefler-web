import React, { ReactNode, CSSProperties, useContext } from "react";

import { Button } from "../common/button/button";
import { useModalContext } from "../hooks/use-modal";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ModalHeader(props: Props) {
  const { children } = props;
  const { onClose } = useModalContext();
  return (
    <div className="flex items-center justify-between py-2 pl-4 pr-2">
      <h3>{children}</h3>
      <div>
        <Button
          intent="tertiary"
          iconOnly="xmark"
          onClick={() => onClose?.()}
        />
      </div>
    </div>
  );
}
