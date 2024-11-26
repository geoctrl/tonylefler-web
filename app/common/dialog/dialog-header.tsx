import React, { ReactNode, CSSProperties, FC } from "react";
import { Button } from "stem-ui";
import { useDialogContext } from "./dialog-context";
import { formSizes } from "../../types/form-sizes";

type DialogHeaderProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  renderActions?: () => ReactNode;
};

export function DialogHeader(props: DialogHeaderProps) {
  const { children, renderActions } = props;
  const { closeDialog } = useDialogContext();
  return (
    <>
      <div
        className={`mr-${formSizes.sm + 2} flex items-start justify-between min-h-${formSizes.sm + 2}`}
      >
        {/*title*/}
        <div>
          <div className="text-lg font-semibold">{children}</div>
          {/*<div className="text-sm opacity-50">hey</div>*/}
        </div>
        {/*actions*/}
        <div>
          {renderActions?.()}
          <Button
            onClick={() => closeDialog()}
            iconOnly="xmark"
            formSize="sm"
            className="absolute right-4 top-4 rounded-full"
          />
        </div>
      </div>
    </>
  );
}
