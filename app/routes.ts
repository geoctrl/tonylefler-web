import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";
import { storyRoutes } from "./__generated__/story-routes";

export default [
  index("routes/home.tsx"),

  layout("routes/root/layout.tsx", [
    route("components/button", "common/button/button-route.tsx"),
    route("components/icon", "common/icon/icon-route.tsx"),
    route("components/loader", "common/loader/loader-route.tsx"),
  ]),
] satisfies RouteConfig;
