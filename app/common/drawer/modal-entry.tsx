import React, { useState, useEffect } from "react";

import { ModalOpts, modalService } from "./modal-service";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "motion/react";
import { ModalContext } from "./modal-context";
import { always, maybe } from "../../utils/classname-helpers";

type ModalState = {
  id: string;
  component: React.FC<any>;
  opts: ModalOpts;
  props: any;
};

export const ModalEntry: React.FC = () => {
  const [modalStack, setModalStack] = useState<ModalState[]>([]);

  const currentModal = modalStack[modalStack.length - 1];
  const isOpen = !!currentModal;

  const ModalComponent = currentModal?.component;
  const props = currentModal?.props;
  const id = currentModal?.id;
  const opts = currentModal?.opts;

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (nextIsOpen) => {
      if (!nextIsOpen) {
        closeModal();
      }
    },
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const eventListener = modalService.eventBus.on((result) => {
      const { action, data } = result;
      if (action === "modal_open") {
        setModalStack((prevStack) => [
          ...prevStack,
          {
            id: data.id,
            component: data.component,
            props: data.props,
            opts: data.opts,
          },
        ]);
      } else if (action === "modal_close") {
        setModalStack((prevStack) =>
          prevStack.filter((modal) => modal.id !== data.id),
        );
      } else if (action === "modal_update") {
        setModalStack((prevStack) =>
          prevStack.map((modal) =>
            modal.id === data.id
              ? { ...modal, props: { ...modal.props, ...data.props } }
              : modal,
          ),
        );
      }
    });

    return () => {
      eventListener.remove();
    };
  }, []);

  function closeModal(result?: any) {
    modalService.close(id, result);
  }

  return (
    <ModalContext.Provider value={{ closeModal }}>
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40"
              transition={{ duration: 0.2, ease: "easeOut" }}
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FloatingOverlay
                className="z-40 grid place-items-center bg-grey-990/50"
                lockScroll
              >
                <FloatingFocusManager context={context}>
                  <motion.div
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    initial={{ y: "-32px" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-32px" }}
                    className={always(
                      "relative mx-4 max-w-[calc(100vw-32px)] rounded-lg bg-grey-10 shadow-lg dark:bg-grey-800",
                      maybe(opts?.size === "sm", "w-[300px]"),
                      maybe(
                        opts?.size === "md" || opts?.size === undefined,
                        "w-[400px]",
                      ),
                      maybe(opts?.size === "lg", "w-[560px]"),
                    )}
                    ref={refs.setFloating}
                    aria-labelledby={headingId}
                    aria-describedby={descriptionId}
                    {...getFloatingProps()}
                  >
                    <ModalComponent
                      {...props}
                      closeModal={(result: any) => closeModal(result)}
                    />
                  </motion.div>
                </FloatingFocusManager>
              </FloatingOverlay>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </ModalContext.Provider>
  );
};
