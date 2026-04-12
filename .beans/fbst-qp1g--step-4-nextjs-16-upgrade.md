---
# fbst-qp1g
title: 'Step 4: Next.js 16 upgrade'
status: completed
type: task
priority: normal
created_at: 2026-04-01T13:35:42Z
updated_at: 2026-04-01T15:48:58Z
parent: fbst-9pj9
blocked_by:
    - fbst-5495
---

Upgrade Next.js from 15.5.10 to 16.2.2.

## Tasks

- Bump `next` to 16.2.2
- Bump `eslint-config-next` — actually being dropped (oxlint), so just remove it
- Convert `next.config.mjs` → `next.config.ts` with proper types
- Remove the entire `webpack(config)` block (SVGR loader)
- Drop `@svgr/webpack` dependency
- Convert all 12 SVG file imports to TSX React components:
  - 7 career logos in `_landing-sections/career/icons/`
  - 5 blog post diagrams (mobile-mockup, venn, status-text, update-queue, windowing)
- Handle async request API enforcement (params is now `Promise<>` in Next.js 16)
- Do NOT enable `cacheComponents`
- Verify Turbopack works as default dev bundler

## Validation

- `pnpm build` passes
- `pnpm dev` starts without errors
- Career section renders with logos
- Blog posts with SVG diagrams render correctly


## Summary of Changes

- Converted `next.config.mjs` → `next.config.ts` with proper TypeScript types
- Removed webpack SVGR config from next.config
- Converted all 12 SVGs to TSX React components (7 career icons + 5 blog diagrams)
- Updated all imports from `.svg` to extensionless TSX imports
- Changed `alt` → `aria-label` on career icon usage (SVGs don't support alt)
- Dropped `@svgr/webpack` dependency
- Fixed `next-sitemap.config.js` dead import
- Excluded `next.config.ts` from tsconfig (remark-mdx-images TS6 compat issue)

## Scope Reduction

Next.js version stays at 15.5.10 — the actual 16.2.2 bump must happen together with the fumadocs-mdx migration (step 7) because Next.js 16's MDX provider mechanism creates a client boundary that's incompatible with `export const metadata` in MDX pages. The `--webpack` flags and `revalidateTag` changes are deferred to that step.
