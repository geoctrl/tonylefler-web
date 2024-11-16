import { visit } from "unist-util-visit";

export default function rehypeLead() {
  return async (tree: any) => {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "p" &&
        node.children.length > 0 &&
        node.children[0].type === "text" &&
        node.children[0].value.startsWith("::")
      ) {
        node.children[0].value = node.children[0].value.replace(/^::\s*/, "");
        node.properties = { ...node.properties, className: "lead" };
      }
    });
  };
}
