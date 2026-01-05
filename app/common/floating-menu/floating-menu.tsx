import { FloatingTree } from "@floating-ui/react";
import * as React from "react";

import {
  FloatingMenuInner,
  FloatingMenuInnerProps,
} from "./floating-menu-inner";
import { FloatingMenuButton } from "./sub-components/floating-menu-button";
import { FloatingMenuDivider } from "./sub-components/floating-menu-divider";

export type FloatingMenuProps = FloatingMenuInnerProps &
  React.HTMLProps<HTMLButtonElement> & {
    ref?: React.Ref<HTMLButtonElement>;
  };

export type FloatingMenuComponent = ((
  props: FloatingMenuProps,
) => React.ReactElement) & {
  Item: typeof FloatingMenuButton;
  Divider: typeof FloatingMenuDivider;
  displayName?: string;
};

const FloatingMenuBase = (props: FloatingMenuProps) => {
  const { ref, ...rest } = props;
  return (
    <FloatingTree>
      <FloatingMenuInner {...rest} ref={ref} />
    </FloatingTree>
  );
};

export const FloatingMenu = FloatingMenuBase as FloatingMenuComponent;

FloatingMenu.Item = FloatingMenuButton;
FloatingMenu.Divider = FloatingMenuDivider;

FloatingMenu.displayName = "Menu";
