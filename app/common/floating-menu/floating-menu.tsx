import { FloatingTree } from "@floating-ui/react";
import * as React from "react";

import {
  FloatingMenuInner,
  FloatingMenuInnerProps,
} from "./floating-menu-inner";
import { FloatingMenuButton } from "./sub-components/floating-menu-button";
import { FloatingMenuDivider } from "./sub-components/floating-menu-divider";
import { ForwardRefExoticComponent } from "react";

export type FloatingMenuProps = FloatingMenuInnerProps &
  React.HTMLProps<HTMLButtonElement>;

export type FloatingMenuComponent =
  ForwardRefExoticComponent<FloatingMenuProps> & {
    Item: typeof FloatingMenuButton;
    Divider: typeof FloatingMenuDivider;
  };

export const FloatingMenu = React.forwardRef<
  HTMLButtonElement,
  FloatingMenuInnerProps & React.HTMLProps<HTMLButtonElement>
>((props, ref) => {
  return (
    <FloatingTree>
      <FloatingMenuInner {...props} ref={ref} />
    </FloatingTree>
  );
}) as FloatingMenuComponent;

FloatingMenu.Item = FloatingMenuButton;
FloatingMenu.Divider = FloatingMenuDivider;

FloatingMenu.displayName = "Menu";
