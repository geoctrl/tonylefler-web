# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with React Router v7 serving dual purposes:
1. Personal homepage at `/`
2. Documentation site for **root-ui** component library at `/components/*`

## Development Commands

```bash
yarn dev        # Start dev server (http://localhost:3000)
yarn build      # Build for production
yarn typecheck  # Generate types and run TypeScript checks
yarn test       # Run tests
```

## Architecture

### Root-UI Component Library

Components live in `app/common/` and are imported via `root` alias:

```tsx
import { Button, Icon, FloatingMenu } from "root";
```

**Configuration:**
- Vite alias: `vite.config.ts` → `app/common`
- TypeScript paths: `tsconfig.json` → `./app/common`
- Exports: `app/common/index.tsx`

### Route Structure

Routes are **manually defined** in `app/routes.ts`:

```tsx
export default [
  index("routes/home.tsx"),
  layout("routes/root/layout.tsx", [
    route("components/button", "common/button/button-route.tsx"),
    route("components/icon", "common/icon/icon-route.tsx"),
  ]),
] satisfies RouteConfig;
```

**Important:** Routes are NOT auto-discovered. Must explicitly add to `app/routes.ts`.

### Styling

- **Tailwind CSS v4** with custom color scales
- Grey: `grey-10` through `grey-990` (21 shades)
- Custom properties in `app/styles/app.css`
- Use `tailwind-variants` for component variants
- Store variants in `*-variants.ts` files

### Icon System

**Critical workflow when using icons in examples:**

1. Check available icons: `app/types/icon-gen.ts` → `iconNames` array
2. Icon names match SVG filenames: `file-name.svg` → `name="file-name"`
3. **Never make up icon names** - always verify in `icon-gen.ts`

**System:**
- Source: `icons/` directory (SVG files)
- Build: `icons-build.js` generates spritesheet
- Types: Auto-generated in `app/types/icon-gen.ts`
- Usage: `<Icon name="star" />`

### Modal System

EventBus-based architecture for imperative modals:

```tsx
const openModal = useModal(MyModalComponent);
const result = await openModal({ someProp: "value" });
```

**Files:**
- `app/utils/event-bus.ts` - EventBus
- `app/hooks/use-modal.ts` - Hook
- `app/common/modal/modal-service.ts` - Service

## Adding a New Component to Documentation

When asked to document a component, follow this workflow:

### 1. Read the Component File

Before creating docs, read the component TypeScript file to extract:
- Props interface and JSDoc comments
- `@docType` and `@default` annotations
- Prop types, intents, sizes, variants
- Polymorphic rendering (`as` prop)
- Accessibility features (role, aria attributes)

### 2. Create Story File

**File:** `app/common/component-name/component-name.story.mdx`

**Required sections:**
```tsx
import { ComponentName } from "./component-name";
import { PropsTable } from "../props-table/props-table";
import { Example } from "../../components/docs";

export const meta = {
  title: 'Component Name',
  category: 'components',
  order: 5  // Alphabetical ordering
};

# Component Name

One-sentence component description.

## Import

\`\`\`tsx
import { ComponentName } from "root";
\`\`\`

## Basic Usage

<Example>
  <ComponentName>Hello World</ComponentName>
</Example>

\`\`\`tsx
<ComponentName>Hello World</ComponentName>
\`\`\`

## Props

`<ComponentName>` accepts all HTML element attributes and the following:

<PropsTable props={[
  {
    name: "variant",
    type: '"primary" | "secondary"',
    description: "Visual style variant",
    default: '"primary"',
    required: false,
  },
]} />

## [Variant/Feature Sections]

Document each prop with visual examples and usage guidance.

## Accessibility

Document keyboard navigation, ARIA roles, screen reader support if applicable.
```

**Props Table Format:**
- Extract from component's JSDoc comments
- Use inline array format
- Include: `name`, `type`, `description`, `default?`, `required`

**Icon Usage:**
- Always check `app/types/icon-gen.ts` for valid icon names
- Use realistic, semantic icon choices
- Never fabricate icon names

**Examples:**
- Show visual examples for every variant/prop
- Include "When to use" guidance
- Use realistic text ("Save Changes" not "Click me")
- Show dark mode variants when relevant

### 3. Create Route File

**File:** `app/common/component-name/component-name-route.tsx`

```tsx
import { DocsLayout } from "~/app/components/docs-layout";
import Story from "./component-name.story.mdx";

export default function () {
  return (
    <DocsLayout>
      <Story />
    </DocsLayout>
  );
}
```

### 4. Add Route

**File:** `app/routes.ts`

Add in alphabetical order:

```tsx
layout("routes/root/layout.tsx", [
  route("components/button", "common/button/button-route.tsx"),
  route("components/component-name", "common/component-name/component-name-route.tsx"),
  // ...
]),
```

### 5. Update Navigation

**File:** `app/components/app-nav/app-nav.tsx`

Add to `navCategories` in alphabetical order:

```tsx
const navCategories = [
  {
    key: "components",
    label: "Components",
    items: [
      { title: "Button", path: "/components/button" },
      { title: "Component Name", path: "/components/component-name" },
      // ...
    ],
  },
];
```

### 6. Verify Export

**File:** `app/common/index.tsx`

Ensure component is exported:

```tsx
export * from "./component-name/component-name";
```

### Verification

- [ ] Story displays at `/components/component-name`
- [ ] Component appears in side navigation
- [ ] Props table renders with all props
- [ ] All examples render correctly
- [ ] Icons are valid (from `app/types/icon-gen.ts`)
- [ ] Component imports: `import { ComponentName } from "root"`

## Component Code Patterns

**TypeScript:**
- Use JSDoc with `@docType` for clean prop docs
- Use `@default` to document defaults
- Use `React.forwardRef` for ref forwarding
- Polymorphic: Define type unions per `as` variant

**Styling:**
- Use `tailwind-variants` (tv) for variants
- Extract to `*-variants.ts` file
- Focus states: `focus:ring-grey-990/20 focus:shadow-none focus:ring-3`

**Form Components:**
- Use `formSize` prop: `"sm" | "md" | "lg"`
- Hook: `use-icon-form-size` for consistent sizing

## Type Generation

- **Routes**: Run `yarn typecheck` to generate route types
- **Icons**: Auto-generated in `app/types/icon-gen.ts`
- Import route types: `import type { Route } from "./+types/root"`

## Reference Components

Use these as documentation examples:
- **Button**: `app/common/button/` - Comprehensive variants, polymorphic
- **Icon**: `app/common/icon/` - Simple, clear examples
- **FloatingMenu**: `app/common/floating-menu/` - Nested menus, keyboard nav
