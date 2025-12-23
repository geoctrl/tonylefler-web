import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("routes/root/layout.tsx", [
    route("components/button", "common/button/button-route.tsx"),
    route(
      "components/floating-menu",
      "common/floating-menu/floating-menu-route.tsx",
    ),
    route("components/icon", "common/icon/icon-route.tsx"),
    route("components/input", "common/input/input-route.tsx"),
    route("components/input-field", "common/input/input-field-route.tsx"),
    route("components/loader", "common/loader/loader-route.tsx"),
    route("components/modal", "common/modal/modal-route.tsx"),
    route("components/textarea", "common/textarea/textarea-route.tsx"),
    route(
      "components/textarea-field",
      "common/textarea/textarea-field-route.tsx",
    ),
    route("components/toggle", "common/toggle/toggle-route.tsx"),
    route("components/tooltip", "common/tooltip/tooltip-route.tsx"),
  ]),
] satisfies RouteConfig;
