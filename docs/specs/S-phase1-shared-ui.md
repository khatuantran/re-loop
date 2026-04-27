# S-phase1: Shared package `@reloop/ui`

## Context

4 app sẽ import atoms/icons/animations dùng chung từ một package thay vì duplicate code và global `window.Icon` như prototype cũ. Phase 1 build package này trước Phase 2-5 vì các app phụ thuộc.

## User story

Là developer 1 trong 4 app, tôi muốn `import { Btn, Card, IconLeaf } from '@reloop/ui'` để khỏi duplicate component và để khi sửa atoms thì tất cả app cùng cập nhật.

## Acceptance criteria

- [ ] Package `@reloop/ui` resolve được trong workspace (pnpm symlink vào `apps/*/node_modules`)
- [ ] Tất cả icon trong [RE-LOOP/src/icons.jsx](../../RE-LOOP/src/icons.jsx) export named (`IconLeaf`, `IconRecycle`, ...). Không dùng `window.Icon`.
- [ ] Atoms (`Btn`, `Card`, `Pill`, `PhoneFrame`, `Spark`, `Field`, `Input`) export named, hỗ trợ variants gộp Customer + Hub (HBtn `variant="dark"` thay vì component riêng).
- [ ] Hooks (`useCountUp`, `useMediaQuery`) và utils (`fmtVnd`, `fmtNum`) export named.
- [ ] `tailwind.preset.js` export config có palette emerald/amber/sky/rose/slate, fonts Be Vietnam Pro / JetBrains Mono, animations.
- [ ] `animations.css` import được từ app, gồm: shimmer, slide-in, pulse-dot, ping-slow, lift, map-grid, cert-paper.

## Plan

**File mới:**

- `packages/ui/package.json` — name `@reloop/ui`, exports field
- `packages/ui/src/index.js` — re-export tất cả
- `packages/ui/src/icons.jsx` — port 50 icons → named exports
- `packages/ui/src/atoms.jsx` — Btn, Card, Pill, PhoneFrame, Field, Input (merge Customer + Hub variants)
- `packages/ui/src/charts.jsx` — Spark
- `packages/ui/src/hooks.js` — useCountUp + useMediaQuery (mới, hỗ trợ responsive logic)
- `packages/ui/src/format.js` — fmtVnd, fmtNum
- `packages/ui/src/animations.css` — keyframes + utility classes
- `packages/ui/tailwind.preset.js` — Tailwind preset

**Quyết định thiết kế:**

- `Btn` gộp variants từ Customer (`primary`, `primarySolid`, `secondary`, `ghost`, `dark`, `danger`) + Hub (`primaryLight`, `disabled`). Hub dùng prop `radius="md"` để có border-radius nhỏ hơn (rounded-lg vs rounded-[10px]).
- `Card` thêm prop `variant="hub"` để dùng `rounded-xl` thay vì `rounded-2xl`.
- `Pill` thêm tone `dark` từ Hub.
- Icon naming: `IconLeaf` thay vì `Icon.Leaf` (named export, tree-shakeable).
- Package dùng JSX trực tiếp, không pre-build — Vite của mỗi app sẽ transform khi import (cấu hình `optimizeDeps.include`).

## Out of scope

- Storybook / visual test
- TypeScript types
- Unit test (sẽ thêm ở Phase 6 nếu cần)

## References

- [RE-LOOP/src/icons.jsx](../../RE-LOOP/src/icons.jsx)
- [RE-LOOP/src/shared.jsx](../../RE-LOOP/src/shared.jsx)
- [RE-LOOP/hub/HShared.jsx](../../RE-LOOP/hub/HShared.jsx)
- [RE-LOOP/RE-LOOP-User-Standalone-src.html](../../RE-LOOP/RE-LOOP-User-Standalone-src.html) (animations CSS gốc)
