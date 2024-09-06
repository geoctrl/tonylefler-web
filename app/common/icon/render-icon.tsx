import React, { isValidElement, ReactNode } from "react";

import { Icon, IconProps } from "~/common/icon/icon";
import { Icons } from "~/types/icon-gen";
import { IconsOrElement } from "~/types/icons";

export type RenderIconProps = Omit<IconProps, "name"> & {
  icon: IconsOrElement;
};

export function RenderIcon({
  icon,
  className,
}: RenderIconProps): ReactNode | null {
  if (typeof icon === "string") {
    return <Icon name={icon as Icons} className={className} />;
  }
  const iconProps = icon as IconProps;
  if (typeof iconProps === "object" && iconProps?.name) {
    return <Icon {...iconProps} className={className} />;
  }
  if (isValidElement(icon)) {
    return icon;
  }
  return null;
}
