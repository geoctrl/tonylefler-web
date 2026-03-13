import { tv } from "tailwind-variants";

export const alertVariants = tv({
  slots: {
    root: "relative flex w-full gap-3 rounded-lg border p-4",
    icon: "mt-0.5 size-5 shrink-0",
    content: "flex min-w-0 flex-1 flex-col gap-1",
    title: "text-sm font-semibold leading-5",
    body: "text-sm leading-5",
    dismiss:
      "ml-auto -mr-1 -mt-1 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
  },
  variants: {
    intent: {
      info: {
        root: "border-info-200 bg-info-50 text-info-800 dark:border-info-700 dark:bg-info-950 dark:text-info-200",
        icon: "text-info-500 dark:text-info-400",
        title: "text-info-900 dark:text-info-100",
        body: "text-info-800 dark:text-info-200",
        dismiss:
          "text-info-500 hover:bg-info-100 hover:text-info-700 dark:text-info-400 dark:hover:bg-info-900 dark:hover:text-info-200",
      },
      success: {
        root: "border-success-200 bg-success-50 text-success-800 dark:border-success-700 dark:bg-success-950 dark:text-success-200",
        icon: "text-success-500 dark:text-success-400",
        title: "text-success-900 dark:text-success-100",
        body: "text-success-800 dark:text-success-200",
        dismiss:
          "text-success-500 hover:bg-success-100 hover:text-success-700 dark:text-success-400 dark:hover:bg-success-900 dark:hover:text-success-200",
      },
      warning: {
        root: "border-warning-200 bg-warning-50 text-warning-800 dark:border-warning-700 dark:bg-warning-950 dark:text-warning-200",
        icon: "text-warning-500 dark:text-warning-400",
        title: "text-warning-900 dark:text-warning-100",
        body: "text-warning-800 dark:text-warning-200",
        dismiss:
          "text-warning-500 hover:bg-warning-100 hover:text-warning-700 dark:text-warning-400 dark:hover:bg-warning-900 dark:hover:text-warning-200",
      },
      error: {
        root: "border-danger-200 bg-danger-50 text-danger-800 dark:border-danger-700 dark:bg-danger-950 dark:text-danger-200",
        icon: "text-danger-500 dark:text-danger-400",
        title: "text-danger-900 dark:text-danger-100",
        body: "text-danger-800 dark:text-danger-200",
        dismiss:
          "text-danger-500 hover:bg-danger-100 hover:text-danger-700 dark:text-danger-400 dark:hover:bg-danger-900 dark:hover:text-danger-200",
      },
    },
  },
  defaultVariants: {
    intent: "info",
  },
});
