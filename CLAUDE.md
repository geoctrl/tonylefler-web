# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with React Router v7 that serves dual purposes:
1. Personal homepage at `/`
2. Documentation site for **root-ui** (personal component library) at `/root/*`

## Development Commands

```bash
# Development
yarn dev              # Start dev server on http://localhost:3000 (react-router dev)

# Building & Type Checking
yarn build            # Build for production (react-router build)
yarn start            # Start production server (react-router-serve)
yarn typecheck        # Generate types and run TypeScript checks (react-router typegen && tsc)

# Testing
yarn test             # Run all tests
yarn test:watch       # Run tests in watch mode
```

## Architecture

### Root-UI Component Library

The `app/common` directory contains the **root-ui** component library. Components are imported using the `root` alias:

```typescript
import { Button, Input, Badge } from "root";
```

**Import Alias Configuration:**
- Vite: `vite.config.ts` aliases `root` to `app/common`
- TypeScript: `tsconfig.json` paths map `root` to `./app/common`

### Route Structure

Routes are explicitly defined in `app/routes.ts` using React Router v7's routing API:

```typescript
import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  layout("routes/root/route.tsx", [
    index("routes/root._index/route.tsx"),
    route("button", "routes/root.button/route.tsx"),
    // ... more routes
  ]),
] satisfies RouteConfig;
```

**Route Organization:**
- **`/`**: Personal homepage (`routes/_index.tsx`)
- **`/root/*`**: Layout route for root-ui documentation (`routes/root/route.tsx`)
  - Each component gets a child route (e.g., `/root/button`, `/root/input`)
  - Documentation written in MDX files co-located with route files
  - Example: `app/routes/root.button/button-docs.mdx`

**Adding New Routes:**
1. Create the route file in `app/routes/`
2. Add it to `app/routes.ts` using `route()`, `index()`, or `layout()`
3. Routes are NOT auto-discovered - must be explicitly added to `routes.ts`

### Modal System Architecture

The modal system uses an **EventBus-based architecture** for imperative, promise-based modal management:

**Key Files:**
- `app/utils/event-bus.ts` - Generic EventBus class
- `app/common/modal/modal-service.ts` - ModalService singleton
- `app/hooks/use-modal.ts` - React hook for modal management
- `app/common/modal/drawer-entry.tsx` - Modal portal (mounted in root.tsx)

**Usage Pattern:**
```typescript
const openModal = useModal(MyModalComponent);
const result = await openModal({ someProp: "value" });
// Modal resolves when closed, returning optional result
```

The modal service maintains a stack and emits events (`modal_open`, `modal_close`, `modal_update`) that the drawer entry listens to.

### Styling System

**Tailwind CSS v4** with extensive custom color system:
- Grey scale: `grey-10` through `grey-990` (21 shades)
- Primary colors: `primary-10` through `primary-975`
- Similar scales for other semantic colors

**CSS Custom Properties:**
- All colors defined as CSS variables in `app/styles/app.css`
- Custom fonts: Inter (sans), Hack (mono)
- App layout variables: `--app-header-height`, `--app-menu-width`

**Scoped Styles:**
- Uses **Kremling** for component-scoped CSS when needed
- Tailwind for most styling

### Server Architecture

- **React Router v7** provides built-in server using `@react-router/serve`
- Development: `react-router dev` starts Vite dev server with HMR
- Production: `react-router-serve ./build/server/index.js` runs the production server
- Server configuration in `react-router.config.ts` (SSR: true)

### Story System (Auto-Generated Routes)

Component documentation uses `*.story.mdx` files that are **automatically discovered** and converted into routes.

**How it works:**
1. Create a `component.story.mdx` file next to your component in `app/common/`
2. Restart the dev server
3. Routes are auto-generated to `app/__auto-generated/dynamic-routes.ts`
4. Story appears at `/root/component-name`

**File structure:**
```
app/common/button/
  ├── button.tsx          # Component
  └── button.story.mdx    # Story (auto-generates route at /root/button)
```

