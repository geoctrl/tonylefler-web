import { useCallback, useContext, useEffect, useRef } from "react";
import { ulid } from "ulid";

import { OverlayContext, overlayService } from "~/services/overlay-service";
import { OverlayDrawerConfig } from "~/services/overlay-service.types";

export const useDrawer = ({
  component,
  props,
  opts,
  id,
}: OverlayDrawerConfig) => {
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
    return overlayService.drawer({
      component,
      props,
      opts,
      id: modalIdRef.current,
    });
  }, [component, props, opts]);
};

export function useDrawerContext() {
  return useContext(OverlayContext);
}
