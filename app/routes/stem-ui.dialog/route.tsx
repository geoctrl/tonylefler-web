import { Button } from "stem-ui";

import { useDialog } from "../../common/dialog/use-dialog";
import { useDialogContext } from "../../common/dialog/dialog-context";
import { DialogHeader } from "../../common/dialog/dialog-header";

const MyComponent = () => {
  const { closeDialog } = useDialogContext();
  return (
    <div>
      <DialogHeader>Hello</DialogHeader>
      modal!
      <Button onClick={() => closeDialog("hi")}>close modal</Button>
    </div>
  );
};

const id = "super-thing";

export default function () {
  const doThingModal = useDialog(MyComponent);

  return (
    <div>
      {/*<h1>Dialog</h1>*/}
      {/*<button onClick={() => doThingModal()}>hello</button>*/}
    </div>
  );
}
