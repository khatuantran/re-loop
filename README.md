# RE-LOOP — Circular Economy Platform

Monorepo gồm 4 ứng dụng React của hệ sinh thái RE-LOOP, mỗi app deploy độc lập lên Netlify.

| App | Đối tượng | Dev port | Thiết bị chính |
|---|---|---|---|
| `apps/customer` | Người dùng cuối B2C | 5173 | Mobile + Web |
| `apps/collector` | Tài xế thu gom | 5174 | Mobile |
| `apps/hub` | Operator nhà máy | 5175 | Desktop, tablet |
| `apps/portal` | Buyer B2B | 5176 | Desktop, mobile browse |

## Cấu trúc

```
re-loop/
├── apps/{customer,collector,hub,portal}/   # 4 React app độc lập
├── packages/ui/                            # Shared @reloop/ui (icons, atoms, hooks)
├── docs/
│   ├── architecture.md
│   ├── sdd-process.md
│   ├── tracking.md                         # Single source of truth
│   └── specs/
├── RE-LOOP/                                # Source HTML cũ (read-only reference)
├── CLAUDE.md                               # Rule cho AI assistant
├── package.json                            # workspace root
├── pnpm-workspace.yaml
├── turbo.json
└── .nvmrc                                  # Node 20
```

## Yêu cầu môi trường

- **Node 20** (xem `.nvmrc` / `.node-version`)
- **pnpm 9+** (cài qua `corepack`, không cần `npm install -g`)

## Cài đặt lần đầu

```bash
# 1. Đảm bảo Node 20
nvm install 20
nvm use

# 2. Bật corepack + pnpm
corepack enable
corepack prepare pnpm@9.15.0 --activate
pnpm --version    # → 9.x

# 3. Cài deps cho toàn workspace
pnpm install
```

## Phát triển

```bash
# Chạy 1 app (mở browser tự động)
pnpm dev --filter=@reloop/customer    # → http://localhost:5173
pnpm dev --filter=@reloop/collector   # → http://localhost:5174
pnpm dev --filter=@reloop/hub         # → http://localhost:5175
pnpm dev --filter=@reloop/portal      # → http://localhost:5176

# Chạy tất cả 4 app song song
pnpm dev

# Lint toàn repo
pnpm lint

# Build production tất cả
pnpm build

# Preview production build
pnpm preview --filter=@reloop/customer
```

## Mobile responsive — test bắt buộc

Mỗi app phải pass 3 viewport. Trong Chrome DevTools → Toggle Device Toolbar:

- **375 × 667** (iPhone SE) — Customer & Collector phải usable, không scroll ngang
- **768 × 1024** (iPad) — Hub & Portal không được vỡ
- **1280 × 800** (Desktop) — UI giống prototype gốc

## Deploy Netlify

**4 site Netlify riêng biệt** — hướng dẫn step-by-step (tiếng Việt + troubleshooting): [docs/deploy-netlify.md](docs/deploy-netlify.md).

Tóm tắt:

1. Netlify dashboard → **Add new site** → import repo
2. **Base directory:** `apps/<name>` (vd `apps/customer`)
3. **Package directory / Build command / Publish directory:** để **trống** — Netlify tự đọc từ `apps/<name>/netlify.toml`
4. Deploy. Auto-deploy khi push `main`. Branch preview cho mỗi PR.

Build command tự gọi `corepack enable && pnpm install --frozen-lockfile && pnpm build --filter=@reloop/<name>` từ workspace root.

## Stack

- **React 18.3** + **Vite 5** (dev HMR, build static)
- **Tailwind CSS 3.4** + PostCSS (KHÔNG dùng CDN), preset chung từ `@reloop/ui/tailwind.preset`
- **react-router-dom 6** — URL routes, hỗ trợ deep link & back button
- **State**: `useState` + Context cục bộ (no Redux/Zustand)
- **Fonts**: `@fontsource/be-vietnam-pro` + `@fontsource/jetbrains-mono` (self-host)
- **Lint**: ESLint 8 + `eslint-plugin-react` + Prettier
- **Monorepo**: pnpm workspaces + Turborepo

## Quy trình SDD

Mọi feature/task lớn theo **Spec-Driven Development**: Spec → Plan → Implement → Verify+Track. Chi tiết: [docs/sdd-process.md](docs/sdd-process.md). Trạng thái mọi task: [docs/tracking.md](docs/tracking.md).

## Tài liệu

- [docs/architecture.md](docs/architecture.md) — Spec kiến trúc tổng
- [docs/sdd-process.md](docs/sdd-process.md) — Quy trình SDD 4 bước
- [docs/tracking.md](docs/tracking.md) — Bảng task, single source of truth
- [docs/specs/](docs/specs/) — Spec từng feature lớn
- [CLAUDE.md](CLAUDE.md) — Rule bắt buộc cho AI assistant
