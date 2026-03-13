import { tv } from "tailwind-variants";

export const dividerVariants = tv({
  slots: {
    root: "flex items-center",
    line: "flex-1",
    label: "shrink-0 px-3 text-xs font-medium",
  },
  variants: {
    orientation: {
      horizontal: {
        root: "w-full flex-row",
        line: "h-px",
      },
      vertical: {
        root: "h-full flex-col self-stretch",
        line: "w-px flex-1",
        label: "py-3 px-0 text-xs font-medium [writing-mode:vertical-lr]",
      },
    },
    variant: {
      solid: {
        line: "",
      },
      dashed: {
        line: "border-dashed",
      },
      dotted: {
        line: "border-dotted",
      },
    },
    intent: {
      default: {
        line: "bg-grey-200 dark:bg-grey-700",
        label: "text-grey-500 dark:text-grey-400",
      },
      strong: {
        line: "bg-grey-400 dark:bg-grey-500",
        label: "text-grey-700 dark:text-grey-300",
      },
      subtle: {
        line: "bg-grey-100 dark:bg-grey-800",
        label: "text-grey-400 dark:text-grey-500",
      },
    },
  },
  compoundVariants: [
    // Dashed and dotted lines use border instead of background
    {
      variant: "dashed",
      orientation: "horizontal",
      class: { line: "h-0 border-t bg-transparent" },
    },
    {
      variant: "dotted",
      orientation: "horizontal",
      class: { line: "h-0 border-t bg-transparent" },
    },
    {
      variant: "dashed",
      orientation: "vertical",
      class: { line: "w-0 border-l bg-transparent" },
    },
    {
      variant: "dotted",
      orientation: "vertical",
      class: { line: "w-0 border-l bg-transparent" },
    },
    // Dashed/dotted intent colors via border-color
    {
      variant: "dashed",
      intent: "default",
      class: { line: "border-grey-200 dark:border-grey-700" },
    },
    {
      variant: "dotted",
      intent: "default",
      class: { line: "border-grey-200 dark:border-grey-700" },
    },
    {
      variant: "dashed",
      intent: "strong",
      class: { line: "border-grey-400 dark:border-grey-500" },
    },
    {
      variant: "dotted",
      intent: "strong",
      class: { line: "border-grey-400 dark:border-grey-500" },
    },
    {
      variant: "dashed",
      intent: "subtle",
      class: { line: "border-grey-100 dark:border-grey-800" },
    },
    {
      variant: "dotted",
      intent: "subtle",
      class: { line: "border-grey-100 dark:border-grey-800" },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
    intent: "default",
  },
});
