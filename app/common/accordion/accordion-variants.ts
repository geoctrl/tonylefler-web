import { tv } from "tailwind-variants";

export const accordionVariants = tv({
  slots: {
    root: "w-full divide-y divide-grey-900/10 dark:divide-grey-100/10 border border-grey-900/15 dark:border-grey-100/15 rounded-md overflow-hidden",
    item: "bg-grey-10 dark:bg-grey-900",
    trigger: [
      "flex w-full items-center justify-between gap-3 px-4 py-3.5",
      "text-left text-sm font-medium text-grey-900 dark:text-grey-100",
      "cursor-pointer select-none",
      "hover:bg-grey-900/5 dark:hover:bg-grey-100/5",
      "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-grey-990/20 dark:focus-visible:ring-grey-10/30",
      "transition-colors duration-150",
      "disabled:cursor-default disabled:opacity-50",
    ],
    caret: "size-4 shrink-0 text-grey-500 dark:text-grey-400 transition-transform duration-200",
    contentWrapper: "grid transition-[grid-template-rows] duration-200 ease-in-out",
    contentInner: "overflow-hidden",
    content: "px-4 pb-4 pt-1 text-sm text-grey-700 dark:text-grey-300",
  },
  variants: {
    open: {
      true: {
        caret: "rotate-180",
        contentWrapper: "grid-rows-[1fr]",
      },
      false: {
        contentWrapper: "grid-rows-[0fr]",
      },
    },
    disabled: {
      true: {
        item: "opacity-50",
      },
    },
  },
  defaultVariants: {
    open: false,
    disabled: false,
  },
});
