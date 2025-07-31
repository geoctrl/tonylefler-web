import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import appStyles from "./styles/app.css?url";
import favicon from "./assets/favicon.png";
import { DrawerEntry } from "./common/modal/drawer-entry";
import { ScrollToTop } from "./utils/scroll-top-top";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStyles },
  { rel: "icon", href: favicon, type: "image/png" },
];

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <GlobalSvg /> */}
        <ScrollToTop />
        <Outlet />
        <Scripts />
        <DrawerEntry />
      </body>
    </html>
  );
}
