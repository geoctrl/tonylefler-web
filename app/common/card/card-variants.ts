import { tv } from "tailwind-variants";

export const cardVariants = tv({
  base: "rounded-xl overflow-hidden",
  variants: {
    variant: {
      elevated:
        "bg-grey-10 shadow-md dark:bg-grey-900 dark:shadow-grey-990/40",
      outlined:
        "bg-grey-10 border border-grey-200 dark:bg-grey-900 dark:border-grey-700",
      filled:
        "bg-grey-100 dark:bg-grey-800",
    },
  },
  defaultVariants: {
    variant: "elevated",
  },
});

export const cardHeaderVariants = tv({
  base: "flex items-center px-6 py-4 border-b border-grey-200 dark:border-grey-700",
});

export const cardBodyVariants = tv({
  base: "",
  variants: {
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export const cardFooterVariants = tv({
  base: "flex items-center px-6 py-4 border-t border-grey-200 dark:border-grey-700",
});
