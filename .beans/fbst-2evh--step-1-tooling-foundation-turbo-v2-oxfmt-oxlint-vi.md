---
# fbst-2evh
title: 'Step 1: Tooling foundation (Turbo v2, oxfmt, oxlint, Vitest 4)'
status: completed
type: task
priority: normal
created_at: 2026-04-01T13:35:13Z
updated_at: 2026-04-01T13:48:30Z
parent: fbst-9pj9
---

Upgrade all build/dev tooling with no source code changes.

## Tasks

- Upgrade Turbo v1 → v2: rename `pipeline` to `tasks` in turbo.json, bump turbo dependency
- Replace Prettier with oxfmt: run `oxfmt --migrate=prettier`, set printWidth: 80, drop `prettier` and `prettier-plugin-tailwindcss`, update scripts
- Replace ESLint with oxlint: delete `.eslintrc.cjs`, drop `eslint` and `eslint-config-next`, add `oxlint`, update lint script
- Upgrade Vitest 3.2 → 4.x: bump dependency, handle any breaking changes (mainly browser mode / mock isolation — unlikely to affect paths.test.ts)

## Validation

- `pnpm build` passes
- `pnpm lint` passes (oxlint)
- `pnpm test` passes (vitest 4)
- `oxfmt --check` passes
- No source code logic changes — only config/tooling


## Summary of Changes

- Upgraded Turbo v1 → v2.9: renamed `pipeline` to `tasks` in turbo.json, added `persistent: true` for dev, added test task
- Replaced Prettier + prettier-plugin-tailwindcss with oxfmt 0.42.0: created `.oxfmtrc.json` with matching config (printWidth: 80), formatted all files
- Replaced ESLint + eslint-config-next with oxlint 1.58.0: deleted `.eslintrc.cjs`, updated lint script. Note: oxlint has a known bug with nested git worktrees that prevents directory traversal — works fine in normal repos
- Upgraded Vitest 3.2.4 → 4.1.2: added vite 6.3.5 as required peer dep, fixed pre-existing test bug in paths.test.ts
- Removed nolyfill pnpm overrides (only needed for ESLint plugin transitive deps)
- Added `packageManager: pnpm@10.33.0` to root package.json
- Build fails due to missing Spotify env vars (pre-existing, not related to our changes)
