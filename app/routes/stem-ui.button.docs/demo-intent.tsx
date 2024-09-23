import { Button } from "stem-ui";
import { Demo } from "~/components/demo";
import { IconOrElement } from "~/types/icons";

export const DemoIntent = () => (
  <Demo
    raw={`<Button intent="primary">Primary</Button>
<Button intent="secondary">Secondary</Button>
<Button intent="secondaryColor">Secondary Color</Button>
<Button intent="border">Border</Button>
<Button intent="tertiary">Tertiary</Button>
<Button intent="ai">AI</Button>
`}
    preview={() => (
      <div>
        <Button intent="primary">Primary</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="secondaryColor">Secondary Color</Button>
        <Button intent="border">Border</Button>
        <Button intent="tertiary">Tertiary</Button>
        <Button intent="ai">AI</Button>
      </div>
    )}
  />
);

export type ButtonProps = {
  alignContent?: "left" | "right" | "center";
  block?: boolean;
  disabled?: boolean;
  formSize?: "sm" | "md" | "lg";
  iconLeft?: IconOrElement;
  iconOnly?: IconOrElement;
  iconRight?: IconOrElement;
  intent?:
    | "primary"
    | "secondary"
    | "secondaryColor"
    | "border"
    | "tertiary"
    | "ai"
    | "listItem";
  isActive?: boolean;
  isLoading?: boolean;
};
