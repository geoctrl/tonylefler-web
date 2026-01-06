import { useMemo } from "react";
import { useLocation } from "react-router";

export type BreadcrumbItem = {
  /**
   * Display label for the breadcrumb
   */
  label: string;
  /**
   * URL path for the breadcrumb
   */
  path: string;
  /**
   * Whether this is the current page
   */
  isCurrent: boolean;
};

export type BreadcrumbRouteConfig = {
  /**
   * URL path pattern (e.g., "/products", "/products/:id")
   */
  path: string;
  /**
   * Display label or function to generate label from params
   */
  label: string | ((params: Record<string, string>) => string);
  /**
   * Optional parent path for nested routes
   */
  parent?: string;
};

type UseBreadcrumbsOptions = {
  /**
   * Optional route configuration for custom labels
   */
  routes?: BreadcrumbRouteConfig[];
  /**
   * Home breadcrumb configuration
   * @default { label: "Home", path: "/" }
   */
  home?: { label: string; path: string } | false;
  /**
   * Transform function to format path segments into labels
   * @default (segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
   */
  formatLabel?: (segment: string) => string;
};

const defaultFormatLabel = (segment: string): string => {
  // Convert "products" -> "Products", "my-account" -> "My Account"
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Hook to automatically generate breadcrumbs from the current route
 *
 * @example
 * // Basic usage - auto-generates from path
 * const breadcrumbs = useBreadcrumbs();
 *
 * @example
 * // With custom route labels
 * const breadcrumbs = useBreadcrumbs({
 *   routes: [
 *     { path: "/products", label: "All Products" },
 *     { path: "/products/:id", label: (params) => `Product ${params.id}` },
 *   ]
 * });
 *
 * @example
 * // Disable home breadcrumb
 * const breadcrumbs = useBreadcrumbs({ home: false });
 */
export function useBreadcrumbs(
  options: UseBreadcrumbsOptions = {},
): BreadcrumbItem[] {
  const location = useLocation();
  const {
    routes = [],
    home = { label: "Home", path: "/" },
    formatLabel = defaultFormatLabel,
  } = options;

  return useMemo(() => {
    const pathname = location.pathname;

    // Handle home page
    if (pathname === "/") {
      return home ? [{ ...home, isCurrent: true }] : [];
    }

    const breadcrumbs: BreadcrumbItem[] = [];

    // Add home breadcrumb if enabled
    if (home) {
      breadcrumbs.push({ ...home, isCurrent: false });
    }

    // Split path into segments
    const segments = pathname.split("/").filter(Boolean);

    // Build breadcrumbs for each segment
    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Check if we have a custom route config for this path
      const routeConfig = routes.find((route) => {
        // Simple exact match or pattern match
        if (route.path === currentPath) return true;

        // Check for dynamic segments (e.g., /products/:id)
        const routeParts = route.path.split("/").filter(Boolean);
        const currentParts = currentPath.split("/").filter(Boolean);

        if (routeParts.length !== currentParts.length) return false;

        return routeParts.every((part, i) => {
          return part.startsWith(":") || part === currentParts[i];
        });
      });

      let label: string;
      if (routeConfig) {
        // Use custom label from config
        if (typeof routeConfig.label === "function") {
          // Extract params from dynamic segments
          const params: Record<string, string> = {};
          const routeParts = routeConfig.path.split("/").filter(Boolean);
          const currentParts = currentPath.split("/").filter(Boolean);

          routeParts.forEach((part, i) => {
            if (part.startsWith(":")) {
              params[part.slice(1)] = currentParts[i];
            }
          });

          label = routeConfig.label(params);
        } else {
          label = routeConfig.label;
        }
      } else {
        // Auto-generate label from segment
        label = formatLabel(segment);
      }

      breadcrumbs.push({
        label,
        path: currentPath,
        isCurrent: isLast,
      });
    });

    return breadcrumbs;
  }, [location.pathname, routes, home, formatLabel]);
}
