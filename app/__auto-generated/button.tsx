import StoryContent from "../common/button/button.stori.mdx";
import { PageOutline } from "../components/page-outline";

export default function ButtonStory() {
  return (
    <div className="flex flex-1 gap-8 pt-[var(--app-header-height)]">
      <main className="min-w-0 flex-1">
        <div className="docs pt-8">
          <StoryContent />
        </div>
      </main>
      <aside className="hidden w-64 shrink-0 xl:block">
        <PageOutline />
      </aside>
    </div>
  );
}
