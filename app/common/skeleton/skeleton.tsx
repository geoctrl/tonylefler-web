import { CSSProperties, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { skeletonVariants } from "./skeleton-variants";

export type SkeletonVariant = "text" | "rectangular" | "circular";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export type SkeletonProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  /**
   * Shape of the skeleton placeholder.
   * - `"rectangular"` — a rounded rectangle, suitable for images, cards, and blocks.
   * - `"text"` — sized to match a line of text; stack several for a paragraph placeholder.
   * - `"circular"` — a perfect circle, suitable for avatars and icons.
   * @default "rectangular"
   */
  variant?: SkeletonVariant;

  /**
   * Animation style for the skeleton.
   * - `"pulse"` — fades in and out using Tailwind's `animate-pulse`.
   * - `"wave"` — no wave animation (reserved for future shimmer effect).
   * - `"none"` — no animation; static placeholder.
   * @default "pulse"
   */
  animation?: SkeletonAnimation;

  /**
   * Width of the skeleton. Accepts any valid CSS width value (e.g. `"100%"`, `200`, `"12rem"`).
   * Numbers are treated as pixels.
   */
  width?: string | number;

  /**
   * Height of the skeleton. Accepts any valid CSS height value (e.g. `"2rem"`, `40`, `"100%"`).
   * Numbers are treated as pixels. For the `"text"` variant this defaults to `"1em"`.
   */
  height?: string | number;
};

function toPixels(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

export function Skeleton(props: SkeletonProps) {
  const {
    variant = "rectangular",
    animation = "pulse",
    width,
    height,
    className,
    style,
    ...rest
  } = props;

  const widthValue = toPixels(width);
  const heightValue = toPixels(height);

  // For circular, enforce equal width and height using the provided dimension
  const resolvedWidth =
    variant === "circular" ? (widthValue ?? heightValue) : widthValue;
  const resolvedHeight =
    variant === "circular" ? (heightValue ?? widthValue) : heightValue;

  const inlineStyle: CSSProperties = {
    ...style,
    ...(resolvedWidth !== undefined ? { width: resolvedWidth } : {}),
    ...(resolvedHeight !== undefined ? { height: resolvedHeight } : {}),
  };

  return (
    <span
      role="status"
      aria-hidden="true"
      className={twMerge(skeletonVariants({ variant, animation }), className)}
      style={inlineStyle}
      {...rest}
    />
  );
}
