# RE-LOOP — Task Tracking

> **Single source of truth** cho trạng thái dự án. Cập nhật ngay sau mỗi task.
>
> Trạng thái: ✅ Done · 🟡 In progress · ⬜ Todo · ❌ Blocked

**Cập nhật lần cuối:** 2026-04-27

## Tổng quan

| Phase                         | Done  | Total  | %       |
| ----------------------------- | ----- | ------ | ------- |
| Phase 0 — Foundation          | 4     | 4      | 100%    |
| Phase 1 — Shared `@reloop/ui` | 5     | 5      | 100%    |
| Phase 2 — Customer app        | 5     | 5      | 100%    |
| Phase 3 — Collector app       | 5     | 5      | 100%    |
| Phase 4 — Hub app             | 5     | 5      | 100%    |
| Phase 5 — Portal app          | 5     | 5      | 100%    |
| Phase 6 — Polish & QA         | 4     | 4      | 100%    |
| **Tổng**                      | **33**| **33** | **100%**|

---

## Phase 0 — Foundation

| ID   | Status | Task                                                                                                                                | Acceptance                                                  | Note                     |
| ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------ |
| F-01 | ✅     | Workspace root (`package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.gitignore`, `.editorconfig`, `.prettierrc`, `.eslintrc.cjs`) | `pnpm install` chạy được                                    | Hoàn tất 2026-04-27      |
| F-02 | ✅     | `docs/architecture.md`                                                                                                              | Có cấu trúc folder, stack, deploy flow, responsive strategy | Hoàn tất 2026-04-27      |
| F-03 | ✅     | `docs/sdd-process.md` + `docs/tracking.md`                                                                                          | Có quy trình 4 bước + bảng task khởi tạo                    | Hoàn tất 2026-04-27      |
| F-04 | ✅     | Cài & verify ESLint + Prettier (`pnpm install` + `pnpm lint`)                                                                       | `pnpm lint` exit 0, `prettier --check` clean                | Hoàn tất 2026-04-27      |

## Phase 1 — Shared package `@reloop/ui`

| ID   | Status | Task                                                                                                                                                    | Acceptance                                                              |
| ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| S-01 | ✅     | `packages/ui/package.json` + entry `src/index.js`                                                                                                       | name `@reloop/ui`, exports `.`, `./animations.css`, `./tailwind.preset` |
| S-02 | ✅     | Port `icons.jsx` → named exports (~50 icons)                                                                                                            | `IconLeaf` ... `IconEye` (named), bỏ `window.Icon`                      |
| S-03 | ✅     | Port `shared.jsx` → atoms (Btn, Card, Pill, PhoneFrame, Spark, Field, Input, useCountUp, useMediaQuery, fmtVnd, fmtNum)                                 | Tất cả named export trong `@reloop/ui`                                  |
| S-04 | ✅     | Merge `HShared.jsx` variants → `<Btn variant="primarySolid/primaryLight" radius="lg">`, `<Card variant="hub">`, `<Pill tone="dark">`                    | Hub có thể dùng atoms shared                                            |
| S-05 | ✅     | `tailwind.preset.js` + `animations.css` (shimmer, slide-in, pulse-dot, ping-slow, lift, no-scrollbar, grain, map-grid, map-roads, cert-paper, photo-ph) | Apps extend preset thành công                                           |

## Phase 2 — Customer app (`apps/customer`)

| ID   | Status | Task                                                                | Acceptance                                          |
| ---- | ------ | ------------------------------------------------------------------- | --------------------------------------------------- |
| C-01 | ✅     | Scaffold Vite + Tailwind + react-router                             | `pnpm dev` ok, build clean (248KB JS gzipped 72KB)  |
| C-02 | ✅     | Routes + Layout (Sidebar + TopBar + BottomNav + Drawer)             | URL routes ok, active state đúng, drawer mobile ok  |
| C-03 | ✅     | Port 6 Screens dùng `@reloop/ui`, `useNavigate`, mock data tách `data/home.js` | Render đúng như standalone                  |
| C-04 | ✅     | Responsive: BottomNav `<md`, Sidebar drawer mobile, grid-cols-1 → md:grid-cols-12, padding co lại, table scroll-x | Built-in cùng C-03 |
| C-05 | ✅     | `netlify.toml` + build production verified                          | `dist/` 248KB JS · 68KB CSS, deployable             |

