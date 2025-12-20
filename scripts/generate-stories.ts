import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as docgen from "react-docgen-typescript";
import { compile } from "@mdx-js/mdx";
import * as acorn from "acorn";
import { visit } from "estree-util-visit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure the docgen parser
const parser = docgen.withDefaultConfig({
  shouldExtractLiteralValuesFromEnum: true,
  propFilter: (prop) => {
    if (prop.parent) {
      return !prop.parent.fileName.includes("node_modules");
    }
    return true;
  },
});

interface StoryMeta {
  title: string;
  category: string;
  order?: number;
}

interface Story {
  meta: StoryMeta;
  filePath: string;
  routePath: string;
  slug: string;
}

interface StoryManifest {
  stories: Story[];
  categories: {
    [category: string]: Story[];
  };
}

// Find all .story.mdx files in app/common
function findStoryFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(currentDir, item.name);

      if (item.isDirectory()) {
        walk(fullPath);
      } else if (item.isFile() && item.name.endsWith(".story.mdx")) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

// Helper to evaluate AST nodes to actual values
function evalNode(node: any): any {
  if (!node) return null;

  switch (node.type) {
    case "Literal":
      return node.value;
    case "Identifier":
      return node.name;
    case "ObjectExpression":
      return evalObjectExpression(node);
    case "ArrayExpression":
      return node.elements.map(evalNode);
    default:
      return null;
  }
}

// Convert AST ObjectExpression to actual object
function evalObjectExpression(node: any): any {
  const obj: any = {};

  for (const prop of node.properties) {
    if (prop.type === "Property") {
      const key = prop.key.name || prop.key.value;
      obj[key] = evalNode(prop.value);
    }
  }

  return obj;
}

// Extract metadata from a story file using proper MDX compilation
async function extractMeta(filePath: string): Promise<StoryMeta | null> {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // Compile MDX to JavaScript
    const compiled = await compile(content, {
      development: false,
    });

    // Parse the compiled JavaScript
    const ast = acorn.parse(String(compiled.value), {
      ecmaVersion: "latest",
      sourceType: "module",
    }) as any;

    // Find the meta export in the AST
    let metaValue: StoryMeta | null = null;

    visit(ast, (node: any) => {
      // Look for: export const meta = { ... }
      if (
        node.type === "ExportNamedDeclaration" &&
        node.declaration?.type === "VariableDeclaration"
      ) {
        const declaration = node.declaration.declarations[0];

        if (declaration?.id?.name === "meta" && declaration.init) {
          metaValue = evalObjectExpression(declaration.init);
        }
      }
    });

    if (!metaValue) {
      console.warn(`  ⚠️  No metadata found in ${filePath}`);
      return null;
    }

    return metaValue;
  } catch (error) {
    console.error(`  ❌ Failed to extract metadata from ${filePath}:`, error);
    return null;
  }
}

// Generate a route path and slug from a file path
function generatePaths(filePath: string, commonDir: string) {
  const relativePath = path.relative(commonDir, filePath);
  const parts = relativePath.split(path.sep);

  // Remove filename and .story.mdx extension
  const componentName = parts[0]; // e.g., "button"
  const slug = componentName.toLowerCase();

  return {
    routePath: `routes/${slug}/index.tsx`,
    slug,
  };
}

// Generate dynamic-routes.ts content for auto-generated routes
function generateDynamicRoutesFile(stories: Story[]): string {
  const routeEntries = stories
    .map((story) => {
      const category = story.meta.category;
      return `  route("${story.slug}", "__auto-generated/${story.slug}.tsx"), // ${category}`;
    })
    .join("\n");

  return `// Auto-generated story routes - DO NOT EDIT MANUALLY
// Run 'yarn generate-stories' to regenerate this file

import { route } from "@react-router/dev/routes";

export const storyRoutes = [
${routeEntries}
];
`;
}

// Generate an individual route file for a story
function generateRouteFile(story: Story): string {
  return `import StoryContent from "../common/${story.slug}/${story.slug}.story.mdx";
import { PageOutline } from "../components/page-outline";

export default function ${story.meta.title.replace(/\s/g, "")}Story() {
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
`;
}

// Extract @docType from JSDoc description
function extractDocType(description: string): string | null {
  const docTypeMatch = description.match(/@docType\s+(.+?)(?:\n|$)/);
  return docTypeMatch ? docTypeMatch[1].trim() : null;
}

