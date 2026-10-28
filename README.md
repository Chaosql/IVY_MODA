# IVY_MODA

Website bán hàng thời trang của Nhóm 06, dùng React/TypeScript, Express, Drizzle ORM và PostgreSQL. Repo chứa mã nguồn ứng dụng và các bộ kiểm thử.

## Chạy nhanh bằng Docker

Cài Git và Docker Desktop, mở Docker Desktop rồi chạy:

```bash
git clone https://github.com/Chaosql/IVY_MODA.git
cd IVY_MODA
docker compose up --build
```

Mở **http://localhost:3000**. Lần đầu cần chờ tải image, cài thư viện và build. Compose tự khởi động PostgreSQL, tạo bảng và nạp dữ liệu mẫu. Không cần cài Node.js, PostgreSQL riêng hoặc sao chép `.env` khi dùng cách này.

Tài khoản quản trị demo trên database mới:

- Email: `admin@gmail.com`
- Mật khẩu: `Admin@123`

Khách có thể xem sản phẩm và thử giỏ hàng mà không đăng nhập. Database demo có sản phẩm, danh mục, showroom và coupon. Dữ liệu PostgreSQL nằm trong Docker volume và giữ lại khi khởi động lại.

Dừng ứng dụng bằng `docker compose down`. Xem log backend hoặc OTP mô phỏng khi đăng ký:

```bash
docker compose logs -f app
```

Nếu cổng 3000 đang dùng, đổi `"3000:3000"` trong `compose.yaml` thành `"3001:3000"`, chạy lại rồi mở http://localhost:3001.

## Chạy bằng Node.js và PostgreSQL

Yêu cầu Node.js 24 trở lên, npm và PostgreSQL 17. Mở terminal tại thư mục repo:

```bash
npm ci
```

Sao chép `.env.example` thành `.env`:

```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

```bash
# macOS/Linux
cp .env.example .env
```

Tạo database `ivy_moda_demo` trong pgAdmin hoặc psql. Trong `.env`, điền `SQL_HOST`, `SQL_PORT`, `SQL_USER`, `SQL_PASSWORD`, `SQL_DB_NAME` theo PostgreSQL của máy. Sau đó:

```bash
npm run db:push
npm run dev
```

Mở http://localhost:3000. Ứng dụng tự nạp dữ liệu mẫu vào các bảng còn trống. `db:push` đồng bộ cấu trúc bảng, vì vậy hãy dùng database dành riêng cho dự án.

## Kiểm thử

Các lệnh chạy tại thư mục repo. Với Docker, thay `npm ...` bằng `docker compose exec app npm ...`.

```bash
# Bộ 10 unit test thông tin giao hàng và coverage
npm run test:shipping

# Toàn bộ unit test
npm run test:unit

# Kiểm tra kiểu TypeScript và build
npm run lint
npm run build

# Tích hợp API và DB: cần ứng dụng và PostgreSQL đang chạy
npm run test:integration
```

`test:shipping` kiểm tra chính hàm `validateShipping` mà giao diện checkout sử dụng. `test:integration` đối chiếu dữ liệu sản phẩm/danh mục giữa API và PostgreSQL.

## Cấu trúc

```text
src/components/       Giao diện khách hàng và quản trị
src/server/           API, dữ liệu mẫu và gửi email
src/db/               Kết nối và schema PostgreSQL
src/lib/              Validation và tích hợp Firebase
tests/unit/           Unit test
tests/integration/    Kiểm thử API với PostgreSQL
compose.yaml          Ứng dụng và PostgreSQL cho chạy thử
```

## Phạm vi bản chạy thử

Đây là dự án học tập chạy thử cục bộ. VietQR/thanh toán có mô phỏng, không xác nhận giao dịch ngân hàng thật. Khi chưa cấu hình SMTP, backend in OTP trong log thay vì gửi email. Đăng nhập Google phụ thuộc cấu hình Firebase và tên miền được cho phép của dự án Firebase. Tài khoản và mật khẩu trong Compose là dữ liệu demo công khai. Repo không chứa `.env` riêng hoặc khóa service account.

Bản chạy thử giữ các hành vi nghiệp vụ hiện có để đối chiếu kiểm thử, bao gồm lỗi biên lai đã ghi nhận trong báo cáo. Báo cáo, video và dữ liệu cá nhân từ những lần kiểm thử không được đưa vào repo mã nguồn.
