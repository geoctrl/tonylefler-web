import { useMemo, Ref, RefCallback, RefObject } from "react";

/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 * @source https://github.com/floating-ui/floating-ui/blob/master/packages/react/src/hooks/useMergeRefs
 */
export function useMergeRefs<Instance>(
  refs: Array<Ref<Instance> | undefined>,
): RefCallback<Instance> | null {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          (ref as RefObject<Instance | null>).current = value;
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
