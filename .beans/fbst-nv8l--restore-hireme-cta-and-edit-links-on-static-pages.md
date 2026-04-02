---
# fbst-nv8l
title: Restore HireMe CTA and edit links on static pages
status: completed
type: bug
priority: high
created_at: 2026-04-02T08:13:26Z
updated_at: 2026-04-02T11:11:29Z
parent: fbst-tzpj
---

## What to build

Restore the "Hire me!" CTA and "Edit this page on GitHub" link on all static pages that had them in production.

In production, the `MdxPageFooter` component injected `<HireMe />` on every page except the home page, and an "Edit this page on GitHub" link on every page. Blog posts already have both in the new `[...slug]/page.tsx`. The 6 static pages that lost them during the MDX-to-TSX migration need them added back individually:

- `/open-source` (page.tsx)
- `/music` (page.tsx)
- `/links` (page.tsx — note: this was a simple MDX page, check if it was converted)
- `/uses` (page.tsx)
- `/public-keys` (page.tsx)
- `/sitemap` (page.tsx)

Add to each page component:
1. `<HireMe outerClass="mt-12" />` before the closing fragment
2. An "Edit this page on GitHub" link pointing to the page's source file on the `next` branch

Do NOT add these to the shared `(pages)/layout.tsx` — the home page already has the CTA inline and was explicitly excluded from the footer injection in production.

## Acceptance criteria

- [x] "Hire me!" CTA appears at the bottom of /open-source, /music, /links, /uses, /public-keys, and /sitemap pages
- [x] "Hire me!" CTA does NOT appear twice on the home page
- [x] "Edit this page on GitHub" link appears on each of the 6 static pages, pointing to the correct source file
- [x] Blog posts still have their existing CTA and edit link (no regression)

## User stories addressed

- User story 7: HireMe CTA on static pages
- User story 8: "Edit this page on GitHub" on static pages