// Extract prop documentation for a component
function extractPropDocs(componentPath: string, componentName: string) {
  try {
    const docs = parser.parse(componentPath);
    console.log(docs);

    // Find the component props (look for {ComponentName}Props)
    const propsTypeName = `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}Props`;
    const componentDoc = docs.find(
      (doc) =>
        doc.displayName === propsTypeName || Object.keys(doc.props).length > 0,
    );

    if (!componentDoc) {
      console.warn(`  ⚠️  No prop documentation found for ${componentName}`);
      return null;
    }

    // Process props to extract @docType
    const processedProps: any = {};
    for (const [propName, propInfo] of Object.entries(componentDoc.props)) {
      const prop = propInfo as any;

      // Extract @docType from description if present
      const docType = extractDocType(prop.description);

      processedProps[propName] = {
        ...prop,
        // Add docType field if found, and clean it from description
        ...(docType && {
          docType,
          description: prop.description
            .replace(/@docType\s+.+?(\n|$)/, "")
            .trim(),
        }),
      };
    }

    return processedProps;
  } catch (error) {
    console.error(`  ❌ Error extracting props for ${componentName}:`, error);
    return null;
  }
}

// Main execution
async function main() {
  const projectRoot = path.join(__dirname, "..");
  const commonDir = path.join(projectRoot, "app", "common");

  console.log("🔍 Scanning for story files...");
  const storyFiles = findStoryFiles(commonDir);
  console.log(`Found ${storyFiles.length} story files`);

  const stories: Story[] = [];

  console.log("\n📖 Extracting story metadata...");
  for (const filePath of storyFiles) {
    const meta = await extractMeta(filePath);
    if (!meta) continue;

    const { routePath, slug } = generatePaths(filePath, commonDir);

    stories.push({
      meta,
      filePath: path.relative(projectRoot, filePath),
      routePath,
      slug,
    });

    console.log(`  ✓ ${slug}: ${meta.title} (${meta.category})`);
  }

  // Sort stories: by category, then alphabetically within category
  stories.sort((a, b) => {
    if (a.meta.category !== b.meta.category) {
      return a.meta.category.localeCompare(b.meta.category);
    }
    if (a.meta.order !== undefined && b.meta.order !== undefined) {
      return a.meta.order - b.meta.order;
    }
    return a.meta.title.localeCompare(b.meta.title);
  });

  // Group by category
  const categories: { [key: string]: Story[] } = {};
  for (const story of stories) {
    if (!categories[story.meta.category]) {
      categories[story.meta.category] = [];
    }
    categories[story.meta.category].push(story);
  }

  // Generate manifest
  const manifest: StoryManifest = {
    stories,
    categories,
  };

  console.log("\n📝 Generating story manifest...");
  fs.writeFileSync(
    path.join(projectRoot, "app", "__auto-generated", "story-manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  console.log("🛤️  Generating routes...");

  // Create __auto-generated directory
  const autoGenDir = path.join(projectRoot, "app", "__auto-generated");
  fs.mkdirSync(autoGenDir, { recursive: true });

  // Generate individual route files and prop documentation
  for (const story of stories) {
    const routeContent = generateRouteFile(story);
    fs.writeFileSync(path.join(autoGenDir, `${story.slug}.tsx`), routeContent);

    // Extract and save prop documentation
    const componentPath = path.join(commonDir, story.slug, `${story.slug}.tsx`);
    if (fs.existsSync(componentPath)) {
      const propDocs = extractPropDocs(componentPath, story.slug);
      if (propDocs) {
        fs.writeFileSync(
          path.join(autoGenDir, `${story.slug}.props.json`),
          JSON.stringify(propDocs, null, 2),
        );
        console.log(`  📋 Generated prop docs for ${story.slug}`);
      }
    }
  }

  // Generate dynamic-routes.ts
  const dynamicRoutesContent = generateDynamicRoutesFile(stories);
  fs.writeFileSync(
    path.join(autoGenDir, "dynamic-routes.ts"),
    dynamicRoutesContent,
  );

  console.log("\n✅ Story generation complete!");
  console.log(`   - ${stories.length} stories`);
  console.log(`   - ${Object.keys(categories).length} categories`);
  console.log(`   - Generated files: app/__auto-generated/`);
}

main().catch(console.error);