**Important:**
- **DO NOT** manually edit `app/routes.ts` or create route files for stories
- **DO NOT** manually edit `app/__auto-generated/dynamic-routes.ts`
- Just create the `*.story.mdx` file and restart the dev server
- The story discovery and route generation is fully automatic

**Rehype Plugins** (configured in `vite.config.ts`):
- `rehype-slug` - Add IDs to headings
- `rehype-lead` - Custom plugin for lead paragraphs
- Custom Shiki plugin for syntax highlighting

## Key Utilities & Hooks

### Custom Hooks
- **`use-modal.ts`**: Hook for opening modals imperatively
- **`use-media-query.ts`**: Responsive breakpoint hook
- **`use-theme.ts`**: Theme management
- **`use-effect-once.ts`**: Run effect only once

### Utilities
- **`event-bus.ts`**: Pub/sub pattern for decoupled communication
- **`classname-helpers.ts`**: Utility for conditional classnames
- **`create-client-portal.ts`**: Portal creation helper
- **`inline-switch.ts`**: Type-safe switch expression helper

## Component Library Patterns

### Icon System
- SVG icons in `icons/` directory
- Build script (`icons-build.js`) generates spritesheet
- Plugin (`vite-plugin-icons-spritesheet`) auto-generates TypeScript types in `app/types/icon-gen.ts`
- Icons referenced by name via `<Icon name="icon-name" />`

**When icons are requested:**
- Read `app/types/icon-gen.ts` to see all available icon names
- Icon naming is one-to-one with file names: `file-name.svg` → `iconOnly="file-name"`
- Use exact icon names from the `iconNames` array - do not make up icon names

### Form Components
- Use `formSize` prop (`"sm" | "md" | "lg"`) for consistent sizing
- Common pattern: size maps to both height and padding via `use-icon-form-size` hook

### Component Exports
All root-ui components exported from `app/common/index.tsx` for convenient imports.

## Component Documentation Standard

Root-ui components follow a consistent documentation pattern. Use the Button component as the reference implementation.

### Component Code Structure

**TypeScript & Props:**
- Use JSDoc comments with `@docType` for custom type displays (overrides TypeScript inference)
- Use `@default` to document default values
- Polymorphic components: Define separate type unions for each `as` variant, then combine
- Always use `React.forwardRef` for proper ref forwarding
- Extract intent/variant types as string literal unions

**Example:**
```typescript
/**
 * Size of the button
 * @docType "sm" | "md" | "lg"
 * @default "md"
 */
formSize?: FormSize;
```

**Styling:**
- Use `tailwind-variants` (tv) for component variants
- Extract variants to separate `*-variants.ts` file
- Define base styles, variant groups, and compound variants
- Include focus states with `ring-3` (simpler pattern without offsets)
- Standard pattern: `focus:ring-grey-990/20 focus:shadow-none focus:ring-3`

### Story File Structure (*.story.mdx)

**File Header:**
```tsx
import { ComponentName } from "./component-name";
import { PropsTable } from "../props-table/props-table";
import { Example, ApiSection, Do, Dont, DoDontGrid } from "../docs";
import componentProps from "../../__auto-generated/component-name.props.json";

export const meta = {
  title: 'ComponentName',
  category: 'components',
  order: 1
};
```

**Document Sections (in order):**

1. **Title & Description**
   ```markdown
   # ComponentName

   Brief one-sentence description of the component.
   ```

2. **Import Section**
   ```markdown
   ## Import

   \`\`\`tsx
   import { ComponentName } from "root";
   \`\`\`
   ```

3. **Basic Usage**
   ```markdown
   ## Basic Usage

   <Example>
     <ComponentName>Hello, World!</ComponentName>
   </Example>

   \`\`\`tsx
   <ComponentName>Hello, World!</ComponentName>
   \`\`\`
   ```

4. **Props Table**
   ```markdown
   ## Props

   `<ComponentName>` accepts all [HTML element attributes] and the following:

   <PropsTable props={componentProps} />
   ```

