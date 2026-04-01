---
# fbst-ugwm
title: 'Step 5: Built-in sitemap & robots'
status: completed
type: task
priority: normal
created_at: 2026-04-01T13:35:58Z
updated_at: 2026-04-01T16:00:07Z
parent: fbst-9pj9
blocked_by:
    - fbst-qp1g
---

Replace next-sitemap with Next.js built-in sitemap.ts and robots.ts.

## Tasks

- Create `app/sitemap.ts` that generates the sitemap with auto-lastmod
- Create `app/robots.ts` with:
  - Allow all crawlers on production
  - Block all crawlers on preview deployments (check VERCEL_ENV)
  - Block AI crawlers: CCBot, GPTBot, ChatGPT-User
- Drop `next-sitemap` dependency
- Delete `next-sitemap.config.js`
- Remove `postbuild: next-sitemap` from package.json scripts
- Remove sitemap link from layout.tsx head (Next.js handles this automatically)

## Validation

- `pnpm build` passes
- `/sitemap.xml` returns valid sitemap
- `/robots.txt` returns correct rules (AI crawler blocks, preview deployment handling)


## Summary of Changes

- Created `app/sitemap.ts` with blog post discovery + static pages list
- Created `app/robots.ts` with AI crawler blocks and preview deployment handling
- Deleted `next-sitemap.config.js`, removed dependency and postbuild script
- Removed manual sitemap `<link>` from layout.tsx
- Deleted package-level `.gitignore` (only had next-sitemap output entries)
- Used `url()` helper from `lib/paths` for consistent URL generation in robots.ts
