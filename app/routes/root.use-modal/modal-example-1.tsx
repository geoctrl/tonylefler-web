import React from "react";
import { Button } from "root";
import { useModal } from "../../hooks/use-modal";

export function ModalExample1() {
  const helloWorldModal = useModal(() => (
    <div className="p-8">Hello, World!</div>
  ));
  return <Button onClick={helloWorldModal}>Open Modal</Button>;
}
