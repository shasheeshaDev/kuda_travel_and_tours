# Kuda Travel & Tours

Website for **Kuda Travel & Tours** — Sri Lanka's travel & tour company. Built with Next.js 15 (App Router) and Sanity v4 as a block-based page builder, styled with Tailwind CSS and shadcn/ui.

## Tech Stack

[![Next.js][next-js]][next-js-url] [![Sanity][sanity]][sanity-url] [![React][react]][react-url] [![Typescript][typescript]][typescript-url] [![Tailwind][tailwind]][tailwind-url]

| Layer | Choice |
|---|---|
| Frontend | Next.js 15 (App Router, React 19) |
| CMS | Sanity v4 (Studio + GROQ) |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix) |
| Language | TypeScript (strict) |
| Email | Resend |
| Package manager | pnpm (workspaces) |
| Deployment | Vercel (frontend + studio as separate projects) |

---

## Project Structure

```
kuda_travel_and_tours/
├── frontend/                   # Next.js application
│   ├── app/
│   │   ├── (main)/             # Public pages (layout, home, [slug])
│   │   ├── actions/contact/    # Server action — sends enquiry via Resend
│   │   └── api/                # OG image, draft mode, revalidation
│   ├── components/
│   │   ├── blocks/             # Page-builder block components
│   │   │   ├── hero/           # hero-kuda, trust-strip
│   │   │   ├── content/        # who-we-are, how-it-works, content-1 … 4
│   │   │   ├── card/           # services-grid, card-1 … 5
│   │   │   ├── stats/          # stats-1
│   │   │   ├── testimonial/    # testimonials-kuda, testimonial-1
│   │   │   ├── form/           # cta-form, form-1
│   │   │   ├── faq/            # faq-1
│   │   │   ├── banner/         # hero-banner
│   │   │   └── shared/         # Button, Icon, ColumnBuilderRenderer
│   │   ├── footer/             # footer-2
│   │   ├── header/             # navbar-1
│   │   └── global/             # whatsapp-fab (FAB + scroll-to-top)
│   ├── sanity/
│   │   ├── lib/                # client, fetch, image helpers
│   │   └── queries/            # GROQ query fragments + PAGE_QUERY
│   └── style/
│       └── configs/            # colors.config, typography.config, font.config
│
├── studio/                     # Sanity Studio
│   ├── schemas/
│   │   ├── documents/          # page, header, footer, settings, testimonial, faq …
│   │   ├── blocks/             # one file per block type
│   │   └── common/             # shared objects (button, link, image …)
│   └── scripts/
│       └── seed-content.ts     # Seeds all design content into Sanity
│
├── documentation/
│   └── design/index.html       # Original design mockup
└── package.json                # Root workspace scripts
```

---

## Kuda Block Library

### Kuda-specific blocks

| Block | `_type` | Description |
|---|---|---|
| Hero | `hero-kuda` | Full-width hero with van illustration, eyebrow, H1, 2 CTAs |
| Trust Strip | `trust-strip` | Horizontal trust items with dot separators |
| Who We Are | `who-we-are` | Split layout — map illustration + text + checklist |
| Services Grid | `services-grid` | 3-column grid of 6 service cards with icons |
| How It Works | `how-it-works` | Numbered steps + phone/chat illustration |
| Stats | `stats-1` | Dark section with animated counters |
| Testimonials | `testimonials-kuda` | Horizontal scroll cards from Testimonial documents |
| Enquiry Form | `cta-form` | Split layout — contact form + suitcase illustration |
| FAQ | `faq-1` | Accordion FAQ with contact email link |

### Generic blocks (from base template)

| Block | `_type` | Description |
|---|---|---|
| Hero Banner | `banner-1` / `banner-2` | Image-backed hero/banner blocks |
| Content | `content-1` … `content-4` | Various split-content layouts |
| Cards | `card-1` … `card-5` | Card grid variants |
| Testimonial | `testimonial-1` | Generic testimonial block |
| Form | `form-1` | Configurable contact form |
| Collection | `collection-1` | Collection item listings |
| Video | `video-1` | Embedded video |

---

## Document Types

| Document | Singleton? | Purpose |
|---|---|---|
| `page` | No | Any page; blocks array drives layout |
| `settings` | Yes | Logo, site name, phone, WhatsApp, email, address |
| `header` | Yes | Nav links + CTA button |
| `footer` | Yes | Brand description + link columns |
| `testimonial` | No | Individual testimonials (name, title, quote, avatar) |
| `faq` | No | FAQ documents (studio-managed) |
| `post` | No | Blog posts with author & categories |
| `collection` | No | Collection items |
| `banner` | No | Global banner content |

---

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

**Frontend** — copy and fill in `frontend/.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_ENV=development
NEXT_PUBLIC_STUDIO_URL=http://localhost:3333

NEXT_PUBLIC_SANITY_API_VERSION=2026-05-14
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
NEXT_PUBLIC_SANITY_DATASET=development
SANITY_API_READ_TOKEN=<viewer-token>

# Resend — for enquiry form emails
RESEND_API_KEY=<resend-key>
NEXT_RESEND_FROM_EMAIL=<from@yourdomain.com>
```

**Studio** — copy and fill in `studio/.env.local`:

```env
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
SANITY_STUDIO_API_VERSION=2026-05-14
SANITY_STUDIO_PROJECT_ID=<project-id>
SANITY_STUDIO_DATASET=development

# Editor token — only needed for pnpm seed (create at sanity.io/manage → API → Tokens)
SANITY_API_WRITE_TOKEN=<editor-token>
```

### 3. Sanity project setup

