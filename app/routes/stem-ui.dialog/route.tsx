import { Button } from "stem-ui";

import { useDialog } from "../../common/dialog/use-dialog";
import { useDialogContext } from "../../common/dialog/dialog-context";
import { DialogHeader } from "../../common/dialog/dialog-header";
import { DialogBody } from "../../common/dialog/dialog-body";
import { DialogFooter } from "../../common/dialog/dialog-footer";

const useDeleteItemDialog = () => {
  return useDialog(() => {
    const { closeDialog } = useDialogContext();
    return (
      <>
        <DialogHeader>Delete item</DialogHeader>
        <DialogBody>modal!</DialogBody>
        <DialogFooter>
          <Button onClick={() => closeDialog("hi")}>close modal</Button>
        </DialogFooter>
      </>
    );
  });
};

const id = "super-thing";

export default function () {
  const doThingModal = useDeleteItemDialog();

  return (
    <div>
      <h1>Dialog</h1>
      <button onClick={() => doThingModal()}>hello</button>
    </div>
  );
}
