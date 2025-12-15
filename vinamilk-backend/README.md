# Vinamilk Backend

Đây là phần REST API cho Vinamilk E-commerce Platform. Backend xử lý đăng nhập, sản phẩm, giỏ hàng, đơn hàng và đánh giá sản phẩm.

## Công nghệ

- Java 21
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA / Hibernate
- MySQL
- Maven
- BCrypt

## Các phần chính

```text
src/main/java/com/vinamilk/
├── config/        cấu hình ứng dụng và dữ liệu mẫu
├── controller/    các REST endpoint
├── service/       xử lý nghiệp vụ
├── repository/    làm việc với database
├── entity/        các entity JPA
├── dto/           request và response object
├── security/      JWT và authentication filter
└── exception/     xử lý lỗi chung
```

## Chạy backend

Bật MySQL trong XAMPP trước, sau đó chạy:

```bash
cd vinamilk-backend
mvn spring-boot:run
```

Hoặc dùng Maven Wrapper trên Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend chạy ở:

```text
http://localhost:8000
```

## Database

Ứng dụng sử dụng database `vinamilk` trên MySQL. Cấu hình nằm trong:

```text
src/main/resources/application-mysql.properties
```

Dữ liệu mẫu được tạo bởi `DataInitializer` khi ứng dụng khởi động.

## API chính

```text
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/me
GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
POST   /api/orders
GET    /api/orders
PATCH  /api/orders/{id}/cancel
GET    /api/products/{id}/reviews
POST   /api/products/{id}/reviews
```

Các endpoint cần đăng nhập nhận token theo dạng:

```text
Authorization: Bearer <token>
```

## Tài khoản test

```text
User:  user@vinamilk.local / User@123
Admin: admin@vinamilk.local / Admin@123
```

## Ghi chú về xử lý đơn hàng

Khi người dùng hủy một đơn hàng hợp lệ, backend cập nhật trạng thái đơn và cộng lại số lượng sản phẩm vào kho. Logic này được xử lý trong service thay vì để frontend tự thay đổi stock.

Không commit password thật, JWT secret, file `.env` hoặc thư mục `target` lên repository.
