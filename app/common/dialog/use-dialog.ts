import { FC, useCallback, useEffect, useRef } from "react";
import { ulid } from "ulid";

import { DialogOpts, dialogService } from "./dialog-service";

export function useDialog<T>(ModalComponent: FC<T>, opts: DialogOpts = {}) {
  const modalId = useRef(opts?.id || ulid());

  useEffect(() => {
    return () => {
      dialogService.close(modalId.current);
    };
  }, []);

  return useCallback(
    (props?: T): Promise<any> => {
      return dialogService.render<T>(ModalComponent, props, {
        id: modalId.current,
        ...opts,
      });
    },
    [ModalComponent],
  );
}
