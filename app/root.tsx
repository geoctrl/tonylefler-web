import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import appStyles from "./styles/app.css?url";
import favicon from "./assets/favicon.png";
import { ScrollToTop } from "./utils/scroll-top-top";
import { ModalEntry } from "~/common/modal/modal-entry";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: appStyles },
  { rel: "icon", href: favicon, type: "image/png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
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
        <ScrollToTop />
        {children}
        <ModalEntry />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
