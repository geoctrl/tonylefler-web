import { tv } from "tailwind-variants";

export const skeletonVariants = tv({
  base: "block bg-grey-200 dark:bg-grey-700",
  variants: {
    variant: {
      text: "rounded h-[1em] w-full",
      rectangular: "rounded-md",
      circular: "rounded-full",
    },
    animation: {
      pulse: "animate-pulse",
      wave: "",
      none: "",
    },
  },
  defaultVariants: {
    variant: "rectangular",
    animation: "pulse",
  },
});
