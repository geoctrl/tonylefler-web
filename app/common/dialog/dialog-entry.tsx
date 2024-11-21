import React, { useState, useEffect } from "react";

import { dialogService } from "./dialog-service";
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
import { DialogContext } from "./dialog-context";

type DialogState = {
  id: string;
  component: React.FC<any>;
  props: any;
};

export const DialogEntry: React.FC = () => {
  const [dialogStack, setDialogStack] = useState<DialogState[]>([]);

  const currentDialog = dialogStack[dialogStack.length - 1];
  const isOpen = !!currentDialog;

  const DialogComponent = currentDialog?.component;
  const props = currentDialog?.props;
  const id = currentDialog?.id;

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (nextIsOpen) => {
      if (!nextIsOpen) {
        closeDialog();
      }
    },
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);

  const headingId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const eventListener = dialogService.eventBus.on((event) => {
      const { action, data } = event.detail;
      if (action === "dialog_open") {
        setDialogStack((prevStack) => [
          ...prevStack,
          { id: data.id, component: data.component, props: data.props },
        ]);
      } else if (action === "dialog_close") {
        setDialogStack((prevStack) =>
          prevStack.filter((dialog) => dialog.id !== data.id),
        );
      } else if (action === "dialog_update") {
        setDialogStack((prevStack) =>
          prevStack.map((dialog) =>
            dialog.id === data.id
              ? { ...dialog, props: { ...dialog.props, ...data.props } }
              : dialog,
          ),
        );
      }
    });

    return () => {
      eventListener.remove();
    };
  }, []);

  function closeDialog(result?: any) {
    dialogService.close(id, result);
  }

  console.log("rerender");

  return (
    <DialogContext.Provider value={{ closeDialog }}>
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              transition={{ duration: 0.3, ease: "easeOut" }}
              key="dialog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FloatingOverlay
                className="grid place-items-center bg-grey-990/10"
                lockScroll
              >
                <FloatingFocusManager context={context}>
                  <motion.div
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    initial={{ y: "-3.2rem" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-3.2rem" }}
                    className="rounded-lg bg-grey-10 p-6 shadow-lg dark:bg-grey-800"
                    ref={refs.setFloating}
                    aria-labelledby={headingId}
                    aria-describedby={descriptionId}
                    {...getFloatingProps()}
                  >
                    <DialogComponent
                      {...props}
                      closeDialog={(result: any) => closeDialog(result)}
                    />
                  </motion.div>
                </FloatingFocusManager>
              </FloatingOverlay>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </DialogContext.Provider>
  );
};
