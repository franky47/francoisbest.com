---
# fbst-tzpj
title: Fix QA regressions in modernisation PR
status: completed
type: feature
priority: normal
created_at: 2026-04-02T08:11:02Z
updated_at: 2026-04-02T11:11:37Z
---

## Problem Statement

The `chore/modernisation` PR (#99) migrates the site to Next.js 16, fumadocs-mdx, next-themes, and modern build tooling. While the core content is intact, the migration introduced several regressions that break parity with production: reading times are wrong everywhere, the sitemap lost most of its URLs, the "Hire me" CTA and "Edit this page" links disappeared from static pages, and two blog posts have broken inline links.

## Solution

Fix all regressions to restore production parity before merging. Each fix is a targeted change to an existing module — no new abstractions needed.

## User Stories

1. As a reader, I want to see accurate reading times on blog post listings and individual post pages, so that I can estimate how long an article will take to read.
2. As a reader on the posts listing page, I want each post to display its correct reading time (e.g. "7 min read"), not "1 min read" for every post.
3. As a reader on an individual blog post, I want to see the reading time in the post header between the date and the tags.
4. As a search engine crawler, I want the sitemap.xml to include all public pages on the site, so that I can discover and index them.
5. As a search engine crawler, I want the sitemap to include the interactive tool pages (hashvatar, horcrux, dovetail-designer), so they appear in search results.
6. As a search engine crawler, I want the sitemap to include all tag pages and year archive pages, so that topic-based and chronological indexes are discoverable.
7. As a potential client visiting the open-source, music, links, uses, or public-keys pages, I want to see the "Hire me!" CTA, so that I know the author is available for freelance work.
8. As a reader on any static page (open-source, music, links, uses, public-keys, sitemap), I want to see an "Edit this page on GitHub" link, so that I can suggest corrections.
9. As a reader of the "Displaying the right Vercel deployment URLs in Next.js" post, I want the inline "Discuss on Hacker News" text to be a working hyperlink, so that I can follow it.
10. As a reader of the "Displaying Local Times in Next.js" post, I want the "source code for this component" link to point to the actual `local-time.tsx` component file, not the MDX content file.
11. As a reader visiting the human-readable /sitemap page, I want all links to point to existing pages, so that I don't hit 404s.
12. As a reader of the "Storing React state in the URL with Next.js" post, I want the canonical URL metadata to be preserved, so that search engines consolidate ranking signals correctly.

## Implementation Decisions

### 1. Reading time computation (engine.ts)

The `pageToPost` function currently computes reading time from `page.data.description` (a one-line string), producing "1 min read" for every post. Fix: read the raw MDX file from disk at build time using `fs.readFileSync`. The fumadocs page object doesn't expose raw content, but the file path can be derived from the slug and the known content directory (`./content/blog`). Since this runs at build time during static generation, filesystem access is safe.

### 2. Reading time display (post page component)

The `[...slug]/page.tsx` header `<figcaption>` omits reading time entirely. Add a reading time display between the publication date and the tags, matching the production format. The reading time value should come from the `getPost()` helper which already has the field.

### 3. Sitemap expansion (sitemap.ts)

The `sitemap()` function hardcodes 7 static pages. Expand it to include:
- Tool/app pages: `/hashvatar`, `/horcrux`, `/woodworking/dovetail-designer`, `/safari-speedrun`
- Meta page: `/sitemap`
- Tag index and all individual tag pages (derive from the set of tags across all published posts)
- Year archive pages (derive from the set of years across all published posts)

### 4. HireMe CTA and "Edit this page" on static pages

The production `MdxPageFooter` injected `<HireMe />` and an "Edit this page on GitHub" link on every page except the home page. Blog posts already have these in `[...slug]/page.tsx`. For static pages (open-source, music, links, uses, public-keys, sitemap), add `<HireMe />` and an "Edit this page" link to each page component individually. Do NOT add to the shared layout, because:
- The home page already has the CTA inline and explicitly excluded it from the footer injection in production.
- Each page needs a different GitHub edit URL.

### 5. Dead e2ee links on /sitemap page

The `/e2ee/encrypt` and `/e2ee/decrypt` links on the sitemap page point to routes that have never existed (404 in production too). Remove the entire e2ee demo subsection from the sitemap page since the `simple-e2ee` project no longer has a hosted demo. Keep the Horcrux link.

### 6. Blog post inline link fixes

**Vercel deployment URLs post** (`content/blog/2023/displaying-the-right-vercel-deployment-urls-in-nextjs/index.mdx`): The `<a href={hnDiscussionUrl(resolve(import.meta.url))}>` was replaced with plain text because `import.meta.url` and the path utility functions aren't available in the fumadocs MDX context. Fix by hardcoding the Hacker News Algolia search URL for this specific post (the URL is static and won't change).

**Local times post** (`content/blog/2023/displaying-local-times-in-nextjs/index.mdx`): The "source code for this component" link was changed to point to `index.mdx` instead of the actual component. Fix by updating the href to point to the correct file: `src/ui/components/local-time.tsx` on the `next` branch (or whatever the main branch is after merge).

### 7. Canonical URL metadata

The "Storing React state in the URL with Next.js" post had `alternates.canonical` metadata in production. This was dropped during frontmatter migration because fumadocs frontmatter schema doesn't have a field for it. Restore it by adding the canonical URL in the `generateMetadata` function in `[...slug]/page.tsx`, reading it from a custom frontmatter field or hardcoding it for this specific post.

## Testing Decisions

Good tests verify external behavior (what the user sees or what a crawler receives), not implementation details.

### Modules to test

1. **Reading time computation**: Test that `getAllPosts()` returns posts with realistic reading times (> 1 min for any real article). This can be a simple unit test that calls the function and asserts reading times are reasonable.

2. **Sitemap generation**: Test that the sitemap function returns URLs for all expected page categories: static pages, blog posts, tag pages, year archives, and tool pages. Assert minimum counts rather than exact URLs, so the test doesn't break when content is added.

3. **Blog post content regressions**: A snapshot or integration test could verify that specific MDX files render links correctly, but this is likely overkill for two one-off fixes. Manual verification after the fix is sufficient.

### Prior art

Check if there are existing tests in the codebase (e.g. under `__tests__` or `*.test.ts` files). If there are Vitest tests, follow the existing patterns.

## Out of Scope

- **NPM package embed data fetching**: The NPM download stats are broken the same way in production. This is a separate issue related to NPM API rate limiting and the bulk API, not a regression from this PR.
- **Chiffre.io footer line**: The "End-to-end encrypted analytics by Chiffre.io" text correctly shows/hides based on environment variables. It's hidden on the preview because the env vars aren't set there. Not a bug.
- **Footer social links**: The Footer component includes all social links (Mastodon, Bluesky, Discord, GitHub, LinkedIn, Email). The QA agents incorrectly reported them as missing due to icon-only rendering that wasn't captured in text extraction.
- **The /age page**: Intentionally removed, not a regression.

## Further Notes

- The reading time fix should use `fs.readFileSync` since it runs exclusively at build time during `getAllPosts()` / `getPost()` calls in `generateStaticParams` and server components. This is a safe pattern for Next.js static generation.
- The sitemap should derive tag pages and year archives dynamically from the blog post data, not hardcode them, so it stays correct as new content is added.
- The canonical URL issue affects only one post. A general solution (supporting `alternates` in fumadocs frontmatter) would be nice but is not required for this fix.
