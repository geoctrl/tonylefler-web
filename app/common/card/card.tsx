import { ComponentProps } from "react";
import {
  cardVariants,
  cardHeaderVariants,
  cardBodyVariants,
  cardFooterVariants,
} from "./card-variants";

// ─── Card ──────────────────────────────────────────────────────────────────

export type CardVariant = "elevated" | "outlined" | "filled";

export type CardProps = ComponentProps<"div"> & {
  /**
   * Visual style of the card
   * @default "elevated"
   */
  variant?: CardVariant;
};

/**
 * A container component for grouping related content with consistent
 * surface styling, border, and shadow treatment.
 */
export function Card(props: CardProps) {
  const { children, className, variant = "elevated", ...rest } = props;
  return (
    <div className={cardVariants({ variant, className })} {...rest}>
      {children}
    </div>
  );
}

// ─── CardHeader ────────────────────────────────────────────────────────────

export type CardHeaderProps = ComponentProps<"div">;

/**
 * The header section of a Card, displayed above the body with a
 * bottom border separator. Intended for titles and header actions.
 */
export function CardHeader(props: CardHeaderProps) {
  const { children, className, ...rest } = props;
  return (
    <div className={cardHeaderVariants({ className })} {...rest}>
      {children}
    </div>
  );
}

// ─── CardBody ──────────────────────────────────────────────────────────────

export type CardBodyPadding = "none" | "sm" | "md" | "lg";

export type CardBodyProps = ComponentProps<"div"> & {
  /**
   * Internal padding of the card body
   * @default "md"
   */
  padding?: CardBodyPadding;
};

/**
 * The main content area of a Card with configurable padding.
 */
export function CardBody(props: CardBodyProps) {
  const { children, className, padding = "md", ...rest } = props;
  return (
    <div className={cardBodyVariants({ padding, className })} {...rest}>
      {children}
    </div>
  );
}

// ─── CardFooter ────────────────────────────────────────────────────────────

export type CardFooterProps = ComponentProps<"div">;

/**
 * The footer section of a Card, displayed below the body with a
 * top border separator. Intended for actions such as buttons.
 */
export function CardFooter(props: CardFooterProps) {
  const { children, className, ...rest } = props;
  return (
    <div className={cardFooterVariants({ className })} {...rest}>
      {children}
    </div>
  );
}
