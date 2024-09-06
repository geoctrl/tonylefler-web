import { useCallback, useContext, useEffect, useRef } from "react";
import { ulid } from "ulid";

import { OverlayContext, overlayService } from "~/services/overlay-service";
import { OverlayModalConfig } from "~/services/overlay-service.types";

export const useModal = ({
  component,
  props,
  opts,
  id,
}: OverlayModalConfig) => {
  const modalIdRef = useRef<string>();

  useEffect(() => {
    return () => {
      if (modalIdRef.current) {
        overlayService.closeById(modalIdRef.current);
      }
    };
  }, []);

  return useCallback(() => {
    if (!modalIdRef.current) {
      modalIdRef.current = id || ulid();
    }
    return overlayService.modal({
      component,
      props,
      opts,
      id: modalIdRef.current,
    });
  }, [component, props, opts]);
};

export function useModalContext() {
  return useContext(OverlayContext);
}
