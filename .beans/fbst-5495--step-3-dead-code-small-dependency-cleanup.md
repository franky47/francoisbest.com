---
# fbst-5495
title: 'Step 3: Dead code & small dependency cleanup'
status: todo
type: task
created_at: 2026-04-01T13:35:31Z
updated_at: 2026-04-01T13:35:31Z
parent: fbst-9pj9
blocked_by:
  - fbst-xhgq
---

Remove dead code and replace trivially-replaceable dependencies.

## Dead Code Removal

- Delete the age page (`app/(not-prose)/age/`)
- Delete mastodon service (`lib/services/mastodon.ts`)
- Delete toot embed component (`ui/embeds/toot.tsx`)
- Remove any remaining references to the above

## Dependency Cleanup

- Drop `immer` — zero imports found in codebase
- Drop `unlazy` — only used by mastodon service (being deleted)
- Drop `copy-to-clipboard` — replace single usage in `ui/hooks/useClipboard.ts` with native `navigator.clipboard.writeText()`

## Validation

- `pnpm build` passes
- No broken imports
- Affected pages still render (or are intentionally removed)
