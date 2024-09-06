import { ReactNode, CSSProperties } from "react";
import { always, maybe } from "~/utils/classname-helpers";
import { TabsContext } from "~/common/tabs/tabs-context.ts";

type TabsProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  border?: boolean;
  onChange?: (value: unknown) => void;
  value?: unknown;
};

export function Tabs(props: TabsProps) {
  const { children, className, style, border, value, onChange } = props;
  return (
    <div
      style={style}
      className={always(
        className,
        "flex items-center border-b border-grey-10/20 px-4",
        maybe(border, "border-b app-border"),
      )}
    >
      <TabsContext.Provider value={{ value, onChange }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
}
