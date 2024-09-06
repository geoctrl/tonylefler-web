import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import appStyles from "~/styles/globals.scss?url";
import favicon from "~/assets/favicon.png";
import { DivModalBlur, OverlayEntry } from "~/services/overlay-service";
import { GlobalSvg } from "~/components/global-svg";

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
        <GlobalSvg />
        <DivModalBlur>
          <Outlet />
        </DivModalBlur>
        <OverlayEntry />
        <Scripts />
      </body>
    </html>
  );
}
