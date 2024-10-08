import { ButtonAlignContent } from "~/routes/stem-ui.button.docs/button-align-content";
import { ButtonIntent } from "~/routes/stem-ui.button.docs/button-intent";
import { Demo } from "~/components/demo";
import { Button } from "stem-ui";

export default function () {
  return (
    <>
      <Demo raw={`const hey = () => {}`}>
        <Button>Hello World</Button>
      </Demo>
      <ButtonIntent />
      <h3>AlignContent</h3>
      <ButtonAlignContent />
    </>
  );
}
