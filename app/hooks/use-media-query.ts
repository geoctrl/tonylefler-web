import { useState, useEffect } from "react";
import {
  mediaQueryObservable,
  getValue,
  ScreenSize,
} from "../utils/media-query";
import { Subscription } from "rxjs";

export function useMediaQuery(
  ...sizes: ScreenSize[]
): Partial<Record<ScreenSize, boolean>> {
  const [matches, setMatches] = useState<Partial<Record<ScreenSize, boolean>>>(
    () => {
      return sizes.reduce(
        (acc, size) => {
          acc[size] = getValue()[size];
          return acc;
        },
        {} as Partial<Record<ScreenSize, boolean>>,
      );
    },
  );

  useEffect(() => {
    const subscription: Subscription = mediaQueryObservable.subscribe(
      (newState) => {
        const hasChanged = sizes.some(
          (size) => matches[size] !== newState[size],
        );
        if (!hasChanged) return;

        setMatches(
          sizes.reduce(
            (acc, size) => {
              acc[size] = newState[size];
              return acc;
            },
            {} as Partial<Record<ScreenSize, boolean>>,
          ),
        );
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [Object.keys(sizes)]);

  return matches;
}
