import {
  ReactNode,
  HTMLAttributes,
  RefObject,
  useState,
  FocusEvent,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  offset,
  Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import { MenuContext } from "./floating-menu-context";
import { always } from "../../utils/classname-helpers";

export type FloatingMenuInnerProps = {
  nested?: boolean;
  placement?: Extract<Placement, "bottom-start" | "bottom-end" | "right-start">;
  children?: ReactNode;
  renderItem?: (props: any) => ReactNode;
  renderTrigger?: (refProps: any, opts: { isOpen: boolean }) => ReactNode;
  contextTrigger?: RefObject<HTMLElement>;
  ref?: React.Ref<HTMLButtonElement>;
};

export const FloatingMenuInner = (
  props: FloatingMenuInnerProps & HTMLAttributes<HTMLElement>
) => {
  const {
    children,
    renderTrigger,
    contextTrigger,
    renderItem,
    placement = "bottom-start",
    ref: forwardedRef,
    ...rest
  } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [hasFocusInside, setHasFocusInside] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const allowMouseUpCloseRef = useRef(false);
    const parent = useContext(MenuContext);

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const item = useListItem();

    const isNested = parentId != null;

    const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
      nodeId,
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: isNested ? `right-start` : (placement as Placement),
      middleware: [
        offset({ mainAxis: 4, alignmentAxis: isNested ? -8 : 0 }),
        flip(),
        shift(),
      ],
      whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
      enabled: isNested,
      delay: { open: 75 },
      handleClose: safePolygon({ blockPointerEvents: true }),
    });
    const click = useClick(context, {
      event: "mousedown",
      toggle: !isNested,
      ignoreMouse: isNested,
    });
    const role = useRole(context, { role: "menu" });
    const dismiss = useDismiss(context, {
      bubbles: {
        escapeKey: false, // Prevent escape key from bubbling to parent (modal)
      },
    });
    const listNavigation = useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      nested: isNested,
      onNavigate: setActiveIndex,
    });
    const typeahead = useTypeahead(context, {
      listRef: labelsRef,
      onMatch: isOpen ? setActiveIndex : undefined,
      activeIndex,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([hover, click, role, dismiss, listNavigation, typeahead]);

    // Event emitter allows you to communicate across tree components.
    // This effect closes all menus when an item gets clicked anywhere
    // in the tree.
    useEffect(() => {
      if (!tree) return;

      function handleTreeClick() {
        setIsOpen(false);
      }

      function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setIsOpen(false);
        }
      }

      tree.events.on("click", handleTreeClick);
      tree.events.on("menuopen", onSubMenuOpen);

      return () => {
        tree.events.off("click", handleTreeClick);
        tree.events.off("menuopen", onSubMenuOpen);
      };
    }, [tree, nodeId, parentId]);

    useEffect(() => {
      if (isOpen && tree) {
        tree.events.emit("menuopen", { parentId, nodeId });
      }
    }, [tree, isOpen, nodeId, parentId]);

    const mergedRefs = useMergeRefs([
      refs.setReference,
      item.ref,
      forwardedRef,
    ]);
    const referenceProps = {
      ref: mergedRefs,
      tabIndex: !isNested
        ? undefined
        : parent.activeIndex === item.index
          ? 0
          : -1,
      "data-open": isOpen ? "" : undefined,
      "data-nested": isNested ? "" : undefined,
      "data-focus-inside": hasFocusInside ? "" : undefined,
      ...getReferenceProps(
        parent.getItemProps({
          ...rest,
          onFocus(event: FocusEvent<HTMLButtonElement>) {
            rest.onFocus?.(event);
            setHasFocusInside(false);
            parent.setHasFocusInside(true);
          },
        }),
      ),
    };

    useEffect(() => {
      let timeout: number;

      function onContextMenu(e: MouseEvent) {
        e.preventDefault();
        refs.setPositionReference({
          getBoundingClientRect: () => ({
            width: 0,
            height: 0,
            x: e.clientX,
            y: e.clientY,
            top: e.clientY,
            right: e.clientX,
            bottom: e.clientY,
            left: e.clientX,
          }),
        });

        setIsOpen(true);
        clearTimeout(timeout);

        allowMouseUpCloseRef.current = false;
        timeout = window.setTimeout(() => {
          allowMouseUpCloseRef.current = true;
        }, 300);
      }

      function onMouseUp() {
        if (allowMouseUpCloseRef.current) {
          setIsOpen(false);
        }
      }

      const el = contextTrigger?.current;

      if (!renderTrigger && !!contextTrigger) {
        document.addEventListener("mouseup", onMouseUp);
        el?.addEventListener("contextmenu", onContextMenu);
      }
      return () => {
        if (!renderTrigger && !!contextTrigger) {
          document.removeEventListener("mouseup", onMouseUp);
          clearTimeout(timeout);
          el?.removeEventListener("contextmenu", onContextMenu);
        }
      };
    }, [contextTrigger, refs, renderTrigger]);

    return (
      <FloatingNode id={nodeId}>
        {renderTrigger?.(referenceProps, { isOpen }) ||
          renderItem?.({
            ...referenceProps,
            isSubMenu: true,
            tabIndex: !isNested
              ? undefined
              : parent.activeIndex === item.index
                ? 0
                : -1,
            refs: mergedRefs,
          })}
        <MenuContext.Provider
          value={{
            activeIndex,
            setActiveIndex,
            getItemProps,
            setHasFocusInside,
            isOpen,
          }}
        >
          <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
            {isOpen && (
              <FloatingPortal>
                <FloatingFocusManager
                  context={context}
                  modal={false}
                  initialFocus={isNested ? -1 : 0}
                  returnFocus={!isNested}
                >
                  <div
                    ref={refs.setFloating}
                    className={always(
                      "bg-grey-10 z-50 flex flex-col overflow-hidden rounded-md py-2 shadow-lg outline-0",
                      "dark:bg-grey-800 shadow-xl",
                      "border-grey-900 border",
                    )}
                    style={floatingStyles}
                    {...getFloatingProps()}
                  >
                    {children}
                  </div>
                </FloatingFocusManager>
              </FloatingPortal>
            )}
          </FloatingList>
        </MenuContext.Provider>
      </FloatingNode>
    );
};
