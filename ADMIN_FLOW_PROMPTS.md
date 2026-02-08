# Draw.io AI Prompts - Luồng Quản Lý Admin

## Hướng Dẫn

1. Mở https://app.diagrams.net/
2. Click biểu tượng AI (Ctrl/Cmd + K)
3. Copy & paste prompt
4. Tất cả text trong flowchart phải bằng tiếng Việt

---

## PROMPT 1: Luồng Tổng Quan Hệ Thống Admin

```
Create a simple flowchart in Vietnamese with the following flow:

Start: "Đăng nhập Admin"
↓
Process: "Nhập email và mật khẩu"
↓
Decision: "Thông tin hợp lệ?"
- If No → "Hiển thị lỗi" → back to "Nhập email và mật khẩu"
- If Yes → Continue
↓
Process: "Lưu token và thông tin admin"
↓
Process: "Dashboard"
↓
Decision: "Chọn chức năng"
- Option 1 → "Quản lý người dùng"
- Option 2 → "Quản lý boards"
- Option 3 → "Lịch sử thanh toán"
- Option 4 → "Quản lý admin"
- Option 5 → "Đăng xuất" → End

From "Quản lý người dùng", "Quản lý boards", "Lịch sử thanh toán", "Quản lý admin":
All can return to "Dashboard"

Use standard flowchart shapes:
- Rounded rectangle for Start/End
- Rectangle for Process
- Diamond for Decision
- All text in Vietnamese
```

---

## PROMPT 2: Luồng Quản Lý Người Dùng

```
Create a simple flowchart in Vietnamese:

Start: "Trang quản lý người dùng"
↓
Process: "Hiển thị danh sách người dùng"
↓
Decision: "Chọn hành động"
- Option 1 → "Tạo người dùng mới"
- Option 2 → "Chỉnh sửa người dùng"
- Option 3 → "Xóa người dùng"
- Option 4 → "Tìm kiếm người dùng"
- Option 5 → "Quay về Dashboard"

Flow for "Tạo người dùng mới":
↓
Process: "Nhập thông tin người dùng"
↓
Decision: "Dữ liệu hợp lệ?"
- If No → "Hiển thị lỗi" → back to "Nhập thông tin"
- If Yes → Continue
↓
Process: "Gọi API tạo người dùng"
↓
Decision: "Tạo thành công?"
- If No → "Hiển thị lỗi"
- If Yes → "Hiển thị thông báo thành công"
↓
Process: "Làm mới danh sách"
↓
Back to "Hiển thị danh sách người dùng"

Flow for "Chỉnh sửa người dùng":
↓
Process: "Load thông tin người dùng"
↓
Process: "Chỉnh sửa thông tin"
↓
Decision: "Dữ liệu hợp lệ?"
- If No → "Hiển thị lỗi" → back to "Chỉnh sửa thông tin"
- If Yes → Continue
↓
Process: "Gọi API cập nhật"
↓
Decision: "Cập nhật thành công?"
- If No → "Hiển thị lỗi"
- If Yes → "Hiển thị thông báo thành công"
↓
Process: "Làm mới danh sách"
↓
Back to "Hiển thị danh sách người dùng"

Flow for "Xóa người dùng":
↓
Decision: "Xác nhận xóa?"
- If No → Back to "Hiển thị danh sách người dùng"
- If Yes → Continue
↓
Process: "Gọi API xóa người dùng"
↓
Decision: "Xóa thành công?"
- If No → "Hiển thị lỗi"
- If Yes → "Hiển thị thông báo thành công"
↓
Process: "Làm mới danh sách"
↓
Back to "Hiển thị danh sách người dùng"

Flow for "Tìm kiếm người dùng":
↓
Process: "Nhập từ khóa tìm kiếm"
↓
Process: "Gọi API tìm kiếm"
↓
Process: "Hiển thị kết quả"
↓
Back to "Hiển thị danh sách người dùng"

All text in Vietnamese. Use standard flowchart shapes.
```

