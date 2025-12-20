// AUTO-GENERATED. DO NOT EDIT.
import { useParams } from "react-router";
import { PageOutline } from "../components/page-outline";

import Story0 from "../common/icon/icon.story.mdx";
import Story1 from "../common/loader/loader.story.mdx";

const storyMap: Record<string, React.ComponentType> = {
  "icon": Story0,
  "loader": Story1,
};

export default function DynamicStoryRoute() {
  const { slug } = useParams();
  const StoryContent = storyMap[slug || ""];

  if (!StoryContent) {
    throw new Response("Not Found", { status: 404 });
  }

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
