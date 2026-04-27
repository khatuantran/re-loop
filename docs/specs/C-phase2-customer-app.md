# C-phase2: Customer app (apps/customer)

## Context

App đầu tiên trong 4 app, B2C cho người dùng cuối, mobile-first must-have. Migrate từ prototype Babel-CDN ([RE-LOOP/src/](../../RE-LOOP/src/)) sang Vite + react-router. Plan chi tiết: [plan file](../../../../.claude/plans/t-i-c-n-x-y-d-ng-merry-kahn.md).

## User story

Là người dùng RE-LOOP trên điện thoại, tôi muốn truy cập app qua URL trên mobile browser, đặt lịch thu gom / bán đồ cũ / theo dõi đơn / xem certificate mà không bị cắt nội dung hay phải scroll ngang.

## Acceptance criteria

- [ ] `pnpm dev --filter=@reloop/customer` chạy dev server localhost
- [ ] `pnpm build --filter=@reloop/customer` ra `dist/` deployable
- [ ] 6 routes URL-based hoạt động: `/`, `/flow-a`, `/flow-b`, `/auction`, `/tracking`, `/cert`
- [ ] Browser back/forward hoạt động đúng
- [ ] Test 375 (iPhone SE) — bottom-nav hiện, không scroll ngang, mọi screen usable
- [ ] Test 768 (iPad) — layout co gọn, không vỡ
- [ ] Test 1280 — sidebar hiện, layout giống prototype gốc
- [ ] Không còn `window.Icon`, `setScreenGlobal`, `PhoneFrame` wrapper trong production
- [ ] Tất cả atoms/icons import từ `@reloop/ui`

## Plan

5 task C-01 → C-05 — chi tiết trong [plan file](../../../../.claude/plans/t-i-c-n-x-y-d-ng-merry-kahn.md). Cập nhật `docs/tracking.md` sau mỗi task.

## References

- [RE-LOOP/src/App.jsx](../../RE-LOOP/src/App.jsx) — shell + ScreenHomeWeb
- [RE-LOOP/src/Screen{FlowA,FlowB,Auction,Tracking,Cert}.jsx](../../RE-LOOP/src/) — 5 screen còn lại
- `@reloop/ui` — atoms, icons, hooks