1. Log in: `sanity login`
2. In [sanity.io/manage](https://sanity.io/manage) → **API → CORS Origins**, add:
   - `http://localhost:3000`
   - `http://localhost:3333`
3. Create a **Viewer** token → paste as `SANITY_API_READ_TOKEN` in frontend
4. Create an **Editor** token → paste as `SANITY_API_WRITE_TOKEN` in studio

### 4. Seed content

Insert all homepage content from the design mockup in one command:

```bash
pnpm seed
```

This creates/updates: Settings, Header, Footer, 5 Testimonials, and the full Home page with all 9 blocks populated. Safe to re-run — uses `createOrReplace`.

### 5. Upload the logo

In the Studio (`localhost:3333`) → **Settings → Logo**, upload `kuda-logo.png`.

### 6. Start dev servers

```bash
pnpm dev
```

| URL | Service |
|---|---|
| `http://localhost:3000` | Next.js frontend |
| `http://localhost:3333` | Sanity Studio |

---

## Scripts Reference

| Command | Description |
|---|---|
| `pnpm dev` | Start frontend + studio in parallel |
| `pnpm dev:next` | Frontend only |
| `pnpm dev:studio` | Studio only |
| `pnpm build` | Build both |
| `pnpm typegen` | Regenerate TypeScript types from schemas + queries |
| `pnpm typecheck` | TypeScript check on the frontend |
| `pnpm seed` | Insert design content into Sanity |

---

## Adding a New Block

1. **Schema** — create `studio/schemas/blocks/<category>/<name>.ts`
2. **Register** — import in `studio/schema.ts` and add `{ type: "<name>" }` to the `blocks` array in `studio/schemas/documents/page.ts`
3. **Query** — create `frontend/sanity/queries/<category>/<name>.ts` and import the fragment into `frontend/sanity/queries/page.ts`
4. **Component** — create `frontend/components/blocks/<category>/<name>.tsx`; type props with `Extract<NonNullable<PAGE_QUERYResult["blocks"]>[number], { _type: "<name>" }>`
5. **Register** — add to `frontend/components/blocks/index.tsx`
6. **Typegen** — run `pnpm typegen`

---

## Design Tokens

Kuda brand colours are defined in `frontend/style/configs/colors.config.ts` and exposed as Tailwind utilities:

| Utility | Hex | Usage |
|---|---|---|
| `brand-primary` | `#474546` | Charcoal — buttons, icons, dark elements |
| `brand-dark` | `#2d2b2c` | Footer bg, hover states |
| `brand-secondary` | `#1a1819` | Body text |
| `brand-muted` | `#767374` | Muted text, eyebrows |
| `brand-border` | `#e8e6e4` | Borders, dividers |
| `brand-cream` | `#faf8f5` | Section backgrounds |
| `brand-heroBg` | `#edf0f5` | Hero / CTA section bg |
| `brand-sageBg` | `#f0f4f1` | Who We Are illustration bg |
| `brand-accentBlue` | `#5a8fa8` | Icons, highlights, accent |
| `brand-accentGold` | `#d4a853` | Star ratings |

Raw CSS variables (`--kuda-primary`, `--kuda-accent-blue`, etc.) are also available in `globals.css` for use in arbitrary Tailwind values.

**Font:** Plus Jakarta Sans (300–800), loaded via `next/font/google`, applied globally.

---

## Environment Variables — Full Reference

### Frontend

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (used for sitemap, OG) |
| `NEXT_PUBLIC_SITE_ENV` | Yes | `development` or `production` |
| `NEXT_PUBLIC_STUDIO_URL` | Yes | Studio URL (used for draft mode links) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes | Sanity API date version |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | `development` or `production` |
| `SANITY_API_READ_TOKEN` | Yes | Viewer token for server-side fetching |
| `RESEND_API_KEY` | Yes | Resend API key for enquiry emails |
| `NEXT_RESEND_FROM_EMAIL` | Yes | Sender address for enquiry emails |

### Studio

| Variable | Required | Description |
|---|---|---|
| `SANITY_STUDIO_PROJECT_ID` | Yes | Sanity project ID |
| `SANITY_STUDIO_DATASET` | Yes | Dataset name |
| `SANITY_STUDIO_API_VERSION` | Yes | API date version |
| `SANITY_STUDIO_PREVIEW_URL` | No | Frontend URL for visual preview pane |
| `SANITY_API_WRITE_TOKEN` | Seed only | Editor token — only needed for `pnpm seed` |

---

## Deployment

### Frontend — Vercel

| Setting | Value |
|---|---|
| Root directory | `frontend` |
| Framework preset | Next.js |
| Environment variables | All `NEXT_PUBLIC_*` + `SANITY_API_READ_TOKEN` + Resend vars |

### Studio — Vercel

| Setting | Value |
|---|---|
| Root directory | `studio` |
| Framework preset | Other |
| Build command | `pnpm build` |
| Output directory | `dist` |
| Environment variables | `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `SANITY_STUDIO_API_VERSION` |

### Post-deployment

1. Add production URLs to Sanity CORS origins
2. Update `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_STUDIO_URL` to production values
3. Set `NEXT_PUBLIC_SITE_ENV=production`

---

## Credits

Web Solution by [Enrol Business Solutions](https://enrolsolutions.com)  
Design by [ShshaThink](https://shashathink.com)

[react-url]: https://reactjs.org/
[next-js-url]: https://nextjs.org/
[typescript-url]: https://www.typescriptlang.org/
[tailwind-url]: https://tailwindcss.com/
[sanity-url]: https://www.sanity.io/
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[next-js]: https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=Next.js
[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[tailwind]: https://img.shields.io/badge/Tailwind_CSS-20232A?style=for-the-badge&logo=tailwindcss&logoColor=319795
[sanity]: https://img.shields.io/badge/Sanity-20232A?style=for-the-badge&logo=sanity&logoColor=F97316
