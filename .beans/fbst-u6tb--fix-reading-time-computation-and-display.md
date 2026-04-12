---
# fbst-u6tb
title: Fix reading time computation and display
status: completed
type: bug
priority: high
created_at: 2026-04-02T08:13:00Z
updated_at: 2026-04-02T11:11:29Z
parent: fbst-tzpj
---

## What to build

Fix the reading time computation so it calculates from the full MDX article body instead of the one-line description, and restore the reading time display in individual blog post headers.

**Computation fix** (engine.ts): The `pageToPost` function computes reading time via `readingTime(page.data.description ?? '').text`, which always returns "1 min read". Since fumadocs doesn't expose raw MDX content on the page object, read the raw MDX file from disk using `fs.readFileSync`. The file path can be derived from the slug and the known content directory (`./content/blog/{slug}/index.mdx`). This runs at build time during static generation, so filesystem access is safe.

**Display fix** ([...slug]/page.tsx): The post header `<figcaption>` omits reading time entirely. Add a reading time display between the publication date and the tags, using the value from `getPost()` which already has the `readingTime` field.

## Acceptance criteria

- [x] `getAllPosts()` returns realistic reading times for all posts (no post shows "1 min read" unless it genuinely is)
- [x] The `/posts` listing page shows correct per-post reading times
- [x] Individual blog post pages display reading time in the header between the date and the tags
- [x] The home page featured posts show correct reading times

## User stories addressed

- User story 1: Accurate reading times on listings and post pages
- User story 2: Correct reading times on posts listing page
- User story 3: Reading time visible in individual post headers
