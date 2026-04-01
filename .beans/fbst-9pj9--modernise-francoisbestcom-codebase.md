---
# fbst-9pj9
title: Modernise francoisbest.com codebase
status: todo
type: feature
priority: high
created_at: 2026-04-01T13:35:00Z
updated_at: 2026-04-01T13:35:00Z
---

## Problem Statement

The francoisbest.com codebase has accumulated technical debt and fallen behind current tooling standards. Key pain points include: a hand-rolled MDX content pipeline with fragile AST injection and `new Function()` eval for metadata parsing, legacy ESLint/Prettier configs, a webpack-dependent SVGR setup incompatible with Turbopack, an external `next-sitemap` dependency for functionality now built into Next.js, a hand-rolled dark mode system, and several unused dependencies. The project needs a systematic modernisation pass to adopt current best practices while preserving all existing functionality.

## Solution

Execute a 10-step sequential migration, where each step is independently committable, buildable, and verifiable before proceeding to the next. The migration upgrades the entire toolchain (TypeScript 6, Next.js 16, oxlint, oxfmt, Turbo v2, Vitest 4), replaces the MDX pipeline with fumadocs-mdx for type-safe content, adopts built-in Next.js conventions for sitemap/robots, switches to next-themes for dark mode, replaces dayjs with Temporal, converts SVGs to TSX components, and removes dead code and unused dependencies.

## User Stories

1. As a developer, I want the build tooling (Turbo, linter, formatter, test runner) upgraded to latest major versions, so that I benefit from performance improvements and new features without legacy config debt.
2. As a developer, I want oxlint as the sole linter (replacing ESLint), so that linting is faster and I avoid maintaining legacy ESLint flat-config migrations.
3. As a developer, I want oxfmt as the sole formatter (replacing Prettier), so that formatting is faster, Tailwind class sorting is built-in, and I drop two dependencies.
4. As a developer, I want TypeScript 6.0 with a cleaned-up tsconfig, so that I can use modern language features and benefit from stricter defaults.
5. As a developer, I want Next.js 16 with a TypeScript config file, so that I get Turbopack as default, proper types in config, and access to built-in sitemap/robots.
6. As a developer, I want SVGs converted to TSX components (dropping @svgr/webpack), so that the build has no webpack dependency and works natively with Turbopack.
7. As a developer, I want built-in Next.js sitemap.ts and robots.ts (replacing next-sitemap), so that site metadata is generated within the framework without a postbuild step.
8. As a developer, I want next-themes for dark mode (replacing the hand-rolled system), so that theme management is simpler, well-tested, and requires less custom code.
9. As a content author, I want blog posts managed through fumadocs-mdx with YAML frontmatter and Zod schemas, so that content is type-safe, the authoring experience is standard, and the build pipeline is simpler.
10. As a developer, I want a dynamic [..slug] route for blog posts with full control over rendering (header, footer, article wrapper), so that page chrome is handled by React components rather than remark AST injection.
11. As a developer, I want the homepage and links pages as plain TSX (not MDX), so that component-heavy pages use the right tool and there is only one MDX pipeline (fumadocs-mdx for blog).
12. As a developer, I want dayjs replaced with Temporal (+ polyfill) for server-side date operations, so that I use the emerging standard and drop a dependency.
13. As a developer, I want copy-to-clipboard replaced with native navigator.clipboard API, so that I drop a dependency for a one-line browser API.
14. As a developer, I want dead code removed (age page, mastodon service, toot embed, unused deps like immer and unlazy), so that the codebase surface area is smaller and knip passes clean.
15. As a developer, I want knip installed as a dev dependency with a script, so that dead code and unused dependencies are caught systematically.
16. As a developer, I want the RSS/Atom/JSON feed route updated to use the fumadocs-mdx loader, so that feeds stay functional after the content pipeline migration.
17. As a content author, I want blog post content to live in a dedicated content/blog/ directory (separate from app/), so that content is cleanly separated from routing logic.
18. As a developer, I want each migration step to be independently verifiable (build, typecheck, lint, test), so that regressions are caught at each boundary rather than compounding.

## Implementation Decisions

### Migration Step Ordering

The migration is split into 10 sequential steps with strict ordering to respect dependency chains:

