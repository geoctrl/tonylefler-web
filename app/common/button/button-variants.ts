import { always } from "../../utils/classname-helpers";
import { formSizes } from "../../types/form-sizes";
import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "relative inline-flex shrink-0 cursor-pointer items-center rounded-lg align-middle text-[1rem] font-medium whitespace-nowrap no-underline select-none transition-[box-shadow] duration-200",
  variants: {
    intent: {
      primary: always(
        "bg-primary-500 text-grey-10 hover:bg-primary-700 active:bg-primary-800",
        "focus:shadow-none focus:outline-none",
        "focus:ring-primary-500/50 focus:shadow-none focus:ring-3",
        "dark:focus:ring-primary-500/50 dark:focus:shadow-none dark:focus:ring-3",
      ),
      secondary: always(
        "bg-grey-900/10 text-grey-900 hover:bg-grey-900/20 active:bg-grey-900/30",
        "dark:bg-grey-100/10 dark:text-grey-10 dark:hover:bg-grey-100/20 active:dark:bg-grey-100/30 dark:focus:border-grey-400",
        "focus:shadow-none focus:outline-none",
        "focus:ring-grey-990/20 focus:shadow-none focus:ring-3",
        "dark:focus:ring-grey-10/30 dark:focus:shadow-none dark:focus:ring-3",
      ),
      secondaryColor: always(
        "bg-primary-500/10 text-primary-500 dark:text-primary-300 hover:bg-primary-500/20 active:bg-primary-500/25",
        "focus:shadow-none focus:outline-none",
        "focus:ring-grey-990/20 focus:shadow-none focus:ring-3",
        "dark:focus:ring-grey-10/30 dark:focus:shadow-none dark:focus:ring-3",
      ),
      outline: always(
        "border-grey-900/30 hover:bg-grey-500/10 active:bg-grey-500/15 dark:text-grey-100 border border-solid",
        "focus:shadow-none focus:outline-none",
        "dark:border-grey-100/50 dark:text-grey-100 dark:hover:bg-grey-100/10 dark:active:bg-grey-100/15",
        "focus:ring-grey-990/20 focus:shadow-none focus:ring-3",
        "dark:focus:ring-grey-10/30 dark:focus:shadow-none dark:focus:ring-3",
      ),
      tertiary: always(
        "text-grey-900 focus:shadow-none focus:outline-none",
        "hover:bg-grey-500/10 active:bg-grey-500/15",
        "dark:text-grey-100 dark:hover:bg-grey-100/10 dark:active:bg-grey-100/15",
        "focus:ring-grey-990/20 focus:shadow-none focus:ring-3",
        "dark:focus:ring-grey-10/30 dark:focus:shadow-none dark:focus:ring-3",
      ),
      tertiaryReverse: always(
        "text-grey-100 active:bg-grey-100/15 hover:bg-grey-100/10",
        "focus:shadow-none focus:outline-none",
        "dark:text-grey-900 dark:active:bg-grey-500/15 dark:hover:bg-grey-500/10",
        "focus:ring-grey-10/30 focus:shadow-none focus:ring-3",
        "dark:focus:ring-grey-990/20 dark:focus:shadow-none dark:focus:ring-3",
      ),
      listItem: always(
        "text-grey-900 focus:bg-grey-500/15 active:bg-grey-500/15 rounded-none",
        "shadow-none outline-none",
        "dark:text-grey-100 dark:focus:bg-grey-100/15 dark:active:bg-grey-100/15",
        "focus:shadow-none",
        "dark:focus:shadow-none",
      ),
    },
    formSize: {
      sm: `${formSizes.sm.h} gap-1.5 px-2.5 text-sm`,
      md: `${formSizes.md.h} gap-2 px-3`,
      lg: `${formSizes.lg.h} gap-3 px-4 text-lg`,
    },
    alignContent: {
      left: "justify-start",
      right: "justify-end",
      center: "justify-center",
    },
    block: {
      true: "flex w-full",
    },
    isActive: {
      true: "",
    },
    disabled: {
      true: "cursor-default opacity-50",
    },
    iconOnly: {
      true: "justify-center p-0",
    },
  },
  compoundVariants: [
    // list item AND size "md"
    { intent: "listItem", formSize: "md", class: "px-4" },

    // icon only width
    { formSize: "sm", iconOnly: true, class: `size-8 p-0` },
    { formSize: "md", iconOnly: true, class: `size-10 p-0` },
    { formSize: "lg", iconOnly: true, class: `size-12 p-0` },
    // isActive
    {
      intent: "primary",
      isActive: true,
      class: "bg-primary-800 hover:bg-primary-800",
    },
    {
      intent: "secondary",
      isActive: true,
      class: always(
        "bg-grey-900/30 hover:bg-grey-900/30",
        "dark:bg-grey-100/30 dark:hover:bg-grey-100/30",
      ),
    },
    {
      intent: "secondaryColor",
      isActive: true,
      class: "bg-primary-500/25 hover:bg-primary-500/25",
    },
    {
      intent: "outline",
      isActive: true,
      class: always(
        "border-grey-900/50 bg-grey-500/15 hover:border-grey-900/30 hover:bg-grey-500/15",
        "dark:bg-grey-100/15 dark:hover:bg-grey-100/15 hover:border-grey-100/50",
      ),
    },
    {
      intent: "tertiary",
      isActive: true,
      class: always(
        "bg-grey-500/15 hover:bg-grey-500/15",
        "dark:bg-grey-100/15 dark:hover:bg-grey-100/15",
      ),
    },
    {
      intent: "listItem",
      isActive: true,
      class: always("bg-grey-500/15 dark:bg-grey-100/15"),
    },
    {
      intent: "tertiaryReverse",
      isActive: true,
      class: always(
        "bg-grey-10/15 hover:bg-grey-10/15",
        "dark:bg-grey-990/15 dark:hover:bg-grey-990/15",
      ),
    },
    // disabled
    {
      disabled: true,
      intent: "primary",
      class:
        "hover:bg-grey-990 focus:bg-grey-990 active:bg-grey-990 dark:hover:bg-grey-10 dark:focus:bg-grey-10 dark:active:bg-grey-10 cursor-default",
    },
    {
      disabled: true,
      intent: "secondary",
      class:
        "hover:bg-grey-500/10 focus:bg-grey-500/10 active:bg-grey-500/10 dark:hover:bg-grey-500/10 dark:focus:bg-grey-500/10 dark:active:bg-grey-500/10",
    },
    {
      disabled: true,
      intent: "secondaryColor",
      class:
        "hover:bg-primary-500/10 focus:bg-primary-500/10 active:bg-primary-500/10",
    },
    {
      disabled: true,
      intent: "outline",
      class:
        "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
    },
    {
      disabled: true,
      intent: "tertiary",
      class:
        "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
    },
    {
      disabled: true,
      intent: "tertiaryReverse",
      class:
        "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
    },
    {
      disabled: true,
      intent: "listItem",
      class:
        "hover:bg-transparent focus:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:active:bg-transparent",
    },
  ],
});
