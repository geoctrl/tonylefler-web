export const formSizes = {
  sm: { h: "h-8", min_h: "min-h-8" },
  md: { h: "h-10", min_h: "min-h-10" },
  lg: { h: "h-12", min_h: "min-h-12" },
} as const;

export type FormSize = keyof typeof formSizes;