---

## PROMPT 3: Luồng Quản Lý Boards

```
Create a simple flowchart in Vietnamese:

Start: "Trang quản lý boards"
↓
Process: "Hiển thị danh sách boards"
↓
Decision: "Chọn hành động"
- Option 1 → "Xem chi tiết board"
- Option 2 → "Quản lý thành viên board"
- Option 3 → "Xóa board"
- Option 4 → "Tìm kiếm board"
- Option 5 → "Quay về Dashboard"

Flow for "Xem chi tiết board":
↓
Process: "Gọi API lấy chi tiết board"
↓
Process: "Hiển thị thông tin board"
↓
Process: "Hiển thị columns và cards"
↓
Back to "Hiển thị danh sách boards"

Flow for "Quản lý thành viên board":
↓
Process: "Hiển thị danh sách thành viên"
↓
Decision: "Chọn hành động"
- Option 1 → "Thêm thành viên"
- Option 2 → "Xóa thành viên"
- Option 3 → "Đóng"

"Thêm thành viên" flow:
↓
Process: "Nhập email thành viên"
↓
Process: "Gọi API thêm thành viên"
↓
Decision: "Thêm thành công?"
- If No → "Hiển thị lỗi"
- If Yes → "Hiển thị thông báo thành công"
↓
Process: "Làm mới danh sách thành viên"
↓
Back to "Hiển thị danh sách thành viên"

"Xóa thành viên" flow:
↓
Decision: "Xác nhận xóa?"
- If No → Back to "Hiển thị danh sách thành viên"
- If Yes → Continue
↓
Process: "Gọi API xóa thành viên"
↓
Decision: "Xóa thành công?"
- If No → "Hiển thị lỗi"
- If Yes → "Hiển thị thông báo thành công"
↓
Process: "Làm mới danh sách thành viên"
↓
Back to "Hiển thị danh sách thành viên"

Flow for "Xóa board":
↓
Decision: "Xác nhận xóa board?"
- If No → Back to "Hiển thị danh sách boards"
- If Yes → Continue
↓
Process: "Gọi API xóa board"
↓
Decision: "Xóa thành công?"
- If No → "Hiển thị lỗi"
- If Yes → "Hiển thị thông báo thành công"
↓
Process: "Làm mới danh sách boards"
↓
Back to "Hiển thị danh sách boards"

Flow for "Tìm kiếm board":
↓
Process: "Nhập từ khóa tìm kiếm"
↓
Process: "Gọi API tìm kiếm"
↓
Process: "Hiển thị kết quả"
↓
Back to "Hiển thị danh sách boards"

All text in Vietnamese. Use standard flowchart shapes.
```

---

## PROMPT 4: Luồng Lịch Sử Thanh Toán

```
Create a simple flowchart in Vietnamese:

Start: "Trang lịch sử thanh toán"
↓
Process: "Hiển thị danh sách giao dịch"
↓
Decision: "Chọn hành động"
- Option 1 → "Tìm kiếm giao dịch"
- Option 2 → "Xem chi tiết giao dịch"
- Option 3 → "Chuyển trang"
- Option 4 → "Quay về Dashboard"

Flow for "Tìm kiếm giao dịch":
↓
Process: "Nhập từ khóa (tên, email, gói)"
↓
Process: "Gọi API tìm kiếm"
↓
Process: "Hiển thị kết quả"
↓
Back to "Hiển thị danh sách giao dịch"

Flow for "Xem chi tiết giao dịch":
↓
Process: "Hiển thị thông tin chi tiết"
↓
Process: "Hiển thị thông tin người dùng"
↓
Process: "Hiển thị thông tin gói và số tiền"
↓
Back to "Hiển thị danh sách giao dịch"

Flow for "Chuyển trang":
↓
Process: "Chọn trang mới"
↓
Process: "Gọi API với trang mới"
↓
Process: "Hiển thị dữ liệu trang mới"
↓
Back to "Hiển thị danh sách giao dịch"

All text in Vietnamese. Use standard flowchart shapes.
```

