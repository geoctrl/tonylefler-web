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
import { RenderIconOrElement } from "../../icon/render-icon-or-element";
import { always, toggle } from "../../../utils/classname-helpers";

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
    const Wrapper: ComponentType<any> | string = as;

    function renderItem({
      refs,
      isSubMenu,
      ...itemProps
    }: Record<string, any>) {
      return (
        <Wrapper
          {...props}
          {...itemProps}
          ref={refs}
          type="button"
          className={always(
            "text-grey-990 dark:text-grey-10 flex min-h-10 w-full min-w-40 items-center justify-between px-3 py-1 text-left no-underline focus:outline-none",
            toggle(
              props?.disabled,
              "cursor-default opacity-50 focus:bg-transparent dark:focus:bg-transparent",
              "focus:bg-grey-100 dark:focus:bg-grey-800",
            ),
          )}
          role="menuitem"
        >
          <div className="flex items-center gap-3">
            {!!iconLeft && (
              <RenderIconOrElement
                iconOrElement={iconLeft}
                className="size-4"
              />
            )}
            <div>
              <div>{text}</div>
              {subtext && <div className="text-sm">{subtext}</div>}
            </div>
          </div>
          {isSubMenu && <Icon className="sub-menu-icon" name="angle-right" />}
          {!isSubMenu && !!iconRight && (
            <RenderIconOrElement iconOrElement={iconRight} />
          )}
        </Wrapper>
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
