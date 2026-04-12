---
# fbst-m7lu
title: Fix broken links in blog posts and sitemap page
status: completed
type: bug
priority: normal
created_at: 2026-04-02T08:13:55Z
updated_at: 2026-04-02T11:11:29Z
parent: fbst-tzpj
---

## What to build

Fix 4 small content/link regressions introduced during the MDX migration:

### 1. Dead e2ee links on /sitemap page

The sitemap page (`src/app/(pages)/sitemap/page.tsx`, lines 66-79) links to `/e2ee/encrypt` and `/e2ee/decrypt` which are 404 (these never existed as routes — dead in production too). Remove the entire e2ee demo subsection. Keep the Horcrux link.

### 2. "Discuss on Hacker News" link in Vercel deployment URLs post

In `content/blog/2023/displaying-the-right-vercel-deployment-urls-in-nextjs/index.mdx`, the inline `<a href={hnDiscussionUrl(...)}>` was replaced with plain text `"Discuss on Hacker News"` because `import.meta.url` isn't available in the fumadocs MDX context. Fix by hardcoding the HN Algolia search URL for this post: `https://hn.algolia.com/?q=<encoded post URL>`.

### 3. Source code link in local times post

In `content/blog/2023/displaying-local-times-in-nextjs/index.mdx`, the "source code for this component" link points to the MDX content file (`index.mdx`) instead of the actual component. Fix by pointing to `src/ui/components/local-time.tsx` on the `next` branch.

### 4. Canonical URL on storing-react-state post

The "Storing React state in the URL with Next.js" post had `alternates.canonical` metadata in production which was dropped during frontmatter migration. Restore it by adding the canonical URL in the `generateMetadata` function in `[...slug]/page.tsx` — either from a custom frontmatter field or by hardcoding it for this specific post.

## Acceptance criteria

- [x] The /sitemap page no longer links to /e2ee/encrypt or /e2ee/decrypt
- [x] The Horcrux link on /sitemap still works
- [x] The "Discuss on Hacker News" text in the Vercel deployment URLs post is a working hyperlink
- [x] The "source code for this component" link in the local times post points to the local-time.tsx component file
- [x] The storing-react-state post has `alternates.canonical` in its metadata

## User stories addressed

- User story 9: HN link is a working hyperlink
- User story 10: Source code link points to correct file
- User story 11: No dead links on /sitemap page
- User story 12: Canonical URL metadata preserved
