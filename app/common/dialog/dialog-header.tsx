import React, { ReactNode, CSSProperties } from "react";
import { Button } from "stem-ui";
import { useDialogContext } from "./dialog-context";

type DialogHeaderProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function DialogHeader(props: DialogHeaderProps) {
  const { children } = props;
  const { closeDialog } = useDialogContext();
  return (
    <div className="flex items-center justify-between">
      <div>{children}</div>
      <Button iconOnly="xmark" onClick={closeDialog} intent="tertiary" />
    </div>
  );
}
