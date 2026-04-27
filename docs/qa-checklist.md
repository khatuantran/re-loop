# QA Checklist — Manual test guide

> Phase 6 — checklist để verify toàn bộ 4 app trước khi deploy production. Tôi không thể tự chạy browser test, bạn cần chạy thủ công và đánh dấu kết quả.

## 1. Build & Lint (đã verify tự động ✅)

| Check | Trạng thái | Note |
|---|---|---|
| `pnpm install` không error | ✅ | 109 packages |
| `pnpm lint` exit 0 | ✅ | 0 errors, 0 warnings (sau khi thêm `eslint-plugin-react`) |
| `pnpm build` exit 0 cho 4 app | ✅ | 4/4 turbo task successful |

## 2. Cross-browser test (Q-01) — manual

Chạy `pnpm dev` rồi mở mỗi URL trên 2 browser:

| App | URL | Chrome desktop | Safari desktop | Safari iOS (simulator/device) | Chrome Android |
|---|---|---|---|---|---|
| Customer | http://localhost:5173 | ⬜ | ⬜ | ⬜ | ⬜ |
| Collector | http://localhost:5174 | ⬜ | ⬜ | ⬜ | ⬜ |
| Hub | http://localhost:5175 | ⬜ | ⬜ | ⬜ | ⬜ |
| Portal | http://localhost:5176 | ⬜ | ⬜ | ⬜ | ⬜ |

**Cần xác nhận:**
- Render không vỡ layout
- Animations chạy (shimmer, slide-in, pulse-dot, ping-slow)
- Fonts Be Vietnam Pro + JetBrains Mono load đúng
- Không lỗi console

## 3. Mobile responsive (must have) — manual

DevTools → Toggle Device Toolbar. Test 3 viewport bắt buộc:

### 375 × 667 (iPhone SE)

| App | Bottom-nav hiện | Sidebar ẩn (drawer) | Không scroll ngang | Tap target ≥ 44px | Status |
|---|---|---|---|---|---|
| Customer | ⬜ | ⬜ | ⬜ | ⬜ | |
| Collector | ⬜ | ⬜ | ⬜ | ⬜ | |
| Hub (read-only ok) | n/a | ⬜ | ⬜ | ⬜ | |
| Portal (read-only ok) | n/a | ⬜ | ⬜ | ⬜ | |

### 768 × 1024 (iPad)

| App | Layout không vỡ | Grid co gọn | Status |
|---|---|---|---|
| Customer | ⬜ | ⬜ | |
| Collector | ⬜ | ⬜ | |
| Hub | ⬜ | ⬜ | |
| Portal | ⬜ | ⬜ | |

### 1280 × 800 (Desktop)

| App | Sidebar hiện | Layout giống prototype gốc | Status |
|---|---|---|---|
| Customer | ⬜ | ⬜ | |
| Collector | ⬜ | ⬜ | |
| Hub | ⬜ | ⬜ | |
| Portal | ⬜ | ⬜ | |

## 4. Routing — manual

Mỗi app, test:
- [ ] Click vào nav items → URL đổi đúng path
- [ ] Browser **back button** → quay lại trang trước
- [ ] Reload (`Cmd+R`) tại URL bất kỳ → render đúng screen (cần Netlify SPA redirect)
- [ ] **Customer**: `/`, `/flow-a`, `/flow-b`, `/auction`, `/tracking`, `/cert`
- [ ] **Collector**: `/`, `/route`, `/pickup`, `/earnings`, `/profile`
- [ ] **Hub**: `/`, `/disassembly`, `/marketplace`
- [ ] **Portal**: `/`, `/lot/CU-2026-0412` (deep link), `/esg`, `/journey`

## 5. Lighthouse mobile (Q-02) — manual

Chạy trong Chrome DevTools → Lighthouse tab → **Mobile** mode → Performance + Accessibility + Best Practices + SEO.

**Mục tiêu: ≥ 85 cho từng category mỗi app**

| App | Performance | Accessibility | Best Practices | SEO | Note |
|---|---|---|---|---|---|
| Customer | __ | __ | __ | __ | |
| Collector | __ | __ | __ | __ | |
| Hub | __ | __ | __ | __ | |
| Portal | __ | __ | __ | __ | |

**Nếu < 85 thường gặp:**
- Performance: bundle size cao → đã 70KB gz, OK. Có thể thêm `loading="lazy"` cho ảnh.
- Accessibility: thiếu `aria-label`, contrast màu. Đã thêm `aria-label` ở các button icon-only (Bell, Search, Hamburger, Phone).
- Best Practices: HTTPS-only (OK trên Netlify), no console errors.
- SEO: thiếu `<meta description>`, `<title>` (đã có title).

## 6. Deploy thử Netlify — manual

**Sequence cho 1 app (lặp lại 4 lần):**

1. Đăng nhập Netlify → New site from Git
2. Connect repo, chọn branch `main`
3. **Base directory:** `apps/customer` (đổi cho từng app)
4. Build command, publish dir tự lấy từ `apps/<name>/netlify.toml`
5. Deploy → wait 1-2 phút → kiểm tra URL `<random>.netlify.app`

| App | Site URL | Build success | SPA redirect work | Status |
|---|---|---|---|---|
| Customer | __________ | ⬜ | ⬜ | |
| Collector | __________ | ⬜ | ⬜ | |
| Hub | __________ | ⬜ | ⬜ | |
| Portal | __________ | ⬜ | ⬜ | |

Test SPA redirect: vào `<site>/flow-a` trực tiếp (không qua nav). Phải render đúng FlowA, không 404.

## 7. Acceptance tổng

- [ ] Mỗi app build ra static bundle (`dist/`) deploy được Netlify
- [ ] UI giữ nguyên so với standalone HTML hiện tại trên desktop
- [ ] Cả 4 app dùng được trên iPhone SE (375px) — không scroll ngang, không cắt nội dung
- [ ] Routing có URL, back button browser hoạt động
- [ ] `docs/tracking.md` ghi đầy đủ trạng thái từng task
- [ ] Không còn import `window.Icon` hay Babel-standalone CDN
- [ ] `pnpm lint` exit 0 (đã ✅)
- [ ] `pnpm build` exit 0 cho 4 app (đã ✅)

## Khi gặp issue

Mỗi issue phát sinh tạo 1 task mới trong [tracking.md](tracking.md) với status ❌ Blocked + lý do + screenshot link nếu cần.
