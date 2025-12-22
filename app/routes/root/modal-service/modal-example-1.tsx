import React, { useState } from "react";
import { Button } from "root";
import { ModalHeader } from "../../../common/modal/components/modal-header";
import { ModalBody } from "../../../common/modal/components/modal-body";
import { ModalFooter } from "../../../common/modal/components/modal-footer";
import { useModalContext } from "../../../common/modal/modal-context";
import { useModal } from "../../../hooks/use-modal";

export function ModalExample1() {
  const [result, setResult] = useState<undefined | boolean>(undefined);
  const modalExample = useModal(ModalExample);

  return (
    <div>
      <Button
        onClick={async () => {
          const result = await modalExample();
          setResult(!!result);
        }}
      >
        Open Modal
      </Button>

      {result !== undefined && (
        <code className="ml-4">Result {result?.toString()}</code>
      )}
    </div>
  );
}

function ModalExample() {
  const { closeModal } = useModalContext();
  return (
    <>
      <ModalHeader title="My Modal" />
      <ModalBody>Are you sure you want to do this?</ModalBody>
      <ModalFooter>
        <Button onClick={() => closeModal(false)}>No</Button>
        <Button onClick={() => closeModal(true)} intent="primary">
          Yes
        </Button>
      </ModalFooter>
    </>
  );
}
