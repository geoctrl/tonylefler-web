import React, { ReactNode, CSSProperties, useState } from "react";
import { motion, Variants } from "motion/react";

type AiShadowProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function AiShadow(props: AiShadowProps) {
  const { children } = props;
  const [animate, setAnimate] = useState("one");

  const borderVariant: Variants = {
    one: {
      opacity: 1,
    },
    two: {},
    three: {},
  };

  return (
    <div className="relative inline-block">
      <div
        className="absolute overflow-hidden"
        style={{
          opacity: 0.8,
          top: -20,
          left: -20,
          right: -20,
          bottom: -20,
          borderRadius: 20,
          filter: "blur(20px)",
        }}
      >
        <motion.div
          variants={borderVariant}
          animate={animate}
          transition={{ duration: 2 }}
          className="absolute"
          style={{
            left: "-450%",
            opacity: 0,
            top: "-450%",
            right: 0,
            bottom: 0,
            height: "1000%",
            width: "1000%",
            backgroundSize: "100%",
            backgroundPosition: "-50% -50%",
            animation: "rotate 4s linear infinite",
            backgroundImage: `conic-gradient(from 0deg at 50% 50%, #7944d3, #b81e8c, #d8325a, #fc693c, #7944d3)`,
          }}
        ></motion.div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
