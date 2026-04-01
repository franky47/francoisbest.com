---
# fbst-9w5o
title: 'Step 7: MDX pipeline → fumadocs-mdx'
status: todo
type: task
priority: high
created_at: 2026-04-01T13:36:28Z
updated_at: 2026-04-01T13:36:28Z
parent: fbst-9pj9
blocked_by:
  - fbst-0ilj
---

Replace @next/mdx with fumadocs-mdx + fumadocs-core for the blog content pipeline. This is the largest and riskiest migration step.

## Tasks

### Setup

- Add `fumadocs-mdx` and `fumadocs-core` dependencies
- Create `source.config.ts` with blog collection definition and Zod schema (extending current postMetadataSchema: title, description, tags, publicationDate, draft support)
- Configure MDX options in source.config.ts (remark-gfm, remark-smartypants, rehype-pretty-code, rehype-slug, rehype-autolink-headings)

### Content Migration

- Create `content/blog/` directory at package root
- Move all posts from `app/(pages)/posts/(content)/YEAR/SLUG/page.mdx` to `content/blog/YEAR/SLUG/index.mdx` (or appropriate fumadocs convention)
- Convert frontmatter from `export const metadata = { ... }` to YAML frontmatter
- Move associated assets (images, converted SVG components) alongside content

### Routing

- Create `app/(pages)/posts/[...slug]/page.tsx` with:
  - `generateStaticParams()` using fumadocs loader
  - `generateMetadata()` for SEO
  - Full custom rendering: PostHeader + MDX body + PostFooter
- Remove old `posts/(content)/` route group and its layout.tsx

### Cleanup

- Remove `injectPageHeaderAndFooter` remark plugin from next.config.ts
- Remove `configureMdx()` wrapper and @next/mdx from next.config.ts
- Drop dependencies: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `unified`, `remark-parse`, `remark-mdx`, `remark-mdx-images`, `globby`
- Remove or rewrite `lib/blog/engine.ts` (getAllPosts, getPost) to use fumadocs loader
- Update `mdx-components.tsx` for fumadocs component passing pattern
- Delete `lib/blog/defs.ts` if schema moves to source.config.ts

### Feed Route

- Update `posts/feed/[format]/route.ts` to use fumadocs loader instead of `getAllPosts()` from the old engine

## Validation

- All blog posts render correctly with title, date, tags, reading time
- Draft posts visible in dev, hidden in production
- Blog post listing pages work
- Tag filtering works
- RSS/Atom/JSON feeds generate correctly
- OpenGraph images resolve
- Code syntax highlighting works (rehype-pretty-code with moonlight-ii theme)
- `pnpm build` passes
- `pnpm dev` works
