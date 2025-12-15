# Vinamilk E-commerce Platform

Đây là một website bán hàng Vinamilk được xây dựng để luyện tập việc kết hợp React với Java Spring Boot. Người dùng có thể xem sản phẩm, đăng nhập, thêm sản phẩm vào giỏ hàng, đặt hàng và để lại đánh giá.

Project gồm hai phần:

- `vinamilk-frontend`: giao diện React.
- `vinamilk-backend`: REST API viết bằng Spring Boot.

## Công nghệ sử dụng

### Frontend

- React
- Vite
- JavaScript
- Axios
- Ant Design

### Backend

- Java 21
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA / Hibernate
- MySQL
- Maven
- BCrypt

## Một số chức năng chính

- Đăng ký và đăng nhập tài khoản.
- Phân quyền user và admin.
- Xem danh sách, chi tiết và danh mục sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Tạo và xem đơn hàng.
- Cập nhật trạng thái đơn hàng.
- Hủy đơn hàng và hoàn lại số lượng sản phẩm trong kho.
- Viết và xem đánh giá sản phẩm.
- Admin có thể thêm, sửa và xóa sản phẩm.

## Cách chạy project

### Backend

Cần có Java 21, Maven và MySQL. Nếu dùng XAMPP, bật MySQL trước khi chạy backend.

```bash
cd vinamilk-backend
mvn spring-boot:run
```

Backend chạy tại:

```text
http://localhost:8000
```

### Frontend

Mở một terminal khác:

```bash
cd vinamilk-frontend
npm install
npm run dev
```

Frontend chạy tại:

```text
http://localhost:5173
```

## Cấu hình database

Backend sử dụng database `vinamilk` trên MySQL. Thông tin kết nối được cấu hình trong file:

```text
vinamilk-backend/src/main/resources/application-mysql.properties
```

Không đưa password MySQL thật hoặc secret JWT lên GitHub.

## Tài khoản demo

```text
User
Email: user@vinamilk.local
Password: User@123

Admin
Email: admin@vinamilk.local
Password: Admin@123
```

## Một vài API chính

```text
POST   /api/auth/login
POST   /api/auth/register
GET    /api/products
GET    /api/products/{id}
POST   /api/orders
GET    /api/orders
PATCH  /api/orders/{id}/cancel
GET    /api/products/{id}/reviews
POST   /api/products/{id}/reviews
```

Các API cần đăng nhập sử dụng JWT Bearer Token.

## Quá trình thực hiện

Tôi làm phần backend trước để xây dựng các model sản phẩm, đơn hàng, người dùng và đánh giá. Sau đó tôi thêm JWT cùng Spring Security để xử lý đăng nhập và phân quyền.

Khi các API cơ bản hoạt động, tôi xây dựng giao diện React và kết nối frontend với backend bằng Axios. Trong quá trình test flow đặt hàng, tôi bổ sung chức năng hủy đơn hàng và hoàn lại stock để dữ liệu sản phẩm không bị sai sau khi hủy.

Cuối cùng, tôi kiểm tra các flow chính bằng frontend và Postman, đồng thời tách project thành hai thư mục frontend và backend để dễ phát triển và bảo trì hơn.

## Lưu ý

Không commit các thư mục hoặc thông tin sau:

```text
node_modules/
target/
.env
password thật
JWT secret thật
```

Đây là project cá nhân dùng để học và thực hành full-stack development với React và Spring Boot.
