import { BehaviorSubject } from "rxjs";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { isServer } from "~/utils/is-client";

const fullConfig = resolveConfig(tailwindConfig);
const screenSizes = fullConfig.theme.screens as Record<string, string>;
export type ScreenSize = keyof typeof screenSizes;
type MediaQueryState = Record<ScreenSize, boolean>;

const serverScreenSizes = {
  sm: true,
  md: true,
  lg: true,
  xl: false,
  "2xl": false,
};

const initializeMediaQueryState = (): MediaQueryState => {
  if (isServer()) return serverScreenSizes;
  const queries = Object.keys(screenSizes).map((size) => ({
    size: size as ScreenSize,
    query: `(min-width: ${screenSizes[size as ScreenSize]})`,
  }));

  return queries.reduce((acc, { size, query }) => {
    acc[size] = window.matchMedia(query).matches;
    return acc;
  }, {} as MediaQueryState);
};

const mediaQueryState = initializeMediaQueryState();
const mediaQuerySubject = new BehaviorSubject<MediaQueryState>(mediaQueryState);

const handleChange = () => {
  if (isServer()) return;
  const queries = Object.keys(screenSizes).map((size) => ({
    size: size as ScreenSize,
    query: `(min-width: ${screenSizes[size as ScreenSize]})`,
  }));

  const newState = queries.reduce((acc, { size, query }) => {
    acc[size] = window.matchMedia(query).matches;
    return acc;
  }, {} as MediaQueryState);

  mediaQuerySubject.next(newState);
};

const queries = Object.keys(screenSizes).map(
  (size) => `(min-width: ${screenSizes[size as ScreenSize]})`,
);
queries.forEach((query) => {
  if (isServer()) return;
  const mql = window.matchMedia(query);
  mql.addEventListener("change", handleChange);
});

const mediaQueryObservable = mediaQuerySubject.asObservable();
const getValue = () => mediaQuerySubject.getValue();

export { mediaQueryObservable, screenSizes, getValue };
