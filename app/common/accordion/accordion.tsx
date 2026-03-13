import {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  ComponentProps,
  ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../icon/icon";
import { accordionVariants } from "./accordion-variants";

// --- Context ---

type AccordionContextValue = {
  /**
   * Whether multiple items can be open simultaneously.
   */
  type: "single" | "multiple";
  /**
   * The set of currently open item values.
   */
  openValues: Set<string>;
  /**
   * Toggle an item open or closed.
   */
  toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(
      "Accordion sub-components must be used within an <Accordion> root."
    );
  }
  return ctx;
}

// --- AccordionItem context (provides item value and disabled state) ---

type AccordionItemContextValue = {
  value: string;
  disabled: boolean;
  triggerId: string;
  contentId: string;
};

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used within an <AccordionItem>."
    );
  }
  return ctx;
}

// --- Accordion (root) ---

export type AccordionProps = ComponentProps<"div"> & {
  /**
   * Controls whether one or multiple items can be expanded at a time.
   * @default "single"
   */
  type?: "single" | "multiple";

  /**
   * The initial open item(s) in uncontrolled mode.
   * For type="single", provide a string. For type="multiple", provide an array of strings.
   */
  defaultValue?: string | string[];

  /**
   * The controlled open item(s).
   * For type="single", provide a string. For type="multiple", provide an array of strings.
   */
  value?: string | string[];

  /**
   * Callback fired when open items change.
   * For type="single", receives a string (or empty string when closed).
   * For type="multiple", receives an array of strings.
   */
  onValueChange?: (value: string | string[]) => void;
};

function normalizeToSet(val: string | string[] | undefined): Set<string> {
  if (!val) return new Set();
  if (Array.isArray(val)) return new Set(val);
  return val ? new Set([val]) : new Set();
}

export const Accordion = (props: AccordionProps) => {
  const {
    type = "single",
    defaultValue,
    value: controlledValue,
    onValueChange,
    className,
    children,
    ...rest
  } = props;

  const isControlled = controlledValue !== undefined;

  const [internalOpenValues, setInternalOpenValues] = useState<Set<string>>(
    () => normalizeToSet(defaultValue)
  );

  const openValues = isControlled
    ? normalizeToSet(controlledValue)
    : internalOpenValues;

  const toggleItem = useCallback(
    (itemValue: string) => {
      let nextSet: Set<string>;

      if (type === "single") {
        // If already open, close it; otherwise open only this one
        nextSet = openValues.has(itemValue)
          ? new Set()
          : new Set([itemValue]);
      } else {
        // multiple: toggle the item in the set
        nextSet = new Set(openValues);
        if (nextSet.has(itemValue)) {
          nextSet.delete(itemValue);
        } else {
          nextSet.add(itemValue);
        }
      }

      if (!isControlled) {
        setInternalOpenValues(nextSet);
      }

      if (onValueChange) {
        if (type === "single") {
          const arr = Array.from(nextSet);
          onValueChange(arr[0] ?? "");
        } else {
          onValueChange(Array.from(nextSet));
        }
      }
    },
    [type, openValues, isControlled, onValueChange]
  );

  const { root } = accordionVariants();

  return (
    <AccordionContext.Provider value={{ type, openValues, toggleItem }}>
      <div className={twMerge(root(), className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.displayName = "Accordion";

// --- AccordionItem ---

export type AccordionItemProps = ComponentProps<"div"> & {
  /**
   * Unique identifier for this item. Used to track open/closed state.
   */
  value: string;

  /**
   * When true, the item cannot be expanded or collapsed.
   * @default false
   */
  disabled?: boolean;
};

export const AccordionItem = (props: AccordionItemProps) => {
  const { value, disabled = false, className, children, ...rest } = props;

  const uid = useId();
  const triggerId = `accordion-trigger-${uid}`;
  const contentId = `accordion-content-${uid}`;

  const { item } = accordionVariants({ disabled });

  return (
    <AccordionItemContext.Provider
      value={{ value, disabled, triggerId, contentId }}
    >
      <div className={twMerge(item(), className)} {...rest}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

AccordionItem.displayName = "AccordionItem";

// --- AccordionTrigger ---

export type AccordionTriggerProps = ComponentProps<"button"> & {
  /** Content displayed in the trigger button */
  children?: ReactNode;
};

export const AccordionTrigger = (props: AccordionTriggerProps) => {
  const { children, className, ...rest } = props;

  const { openValues, toggleItem } = useAccordionContext();
  const { value, disabled, triggerId, contentId } = useAccordionItemContext();

  const isOpen = openValues.has(value);

  const { trigger, caret } = accordionVariants({ open: isOpen });

  return (
    <button
      id={triggerId}
      type="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      disabled={disabled}
      onClick={() => {
        if (!disabled) toggleItem(value);
      }}
      className={twMerge(trigger(), className)}
      {...rest}
    >
      <span>{children}</span>
      <Icon name="caret-down" className={caret()} aria-hidden="true" />
    </button>
  );
};

AccordionTrigger.displayName = "AccordionTrigger";

// --- AccordionContent ---

export type AccordionContentProps = ComponentProps<"div"> & {
  /** Content shown when the item is expanded */
  children?: ReactNode;
};

export const AccordionContent = (props: AccordionContentProps) => {
  const { children, className, ...rest } = props;

  const { openValues } = useAccordionContext();
  const { value, triggerId, contentId } = useAccordionItemContext();

  const isOpen = openValues.has(value);

  const { contentWrapper, contentInner, content } = accordionVariants({
    open: isOpen,
  });

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      hidden={undefined}
      className={contentWrapper()}
    >
      <div className={contentInner()}>
        <div className={twMerge(content(), className)} {...rest}>
          {children}
        </div>
      </div>
    </div>
  );
};

AccordionContent.displayName = "AccordionContent";
