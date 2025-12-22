import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ModalBodyProps = ComponentProps<"div">;

export function ModalBody(props: ModalBodyProps) {
  const { children, className, ...rest } = props;
  return (
    <div
      className={twMerge("relative overflow-y-auto px-6 pt-2 pb-6", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
