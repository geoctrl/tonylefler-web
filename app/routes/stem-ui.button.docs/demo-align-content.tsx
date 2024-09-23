import { Button } from "stem-ui";
import { Demo } from "~/components/demo";

export const DemoAlignContent = () => (
  <Demo
    raw={`<Button alignContent="left">Left</Button>
<Button alignContent="center">Center</Button>
<Button alignContent="right">Right</Button>`}
    preview={() => (
      <>
        <Button alignContent="left">Left</Button>
        <Button alignContent="center">Center</Button>
        <Button alignContent="right">Right</Button>
      </>
    )}
  />
);
