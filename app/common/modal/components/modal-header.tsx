import { ReactNode, CSSProperties } from "react";

import { Button } from "../../button/button";
import { useModalContext } from "../modal-context";
import { formSizes } from "../../../types/form-sizes";
import { always, toggle } from "../../../utils/classname-helpers";

type ModalHeaderProps = {
  className?: string;
  title?: string | ReactNode;
  style?: CSSProperties;
  description?: string;
  actions?: ReactNode;
  hideCloseButton?: boolean;
};

export function ModalHeader(props: ModalHeaderProps) {
  const { title, actions, description, hideCloseButton } = props;
  const { closeModal } = useModalContext();
  return (
    <>
      <div
        className={always(
          `flex justify-between ${formSizes.sm.min_h} w-full shrink-0 gap-3 py-3 pr-3 pl-6`,
          toggle(!!description, "items-start", "items-center"),
        )}
      >
        <div className="flex items-center gap-4">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            {description && (
              <div className="text-sm opacity-50">{description}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {!hideCloseButton && (
            <Button
              onClick={() => closeModal()}
              iconOnly="xmark"
              intent="tertiary"
            />
          )}
        </div>
      </div>
    </>
  );
}
