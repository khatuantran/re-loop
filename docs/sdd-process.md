# Quy trình SDD (Spec-Driven Development) — RE-LOOP

## Triết lý

Trước khi viết code, **viết spec**. Trước khi viết spec, **hiểu vấn đề**. Mỗi feature/task đáng kể phải có vết tài liệu để: (1) review trước khi implement, (2) biết "done" nghĩa là gì, (3) tracking lại sau này.

## 4 bước cho mỗi feature/task

### 1. **Spec** — `docs/specs/<feature-id>.md`

Mỗi spec có 5 phần ngắn gọn:

```markdown
# <ID>: <Tên feature>

## Context

Vì sao cần làm? Ai dùng? Vấn đề hiện tại là gì?

## User story

Là <role>, tôi muốn <action> để <outcome>.

## Acceptance criteria

- [ ] Điều kiện 1 đo được
- [ ] Điều kiện 2 đo được
- [ ] ...

## Out of scope

- Điều KHÔNG làm trong feature này

## References

- Mockup / file gốc / link
```

### 2. **Plan**

Trong cùng file spec, hoặc trong PR description, liệt kê:

- File sẽ tạo / sửa (đường dẫn cụ thể)
- Hàm / component sẽ thêm
- Dependencies cần thêm
- Risks / open questions

### 3. **Implement**

- Commit nhỏ, mỗi commit 1 ý
- Reference spec ID trong commit message: `feat(C-03): port ScreenAuction`
- Chạy lint + build trước khi đẩy

### 4. **Verify + Track**

- Tự test acceptance criteria
- Test responsive (375 / 768 / 1280)
- Cập nhật `docs/tracking.md`:
  - ✅ Done — task hoàn tất, qua acceptance
  - 🟡 In progress — đang làm
  - ⬜ Todo — chưa bắt đầu
  - ❌ Blocked — bị chặn (kèm lý do)
- Nếu phát sinh task mới khi làm → thêm vào tracking dưới dạng ⬜

## Khi nào bỏ qua spec?

Cho task **trivial** (đổi text, fix typo, đổi color), không cần spec. Quy ước: nếu chỉnh ≤ 10 dòng và không ảnh hưởng UX → skip spec, vẫn cập nhật tracking.

## Naming convention

- Task ID: `<Phase>-<số>` ví dụ `F-01`, `C-03`, `H-02`
  - F = Foundation, S = Shared package, C = Customer, Co = Collector, H = Hub, P = Portal, Q = QA
- Spec file: `docs/specs/<task-id>-<slug>.md` ví dụ `docs/specs/C-04-mobile-responsive.md`

## Workflow ví dụ

```
User: "Thêm bottom-nav cho Customer app trên mobile"
   ↓
1. Tạo docs/specs/C-04-bottom-nav.md (Context + User story + Acceptance)
2. List file sẽ chỉnh: apps/customer/src/components/Layout.jsx, App.jsx
3. Code + commit "feat(C-04): bottom-nav for mobile customer app"
4. Test 375px → ổn → cập nhật tracking.md: C-04 ✅
```

## Vai trò của tracking.md

`docs/tracking.md` là **single source of truth** về trạng thái dự án. Mọi câu hỏi "đã làm xong gì?" / "còn lại gì?" đều trả lời từ đây. Cập nhật ngay sau mỗi task — không batch.