## Phase 3 — Collector app (`apps/collector`)

| ID    | Status | Task                                                      | Acceptance    |
| ----- | ------ | --------------------------------------------------------- | ------------- |
| Co-01 | ✅     | Scaffold Vite + Tailwind + react-router (port 5174)       | Build clean 240KB JS · 66KB CSS |
| Co-02 | ✅     | Routes + Layout (Sidebar + online toggle + TopBar + BottomNav 5 tab + Drawer) | URL routes ok |
| Co-03 | ✅     | Port 5 screens (CInbox, CRoute, CPickup, CEarnings, CProfile) — Earnings/Profile extract từ CApp.jsx | Render đúng |
| Co-04 | ✅     | Responsive: bottom-nav 5 tab có badge, sidebar drawer mobile, earnings table → card list, online toggle hiện top-bar mobile | 375px usable cho driver |
| Co-05 | ✅     | `netlify.toml` + build verified                           | Deploy-ready |

## Phase 4 — Hub app (`apps/hub`)

| ID   | Status | Task                                            | Acceptance     |
| ---- | ------ | ----------------------------------------------- | -------------- |
| H-01 | ✅     | Scaffold Vite + Tailwind + react-router (port 5175)            | Build clean 207KB JS · 56KB CSS |
| H-02 | ✅     | Routes + Layout (Sidebar `≥lg` + Drawer `<lg` + mobile topbar) | URL routes ok                   |
| H-03 | ✅     | Port 3 screens (HDashboard, HDisassembly, HMarketplace) bỏ HShared dùng `@reloop/ui` (Btn radius=lg, Card variant=hub, Pill tone=dark) | Render đúng |
| H-04 | ✅     | Responsive: grid 1/2/3 col, table scroll-x, drawer mobile, breakpoint `lg` cho sidebar (Hub desktop-first) | 768px tablet không vỡ |
| H-05 | ✅     | `netlify.toml` + build verified                                | Deploy-ready                    |

## Phase 5 — Portal app (`apps/portal`)

| ID   | Status | Task                                              | Acceptance   |
| ---- | ------ | ------------------------------------------------- | ------------ |
| P-01 | ✅     | Scaffold Vite + Tailwind + react-router (port 5176)             | Build clean 227KB JS · 60KB CSS |
| P-02 | ✅     | Routes: `/`, `/lot/:id`, `/esg`, `/journey` (deep link `useParams`) | URL routes + drawer mobile ok |
| P-03 | ✅     | Port 4 screens (PMarketplace, PLotDetail, PESG, PJourney) — bỏ HShared/HCard duplicate, dùng `@reloop/ui` atoms với variant=hub. Tách `data/lots.js` shared | Render đúng |
| P-04 | ✅     | Responsive: filter sidebar `≥lg` + drawer `<lg`, marketplace grid 1/2/3 col, ESG table → card list mobile, lot detail bid panel stack mobile, timeline circle 56→72px | 375px usable |
| P-05 | ✅     | `netlify.toml` + build verified                                 | Deploy-ready                    |

## Phase 6 — Polish & QA

| ID   | Status | Task                                            | Acceptance      |
| ---- | ------ | ----------------------------------------------- | --------------- |
| Q-01 | ✅     | Cleanup unused imports + lint clean — thêm `eslint-plugin-react` để fix false-positive JSX usage | 0 errors, 0 warnings · 5/5 lint task pass |
| Q-02 | ✅     | Verify 4/4 apps build clean (auto). Lighthouse manual test — checklist trong [docs/qa-checklist.md](qa-checklist.md) | 4/4 turbo build successful |
| Q-03 | ✅     | README + dev/deploy guide đầy đủ — Node 20, corepack pnpm, Netlify deploy steps cho 4 site | [README.md](../README.md) |
| Q-04 | ✅     | Final tracking review + manual QA checklist tạo cho cross-browser/responsive/Lighthouse | [docs/qa-checklist.md](qa-checklist.md) |