1. **Tooling foundation** — Turbo v2, oxfmt, oxlint, Vitest 4. No source code changes beyond config. This establishes the new tooling baseline so all subsequent diffs use the new formatter/linter.
2. **TypeScript 6.0** — Bump TypeScript, run ts5to6 migration CLI, clean up tsconfig (drop esModuleInterop which is now always-on, remove conservative ES2017 target). Must come after tooling so the new linter/formatter handle the output.
3. **Dead code & small dep cleanup** — Remove age page, mastodon service, toot embed. Drop immer, unlazy, copy-to-clipboard (replace with native). Reduces surface area before major migrations.
4. **Next.js 16 upgrade** — Bump next to 16.2.2, convert next.config.mjs to next.config.ts, drop webpack config, convert 12 SVGs to TSX components, drop @svgr/webpack. Handle any async request API enforcement. Do NOT enable cacheComponents.
5. **Built-in sitemap & robots** — Drop next-sitemap, create app/sitemap.ts and app/robots.ts with AI crawler blocking and preview deployment logic. Remove postbuild script.
6. **Dark mode → next-themes** — Replace hand-rolled theme system (inline script, localStorage, mitt event emitter, storage event cross-tab sync) with next-themes. Update layout.tsx and theme controls.
7. **MDX pipeline → fumadocs-mdx** — Biggest step. Add fumadocs-mdx + fumadocs-core. Create source.config.ts with blog collection and Zod schema. Move posts from app/(pages)/posts/(content)/ to content/blog/. Convert frontmatter from export const metadata to YAML. Create dynamic posts/[...slug]/page.tsx with generateStaticParams. Drop @next/mdx, @mdx-js/loader, @mdx-js/react, unified, remark-parse, remark-mdx, remark-mdx-images, globby. Remove injectPageHeaderAndFooter remark plugin. Update feed route to use fumadocs loader.
8. **Non-blog pages → TSX** — Convert homepage page.mdx to page.tsx with prose inlined as JSX. Convert about-me.mdx to a TSX component. Convert links page to TSX.
9. **dayjs → Temporal** — Replace dayjs in npm.ts and svg-curve-graph.tsx with Temporal API + polyfill. Server-only usage (no client bundle concern since age page was removed in step 3). Drop dayjs.
10. **knip + final cleanup** — Add knip as dev dependency with script. Run it, fix any remaining dead exports/dependencies/files. Final verification pass.

### Key Architectural Decisions

- **fumadocs-mdx without fumadocs-ui**: Only the content engine (fumadocs-mdx + fumadocs-core/source) is used. All rendering, styling, and page chrome remain fully custom. No fumadocs-ui dependency.
- **Single MDX pipeline**: fumadocs-mdx is the only MDX processor. Non-blog pages that were MDX become plain TSX. No @next/mdx retained.
- **oxfmt printWidth stays at 80**: Matches current Prettier default to minimise reformatting noise.
- **No cacheComponents**: Not worth the complexity for a predominantly static site.
- **Monorepo structure retained**: Turbo upgraded to v2 (pipeline → tasks) but single-package workspace kept as-is.
- **Content directory**: Blog posts move to content/blog/ at the package root, outside the app/ directory. Route is handled by a dynamic [..slug] catch-all.

## Testing Decisions

- Existing test suite (paths.test.ts under Vitest) is retained and upgraded to Vitest 4 but not expanded as part of this migration.
- Each migration step is validated by: successful build (pnpm build), typecheck (pnpm typecheck), lint (oxlint), format check (oxfmt --check), and test (pnpm test).
- knip is added in step 10 as a dead-code/dependency linter and run as a final validation gate.
- No new unit or integration tests are added as part of this migration. Test coverage expansion is deferred to a future effort.

## Out of Scope

- Adding new features or pages to the website
- Expanding test coverage beyond what exists
- Changing the visual design or styling
- Migrating to a different hosting provider (stays on Vercel)
- Adding a CMS or external content source
- Flattening the monorepo structure
- Enabling cacheComponents or other experimental Next.js features
- Adding knip to CI (will be done once it passes locally)
- Playwright or E2E test setup

## Further Notes

- The fumadocs-mdx migration (step 7) is the largest and riskiest step. It changes the content authoring format (export const metadata → YAML frontmatter), moves files, and rewires the routing. This step should be reviewed carefully.
- The feed route (RSS/Atom/JSON) depends on the blog engine and must be updated as part of step 7, not deferred.
- Several dependencies being removed (remark-parse, remark-mdx, unified) are currently only used in next.config.mjs for the injectPageHeaderAndFooter remark plugin. They are not used in application code.
- TypeScript 6.0 is the last JS-based release before the Go rewrite (TS 7.0). The ts5to6 migration CLI handles most mechanical changes.
- The Temporal polyfill is server-only after removing the age page, so there is no client bundle size concern.
- Dependabot PRs on the repository (next bump, dompurify bump) will be superseded by this work.