---

## PROMPT 5: Luồng Quản Lý Admin

```
Create a simple flowchart in Vietnamese:

Start: "Trang quản lý admin"
↓
Process: "Hiển thị danh sách admin"
↓
Decision: "Chọn hành động"
- Option 1 → "Tạo admin mới"
- Option 2 → "Xóa admin"
- Option 3 → "Quay về Dashboard"

Flow for "Tạo admin mới":
↓
Process: "Nhập thông tin admin"
↓
Process: "Nhập email và mật khẩu"
↓
Decision: "Dữ liệu hợp lệ?"
- If No → "Hiển thị lỗi" → back to "Nhập thông tin admin"
- If Yes → Continue
↓
Process: "Gọi API tạo admin"
↓
Decision: "Tạo thành công?"
- If No → "Hiển thị lỗi"
- If Yes → "Hiển thị thông báo thành công"
↓
Process: "Làm mới danh sách admin"
↓
Back to "Hiển thị danh sách admin"

Flow for "Xóa admin":
↓
Decision: "Xác nhận xóa?"
- If No → Back to "Hiển thị danh sách admin"
- If Yes → Continue
↓
Decision: "Có phải admin hiện tại?"
- If Yes → "Hiển thị lỗi: Không thể xóa chính mình" → Back to "Hiển thị danh sách admin"
- If No → Continue
↓
Process: "Gọi API xóa admin"
↓
Decision: "Xóa thành công?"
- If No → "Hiển thị lỗi"
- If Yes → "Hiển thị thông báo thành công"
↓
Process: "Làm mới danh sách admin"
↓
Back to "Hiển thị danh sách admin"

All text in Vietnamese. Use standard flowchart shapes.
```

---

## PROMPT 6: Sơ Đồ Tổng Hợp (Đơn Giản Nhất)

```
Create a high-level flowchart in Vietnamese showing the main admin system flow:

Start: "Đăng nhập"
↓
Process: "Dashboard"
↓
Decision: "Chọn module"
- Branch 1 → "Quản lý người dùng" → "CRUD người dùng" → back to Dashboard
- Branch 2 → "Quản lý boards" → "Xem và quản lý boards" → back to Dashboard
- Branch 3 → "Lịch sử thanh toán" → "Xem giao dịch" → back to Dashboard
- Branch 4 → "Quản lý admin" → "CRUD admin" → back to Dashboard
- Branch 5 → "Đăng xuất" → End

Use simple layout with:
- Rounded rectangles for Start/End
- Rectangles for Processes
- Diamond for Decision
- Clear arrows
- All text in Vietnamese
```

---

## Lưu Ý Quan Trọng

### ✅ Các Điểm Chính:

- **Tất cả text phải tiếng Việt** trong flowchart
- **Chỉ các flow chính**, không đi vào chi tiết API
- **Đơn giản, dễ hiểu**, tập trung vào hành động người dùng
- **Sử dụng shapes chuẩn**: Rectangle (Process), Diamond (Decision), Rounded Rectangle (Start/End)

### 📋 Thứ Tự Sử Dụng:

1. **PROMPT 6** - Xem tổng quan toàn hệ thống (đơn giản nhất)
2. **PROMPT 1** - Luồng đăng nhập và navigation
3. **PROMPT 2-5** - Chi tiết từng module

### 🎨 Sau Khi AI Vẽ:

- Điều chỉnh layout cho đẹp
- Thêm màu sắc phân biệt các module
- Thêm icons nếu cần
- Xuất file PNG/SVG

### 💡 Tips:

- Nếu flowchart quá phức tạp, chia nhỏ thành nhiều diagrams
- Mỗi module 1 diagram riêng
- Sử dụng Pages trong draw.io để tổ chức
