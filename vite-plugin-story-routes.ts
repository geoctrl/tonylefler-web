import path from "path";
import fs from "fs";
import { Plugin, ViteDevServer } from "vite";
import { glob } from "glob";
import { compile } from "@mdx-js/mdx";
import * as acorn from "acorn";
import { visit } from "estree-util-visit";
import * as docgen from "react-docgen-typescript";
import crypto from "crypto";

interface StoryMeta {
  title: string;
  category: string;
  order?: number;
  routePath?: string;
  component?: string;
  propsType?: string;
  componentProps?: Record<string, any>;
}

interface StoryInfo {
  fileAbs: string;
  fileImportPath: string;
  routePath: string;
  meta: StoryMeta;
  hash: string;
  props?: Record<string, any>;
}

export interface StoryPluginOptions {
  storiesGlob?: string;
  root?: string;
}

// Helper to evaluate literal-only AST nodes
function evalLiteralOnly(node: any): any {
  if (!node) return null;

  switch (node.type) {
    case "Literal":
      return node.value;
    case "ObjectExpression":
      return evalObjectExpression(node);
    case "ArrayExpression":
      return node.elements.map(evalLiteralOnly);
    case "UnaryExpression":
      if (node.operator === "-") {
        return -evalLiteralOnly(node.argument);
      }
      return null;
    default:
      return null;
  }
}

function evalObjectExpression(node: any): any {
  const obj: any = {};
  for (const prop of node.properties) {
    if (prop.type === "Property") {
      const key = prop.key.name || prop.key.value;
      obj[key] = evalLiteralOnly(prop.value);
    }
  }
  return obj;
}

