export type FPUser = {
  id: string;
  name: string;
  tagline?: string;
  img?: string;
};

export type FPIngredient = {
  id: string;
  name: string;
  amount: number;
  unit: string;
};

export type FPInstruction = {
  text: string; // markdown
  imgUrl?: string;
};

export type FPCategory = {
  id: string;
  name: string;
};

export type FPRecipe = {
  id: string;
  sourceId?: string;
  author: FPUser;
  name: string;
  ingredients: FPIngredient[];
  summary?: string; // markdown
  instructions: FPInstruction[];
  categories?: FPCategory[];
  prepTime?: number; // minutes
  cookTime?: number; // minutes
  bakeTime?: number; // minutes
  restTime?: number; // minutes
};
