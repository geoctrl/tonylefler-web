export interface StoryMeta {
  title: string;
  category: "setup" | "theming" | "components";
  order?: number;
}

export interface Story {
  meta: StoryMeta;
  filePath: string;
  routePath: string;
  slug: string;
}

export interface StoryManifest {
  stories: Story[];
  categories: {
    [category: string]: Story[];
  };
}
