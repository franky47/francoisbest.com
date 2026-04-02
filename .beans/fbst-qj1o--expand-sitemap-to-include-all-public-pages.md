---
# fbst-qj1o
title: Expand sitemap to include all public pages
status: completed
type: bug
priority: high
created_at: 2026-04-02T08:13:13Z
updated_at: 2026-04-02T11:11:29Z
parent: fbst-tzpj
---

## What to build

Expand the `sitemap.ts` to include all public pages that exist on the site, not just the 7 hardcoded static pages and blog posts.

The current sitemap generates ~23 URLs. Production has 70+. The missing categories are:

- **Tool/app pages**: `/hashvatar`, `/horcrux`, `/woodworking/dovetail-designer`, `/safari-speedrun`
- **Meta page**: `/sitemap`
- **Tag index and individual tag pages**: `/posts/tags` plus one page per unique tag across all published posts (e.g. `/posts/tags/next.js`, `/posts/tags/react`, etc.)
- **Year archive pages**: `/posts/2019`, `/posts/2020`, `/posts/2021`, `/posts/2023` — derive dynamically from the set of publication years across all posts

Tag pages and year archives should be derived dynamically from the blog post data so the sitemap stays correct as new content is added.

## Acceptance criteria

- [x] `/sitemap.xml` includes all 7 existing static pages
- [x] `/sitemap.xml` includes tool/app pages: hashvatar, horcrux, dovetail-designer, safari-speedrun, sitemap
- [x] `/sitemap.xml` includes `/posts/tags` and one entry per unique tag used across published posts
- [x] `/sitemap.xml` includes one entry per year that has published posts
- [x] `/sitemap.xml` includes all published blog posts (unchanged)
- [x] Adding a new tag or a post in a new year automatically adds the corresponding sitemap entry

## User stories addressed

- User story 4: Sitemap includes all public pages
- User story 5: Tool pages in sitemap
- User story 6: Tag and year archive pages in sitemap
