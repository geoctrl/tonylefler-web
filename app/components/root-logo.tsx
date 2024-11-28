import React, { ReactNode, CSSProperties } from "react";
import rootLogoSrc from "../assets/root-logo.png";

type rootLogoProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function rootLogo(props: rootLogoProps) {
  const {} = props;
  return (
    <div className="mb-4 flex w-full items-center gap-4">
      <div className="size-12 rounded-2xl bg-grey-10/10">
        <img src={rootLogoSrc} alt="root Logo" className="size-full" />
      </div>
      <div className="text-lg font-bold">root</div>
    </div>
  );
}
