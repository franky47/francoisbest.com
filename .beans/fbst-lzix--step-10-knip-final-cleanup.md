---
# fbst-lzix
title: 'Step 10: knip + final cleanup'
status: todo
type: task
created_at: 2026-04-01T13:36:54Z
updated_at: 2026-04-01T13:36:54Z
parent: fbst-9pj9
blocked_by:
  - fbst-p7fj
---

Add knip for dead code detection and do a final cleanup pass.

## Tasks

- Add `knip` as dev dependency
- Add `"knip": "knip"` script to package.json
- Configure knip if needed (entry points, ignore patterns)
- Run knip and fix all findings:
  - Unused dependencies
  - Unused exports
  - Unused files
  - Unused types
- Remove any remaining dead code discovered by knip

## Validation

- `pnpm knip` passes clean (or with only intentional exceptions configured)
- `pnpm build` passes
- `pnpm test` passes
- All previous migration steps remain stable
