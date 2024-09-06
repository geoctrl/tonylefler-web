import { createContext } from "react";

export const TabsContext = createContext<{
  value: unknown;
  onChange: ((value: unknown) => void) | undefined;
}>({
  value: undefined,
  onChange: undefined,
});
