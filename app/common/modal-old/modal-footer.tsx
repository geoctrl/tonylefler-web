import { HTMLAttributes } from "react";
import { always } from "../../utils/classname-helpers";

type ModalFooterProps = HTMLAttributes<HTMLDivElement>;

export function ModalFooter(props: ModalFooterProps) {
  return (
    <div {...props} className={always("flex justify-end p-4", props.className)}>
      {props.children}
    </div>
  );
}
