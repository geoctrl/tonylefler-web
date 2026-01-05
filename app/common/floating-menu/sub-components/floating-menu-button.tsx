import {
  useContext,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link, LinkProps } from "react-router";
import { useFloatingTree, useListItem, useMergeRefs } from "@floating-ui/react";
import { twMerge } from "tailwind-merge";

import { Button, Icon } from "root";
import { MenuContext } from "../floating-menu-context";
import { IconOrElement } from "~/types/icons";
import { FloatingMenuInner } from "../floating-menu-inner";

type Override<T, U> = Omit<T, keyof U> & U;

type FloatingMenuItemAsButton = {
  as?: "button";
} & Override<
  ButtonHTMLAttributes<HTMLButtonElement>,
  {
    onClick?: (e?: any, meta?: any) => void;
  }
>;
type FloatingMenuItemAsAnchor = {
  as?: "a";
} & AnchorHTMLAttributes<HTMLAnchorElement>;
type FloatingMenuItemAsLink = { as?: typeof Link } & LinkProps;

type FloatingMenuItemAs =
  | FloatingMenuItemAsButton
  | FloatingMenuItemAsAnchor
  | FloatingMenuItemAsLink;

export type FloatingMenuItemProps = FloatingMenuItemAs & {
  children?: ReactNode;
  disabled?: boolean;
  iconLeft?: IconOrElement;
  iconRight?: IconOrElement;
  subtext?: string | ReactNode;
  text?: string | ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
};

export const FloatingMenuButton = (props: FloatingMenuItemProps) => {
  const {
    text = "",
    subtext,
    iconLeft,
    iconRight,
    children,
    as = "button",
    ref: forwardedRef,
    ...rest
  } = props;
  const menu = useContext(MenuContext);
  const item = useListItem({
    label: !rest.disabled && typeof text === "string" ? text : null,
  });
  const tree = useFloatingTree();
  const isActive = item.index === menu.activeIndex;
  const selfRefs = useMergeRefs([item.ref, forwardedRef]);

  function renderItem({ refs, isSubMenu, ...itemProps }: Record<string, any>) {
    const content = subtext ? (
      <div className="flex flex-col items-start">
        <div>{text}</div>
        <div className="text-sm opacity-50">{subtext}</div>
      </div>
    ) : (
      text
    );

    return (
      <Button
        {...(rest as any)}
        {...itemProps}
        ref={refs}
        as={as}
        intent="listItem"
        disabled={rest?.disabled}
        isActive={isActive}
        alignContent="between"
        iconLeft={iconLeft}
        iconRight={!isSubMenu ? iconRight : null}
        className={twMerge("min-w-40", rest.className)}
      >
        <div className="flex w-full items-center justify-between">
          {content}
          {isSubMenu && <Icon className="sub-menu-icon" name="angle-right" />}
        </div>
      </Button>
    );
  }

  if (children) {
    return (
      <FloatingMenuInner renderItem={renderItem}>{children}</FloatingMenuInner>
    );
  }

  return renderItem({
    refs: selfRefs,
    role: "menuitem",
    className: "MenuItem",
    tabIndex: isActive ? 0 : -1,
    ...menu.getItemProps({
      onClick(event: React.MouseEvent<HTMLButtonElement>) {
        rest?.onClick?.(event as any);
        tree?.events.emit("click");
      },
      onFocus(event: React.FocusEvent<HTMLButtonElement>) {
        rest.onFocus?.(event as any);
        menu.setHasFocusInside(true);
      },
    }),
  });
};
