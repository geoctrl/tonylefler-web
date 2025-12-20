import { ReactNode } from "react";
import { PageOutline } from "./page-outline";

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex gap-8 flex-1 min-w-0 pt-[var(--app-header-height)]">
      <main className="flex-1 min-w-0">
        <div className="docs pt-8">{children}</div>
      </main>
      <aside className="hidden xl:block w-64 shrink-0">
        <PageOutline />
      </aside>
    </div>
  );
}