---

## Specs liên quan

- `docs/specs/` — sẽ được tạo khi vào từng task lớn (S-03, C-03, C-04, ...)

## Changelog

- 2026-04-27: Khởi tạo monorepo, hoàn thành F-01 / F-02 / F-03.
- 2026-04-27: Tạo `CLAUDE.md` ở root — rule bắt buộc cho AI assistant + reference đến docs.
- 2026-04-27: Pin Node 20 (`.nvmrc`, `.node-version`, `engines.node` >=20).
- 2026-04-27: Hoàn thành Phase 1 — package `@reloop/ui` (S-01 → S-05). Tạo spec [docs/specs/S-phase1-shared-ui.md](specs/S-phase1-shared-ui.md). Files: `packages/ui/{package.json,tailwind.preset.js,src/{index.js,icons.jsx,atoms.jsx,charts.jsx,hooks.js,format.js,animations.css}}`.
- 2026-04-27: F-04 ✅ — `pnpm install` (107 deps) + `pnpm lint` (turbo) exit 0; `prettier --write` áp dụng formatting toàn repo. Phase 0 100% complete.
- 2026-04-27: Hoàn thành Phase 2 — Customer app (C-01 → C-05). Scaffold Vite + Tailwind + react-router-dom, layout responsive (Sidebar `≥md` + Drawer `<md` + TopBar + BottomNav). Port 6 screens (Home, FlowA, FlowB, Auction, Tracking, Cert) từ `RE-LOOP/src/` với `@reloop/ui` named imports + responsive breakpoints. Build clean: 248KB JS / 68KB CSS. Spec [docs/specs/C-phase2-customer-app.md](specs/C-phase2-customer-app.md).
- 2026-04-27: Hoàn thành Phase 3 — Collector app (Co-01 → Co-05). Scaffold port 5174, layout có online toggle (sidebar + topbar mobile), bottom-nav 5 tab có badge. Port 5 screens (CInbox, CRoute, CPickup, CEarnings, CProfile) — Earnings/Profile extract từ CApp.jsx (742 LOC) sang file riêng. Earnings table responsive (card list mobile + table desktop). Build clean: 240KB JS / 66KB CSS.
- 2026-04-27: Hoàn thành Phase 4 — Hub app (H-01 → H-05). Scaffold port 5175, desktop-first (sidebar `≥lg`, drawer + topbar `<lg`). Port 3 screens (HDashboard, HDisassembly, HMarketplace) — bỏ HShared.jsx, dùng `@reloop/ui` atoms (Btn radius=lg, Card variant=hub, Pill tone=dark/earth). Disassembly table scroll-x mobile. Build: 207KB JS / 56KB CSS. Lint script đổi sang glob pattern (eslint v8 quirk).
- 2026-04-27: Hoàn thành Phase 5 — Portal app (P-01 → P-05). Scaffold port 5176, top-tabs nav (drawer `<md`). Port 4 screens (PMarketplace, PLotDetail, PESG, PJourney) — deep link `/lot/:id` với `useParams`. Filter sidebar → drawer mobile. Bid panel desktop sticky / mobile stack. ESG table responsive. Tách `data/lots.js` shared giữa Marketplace + LotDetail. Build: 227KB JS / 60KB CSS.
- 2026-04-27: Hoàn thành Phase 6 — Polish & QA (Q-01 → Q-04). Thêm `eslint-plugin-react` + rule `jsx-uses-vars` → fix toàn bộ false-positive unused-var (115 → 0). 4/4 apps build clean. README mở rộng với Node 20 + corepack + Netlify deploy guide. QA checklist manual tạo tại `docs/qa-checklist.md` cho cross-browser, responsive 375/768/1280, Lighthouse mobile >85, deploy 4 site Netlify. **Project 100% complete (33/33 task ✅).**
