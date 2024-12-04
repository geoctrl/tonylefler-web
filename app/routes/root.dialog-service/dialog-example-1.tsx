import React, { useState } from "react";
import { Button } from "root";
import { DialogHeader } from "../../common/dialog/dialog-header";
import { DialogBody } from "../../common/dialog/dialog-body";
import { DialogFooter } from "../../common/dialog/dialog-footer";
import { useDialogContext } from "../../common/dialog/dialog-context";
import { useDialog } from "../../common/dialog/use-dialog";

export function DialogExample1() {
  const [result, setResult] = useState<undefined | boolean>(undefined);
  const dialogExample = useDialog(DialogExample);

  return (
    <div>
      <Button
        onClick={async () => {
          const result = await dialogExample();
          setResult(!!result);
        }}
      >
        Open Dialog
      </Button>

      {result !== undefined && (
        <code className="ml-4">Result {result?.toString()}</code>
      )}
    </div>
  );
}

function DialogExample() {
  const { closeDialog } = useDialogContext();
  return (
    <>
      <DialogHeader title="My Dialog" />
      <DialogBody>Are you sure you want to do this?</DialogBody>
      <DialogFooter>
        <Button onClick={() => closeDialog(false)}>No</Button>
        <Button onClick={() => closeDialog(true)} intent="primary">
          Yes
        </Button>
      </DialogFooter>
    </>
  );
}
