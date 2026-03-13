import { tv } from "tailwind-variants";
import { always } from "~/utils/classname-helpers";

export const chipVariants = tv({
  slots: {
    root: "inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap select-none transition-colors duration-150",
    icon: "shrink-0",
    label: "leading-none",
    deleteButton: always(
      "inline-flex items-center justify-center rounded-full shrink-0",
      "cursor-pointer transition-colors duration-150",
      "focus:outline-none focus-visible:ring-2",
    ),
  },
  variants: {
    intent: {
      default: {
        root: "bg-grey-100 text-grey-800 dark:bg-grey-800 dark:text-grey-100",
        deleteButton: "hover:bg-grey-300 dark:hover:bg-grey-600 focus-visible:ring-grey-400",
      },
      primary: {
        root: "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200",
        deleteButton: "hover:bg-primary-200 dark:hover:bg-primary-800 focus-visible:ring-primary-400",
      },
      success: {
        root: "bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-200",
        deleteButton: "hover:bg-success-200 dark:hover:bg-success-800 focus-visible:ring-success-400",
      },
      warning: {
        root: "bg-warning-100 text-warning-700 dark:bg-warning-800 dark:text-warning-200",
        deleteButton: "hover:bg-warning-200 dark:hover:bg-warning-700 focus-visible:ring-warning-400",
      },
      error: {
        root: "bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-200",
        deleteButton: "hover:bg-danger-200 dark:hover:bg-danger-800 focus-visible:ring-danger-400",
      },
    },
    size: {
      sm: {
        root: "h-6 px-2 text-xs gap-1",
        icon: "size-3",
        label: "",
        deleteButton: "size-4",
      },
      md: {
        root: "h-7 px-2.5 text-sm gap-1.5",
        icon: "size-3.5",
        label: "",
        deleteButton: "size-4.5",
      },
      lg: {
        root: "h-8 px-3 text-sm gap-2",
        icon: "size-4",
        label: "",
        deleteButton: "size-5",
      },
    },
    clickable: {
      true: {
        root: "cursor-pointer",
      },
      false: {
        root: "cursor-default",
      },
    },
    disabled: {
      true: {
        root: "cursor-default opacity-50 pointer-events-none",
      },
    },
  },
  compoundVariants: [
    {
      clickable: true,
      intent: "default",
      class: {
        root: "hover:bg-grey-200 active:bg-grey-300 dark:hover:bg-grey-700 dark:active:bg-grey-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-grey-400",
      },
    },
    {
      clickable: true,
      intent: "primary",
      class: {
        root: "hover:bg-primary-200 active:bg-primary-300 dark:hover:bg-primary-800 dark:active:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
      },
    },
    {
      clickable: true,
      intent: "success",
      class: {
        root: "hover:bg-success-200 active:bg-success-300 dark:hover:bg-success-800 dark:active:bg-success-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-success-400",
      },
    },
    {
      clickable: true,
      intent: "warning",
      class: {
        root: "hover:bg-warning-200 active:bg-warning-300 dark:hover:bg-warning-700 dark:active:bg-warning-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-warning-400",
      },
    },
    {
      clickable: true,
      intent: "error",
      class: {
        root: "hover:bg-danger-200 active:bg-danger-300 dark:hover:bg-danger-800 dark:active:bg-danger-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger-400",
      },
    },
  ],
  defaultVariants: {
    intent: "default",
    size: "md",
    clickable: false,
  },
});
