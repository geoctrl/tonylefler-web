import { useContext, forwardRef } from "react";
import { Link, LinkProps } from "react-router";
import { useFloatingTree, useListItem, useMergeRefs } from "@floating-ui/react";

import { MenuContext } from "../floating-menu-context";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  ReactNode,
} from "react";
import { Icon } from "../../icon/icon";
import { IconOrElement } from "../../../types/icons";
import { FloatingMenuInner } from "../floating-menu-inner";
import { Button } from "../../button/button";
import { always } from "../../../utils/classname-helpers";

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
};

export const FloatingMenuButton = forwardRef<
  HTMLButtonElement,
  FloatingMenuItemProps
>(
  (
    {
      text = "",
      subtext,
      iconLeft,
      iconRight,
      children,
      as = "button",
      ...props
    },
    forwardedRef,
  ) => {
    const menu = useContext(MenuContext);
    const item = useListItem({
      label: !props.disabled && typeof text === "string" ? text : null,
    });
    const tree = useFloatingTree();
    const isActive = item.index === menu.activeIndex;
    const selfRefs = useMergeRefs([item.ref, forwardedRef]);

    function renderItem({
      refs,
      isSubMenu,
      ...itemProps
    }: Record<string, any>) {
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
          {...(props as any)}
          {...itemProps}
          ref={refs}
          as={as}
          intent="listItem"
          disabled={props?.disabled}
          isActive={isActive}
          alignContent="left"
          iconLeft={!isSubMenu ? iconLeft : undefined}
          iconRight={
            isSubMenu ? (
              <Icon className="sub-menu-icon" name="angle-right" />
            ) : (
              iconRight
            )
          }
          className={always("min-w-40", props.className)}
        >
          {content}
        </Button>
      );
    }

    if (children) {
      return (
        <FloatingMenuInner renderItem={renderItem}>
          {children}
        </FloatingMenuInner>
      );
    }

    return renderItem({
      refs: selfRefs,
      role: "menuitem",
      className: "MenuItem",
      tabIndex: isActive ? 0 : -1,
      ...menu.getItemProps({
        onClick(event: React.MouseEvent<HTMLButtonElement>) {
          props?.onClick?.(event as any);
          tree?.events.emit("click");
        },
        onFocus(event: React.FocusEvent<HTMLButtonElement>) {
          props.onFocus?.(event as any);
          menu.setHasFocusInside(true);
        },
      }),
    });
  },
);
