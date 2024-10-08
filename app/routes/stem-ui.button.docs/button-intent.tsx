import { Button } from "stem-ui";
import { Demo } from "~/components/demo";

export const ButtonIntent = () => (
  <div>
    <div className="docs">
      <h3>Intent</h3>
      <p>
        The <code>intent</code> prop is used to style the button based on its
        purpose.
      </p>
      <p>
        The <code>intent</code> prop can be one of the following values:
      </p>
      <p>
        Defaults to <code>secondary</code>.
      </p>
      <p>
        <code>primary</code>, <code>secondary</code>,{" "}
        <code>secondaryColor</code>, <code>border</code>, <code>tertiary</code>,{" "}
        <code>ai</code>
      </p>
    </div>
    <Demo
      raw={`<Button intent="primary">Primary</Button>
<Button intent="secondary">Secondary</Button>
<Button intent="secondaryColor">Secondary Color</Button>
<Button intent="outline">Outline</Button>
<Button intent="tertiary">Tertiary</Button>
<Button intent="listItem">List Item</Button>`}
    >
      <div className="flex gap-2">
        <Button intent="primary">Primary</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="secondaryColor">Secondary Color</Button>
        <Button intent="outline">Outline</Button>
        <Button intent="tertiary">Tertiary</Button>
        <Button intent="listItem">List Item</Button>
      </div>
    </Demo>
  </div>
);
