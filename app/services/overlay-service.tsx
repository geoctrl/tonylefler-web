import {
  useState,
  useEffect,
  useRef,
  createContext,
  HTMLAttributes,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Subject } from "rxjs";
import { ulid } from "ulid";

import { always, maybe, toggle } from "../utils/classname-helpers";
import { Modal } from "../common/modal-old/modal";
import {
  OverlayActive,
  OverlayCloseAllAction,
  OverlayCloseByIdAction,
  OverlayCreateAction,
  OverlayDrawerConfig,
  OverlayModalConfig,
} from "../services/overlay-service.types";
import { Drawer } from "../common/drawer";
import { createClientPortal } from "../utils/create-client-portal";

const overlaySubjectIn = new Subject<
  OverlayCreateAction | OverlayCloseByIdAction | OverlayCloseAllAction
>();
const overlaySubjectAnnounce = new Subject<string[]>();
const overlayObservable = overlaySubjectAnnounce.asObservable();

export const OverlayContext = createContext<{ onClose: (data?: any) => void }>({
  onClose: () => {},
});

class OverlayService {
  async modal({ component, props, opts, id }: OverlayModalConfig) {
    return new Promise((resolve) => {
      overlaySubjectIn.next({
        name: "create",
        data: {
          id: id || ulid(),
          type: "modal",
          opts: opts || {},
          component:
            typeof component === "function" ? component : () => component,
          props: props || {},
          resolve,
        },
      });
    });
  }

  async drawer({ component, props, opts, id }: OverlayDrawerConfig) {
    return new Promise((resolve) => {
      overlaySubjectIn.next({
        name: "create",
        data: {
          id: id || ulid(),
          type: "drawer",
          opts: opts || {},
          component:
            typeof component === "function" ? component : () => component,
          props: props || {},
          resolve,
        },
      });
    });
  }

  // async dialog(
  //   messageOrOps:
  //     | string
  //     | {
  //         message: string;
  //         title?: string;
  //         successBtnText?: string | ReactNode;
  //         cancelBtnText?: string | ReactNode;
  //       },
  // ): Promise<any> {}

  closeAll() {
    overlaySubjectIn.next({ name: "closeAll" });
  }

  closeById(id: string) {
    overlaySubjectIn.next({ name: "closeById", data: { id } });
  }
}

export const overlayService = new OverlayService();

export function OverlayEntry() {
  const [activeOverlays, setActiveOverlays] = useState<OverlayActive[]>([]);
  const prevActiveOverlayRef = useRef(!!activeOverlays.length);
  const modalRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<Element | null>();

  useEffect(() => {
    // keep track of prev changes
    const hasOverlays = !!activeOverlays.length;
    if (hasOverlays !== prevActiveOverlayRef.current) {
      if (hasOverlays) {
        // open
        prevFocusRef.current = document.activeElement;
      } else {
        // close
        prevFocusRef.current = null;
      }
    }
    prevActiveOverlayRef.current = hasOverlays;

    // focus trap
    // console.log(modalRef.current);
    modalRef.current?.addEventListener("focus", trap);
    modalRef.current?.focus();

    return () => {
      modalRef.current?.removeEventListener("focus", trap);
    };
  }, [activeOverlays]);

  function trap() {}

  useEffect(() => {
    const sub = overlaySubjectIn.subscribe((action) => {
      const { name, data } = action;
      if (name === "closeAll") {
        setActiveOverlays((overlays) => {
          overlays.forEach((overlay) => overlay.resolve());
          return [];
        });
      } else if (name === "closeById") {
        const overlay = activeOverlays.find(
          (_overlay) => _overlay.id === data.id,
        );
        if (overlay) {
          onClose(overlay);
        }
      } else if (name === "create") {
        setActiveOverlays((ao) => [...ao, data]);
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, [activeOverlays]);

  useEffect(() => {
    overlaySubjectAnnounce.next(activeOverlays.map((ao) => ao.id));
  }, [activeOverlays]);

  // const closeAll = () => {
  //   setActiveOverlays((overlays) => {
  //     overlays.forEach((overlay) => overlay.resolve());
  //     return [];
  //   });
  // };

  const onClose = (overlay: OverlayActive, data?: any) => {
    // resolve
    overlay.resolve(data);
    // remove from DOM
    setActiveOverlays((ao) => {
      return ao.filter((_overlay) => _overlay.id !== overlay.id);
    });
  };

  return createClientPortal(
    <AnimatePresence>
      {!!activeOverlays.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: overlayTransition.enter }}
          exit={{ opacity: 0, transition: overlayTransition.exit }}
          className={always("absolute inset-0 z-30 bg-grey-900/15")}
        />
      )}
      {activeOverlays.map((overlay, index) => {
        const isActive = activeOverlays.length - 1 === index;
        return (
          <div
            key={overlay.id}
            className={always(
              "fixed inset-0 flex items-center justify-center",
              toggle(activeOverlays.length - 1 === index, "z-30", "z-20"),
            )}
          >
            <div
              className={always(
                "absolute inset-0 flex items-center justify-center",
              )}
            >
              {overlay.type === "modal" && (
                <OverlayContext.Provider
                  value={{ onClose: (data) => onClose(overlay, data) }}
                >
                  <Modal
                    ref={isActive ? modalRef : null}
                    width={overlay?.opts.width}
                    isActive={isActive}
                  >
                    <overlay.component
                      {...overlay.props}
                      onClose={(data: any) => onClose(overlay, data)}
                    />
                  </Modal>
                </OverlayContext.Provider>
              )}
              {overlay.type === "drawer" && (
                <OverlayContext.Provider
                  value={{ onClose: (data) => onClose(overlay, data) }}
                >
                  <Drawer
                    width={overlay?.opts.width}
                    isActive={isActive}
                    float={overlay?.opts.float}
                    ref={isActive ? modalRef : null}
                  >
                    <overlay.component
                      {...overlay.props}
                      onClose={(data: any) => onClose(overlay, data)}
                    />
                  </Drawer>
                </OverlayContext.Provider>
              )}
            </div>
          </div>
        );
      })}
    </AnimatePresence>,
  );
}

export function DivModalBlur(props: HTMLAttributes<HTMLDivElement>) {
  const { children, className, ...divProps } = props;
  const isOverlay = useIsOverlay();
  return (
    <div
      {...divProps}
      className={always(
        className,
        "transition-[filter]",
        maybe(isOverlay, "blur-sm duration-300"),
      )}
    >
      {children}
    </div>
  );
}

export function useIsOverlay() {
  const [isOverlay, setIsOverlay] = useState(false);
  useEffect(() => {
    const sub = overlayObservable.subscribe((overlayIds) => {
      setIsOverlay(!!overlayIds.length);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);
  return isOverlay;
}

export const overlayTransition = {
  enter: {
    duration: 0.3,
    ease: "easeOut",
  },
  exit: {
    duration: 0.3,
    ease: "easeIn",
  },
};
