import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  Placement,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "motion/react";

type TooltipProps = {
  children: React.ReactNode;
  renderTrigger: (
    refProps: any,
    opts: { isOpen: boolean },
  ) => React.ReactElement;
  placement?: Placement;
};

const getAnimationOffset = (placement: string) => {
  const direction = placement.split("-")[0];
  switch (direction) {
    case "top":
      return { y: 5 };
    case "bottom":
      return { y: -5 };
    case "left":
      return { x: 5 };
    case "right":
      return { x: -5 };
    default:
      return { y: 5 };
  }
};

export function Tooltip({
  children,
  renderTrigger,
  placement = "top",
}: TooltipProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRef = React.useRef(null);

  const { floatingStyles, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(12),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: 200, close: 0 },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const referenceProps = {
    ref: refs.setReference,
    ...getReferenceProps(),
  };

  const _offset = getAnimationOffset(placement);

  return (
    <>
      {renderTrigger(referenceProps, { isOpen })}
      <AnimatePresence>
        {isOpen && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <motion.div
                initial={{ opacity: 0, ..._offset }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, ..._offset }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="z-50 max-w-xs rounded-lg bg-gray-800 px-2 py-1.5 text-sm text-white shadow-lg"
              >
                <FloatingArrow ref={arrowRef} context={context} fill="#1f2937" />
                {children}
              </motion.div>
            </div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  );
}