5. **Variant Sections** (if applicable)
   - Organize by visual hierarchy (most to least prominent for intents)
   - Each variant gets a subsection with:
     - Prop syntax as heading (e.g., `### intent="primary"`)
     - One-line description
     - **When to use:** guidance (bold)
     - **Example:** specific use case (bold)
     - `<Example>` component with visual demo
     - Code block showing usage

   **Example:**
   ```markdown
   ### `intent="primary"`
   The most prominent style. High contrast, draws immediate attention.

   - **When to use:** The single most important action on the page.
   - **Example:** Form submissions where the user completes a workflow.

   <Example>
     <div className="flex gap-2">
       <Button intent="primary">Save Changes</Button>
     </div>
   </Example>

   \`\`\`tsx
   <Button intent="primary">Save Changes</Button>
   \`\`\`
   ```

6. **Size Variants** (if applicable)
   ```markdown
   ## Form Size

   Basic scaling for form elements. Follows the `form-size` utility class convention.

   <Example>
     <div className="flex items-center gap-2">
       <ComponentName formSize="sm">Small</ComponentName>
       <ComponentName formSize="md">Medium</ComponentName>
       <ComponentName formSize="lg">Large</ComponentName>
     </div>
   </Example>
   ```

7. **Feature Sections** (icons, states, etc.)
   - Group related props together
   - Show realistic examples
   - Explain when/why to use each feature

8. **Polymorphic Rendering** (if applicable)
   - Document each `as` variant
   - Use `### as={Type}` or `### as="string"` format
   - Include "When to use" guidance
   - Show working examples with proper imports

**Documentation Principles:**
- **Show, don't tell**: Every feature should have a visual example
- **Provide context**: Explain when to use each variant/prop
- **Be concise**: One-line descriptions, clear bullet points
- **Use realistic examples**: Button text like "Save Changes" not "Click me"
- **Visual hierarchy matters**: Order intents/variants by prominence or usage frequency
- **Dark mode examples**: When relevant (like tertiaryReverse), show both light/dark with `bg-grey-900 dark:bg-grey-100`

**Auto-Generated Props:**
- Props are extracted via JSDoc comments
- Output to `app/__auto-generated/component-name.props.json`
- `PropsTable` component consumes this JSON for API documentation
- `@docType` overrides inferred types for cleaner display

## Type Generation

- **Route types**: React Router v7 auto-generates route-specific types
  - Run `yarn typecheck` to generate types (includes `react-router typegen`)
  - Import types via `import type { Route } from "./+types/root"`
  - Access route-specific types: `Route.LinksFunction`, `Route.LoaderArgs`, etc.
- **Icon types**: Auto-generated in `app/types/icon-gen.ts` from icon files
- **Build output types**: `vite-plugin-dts` generates `.d.ts` files

## Testing

- **Jest** with React Testing Library
- **Babel** for transpilation (see `babel.config.ts`)
- Test setup in `jest.setup.ts`
- Use `@testing-library/user-event` for interactions

## Project Dependencies

**Key Libraries:**
- `react-router` v7 - Full-stack React framework
- `@react-router/node` - Node.js adapter for React Router
- `@react-router/serve` - Production server for React Router
- `motion` - Animation library (Framer Motion alternative)
- `tailwind-variants` - Tailwind utility variants
- `@floating-ui/react` - Positioning library for dropdowns/tooltips
- `kremling` - CSS-in-JS scoped styles
- `rxjs` - Reactive programming utilities
- `ulid` - Unique ID generation

**Build Tools:**
- `@react-router/dev` - React Router v7 development tools and CLI
- Vite for bundling
- TypeScript for type checking
- Prettier with Tailwind plugin for formatting

## Project Structure Notes

- **No nested component directories**: Components in `app/common/` are mostly flat
- **Route co-location**: Keep route-specific components/docs with their routes
- **Types directory**: Shared types in `app/types/`
- **Assets**: Static assets in `app/assets/` and `public/`
