import { tv } from "tailwind-variants";

export const breadcrumbItemVariants = tv({
  base: "inline-flex items-center gap-1.5 transition-colors",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    isLink: {
      true: "text-grey-600 hover:text-grey-900 dark:text-grey-400 dark:hover:text-grey-100 hover:underline",
      false: "text-grey-900 dark:text-grey-100 font-medium",
    },
  },
  defaultVariants: {
    size: "md",
    isLink: false,
  },
});
