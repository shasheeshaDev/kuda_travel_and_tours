# Kuda Travel & Tours — Development Instructions

Complete guide for setting up, developing, and maintaining the project.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Development Workflow](#development-workflow)
4. [Seeding Content](#seeding-content)
5. [Adding New Blocks](#adding-new-blocks)
6. [Working with Queries](#working-with-queries)
7. [Type Generation](#type-generation)
8. [Design Tokens](#design-tokens)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js** v18.17 or higher
- **pnpm** — `npm install -g pnpm`
- **Sanity CLI** — `pnpm install -g sanity@latest`
- [Sanity.io](https://www.sanity.io/) account
- [Resend](https://resend.com/) account (for enquiry form emails)
- [Vercel](https://vercel.com/) account (for deployment)

---

## Initial Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

#### Frontend — `frontend/.env.local`

```bash
cp frontend/.env.local.example frontend/.env.local
```

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_ENV=development
NEXT_PUBLIC_STUDIO_URL=http://localhost:3333

NEXT_PUBLIC_SANITY_API_VERSION=2026-05-14
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=development
SANITY_API_READ_TOKEN=<your-viewer-token>

RESEND_API_KEY=<your-resend-key>
NEXT_RESEND_FROM_EMAIL=<from@yourdomain.com>
```

#### Studio — `studio/.env.local`

```bash
cp studio/.env.local.example studio/.env.local
```

```env
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
SANITY_STUDIO_API_VERSION=2026-05-14
SANITY_STUDIO_PROJECT_ID=<your-project-id>
SANITY_STUDIO_DATASET=development

# Required only for pnpm seed (see §Seeding Content)
SANITY_API_WRITE_TOKEN=<your-editor-token>
```

### 3. Sanity CORS setup

In [sanity.io/manage](https://sanity.io/manage) → your project → **API → CORS Origins**, add:

```
http://localhost:3000
http://localhost:3333
```

### 4. Create API tokens

| Token | Permission | Where to paste |
|---|---|---|
| Viewer | Read-only | `SANITY_API_READ_TOKEN` in `frontend/.env.local` |
| Editor | Read + write | `SANITY_API_WRITE_TOKEN` in `studio/.env.local` |

Go to [sanity.io/manage](https://sanity.io/manage) → **API → Tokens → Add API token**.

### 5. Seed content

Insert all homepage content from the design into Sanity with one command:

```bash
pnpm seed
```

This creates/updates: **Settings, Header, Footer, 5 Testimonials, and the Home page** with all 9 blocks pre-filled from the design. The command is idempotent — safe to re-run.

### 6. Upload the Kuda logo

Open the Studio (`http://localhost:3333`) → **Settings → Logo** and upload `kuda-logo.png`.

### 7. Start development servers

```bash
pnpm dev
# Frontend: http://localhost:3000
# Studio:   http://localhost:3333
```

---

## Development Workflow

### Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start both frontend and studio |
| `pnpm dev:next` | Frontend only |
| `pnpm dev:studio` | Studio only |
| `pnpm build` | Build both |
| `pnpm typegen` | Regenerate TypeScript types |
| `pnpm typecheck` | TypeScript check on frontend |
| `pnpm seed` | Insert design content into Sanity |

### File naming conventions

```
frontend/
├── components/blocks/<category>/<block-name>.tsx   e.g. hero/hero-kuda.tsx
├── sanity/queries/<category>/<block-name>.ts        e.g. hero/hero-kuda.ts
│
studio/
└── schemas/blocks/<category>/<block-name>.ts        e.g. hero/hero-kuda.ts
```

---

## Seeding Content

The seed script (`studio/scripts/seed-content.ts`) writes all design content directly to Sanity via the API.

### Requirements

1. `SANITY_API_WRITE_TOKEN` must be set in `studio/.env.local` (Editor-level token)

### Run

```bash
# From project root
pnpm seed
```

### What it creates

| Document | `_id` |
|---|---|
| Settings | `kuda-settings` |
| Header | `kuda-header` |
| Footer | `kuda-footer` |
| Testimonial — Sarah M. | `kuda-t-sarah` |
| Testimonial — Ravi K. | `kuda-t-ravi` |
| Testimonial — Anna T. | `kuda-t-anna` |
| Testimonial — James W. | `kuda-t-james` |
| Testimonial — Nadia F. | `kuda-t-nadia` |
| Home page | `kuda-home` |

All documents use `createOrReplace`, so re-running will update existing content without creating duplicates.

---

## Adding New Blocks

Follow these six steps for every new block.

### Step 1 — Schema (Studio)

Create `studio/schemas/blocks/<category>/<name>.ts`:

```typescript
import { defineType, defineField } from "sanity";
import { SomeIcon } from "lucide-react";

export default defineType({
  name: "my-block",
  type: "object",
  title: "My Block",
  icon: SomeIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({ name: "padding", type: "section-padding", group: "block-settings" }),
    // add your fields here
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title ?? "My Block" };
    },
  },
});
```

### Step 2 — Register Schema

In `studio/schema.ts`:

```typescript
import myBlock from "./schemas/blocks/<category>/<name>";
// …
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // …existing…
    myBlock,
  ],
};
```

In `studio/schemas/documents/page.ts`, add to the `blocks` array:

```typescript
{ type: "my-block" },
```

### Step 3 — GROQ Query

Create `frontend/sanity/queries/<category>/<name>.ts`:

```typescript
import { buttonQuery } from "../shared/button"; // if you need buttons

export const myBlockQuery = `
  _type == "my-block" => {
    _type,
    _key,
    heading,
    // …your fields
  }
`;
```

Import in `frontend/sanity/queries/page.ts`:

```typescript
import { myBlockQuery } from "./<category>/<name>";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    // …
    blocks[]{
      // …existing queries…
      ${myBlockQuery},
    },
  }
`;
```

### Step 4 — Generate Types

```bash
pnpm typegen
```

### Step 5 — React Component

Create `frontend/components/blocks/<category>/<name>.tsx`:

```typescript
import { PAGE_QUERYResult } from "@/sanity.types";

type MyBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "my-block" }
>;

export default function MyBlock({ heading }: MyBlockProps) {
  return (
    <section>
      <h2>{heading}</h2>
    </section>
  );
}
```

### Step 6 — Register Component

In `frontend/components/blocks/index.tsx`:

```typescript
import MyBlock from "@/components/blocks/<category>/<name>";

const componentMap: Record<string, React.ComponentType<any>> = {
  // …existing…
  "my-block": MyBlock,
};
```

---

## Working with Queries

### Shared query fragments

Located in `frontend/sanity/queries/shared/`:

| File | Exports | Use for |
|---|---|---|
| `image.ts` | `imageQuery` | Any image field with asset metadata |
| `link.ts` | `linkQuery` | Internal / external links with resolved href |
| `button.ts` | `buttonQuery`, `buttonGroupQuery` | Button objects |
| `intro-content.ts` | `introContentQuery` | Eyebrow + heading + description |
| `meta.ts` | `metaQuery` | SEO metadata |

### Example usage

```typescript
import { imageQuery } from "../shared/image";
import { buttonQuery } from "../shared/button";

export const myBlockQuery = `
  _type == "my-block" => {
    _type,
    _key,
    image { ${imageQuery} },
    cta { ${buttonQuery} },
  }
`;
```

### Resolving button href

The `linkQuery` automatically resolves the `href` field for both internal references and external links:

```groq
"href": select(
  isExternal => href,
  @.internalLink->slug.current == "index" => "/",
  @.internalLink->_type == "post" => "/blog/" + @.internalLink->slug.current,
  "/" + @.internalLink->slug.current
)
```

---

## Type Generation

### When to run

Run `pnpm typegen` after:

- Adding or modifying schemas
- Adding or modifying GROQ queries
- Changing field names or types

### What it generates

- `studio/schema.json` — extracted schema (intermediate)
- `frontend/sanity.types.ts` — TypeScript types for all queries

### Typing component props

```typescript
import { PAGE_QUERYResult } from "@/sanity.types";

// Extract the exact type for a specific block
type MyBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "my-block" }
>;

// For nested required fields
type ImageType = NonNullable<NonNullable<PAGE_QUERYResult>["bannerImage"]>;
```

---

## Design Tokens

All brand colours are in `frontend/style/configs/colors.config.ts` and available as Tailwind utilities (`bg-brand-*`, `text-brand-*`, `border-brand-*`).

| Tailwind class suffix | Hex | Purpose |
|---|---|---|
| `brand-primary` | `#474546` | Main brand charcoal |
| `brand-dark` | `#2d2b2c` | Dark charcoal (footer, hover) |
| `brand-secondary` | `#1a1819` | Body text |
| `brand-muted` | `#767374` | Muted / secondary text |
| `brand-border` | `#e8e6e4` | Borders and dividers |
| `brand-cream` | `#faf8f5` | Warm section background |
| `brand-heroBg` | `#edf0f5` | Hero / CTA section background |
| `brand-sageBg` | `#f0f4f1` | Illustration background |
| `brand-accentBlue` | `#5a8fa8` | Icons, highlights |
| `brand-accentGold` | `#d4a853` | Star ratings |

Raw CSS custom properties (`--kuda-primary`, `--kuda-accent-blue`, etc.) are also set in `frontend/app/globals.css` for use inside arbitrary Tailwind values: `bg-[var(--kuda-hero-bg)]`.

**Font:** Plus Jakarta Sans (300–800), global default via `font-plusJakartaSans` on `<body>`.

---

## Deployment

### Frontend — Vercel

1. Create new Vercel project, connect GitHub repo
2. Set **Root Directory** → `frontend`
3. Set **Framework Preset** → Next.js
4. Add all environment variables from `frontend/.env.local` (with production values)
5. Deploy

### Studio — Vercel

1. Create new Vercel project, connect same GitHub repo
2. Set **Root Directory** → `studio`
3. Set **Framework Preset** → Other
4. Set **Build Command** → `pnpm build`
5. Set **Output Directory** → `dist`
6. Add `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `SANITY_STUDIO_API_VERSION`
7. Deploy

### Post-deployment checklist

- [ ] Add production frontend URL to Sanity CORS origins
- [ ] Add production studio URL to Sanity CORS origins
- [ ] Update `NEXT_PUBLIC_SITE_URL` → production URL
- [ ] Update `NEXT_PUBLIC_STUDIO_URL` → production studio URL
- [ ] Set `NEXT_PUBLIC_SITE_ENV=production`
- [ ] Verify enquiry form delivers emails (Resend → check logs)
- [ ] Upload logo in Settings if not already done

---

## Troubleshooting

### Types are stale / components show `any`

```bash
pnpm typegen
rm -rf frontend/.next
pnpm dev:next
```

### Sanity connection errors (401 / 403)

1. Verify `SANITY_API_READ_TOKEN` is set and has Viewer permissions
2. Check CORS origins include your current URL
3. Confirm `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` match the studio values

### `pnpm seed` fails — token error

1. Create an **Editor** token at sanity.io/manage → API → Tokens
2. Add `SANITY_API_WRITE_TOKEN=<token>` to `studio/.env.local`
3. Re-run `pnpm seed`

### `pnpm seed` fails — document mutation error

The dataset may be locked or the token may not have sufficient permissions. Ensure the token is **Editor** level, not Viewer.

### Images not loading

1. Verify the image field in the GROQ query includes `${imageQuery}`
2. Check the `urlFor()` import comes from `@/sanity/lib/image`
3. Confirm the asset has been uploaded in Studio

### WhatsApp FAB not appearing

1. Open Studio → **Settings** → add `whatsappNumber` (digits only, no `+`, e.g. `94771234567`)
2. Re-deploy or restart the dev server — the layout fetches this at render time

### Build fails — TypeScript errors

```bash
pnpm typecheck
```

Fix any reported errors, then re-run `pnpm typegen` if the issue is in generated types.

---

## Resources

- [Next.js docs](https://nextjs.org/docs)
- [Sanity docs](https://www.sanity.io/docs)
- [GROQ reference](https://www.sanity.io/docs/groq)
- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Resend docs](https://resend.com/docs)
