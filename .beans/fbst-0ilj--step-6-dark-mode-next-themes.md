---
# fbst-0ilj
title: 'Step 6: Dark mode → next-themes'
status: todo
type: task
created_at: 2026-04-01T13:36:10Z
updated_at: 2026-04-01T13:36:10Z
parent: fbst-9pj9
blocked_by:
  - fbst-qp1g
---

Replace hand-rolled dark mode system with next-themes.

## Current System (to remove)

- Inline `<script>` in layout.tsx for FOUC prevention
- localStorage-based persistence
- `mitt` event emitter in `ui/theme/theme.ts` for cross-component sync
- `storage` event listener for cross-tab sync
- Manual `.dark` class toggling on `<html>`

## Tasks

- Add `next-themes` dependency
- Wrap app in `<ThemeProvider>` in layout.tsx (attribute="class", defaultTheme="system")
- Remove inline `loadTheme` script from layout.tsx
- Rewrite `ui/theme/theme.ts` to use next-themes hooks
- Update `ui/components/theme-controls.tsx` to use `useTheme()` from next-themes
- Remove `mitt` import from theme.ts (mitt still used by useLocalSetting.ts and \_sqlocal/db.ts, so keep the dependency)
- Keep the `@custom-variant dark` in global.css (next-themes will apply the `.dark` class)

## Validation

- Dark mode toggles correctly
- Theme persists across page reloads
- Theme syncs across tabs
- No FOUC on initial load
- System preference detection works
