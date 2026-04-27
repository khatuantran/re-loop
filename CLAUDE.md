# CLAUDE.md — Hướng dẫn cho AI assistant trên dự án RE-LOOP

> File này được Claude Code đọc tự động ở đầu mỗi session. Mọi rule ở đây là **bắt buộc** khi làm việc trong repo này.

## 1. Bối cảnh dự án (1 phút đọc)

RE-LOOP là nền tảng kinh tế tuần hoàn rác điện tử, gồm **4 React app độc lập** deploy riêng lên Netlify:

| App              | Đối tượng        | Thiết bị chính         |
| ---------------- | ---------------- | ---------------------- |
| `apps/customer`  | Người dùng B2C   | Mobile (must) + Web    |
| `apps/collector` | Tài xế thu gom   | Mobile (must)          |
| `apps/hub`       | Operator nhà máy | Desktop, tablet        |
| `apps/portal`    | Buyer B2B        | Desktop, mobile browse |

Code dùng chung ở `packages/ui` (`@reloop/ui`). Source prototype gốc ở `RE-LOOP/` (read-only reference, **không build, không sửa**).

## 2. Tài liệu cần đọc trước khi làm việc

**Bắt buộc đọc theo thứ tự khi vào việc mới:**

1. [docs/architecture.md](docs/architecture.md) — Kiến trúc tổng, stack, cấu trúc folder, design system, mobile strategy, deploy.
2. [docs/sdd-process.md](docs/sdd-process.md) — Quy trình **SDD (Spec-Driven Development)** 4 bước: Spec → Plan → Implement → Verify+Track. **Mọi feature lớn phải theo quy trình này.**
3. [docs/tracking.md](docs/tracking.md) — **Single source of truth** về trạng thái task. Đọc đầu session để biết đang làm tới đâu, cập nhật ngay sau mỗi task hoàn thành.
4. [docs/specs/](docs/specs/) — Spec cho từng feature lớn (S-03, C-04, ...). Tạo mới khi cần, đặt tên `<task-id>-<slug>.md`.
5. [README.md](README.md) — Quick start cho dev mới.

**Khi user đề cập vấn đề cụ thể, đọc thêm file tham chiếu trong `RE-LOOP/`** (ví dụ port `ScreenAuction` → đọc [RE-LOOP/src/ScreenAuction.jsx](RE-LOOP/src/ScreenAuction.jsx)).

## 3. Stack & ràng buộc kỹ thuật (KHÔNG đổi nếu không có lý do)

- **Build**: Vite 5
- **Runtime**: React 18.3 — chỉ JSX (không TypeScript)
- **Styling**: Tailwind CSS 3.4 + PostCSS (KHÔNG dùng Tailwind CDN)
- **Routing**: react-router-dom 6 — URL routes, không screen-switching qua `useState`
- **State**: `useState` + `Context` cục bộ. **KHÔNG thêm Redux / Zustand / React Query** trừ khi user yêu cầu.
- **Monorepo**: pnpm workspaces + Turborepo
- **Node**: 20 (pin trong `.nvmrc` / `.node-version`), pnpm ≥ 9
- **Fonts**: `@fontsource/be-vietnam-pro`, `@fontsource/jetbrains-mono` (self-host, không Google CDN)
- **Icons**: import từ `@reloop/ui` (named exports). **Cấm dùng `window.Icon`** (anti-pattern cũ).

## 4. Rules bắt buộc (project-wide)

### 4.1 SDD — luôn cập nhật tracking

- Sau **mỗi task** hoàn thành (kể cả nhỏ) → update [docs/tracking.md](docs/tracking.md) ngay, không batch.
- Đổi status: ⬜ Todo → 🟡 In progress → ✅ Done. Nếu gặp blocker → ❌ Blocked + ghi lý do trong cột Note.
- Nếu phát sinh task mới khi làm → thêm vào tracking với ID phù hợp.
- Cập nhật bảng "Tổng quan" (count Done/Total per phase) khi đổi trạng thái.
- Ghi entry mới vào "Changelog" cuối file với date format `YYYY-MM-DD`.

### 4.2 Trước khi viết feature lớn — viết spec

