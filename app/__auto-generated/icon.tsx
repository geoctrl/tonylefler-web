import StoryContent from "../common/icon/icon.story.mdx";
import { PageOutline } from "../components/page-outline";

export default function IconStory() {
  return (
    <div className="flex gap-8 flex-1 pt-[var(--app-header-height)]">
      <main className="flex-1 min-w-0">
        <div className="docs pt-8">
          <StoryContent />
        </div>
      </main>
      <aside className="hidden xl:block w-64 shrink-0">
        <PageOutline />
      </aside>
    </div>
  );
}
