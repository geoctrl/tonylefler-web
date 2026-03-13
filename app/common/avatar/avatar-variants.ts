import { tv } from "tailwind-variants";

export const avatarVariants = tv({
  slots: {
    root: "relative inline-flex shrink-0 items-center justify-center overflow-hidden font-medium select-none",
    image: "h-full w-full object-cover",
    fallback: "flex h-full w-full items-center justify-center",
  },
  variants: {
    size: {
      xs: {
        root: "size-6 text-[10px]",
        fallback: "text-[10px]",
      },
      sm: {
        root: "size-8 text-xs",
        fallback: "text-xs",
      },
      md: {
        root: "size-10 text-sm",
        fallback: "text-sm",
      },
      lg: {
        root: "size-12 text-base",
        fallback: "text-base",
      },
      xl: {
        root: "size-16 text-lg",
        fallback: "text-lg",
      },
    },
    shape: {
      circle: {
        root: "rounded-full",
      },
      square: {
        root: "rounded-md",
      },
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});

/**
 * A set of muted background color pairs (bg + text) for deterministic avatar fallback colors.
 * Index is determined by a hash of the name string.
 */
export const avatarColors = [
  "bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200",
  "bg-success-100 text-success-700 dark:bg-success-800 dark:text-success-200",
  "bg-warning-100 text-warning-700 dark:bg-warning-800 dark:text-warning-200",
  "bg-danger-100 text-danger-700 dark:bg-danger-800 dark:text-danger-200",
  "bg-info-100 text-info-700 dark:bg-info-800 dark:text-info-200",
  "bg-grey-150 text-grey-700 dark:bg-grey-700 dark:text-grey-200",
];

/**
 * Derive a deterministic color index from a name string.
 */
export function getAvatarColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return hash % avatarColors.length;
}

/**
 * Derive initials from a name string.
 * - "Alice" → "A"
 * - "Alice Smith" → "AS"
 * - "Alice Mary Smith" → "AS" (first and last only)
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
