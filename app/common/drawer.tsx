import React, { forwardRef, ReactNode, useMemo } from "react";
import { tv } from "tailwind-variants";
import { motion } from "motion/react";
import { overlayTransition } from "../services/overlay-service";
import { inlineSwitch } from "../utils/inline-switch";

export type DrawerOpts = {
  width?: "sm" | "md" | "lg";
  top?: boolean;
  bottom?: boolean;
  float?: boolean;
};

type DrawerProps = DrawerOpts & {
  children: ReactNode;
  isActive: boolean;
};

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  function Drawer(props, ref) {
    const { children, width, isActive, float = true } = props;
    const translateX = useMemo(() => {
      if (width === "lg") return "60rem";
      if (width === "md") return "48rem";
      return "36rem";
    }, [width]);
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, translateX }}
        animate={{
          opacity: 1,
          translateX: "0rem",
          transition: overlayTransition.enter,
          filter: !isActive ? "blur(4px)" : "blur(0rem)",
        }}
        exit={{
          opacity: 0,
          transition: overlayTransition.exit,
          translateX,
          filter: "blur(4px)",
        }}
        className={tv({
          base: "absolute z-10 flex flex-col overflow-auto border-0 bg-grey-10 shadow-xl outline-0",
          variants: {
            width: {
              sm: "w-[36rem]",
              md: "w-[48rem]",
              lg: "w-[60rem]",
            },
            float: {
              true: "bottom-8 right-8 top-8 rounded-xl",
              false: "bottom-0 right-0 top-0",
            },
          },
        })({
          width,
          float,
        })}
      >
        {children}
      </motion.div>
    );
  },
);
