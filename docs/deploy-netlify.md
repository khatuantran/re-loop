# Hướng dẫn Deploy Netlify — RE-LOOP

> Triển khai 4 app (`customer`, `collector`, `hub`, `portal`) thành **4 site Netlify độc lập** từ cùng một monorepo.

## A. Chuẩn bị (làm 1 lần cho cả 4 site)

### 1. Push code lên Git remote

Netlify cần repo GitHub / GitLab / Bitbucket. Nếu chưa có:

```bash
cd /Users/khatran/Work/re-loop
git init
git add .
git commit -m "Initial RE-LOOP monorepo"
# Push lên GitHub (đổi URL theo repo của bạn)
git remote add origin git@github.com:<your-org>/re-loop.git
git push -u origin main
```

### 2. Tài khoản Netlify

- Đăng ký tại https://app.netlify.com (free tier đủ dùng cho 4 site demo)
- Connect Git provider để Netlify đọc được repo

### 3. (Tuỳ chọn) Cài Netlify CLI

```bash
npm install -g netlify-cli
netlify login
```

Cho phép deploy nhanh từ terminal: `netlify deploy --prod` (không bắt buộc, có thể chỉ dùng dashboard).

---

## B. Setup từng site (lặp lại 4 lần)

Lặp lại các bước sau cho mỗi app trong: **`customer`**, **`collector`**, **`hub`**, **`portal`**.

### B.1 — Tạo site mới

1. Netlify dashboard → **Add new site** → **Import an existing project**
2. Chọn Git provider (GitHub) → chọn repo `re-loop`
3. Branch để deploy: **`main`**

### B.2 — Điền form cấu hình

Form sẽ có các field như screenshot bạn vừa thấy. Điền theo bảng dưới (ví dụ cho app **collector**, đổi tên app cho 3 site còn lại):

| Field Netlify | Giá trị | Ghi chú |
|---|---|---|
| **Runtime** | (để default `Auto`) | Netlify tự detect |
| **Base directory** | `apps/collector` | **Quan trọng** — đổi theo app: `apps/customer`, `apps/hub`, `apps/portal` |
| **Package directory** | (để **trống**) | Netlify tự dùng = base. Nhập vào sẽ gây nhân đôi path |
| **Build command** | (để **trống**, tự đọc từ `netlify.toml`) | Sẽ là `cd ../.. && corepack enable && pnpm install --frozen-lockfile && pnpm build --filter=@reloop/collector` |
| **Publish directory** | (để **trống**, tự đọc từ `netlify.toml`) | Sau khi save sẽ hiển thị `apps/collector/dist` (đúng) |
| **Functions directory** | (để **trống**) | Project không dùng Netlify Functions |

> ⚠️ **Lưu ý quan trọng — bug nhân đôi path:**
> Nếu **Publish directory** hiển thị `apps/collector/apps/collector/dist` (lặp 2 lần) thì cấu hình sai.
> Nguyên nhân: khi `base` được set, mọi path khác phải **relative to base**. Đã fix trong `netlify.toml` với `publish = "dist"` (không phải `apps/collector/dist`).

### B.3 — Deploy

1. Bấm **Deploy site** (hoặc **Deploy <name>**)
2. Chờ 1–3 phút — Netlify chạy lần lượt:
   - Clone repo
   - `cd apps/collector` (theo base)
   - `cd ../..` (về root) → `corepack enable` → `pnpm install --frozen-lockfile` → `pnpm build --filter=@reloop/collector`
   - Upload `apps/collector/dist/` thành CDN
3. Khi xong, Netlify cho URL random như `https://amazing-newton-abc123.netlify.app`

### B.4 — Đổi tên site (tuỳ chọn)

Site settings → **Site information** → **Change site name** →
- `reloop-customer`, `reloop-collector`, `reloop-hub`, `reloop-portal`

URL sẽ thành `https://reloop-customer.netlify.app` (đẹp hơn).

### B.5 — Verify deploy

Mở URL site, kiểm tra:

- [ ] Trang chủ render đúng
- [ ] Click vào nav items → URL đổi, content đổi
- [ ] **Test SPA redirect**: gõ trực tiếp vào URL bar `https://<site>.netlify.app/flow-a` (hoặc route tương ứng từng app), Enter → vẫn render được, **không 404**.
   - Nếu 404 → kiểm tra section `[[redirects]]` trong `netlify.toml` (đã có sẵn `from = "/*" → /index.html 200`).
- [ ] Console DevTools không có lỗi đỏ

### B.6 — Lặp cho 3 site còn lại

Lặp B.1 → B.5, đổi `apps/collector` thành `apps/customer`, `apps/hub`, `apps/portal`.

---

## C. Sau khi deploy 4 site xong

### Branch preview tự động

Netlify mặc định bật preview cho mọi PR. Khi mở Pull Request trên GitHub:
- Netlify tự build và deploy preview link `deploy-preview-<PR>--<site>.netlify.app`
- Comment vào PR với link

Không cần cấu hình thêm.

### Custom domain (tuỳ chọn)

Site settings → **Domain management** → **Add custom domain**:
- VD: `customer.reloop.vn` cho Customer app
- Cần verify DNS qua Netlify DNS hoặc thêm CNAME record bên provider của bạn
- Netlify tự cấp SSL Let's Encrypt

### Environment variables (tương lai)

Hiện 4 app dùng 100% mock data, **không cần env vars**.

Khi tích hợp API thật:
- Site settings → **Environment variables** → **Add a variable**
- Đặt prefix `VITE_` để Vite expose ra client (vd `VITE_API_URL`)
- Trong code dùng `import.meta.env.VITE_API_URL`

---

## D. Troubleshooting

| Lỗi | Nguyên nhân | Fix |
|---|---|---|
| Publish dir = `apps/<name>/apps/<name>/dist` | `publish` trong netlify.toml ghi absolute path khi đã có `base` | Đổi thành `publish = "dist"` (relative to base) — **đã fix** trong cả 4 file |
| Build fail: `pnpm: command not found` | Netlify chạy `npm` mặc định | Build command đã có `corepack enable` để bật pnpm — không cần fix gì thêm |
| Build fail: `Lockfile not found` | `pnpm-lock.yaml` chưa commit | `git add pnpm-lock.yaml && git commit && git push` |
| 404 khi reload `/flow-a` | Thiếu SPA redirect | Đã có sẵn `[[redirects]] from = "/*" to = "/index.html"` trong netlify.toml |
| Node version sai (build fail vì syntax) | Node default cũ | Đã pin `NODE_VERSION = "20"` trong `[build.environment]` |
| Build mất quá 15 phút | Free tier có giới hạn | Bấm "Cancel" → check log lỗi → fix code |
| `@reloop/ui` not found khi build | Workspace symlink chưa resolve | Build command có `pnpm install --frozen-lockfile` ở root, đã đúng — kiểm tra `pnpm-workspace.yaml` đã commit |

---

## E. Reference

- [netlify.toml docs](https://docs.netlify.com/configure-builds/file-based-configuration/)
- [Netlify monorepo support](https://docs.netlify.com/configure-builds/monorepos/)
- [SPA redirects](https://docs.netlify.com/routing/redirects/redirect-options/#history-pushstate-and-single-page-apps)

## F. Local files liên quan

- [apps/customer/netlify.toml](../apps/customer/netlify.toml)
- [apps/collector/netlify.toml](../apps/collector/netlify.toml)
- [apps/hub/netlify.toml](../apps/hub/netlify.toml)
- [apps/portal/netlify.toml](../apps/portal/netlify.toml)
- [docs/qa-checklist.md](qa-checklist.md) — manual test checklist sau deploy
