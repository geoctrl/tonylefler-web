import { DemoAlignContent } from "~/routes/stem-ui.button.docs/demo-align-content";
import { DemoIntent } from "~/routes/stem-ui.button.docs/demo-intent";

export default function () {
  return (
    <div>
      <h3>Intent</h3>
      <p>
        The <code>intent</code> prop is used to style the button based on its
        purpose.
      </p>
      <DemoIntent />
      <h3>AlignContent</h3>
      <DemoAlignContent />
    </div>
  );
}
