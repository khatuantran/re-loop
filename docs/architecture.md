# RE-LOOP — Architecture Spec

## 1. Tổng quan

RE-LOOP là nền tảng kinh tế tuần hoàn cho rác điện tử, gồm 4 vai trò:

| App           | Đối tượng                   | Thiết bị chính                   | Mục đích                                     |
| ------------- | --------------------------- | -------------------------------- | -------------------------------------------- |
| **Customer**  | Người dùng cuối B2C         | Mobile (must) + Web              | Bán/đổi đồ điện tử cũ, tracking đơn          |
| **Collector** | Tài xế thu gom              | Mobile (must)                    | Nhận đơn, lập tuyến, xác nhận pickup         |
| **Hub**       | Operator nhà máy tháo rã    | Desktop (chính), tablet          | Dashboard KPI, workflow tháo rã, tạo lot B2B |
| **Portal**    | Buyer B2B / nhà máy tái chế | Desktop (chính), mobile (browse) | Đấu giá lot, ESG dashboard, traceability     |

4 app **độc lập về deploy** (4 site Netlify riêng) nhưng chia sẻ design system & utilities qua package `@reloop/ui`.

## 2. Stack

- **Runtime**: React 18.3
- **Build**: Vite 5 (ESM, dev server HMR, build static)
- **Styling**: Tailwind CSS 3.4 + PostCSS, preset chung từ `@reloop/ui/tailwind.preset.js`
- **Routing**: react-router-dom 6 (BrowserRouter, URL-based, hỗ trợ deep link & back button)
- **State**: `useState` + `Context` cục bộ. Không dùng Redux/Zustand vì hiện toàn mock data.
- **Fonts**: `@fontsource/be-vietnam-pro`, `@fontsource/jetbrains-mono` (self-host, tránh CDN Google)
- **Lint**: ESLint + Prettier root
- **Monorepo**: pnpm workspaces + Turborepo (cache build, chạy song song)

## 3. Cấu trúc thư mục

```
re-loop/
├── apps/
│   ├── customer/
│   │   ├── src/
│   │   │   ├── main.jsx
│   │   │   ├── App.jsx               # routes
│   │   │   ├── index.css             # @tailwind + animations import
│   │   │   ├── screens/              # 1 screen / file
│   │   │   ├── components/           # local components, layout
│   │   │   └── data/                 # mock data
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js        # extends preset từ @reloop/ui
│   │   ├── postcss.config.js
│   │   ├── netlify.toml
│   │   └── package.json
│   ├── collector/                    # cấu trúc giống
│   ├── hub/
│   └── portal/
├── packages/
│   └── ui/                           # @reloop/ui
│       ├── src/
│       │   ├── index.js              # entry: re-export tất cả
│       │   ├── icons.jsx             # ~50 icons named export (IconLeaf, IconBolt...)
│       │   ├── atoms.jsx             # Btn, Card, Pill, Field, Input, PhoneFrame
│       │   ├── charts.jsx            # Spark
│       │   ├── hooks.js              # useCountUp, useMediaQuery
│       │   ├── format.js             # fmtVnd, fmtNum
│       │   └── animations.css        # keyframes shimmer/slide-in/pulse-dot/...
│       ├── tailwind.preset.js
│       └── package.json
├── docs/
│   ├── architecture.md (file này)
│   ├── sdd-process.md
│   ├── tracking.md
│   └── specs/                        # 1 file per feature spec
└── RE-LOOP/                          # source HTML cũ — read-only reference
```

## 4. Design system (preset Tailwind)

| Token       | Giá trị                                                       |
| ----------- | ------------------------------------------------------------- |
| Primary     | emerald (50–900)                                              |
| Accent      | amber (50–900)                                                |
| Info        | sky                                                           |
| Danger      | rose                                                          |
| Neutral     | slate                                                         |
| Background  | `#F4F6F4`                                                     |
| Font sans   | Be Vietnam Pro                                                |
| Font mono   | JetBrains Mono                                                |
| Radius card | `rounded-2xl` (Customer/Collector), `rounded-xl` (Hub/Portal) |

Animations: `shimmer`, `slide-in`, `pulse-dot`, `ping-slow`, `lift` (hover), `truck-move`. Khai báo trong `animations.css` của package shared.

## 5. Mobile responsive strategy

**Breakpoints (Tailwind default):**

- `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px

**Pattern chung:**

- Layout chính: `flex` mobile-stack, `md:grid` desktop
- Navigation: bottom-nav `<md`, sidebar `≥md`
  ```jsx
  <nav className="md:hidden fixed bottom-0 inset-x-0 ...">{/* bottom */}</nav>
  <aside className="hidden md:flex w-60 ...">{/* sidebar */}</aside>
  ```
- Tables → card list mobile: `<div className="md:hidden ...">` cards + `<table className="hidden md:table">`
- Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Padding container: `px-4 md:px-6 lg:px-8`
- Customer app **bỏ PhoneFrame** wrapper — render thẳng vào viewport

**Test viewport bắt buộc:**

- 375×667 (iPhone SE)
- 768×1024 (iPad)
- 1280×800 (Desktop)

**Hub & Portal** ưu tiên desktop nhưng phải không vỡ ở 768px (read-only mobile usable).

## 6. Routing per app

| App       | Routes                                                 |
| --------- | ------------------------------------------------------ |
| Customer  | `/` `/flow-a` `/flow-b` `/auction` `/tracking` `/cert` |
| Collector | `/` (inbox) `/route` `/pickup` `/earnings` `/profile`  |
| Hub       | `/` (dashboard) `/disassembly` `/marketplace`          |
| Portal    | `/` (marketplace) `/lot/:id` `/esg` `/journey`         |

Mỗi app dùng `<BrowserRouter>` + `<Routes>` ở `App.jsx`.

## 7. Deploy Netlify

**4 site độc lập**, mỗi site config riêng:

```toml
# apps/customer/netlify.toml
[build]
  base    = "apps/customer"
  command = "cd ../.. && corepack enable && pnpm install --frozen-lockfile && pnpm build --filter=@reloop/customer"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--version"
  PNPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to   = "/index.html"
  status = 200
```

Build cmd phải chạy ở root để pnpm cài workspace deps đúng.

## 8. Data layer

Hiện 100% mock data trong từng `apps/<name>/src/data/*.js`. Khi tích hợp API thật sau này:

- Thêm `apps/<name>/src/api/client.js` (fetch wrapper)
- Hoặc thêm `packages/api-client` shared
- Khi đó cân nhắc thêm React Query / SWR

## 9. Versioning & release

- Mỗi app có version riêng trong `package.json`
- Netlify auto-deploy khi push `main`
- Branch deploy preview cho mỗi PR
