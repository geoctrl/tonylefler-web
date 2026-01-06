import { ComponentProps, useContext } from "react";
import { maybe, toggle } from "../../utils/classname-helpers.ts";
import { TabsContext } from "./tabs-context.ts";
import { twMerge } from "tailwind-merge";

type TabButtonProps = ComponentProps<"button"> & {
  id?: string;
};

export function TabButton(props: TabButtonProps) {
  const { children, className, id } = props;
  const tabsContext = useContext(TabsContext);
  const active = tabsContext?.activeTab === id;
  return (
    <button
      className={twMerge(
        "z-10 h-10 shrink border-b px-2 text-sm",
        maybe(active, ""),
        toggle(active, "app-border", "border-transparent"),
        className,
      )}
      onClick={() => tabsContext?.setActiveTab?.(id)}
    >
      {children}
    </button>
  );
}
