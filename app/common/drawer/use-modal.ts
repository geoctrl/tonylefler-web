import { FC, useCallback, useEffect, useRef } from "react";
import { ulid } from "ulid";

import { ModalOpts, modalService } from "./modal-service";

export function useModal<T>(ModalComponent: FC<T>, opts: ModalOpts = {}) {
  const modalId = useRef(opts?.id || ulid());

  useEffect(() => {
    return () => {
      modalService.close(modalId.current);
    };
  }, []);

  return useCallback(
    (props?: T): Promise<any> => {
      return modalService.open<T>(ModalComponent, props, {
        id: modalId.current,
        ...opts,
      });
    },
    [ModalComponent],
  );
}
