---
# fbst-p7fj
title: 'Step 9: dayjs → Temporal'
status: todo
type: task
created_at: 2026-04-01T13:36:47Z
updated_at: 2026-04-01T13:36:47Z
parent: fbst-9pj9
blocked_by:
  - fbst-abdk
---

Replace dayjs with Temporal API + polyfill for server-side date operations.

## Usage Sites (after age page removal in step 3)

### npm.ts (server-only)

- `dayjs().subtract(n, 'day').format('YYYY-MM-DD')` → `Temporal.Now.plainDateISO().subtract({ days: n }).toString()`
- `dayjs('2015-01-10')` → `Temporal.PlainDate.from('2015-01-10')`
- `.add(18, 'month')` → `.add({ months: 18 })`
- `.isBefore(now)` → `Temporal.PlainDate.compare(a, b) < 0`
- `.endOf('day').format('YYYY-MM-DD')` → `.toString()` (PlainDate has no time component)

### svg-curve-graph.tsx (server component)

- `dayjs(lastDate).subtract(data.length - 1 - i, 'day').format('DD MMM')` → `Temporal.PlainDate.from(lastDate).subtract({ days: n }).toLocaleString('en', { day: '2-digit', month: 'short' })`

## Tasks

- Add Temporal polyfill (server-only, no client bundle concern)
- Rewrite date operations in npm.ts
- Rewrite date formatting in svg-curve-graph.tsx
- Drop `dayjs` dependency

## Validation

- NPM package embeds display correct date ranges and download counts
- SVG curve graph tooltips show correct dates
- `pnpm build` passes
