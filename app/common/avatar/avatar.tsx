import React, { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../icon/icon";
import { Icons } from "~/types/icons";
import {
  avatarVariants,
  avatarColors,
  getAvatarColorIndex,
  getInitials,
} from "./avatar-variants";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";

export type AvatarProps = Omit<ComponentProps<"span">, "children"> & {
  /**
   * URL of the avatar image.
   * @docType string
   */
  src?: string;

  /**
   * Alt text for the avatar image. Also used for accessibility when showing initials.
   * @docType string
   */
  alt?: string;

  /**
   * Full name of the person. Used to generate initials when no image is available.
   * Also determines the deterministic fallback background color.
   * @docType string
   */
  name?: string;

  /**
   * Size of the avatar.
   * @docType "xs" | "sm" | "md" | "lg" | "xl"
   * @default "md"
   */
  size?: AvatarSize;

  /**
   * Shape of the avatar.
   * @docType "circle" | "square"
   * @default "circle"
   */
  shape?: AvatarShape;

  /**
   * Icon name to show as a fallback when no image and no name are provided.
   * Defaults to "user".
   * @docType Icons
   * @default "user"
   */
  icon?: Icons;
};

/**
 * Avatar displays a user's profile image with graceful fallbacks.
 * When no image is available (or it fails to load), it shows initials derived
 * from `name`, or a generic icon if no name is provided.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar(props, ref) {
    const {
      src,
      alt,
      name,
      size = "md",
      shape = "circle",
      icon = "user",
      className,
      ...rest
    } = props;

    const [imgError, setImgError] = useState(false);

    const showImage = !!src && !imgError;
    const showInitials = !showImage && !!name;
    const showIcon = !showImage && !showInitials;

    const slots = avatarVariants({ size, shape });

    // Deterministic color based on name (or grey fallback for icon-only)
    const colorClass = name
      ? avatarColors[getAvatarColorIndex(name)]
      : "bg-grey-100 text-grey-500 dark:bg-grey-800 dark:text-grey-400";

    const initials = name ? getInitials(name) : "";

    // Icon sizing map
    const iconSizeClass: Record<AvatarSize, string> = {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    };

    return (
      <span
        ref={ref}
        role="img"
        aria-label={alt ?? name ?? "Avatar"}
        className={twMerge(slots.root(), !showImage ? colorClass : "bg-grey-100 dark:bg-grey-800", className)}
        {...rest}
      >
        {showImage && (
          <img
            src={src}
            alt={alt ?? name ?? "Avatar"}
            className={slots.image()}
            onError={() => setImgError(true)}
          />
        )}
        {showInitials && (
          <span className={slots.fallback()} aria-hidden="true">
            {initials}
          </span>
        )}
        {showIcon && (
          <span className={slots.fallback()} aria-hidden="true">
            <Icon name={icon} className={iconSizeClass[size]} />
          </span>
        )}
      </span>
    );
  },
);
