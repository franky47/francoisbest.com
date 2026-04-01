---
# fbst-qp1g
title: 'Step 4: Next.js 16 upgrade'
status: todo
type: task
created_at: 2026-04-01T13:35:42Z
updated_at: 2026-04-01T13:35:42Z
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
