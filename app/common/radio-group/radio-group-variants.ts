import { tv } from "tailwind-variants";
import { always } from "~/utils/classname-helpers";

export const radioGroupVariants = tv({
  slots: {
    group: "flex",
    item: "flex cursor-pointer items-start gap-2.5",
    radioWrapper: "relative shrink-0",
    radioInput: "peer sr-only",
    radioCircle: always(
      "inline-flex items-center justify-center rounded-full border transition-colors",
      "peer-focus:ring-grey-990/20 peer-focus:shadow-none peer-focus:ring-3",
      "dark:peer-focus:ring-grey-10/20 dark:peer-focus:shadow-none dark:peer-focus:ring-3",
    ),
    radioDot: "rounded-full bg-white transition-transform scale-0",
    label: "select-none leading-snug",
    description: "text-grey-500 dark:text-grey-400 leading-snug",
  },
  variants: {
    orientation: {
      vertical: {
        group: "flex-col",
      },
      horizontal: {
        group: "flex-row flex-wrap",
      },
    },
    formSize: {
      sm: {
        group: "gap-2",
        item: "gap-2",
        radioCircle: "size-4",
        radioDot: "size-1.5",
        label: "text-sm",
        description: "text-xs",
      },
      md: {
        group: "gap-3",
        item: "gap-2.5",
        radioCircle: "size-5",
        radioDot: "size-2",
        label: "text-base",
        description: "text-sm",
      },
      lg: {
        group: "gap-4",
        item: "gap-3",
        radioCircle: "size-6",
        radioDot: "size-2.5",
        label: "text-lg",
        description: "text-sm",
      },
    },
    checked: {
      true: {
        radioCircle: always(
          "bg-primary-500 border-primary-500",
          "dark:bg-primary-500 dark:border-primary-500",
          "peer-hover:bg-primary-600 peer-hover:border-primary-600",
          "dark:peer-hover:bg-primary-600 dark:peer-hover:border-primary-600",
        ),
        radioDot: "scale-100",
      },
      false: {
        radioCircle: always(
          "bg-white border-grey-450",
          "dark:bg-transparent dark:border-grey-600",
          "peer-hover:bg-grey-50 peer-hover:border-grey-600",
          "dark:peer-hover:bg-grey-900/20 dark:peer-hover:border-grey-500",
        ),
      },
    },
    disabled: {
      true: {
        item: "cursor-not-allowed",
        radioCircle: "peer-hover:bg-transparent peer-hover:border-grey-450 dark:peer-hover:bg-transparent dark:peer-hover:border-grey-600",
        label: "opacity-50",
        description: "opacity-50",
      },
    },
    groupDisabled: {
      true: {
        item: "cursor-not-allowed",
      },
    },
  },
  compoundVariants: [
    {
      checked: true,
      disabled: true,
      class: {
        radioCircle: "bg-grey-300 border-grey-300 dark:bg-grey-700 dark:border-grey-700 opacity-50 peer-hover:bg-grey-300 dark:peer-hover:bg-grey-700",
        radioDot: "bg-white",
      },
    },
    {
      checked: false,
      disabled: true,
      class: {
        radioCircle: "opacity-50",
      },
    },
    // Label vertical offset based on size, so it aligns with circle center
    {
      formSize: "sm",
      class: {
        radioWrapper: "mt-[1px]",
      },
    },
    {
      formSize: "md",
      class: {
        radioWrapper: "mt-[2px]",
      },
    },
    {
      formSize: "lg",
      class: {
        radioWrapper: "mt-[3px]",
      },
    },
  ],
  defaultVariants: {
    orientation: "vertical",
    formSize: "md",
    checked: false,
    disabled: false,
  },
});
