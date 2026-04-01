---
# fbst-xhgq
title: 'Step 2: TypeScript 6.0 upgrade'
status: completed
type: task
priority: normal
created_at: 2026-04-01T13:35:22Z
updated_at: 2026-04-01T14:08:42Z
parent: fbst-9pj9
blocked_by:
    - fbst-2evh
---

Upgrade TypeScript from 5.8 to 6.0.

## Tasks

- Bump `typescript` to 6.0
- Run `npx @andrewbranch/ts5to6` migration CLI
- Clean up tsconfig.json:
  - Remove `esModuleInterop` (always-on in TS6)
  - Remove or update `target` (ES2017 → ES2025 default, or set explicitly)
  - `strict` is now default — can keep for explicitness
  - Verify `rootDir` default change (now `.`) doesn't break anything
  - Verify `types` default change (now `[]`) doesn't break `@types/*` resolution

## Key Breaking Changes to Watch

- `esModuleInterop` can no longer be `false` — ours is `true`, just remove it
- `target: "ES2017"` — deprecated low targets, default is now ES2025
- `strict` is now default
- `moduleResolution: "classic"` removed — ours is "Bundler", no issue

## Validation

- `pnpm typecheck` passes
- `pnpm build` passes


## Summary of Changes

- Bumped TypeScript from 5.8.3 to 6.0.2
- Removed `esModuleInterop` from tsconfig (redundant with `module: "esnext"` + `moduleResolution: "bundler"`)
- Bumped `target` from ES2017 to ES2022
- Added `src/css.d.ts` ambient module declaration for plain CSS imports (TS6 now requires declarations for side-effect imports)
- ts5to6 migration CLI confirmed no rootDir/baseUrl changes needed
