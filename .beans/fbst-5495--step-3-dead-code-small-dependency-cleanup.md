---
# fbst-5495
title: 'Step 3: Dead code & small dependency cleanup'
status: completed
type: task
priority: normal
created_at: 2026-04-01T13:35:31Z
updated_at: 2026-04-01T14:41:54Z
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


## Summary of Changes

- Deleted age page (`app/(not-prose)/age/`)
- Deleted mastodon service (`lib/services/mastodon.ts`) and toot embed (`ui/embeds/toot.tsx`)
- Removed dead `.toot-content` CSS from `global.css`
- Simplified `useClipboard` hook to use native `navigator.clipboard.writeText()` with error handling
- Dropped `copy-to-clipboard`, `immer`, and `unlazy` from dependencies