Feature ≥ 10 dòng code mới hoặc động vào > 1 file → tạo `docs/specs/<task-id>-<slug>.md` theo template trong [docs/sdd-process.md](docs/sdd-process.md). Trivial task (typo, đổi text, đổi color) bỏ qua spec, vẫn cập nhật tracking.

### 4.3 Mobile responsive — must have

- **Bắt buộc** test 3 viewport: 375 (iPhone SE), 768 (iPad), 1280 (Desktop).
- Pattern bottom-nav `<md`, sidebar `≥md`. Tables → card list mobile. Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-N`.
- Customer & Collector **phải** usable ở 375px. Hub & Portal **không được vỡ** ở 768px.
- Không dùng `PhoneFrame` wrapper cho production layout (chỉ giữ làm preview component).

### 4.4 Code style

- **JSX**, không TypeScript.
- **Single quote** cho JS, **double quote** cho JSX attributes (theo `.prettierrc`).
- Indent 2 spaces, semicolons on, trailing comma `es5`, printWidth 100.
- Không thêm comment giải thích code rõ-ràng-từ-tên-biến. Chỉ comment cho WHY non-obvious.
- KHÔNG tự thêm error handling cho case không thể xảy ra. KHÔNG tạo abstraction sớm.
- Tên component PascalCase, hook `useXxx`, file screen `ScreenXxx.jsx` hoặc `<Domain>Xxx.jsx` (giữ convention cũ: `CInbox`, `HDashboard`, `PMarketplace`).

### 4.5 Imports

- Atoms / icons / hooks dùng chung → **luôn** import từ `@reloop/ui`. Không duplicate trong app.
- Path local: relative (`./components/Foo`) — không config alias trừ khi cần.
- Thứ tự: external libs → `@reloop/ui` → local relative.

### 4.6 Mock data

- Hiện 100% mock. Đặt trong `apps/<name>/src/data/*.js`, named export.
- Không gọi `fetch` / API thật trừ khi user yêu cầu thêm backend.

### 4.7 Deploy & build

- Mỗi app có `netlify.toml` riêng với `base = "apps/<name>"`.
- Build cmd luôn chạy từ root: `pnpm build --filter=@reloop/<name>`.
- Có SPA redirect `/* → /index.html 200` (cần cho react-router).

### 4.8 Không sửa folder `RE-LOOP/`

`RE-LOOP/` là source standalone HTML cũ — **read-only reference**. Khi cần code/UI → đọc file ở đó để port sang `apps/<name>`, **không edit** file gốc.

### 4.9 Khi không chắc → hỏi

Tránh giả định lớn về business logic, UX, mock data shape. Dùng `AskUserQuestion` khi gặp ngã ba quan trọng.

## 5. Workflow chuẩn cho 1 task

```
1. Đọc docs/tracking.md → xác định task tiếp theo (status ⬜)
2. Nếu task lớn: tạo docs/specs/<id>-<slug>.md
3. Đổi tracking task → 🟡
4. Đọc file nguồn liên quan (RE-LOOP/...) nếu là port
5. Code (commit nhỏ, message: "feat(<task-id>): <mô tả>")
6. Test 375 / 768 / 1280
7. Đổi tracking task → ✅, update count, thêm changelog entry
```

## 6. Cấu trúc thư mục (tham chiếu nhanh)

```
re-loop/
├── apps/{customer,collector,hub,portal}/   # 4 React app độc lập
├── packages/ui/                            # @reloop/ui shared
├── docs/                                   # architecture, sdd-process, tracking, specs/
├── RE-LOOP/                                # source cũ — DO NOT EDIT
├── package.json                            # workspace root
├── pnpm-workspace.yaml
├── turbo.json
└── CLAUDE.md                               # file này
```

## 7. Task ID convention

| Prefix | Phase          |
| ------ | -------------- |
| `F-`   | Foundation     |
| `S-`   | Shared package |
| `C-`   | Customer app   |
| `Co-`  | Collector app  |
| `H-`   | Hub app        |
| `P-`   | Portal app     |
| `Q-`   | QA / Polish    |

Ví dụ: `C-04` = Customer task số 4.
