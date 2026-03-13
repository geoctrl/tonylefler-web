import { useState, useRef, KeyboardEvent, useEffect, ReactNode } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useInteractions,
  useRole,
  useClick,
  FloatingFocusManager,
  useListNavigation,
  FloatingPortal,
} from "@floating-ui/react";
import { Input } from "../input/input";
import { Icon } from "../icon/icon";
import { always, maybe } from "../../utils/classname-helpers";
import { FieldError } from "react-hook-form";
import { Badge } from "../badge/badge";

export type SelectOption = {
  id: string;
  text: string;
};

export type SelectProps = {
  data: SelectOption[];
  value?: SelectOption;
  onChange?: (option: SelectOption) => void;
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  fieldError?: FieldError;
  renderTrigger: (props: {
    refProps: any;
    opts: {
      isOpen: boolean;
      selectedOption?: SelectOption;
    };
  }) => ReactNode;
};

export function Select(props: SelectProps) {
  const {
    data,
    value,
    onChange,
    searchable = false,
    placeholder = "Search...",
    disabled = false,
    renderTrigger,
    fieldError,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  // Filter options based on search value
  const filteredData = searchable
    ? data.filter((option) =>
        option.text.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : data;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      if (!open) {
        setSearchValue("");
        setActiveIndex(null);
        // Return focus to trigger
        setTimeout(() => {
          triggerRef.current?.focus();
        }, 0);
      } else if (searchable) {
        // Focus search input when opened
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      }
    },
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    enabled: !disabled,
  });

  const dismiss = useDismiss(context, {
    outsidePressEvent: "mousedown",
  });

  const role = useRole(context, { role: "listbox" });

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: false,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation],
  );

  // Handle search input change
  const handleSearchChange = (val: string) => {
    setSearchValue(val);
    setActiveIndex(null); // Reset active index when searching
  };

  // Handle search input key down
  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredData.length > 0) {
        setActiveIndex(
          activeIndex === null
            ? 0
            : Math.min(activeIndex + 1, filteredData.length - 1),
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredData.length > 0) {
        setActiveIndex(
          activeIndex === null
            ? filteredData.length - 1
            : Math.max(activeIndex - 1, 0),
        );
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex !== null && filteredData[activeIndex]) {
        handleSelect(filteredData[activeIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
    // Arrow left/right are handled by default input behavior (cursor movement)
  };

  // Handle option selection
  const handleSelect = (option: SelectOption) => {
    onChange?.(option);
    setSearchValue(""); // Clear search on selection
    setIsOpen(false);
  };

  // Reset active index when filtered data changes
  useEffect(() => {
    setActiveIndex(null);
  }, [filteredData.length]);

  // Highlight search term in text
  const highlightText = (text: string, search: string) => {
    if (!search || !searchable) return text;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-primary-500/20 text-inherit">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  const refProps = {
    ...getReferenceProps({
      ref: (node: HTMLElement | null) => {
        refs.setReference(node);
        triggerRef.current = node;
      },
      disabled,
    }),
  };

  return (
    <>
      {renderTrigger({
        refProps,
        opts: {
          isOpen,
          selectedOption: value,
        },
      })}

      {!!fieldError && (
        <Badge size="sm" intent="danger">
          {fieldError.message}
        </Badge>
      )}

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={searchable ? 0 : refs.reference}
          >
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                minWidth: (refs.reference.current as HTMLElement)?.offsetWidth,
              }}
              className={always(
                "bg-grey-10 shadow-lg/30 z-50 flex flex-col overflow-hidden rounded-md py-2 outline-0",
                "dark:bg-grey-850",
                "max-h-60",
              )}
              {...getFloatingProps()}
            >
              {searchable && (
                <div className="px-2 pb-2">
                  <Input
                    ref={searchInputRef}
                    value={searchValue}
                    onValueChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    placeholder={placeholder}
                    formSize="sm"
                  />
                </div>
              )}

              <div className="overflow-y-auto">
                {filteredData.length === 0 ? (
                  <div className="text-grey-990 dark:text-grey-10 px-3 py-1 text-sm opacity-50">
                    No results found
                  </div>
                ) : (
                  filteredData.map((option, index) => (
                    <button
                      key={option.id}
                      ref={(node) => {
                        listRef.current[index] = node;
                      }}
                      type="button"
                      className={always(
                        "text-grey-990 dark:text-grey-10 flex min-h-10 w-full items-center justify-between px-3 py-1 text-left no-underline focus:outline-none",
                        maybe(
                          activeIndex === index,
                          "bg-grey-100 dark:bg-grey-800",
                        ),
                        maybe(value?.id === option.id, "font-medium"),
                      )}
                      onClick={() => handleSelect(option)}
                      {...getItemProps({
                        onClick() {
                          handleSelect(option);
                        },
                      })}
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <div>{highlightText(option.text, searchValue)}</div>
                        </div>
                      </div>
                      {value?.id === option.id && (
                        <Icon
                          name="check-small"
                          className="text-primary-500 size-4"
                        />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
