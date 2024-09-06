import { always, maybe, toggle } from "~/utils/classname-helpers";
import { twMerge } from "tailwind-merge";
import { ReactNode, useContext } from "react";
import { TabsContext } from "~/common/tabs/tabs-context.ts";

export type TabsItemProps = {
  isActive?: boolean;
  id?: unknown;
  children?: ReactNode;
};

export function TabsItem(props: TabsItemProps) {
  const { children, isActive, id } = props;
  const { value, onChange } = useContext(TabsContext);
  const active = isActive || (id === value && !!id);
  return (
    <button
      onClick={() => onChange?.(id)}
      className={twMerge(
        always(
          "relative inline-flex h-10 w-full items-center justify-center text-grey-10/50 transition-colors ease-out hover:cursor-default",
          toggle(active, "hover:bg-azure-500/10", "hover:bg-grey-10/5"),
          maybe(
            active,
            "font-medium text-azure-500",
            "after:border-info-500 after:pointer-events-none after:absolute after:-bottom-[.1rem] after:left-0 after:right-0 after:border-b-[.3rem] after:bg-grey-500",
          ),
        ),
      )}
    >
      {children}
    </button>
  );
}
