import ButtonAlignContent from "~/routes/stem-ui.button.docs/button-align-content.mdx";
import ButtonIntent from "~/routes/stem-ui.button.docs/button-intent.mdx";
import ButtonAs from "~/routes/stem-ui.button.docs/button-as.mdx";
import { useSuperCode } from "~/hooks/use-super-code";

export default function () {
  useSuperCode();
  return (
    <>
      <ButtonAs />
      <ButtonAlignContent />
      <ButtonIntent />
    </>
  );
}
