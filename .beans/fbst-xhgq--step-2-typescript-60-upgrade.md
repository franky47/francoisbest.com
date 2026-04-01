---
# fbst-xhgq
title: 'Step 2: TypeScript 6.0 upgrade'
status: todo
type: task
created_at: 2026-04-01T13:35:22Z
updated_at: 2026-04-01T13:35:22Z
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
