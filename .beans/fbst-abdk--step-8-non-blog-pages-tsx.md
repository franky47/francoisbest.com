---
# fbst-abdk
title: 'Step 8: Non-blog pages → TSX'
status: todo
type: task
created_at: 2026-04-01T13:36:37Z
updated_at: 2026-04-01T13:36:37Z
parent: fbst-9pj9
blocked_by:
  - fbst-9w5o
---

Convert remaining MDX pages to plain TSX components.

## Tasks

- Convert `app/(pages)/page.mdx` → `app/(pages)/page.tsx`
  - Inline the short prose sections as JSX
  - Keep component imports (HireMe, FeaturedPosts, Career, FavouriteAlbums, FavouriteArtists)
  - Convert markdown headings to `<h1>`, `<h2>` etc.
  - Convert markdown links to `<Link>` / `<a>`
- Convert `_landing-sections/about-me.mdx` → TSX component
  - Images become `<Image>` imports
  - Prose becomes JSX paragraphs
- Convert links page to TSX (if it is MDX)
- Remove `mdx-components.tsx` if no longer needed (or strip it down to only what fumadocs needs)

## Validation

- Homepage renders correctly with all sections
- About me section shows images and prose
- Links page renders correctly
- No remaining non-blog MDX files in app/