// Extract meta from MDX file
async function extractMetaFromMdx(
  source: string,
  fileAbs: string,
  lastKnownMeta?: StoryMeta,
): Promise<StoryMeta | null> {
  try {
    const compiled = await compile(source, { development: false });
    const ast = acorn.parse(String(compiled.value), {
      ecmaVersion: "latest",
      sourceType: "module",
    }) as any;

    let metaValue: StoryMeta | null = null;

    visit(ast, (node: any) => {
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

    return metaValue;
  } catch (error) {
    console.error(`Failed to extract meta from ${fileAbs}:`, error);
    // Return last-known-good meta if available
    if (lastKnownMeta) {
      console.warn(
        `  Using last-known-good meta for ${path.basename(fileAbs)}`,
      );
      return lastKnownMeta;
    }
    return null;
  }
}

// Extract props using react-docgen-typescript
function extractProps(
  componentPath: string,
  propsType?: string,
): Record<string, any> | null {
  try {
    const parser = docgen.withDefaultConfig({
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes("node_modules");
        }
        return true;
      },
    });

    const docs = parser.parse(componentPath);

    // Find component with props
    const componentDoc = docs.find((doc) => Object.keys(doc.props).length > 0);

    if (!componentDoc) {
      return null;
    }

    // Process props to extract @docType
    const processedProps: any = {};
    for (const [propName, propInfo] of Object.entries(componentDoc.props)) {
      const prop = propInfo as any;

      // Extract @docType from description
      const docTypeMatch = prop.description?.match(/@docType\s+(.+?)(?:\n|$)/);
      const docType = docTypeMatch ? docTypeMatch[1].trim() : null;

      processedProps[propName] = {
        ...prop,
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
    console.error(`Error extracting props from ${componentPath}:`, error);
    return null;
  }
}

// Generate route path from file path
function generateRoutePath(filePath: string, commonDir: string): string {
  const relativePath = path.relative(commonDir, filePath);
  const parts = relativePath.split(path.sep);
  return `/${parts[0].toLowerCase()}`;
}

// Generate stable hash for file content
function hashContent(content: string): string {
  return crypto.createHash("sha1").update(content).digest("hex");
}

// Normalize Windows paths to Unix paths
function normalizePath(p: string): string {
  return p.replace(/\\/g, "/");
}

// Module-level flag to prevent duplicate initialization across plugin instances
let globalInitialized = false;

export function storyRoutesPlugin(options: StoryPluginOptions = {}): Plugin {
  const {
    storiesGlob = "app/common/**/*.story.{mdx,tsx,ts,jsx,js}",
    root = process.cwd(),
  } = options;

  const stories = new Map<string, StoryInfo>();
  const commonDir = path.join(root, "app/common");
  const generatedDir = path.join(root, "app/__generated__");
  let server: ViteDevServer | null = null;
  let initialized = false;

  // Build story index
  async function buildStoryIndex() {
    if (initialized || globalInitialized) return;
    initialized = true;
    globalInitialized = true;

    // Check if files were already generated (handles React Router's double instantiation)
    const routesFile = path.join(generatedDir, "story-routes.ts");
    const alreadyGenerated = fs.existsSync(routesFile);

    const storyFiles = glob.sync(storiesGlob, { cwd: root, absolute: true });

    for (const fileAbs of storyFiles) {
      await updateStory(fileAbs, false); // Don't log during initial build
    }

    // Write both generated files
    writeGeneratedFiles();

    // Only log if this is the first generation
    if (!alreadyGenerated) {
      console.log(
        `✓ Generated ${stories.size} story route${stories.size === 1 ? "" : "s"}`,
      );
    }
  }

  // Update single story
  async function updateStory(fileAbs: string, log = true) {
    try {
      const content = fs.readFileSync(fileAbs, "utf-8");
      const hash = hashContent(content);

      // Check if unchanged
      const existing = stories.get(fileAbs);
      if (existing && existing.hash === hash) {
        return;
      }

      // Extract meta (with last-known-good fallback)
      const meta = await extractMetaFromMdx(content, fileAbs, existing?.meta);
      if (!meta) {
        console.warn(`⚠️  No metadata found in ${fileAbs}`);
        return;
      }

      // Generate route path
      const routePath = meta.routePath || generateRoutePath(fileAbs, commonDir);
      const fileImportPath = `/@fs/${normalizePath(fileAbs)}`;

      // Extract props if component specified
      let props: Record<string, any> | null = null;
      if (meta.component) {
        const componentPath = path.resolve(
          path.dirname(fileAbs),
          meta.component,
        );
        if (fs.existsSync(componentPath)) {
          props = extractProps(componentPath, meta.propsType);
        }
      }

      // If meta.componentProps is specified (literal in meta), use that
      if (meta.componentProps) {
        props = meta.componentProps;
      }

      stories.set(fileAbs, {
        fileAbs,
        fileImportPath,
        routePath,
        meta,
        hash,
        props: props || undefined,
      });

      if (log) {
        console.log(`✓ ${routePath}: ${meta.title} (${meta.category})`);
      }
    } catch (error) {
      console.error(`Failed to process story ${fileAbs}:`, error);
    }
  }

  // Remove story
  function removeStory(fileAbs: string) {
    stories.delete(fileAbs);
  }

  // Generate single dynamic route file
  function generateDynamicRouteFile(): string {
    const sortedStories = Array.from(stories.values()).sort((a, b) => {
      return a.routePath.localeCompare(b.routePath);
    });

    const generatedFilePath = path.join(generatedDir, "story-route.tsx");

    // Generate imports with relative paths
    const imports = sortedStories
      .map((story, index) => {
        const relativePath = path.relative(
          path.dirname(generatedFilePath),
          story.fileAbs,
        );
        const importPath = normalizePath(
          relativePath.startsWith(".") ? relativePath : `./${relativePath}`,
        );
        return `import Story${index} from "${importPath}";`;
      })
      .join("\n");

    // Generate story map
    const mapEntries = sortedStories
      .map((story, index) => {
        const slug = story.routePath.replace(/^\//, "");
        return `  "${slug}": Story${index},`;
      })
      .join("\n");

    // Relative path to PageOutline
    const pageOutlineAbs = path.join(root, "app/components/page-outline");
    const pageOutlineRelative = path.relative(
      path.dirname(generatedFilePath),
      pageOutlineAbs,
    );
    const pageOutlineImport = normalizePath(
      pageOutlineRelative.startsWith(".")
        ? pageOutlineRelative
        : `./${pageOutlineRelative}`,
    );

    return `// AUTO-GENERATED. DO NOT EDIT.
import { useParams } from "react-router";
import { PageOutline } from "${pageOutlineImport}";

${imports}

const storyMap: Record<string, React.ComponentType> = {
${mapEntries}
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
`;
  }

  // Generate routes module
  function generateRoutesModule(): string {
    return `// AUTO-GENERATED. DO NOT EDIT.
import { route } from "@react-router/dev/routes";

export const storyRoutes = [
  route(":slug", "__generated__/story-route.tsx"),
];
`;
  }

  // Generate props module
  function generatePropsModule(): string {
    const propsByRoute: Record<string, any> = {};

    for (const story of stories.values()) {
      propsByRoute[story.routePath] = {
        file: story.fileImportPath,
        meta: story.meta,
        componentProps: story.props ?? null,
      };
    }

    return `// AUTO-GENERATED. DO NOT EDIT.

export const storyPropsByRoute = ${JSON.stringify(propsByRoute, null, 2)} as const;
`;
  }

  // Write file atomically (only if changed)
  function writeFileIfChanged(filePath: string, content: string) {
    let existingContent = "";
    if (fs.existsSync(filePath)) {
      existingContent = fs.readFileSync(filePath, "utf-8");
    }

    // Skip write if unchanged
    if (existingContent === content) {
      return;
    }

    // Atomic write: write to temp file, then rename
    const tempPath = `${filePath}.tmp`;
    fs.writeFileSync(tempPath, content, "utf-8");
    fs.renameSync(tempPath, filePath);
  }

  // Write all generated files
  function writeGeneratedFiles() {
    // Clear out the directory first to remove stale files
    if (fs.existsSync(generatedDir)) {
      fs.rmSync(generatedDir, { recursive: true, force: true });
    }

    // Recreate directory
    fs.mkdirSync(generatedDir, { recursive: true });

    // Write single dynamic route file
    const dynamicRouteContent = generateDynamicRouteFile();
    fs.writeFileSync(
      path.join(generatedDir, "story-route.tsx"),
      dynamicRouteContent,
      "utf-8",
    );

    // Write routes and props modules
    const routesContent = generateRoutesModule();
    const propsContent = generatePropsModule();

    fs.writeFileSync(
      path.join(generatedDir, "story-routes.ts"),
      routesContent,
      "utf-8",
    );
    fs.writeFileSync(
      path.join(generatedDir, "story-props.ts"),
      propsContent,
      "utf-8",
    );
  }

  let rebuildTimeout: NodeJS.Timeout | null = null;
  function scheduleRebuild() {
    if (rebuildTimeout) {
      clearTimeout(rebuildTimeout);
    }
    rebuildTimeout = setTimeout(() => {
      writeGeneratedFiles();
    }, 100);
  }

  return {
    name: "vite-plugin-story-routes",
    enforce: "pre",

    async config() {
      // Initialize stories early during config phase for React Router
      await buildStoryIndex();
    },

    async configureServer(devServer) {
      server = devServer;

      // Watch story files
      const storyFiles = glob.sync(storiesGlob, { cwd: root, absolute: true });
      storyFiles.forEach((file) => {
        devServer.watcher.add(file);
      });

      // Handle file changes
      devServer.watcher.on("change", async (file) => {
        // Ignore changes in __generated__ directory
        if (file.includes("__generated__")) {
          return;
        }

        if (file.endsWith(".story.mdx") && stories.has(file)) {
          console.log(`\n📝 Story changed: ${path.basename(file)}`);
          await updateStory(file);
          scheduleRebuild();
        }
      });

      devServer.watcher.on("add", async (file) => {
        // Ignore additions in __generated__ directory
        if (file.includes("__generated__")) {
          return;
        }

        if (file.endsWith(".story.mdx") || file.endsWith(".story.tsx")) {
          console.log(`\n✨ New story added: ${path.basename(file)}`);
          await updateStory(file);
          scheduleRebuild();
        }
      });

      devServer.watcher.on("unlink", (file) => {
        // Ignore deletions in __generated__ directory
        if (file.includes("__generated__")) {
          return;
        }

        if (
          (file.endsWith(".story.mdx") || file.endsWith(".story.tsx")) &&
          stories.has(file)
        ) {
          console.log(`\n🗑️  Story removed: ${path.basename(file)}`);
          removeStory(file);
          scheduleRebuild();
        }
      });
    },
  };
}
