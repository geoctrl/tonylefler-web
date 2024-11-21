import { forwardRef, ReactNode } from "react";
import { motion } from "motion/react";

import { overlayTransition } from "../../services/overlay-service";
import { tv } from "tailwind-variants";
import { always } from "../../utils/classname-helpers";

export type ModalOpts = {
  width?: "sm" | "md" | "lg";
};

type ModalProps = ModalOpts & {
  children: ReactNode;
  isActive: boolean;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  function Modal(props, ref) {
    const { children, width = "sm", isActive } = props;

    return (
      <motion.div
        tabIndex={0}
        ref={ref}
        initial={{ opacity: 0, translateY: -36 }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: overlayTransition.enter,
          filter: !isActive ? "blur(4px)" : "blur(0rem)",
          scale: isActive ? 1 : 0.95,
        }}
        exit={{
          opacity: 0,
          transition: overlayTransition.exit,
          translateY: -36,
          filter: "blur(4px)",
        }}
        className={tv({
          base: always(
            "z-10 flex max-h-[calc(100%-6.4rem)] max-w-[calc(100%-6.4rem)] flex-col overflow-auto rounded-xl border-0 bg-grey-10 shadow-xl outline-0",
            "dark:bg-grey-800",
          ),
          variants: {
            width: {
              sm: "w-[36rem]",
              md: "w-[58rem]",
              lg: "w-[80rem]",
            },
          },
        })({
          width,
        })}
      >
        {children}
      </motion.div>
    );
  },
);
