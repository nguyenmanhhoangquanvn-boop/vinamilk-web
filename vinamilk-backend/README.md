# Vinamilk - Backend (Spring Boot REST API)

Hệ thống backend cho ứng dụng bán hàng Vinamilk, cung cấp REST API đầy đủ với xác thực JWT, quản lý sản phẩm, đơn hàng, đánh giá và phân quyền người dùng/quản trị viên.

## 🛠 Công nghệ

- **Java 21** + **Spring Boot 3.4.1**
- **Spring Data JPA** — ORM với Hibernate
- **Spring Security** — xác thực và phân quyền
- **JWT** — Bearer Token authentication
- **MySQL** — cơ sở dữ liệu
- **Maven** — build tool
- **Lombok** — giảm boilerplate code

## 📁 Cấu trúc Project

```
vinamilk-backend/
├── src/main/java/com/vinamilk/
│   ├── controller/          # REST endpoints
│   ├── service/             # Business logic
│   ├── repository/          # Data access
│   ├── entity/              # JPA entities
│   ├── dto/                 # Request/response DTOs
│   ├── config/              # Spring Security, DataInitializer
│   ├── security/            # JWT utils, auth filter
│   ├── exception/           # Global exception handler
│   └── VinamilkApplication.java
├── src/main/resources/
│   ├── application.properties
│   ├── application-dev.properties    # H2 in-memory
│   └── application-mysql.properties  # MySQL XAMPP
├── pom.xml
└── target/                  # Compiled JAR
```

## 🚀 Cách Chạy

### 1. Yêu cầu
- **Java 21+** (Eclipse Adoptium hoặc OpenJDK)
- **Maven 3.9+** (hoặc dùng Maven Wrapper)
- **MySQL 5.5+** (chạy qua XAMPP hoặc standalone)

### 2. Setup Database

**Bước 1:** Bật MySQL trong XAMPP
- Mở XAMPP Control Panel
- Click **Start** ở dòng **MySQL**
- Kiểm tra MySQL đang chạy trên `localhost:3306`

**Bước 2:** Database tự tạo (không cần tạo thủ công)
- Backend sẽ tự tạo database `vinamilk` khi khởi động (cấu hình `createDatabaseIfNotExist=true`)
- Table và seed data được tạo bởi JPA/Hibernate + `DataInitializer`

### 3. Build & Run

```bash
# Di chuyển vào thư mục backend
cd vinamilk-backend

# Build với Maven
# Nếu có Maven cài sẵn
mvn clean package -DskipTests

# Hoặc dùng Maven Wrapper (tự động download Maven)
./mvnw.cmd clean package -DskipTests  # Windows
./mvnw clean package -DskipTests      # macOS/Linux

# Run backend
java -jar target/vinamilk-backend-0.0.1-SNAPSHOT.jar
```

Backend sẽ chạy tại: `http://localhost:8000`

### 4. Kiểm tra API

```bash
# Lấy danh sách sản phẩm (không cần token)
curl http://localhost:8000/api/products

# Đăng nhập user
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@vinamilk.local","password":"User@123"}'
```

## 🔐 Tài Khoản Demo

### User (khách hàng)
- **Email:** `user@vinamilk.local`
- **Password:** `User@123`
- **Quyền:** Xem sản phẩm, tạo đơn hàng, viết review

### Admin (quản trị)
- **Email:** `admin@vinamilk.local`
- **Password:** `Admin@123`
- **Quyền:** CRUD sản phẩm, quản lý tất cả

## 📋 API Chính

### 🔑 Authentication
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/auth/login` | Đăng nhập | ❌ |
| POST | `/api/auth/register` | Đăng ký | ❌ |
| GET | `/api/auth/me` | Lấy profile hiện tại | ✅ JWT |

### 📦 Products
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/products` | Lấy danh sách sản phẩm | ❌ |
| GET | `/api/products/{id}` | Chi tiết sản phẩm | ❌ |
| POST | `/api/products` | Tạo sản phẩm | ✅ ADMIN |
| PUT | `/api/products/{id}` | Cập nhật sản phẩm | ✅ ADMIN |
| DELETE | `/api/products/{id}` | Xóa sản phẩm | ✅ ADMIN |

### 🛒 Orders
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/orders` | Tạo đơn hàng | ✅ USER |
| GET | `/api/orders` | Lấy đơn hàng của tôi | ✅ USER |

### ⭐ Reviews
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/products/{id}/reviews` | Lấy đánh giá sản phẩm | ❌ |
| POST | `/api/products/{id}/reviews` | Viết đánh giá | ✅ USER |

## 🔑 JWT Authentication

Backend sử dụng **Bearer Token** (JWT):

```bash
# Sau khi login, nhận access_token từ response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}

# Sử dụng token cho request tiếp theo
curl -H "Authorization: Bearer <access_token>" \
  http://localhost:8000/api/auth/me
```

Token hết hạn sau **24 giờ** (cấu hình: `JWT_EXPIRATION_MS=86400000`).

## 📊 Database Schema

### users
- `id` (PK)
- `email` (unique)
- `full_name`
- `password` (BCrypt hash)
- `role` (USER, ADMIN)

### products
- `id` (PK)
- `name`
- `price`
- `old_price`
- `category`
- `stock`
- `rating`
- `discount`

### orders
- `id` (PK)
- `order_id` (unique, VNM + timestamp)
- `user_id` (FK → users)
- `full_name`
- `phone`
- `address`
- `total`
- `status` (PENDING, CONFIRMED, SHIPPED, DELIVERED)

### order_items
- `id` (PK)
- `order_id` (FK → orders)
- `product_id` (FK → products)
- `quantity`
- `price` (giá tại thời điểm đặt)

### reviews
- `id` (PK)
- `product_id` (FK → products)
- `user_id` (FK → users)
- `rating` (1-5)
- `comment`
- `created_at`
- **UNIQUE:** (product_id, user_id) — một user chỉ review một sản phẩm một lần

## ⚙️ Cấu hình

Thay đổi file `application-mysql.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/vinamilk?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=Asia/Ho_Chi_Minh
spring.datasource.username=root
spring.datasource.password=          # Mật khẩu MySQL (để trống nếu XAMPP default)

# JWT
jwt.secret=change-this-development-secret-at-least-32-characters
jwt.expiration-ms=86400000            # 24 giờ
```

## 🧪 Validation & Error Handling

- **Order quantity:** phải `> 0`
- **Rating review:** phải trong khoảng `1-5`
- **Email:** phải hợp lệ
- **Password:** tối thiểu 6 ký tự

Response lỗi:
```json
{
  "success": false,
  "message": "Lỗi chi tiết"
}
```

HTTP status:
- `200 OK` — Thành công
- `201 CREATED` — Tạo mới
- `400 BAD REQUEST` — Validation lỗi
- `401 UNAUTHORIZED` — Thiếu hoặc token hết hạn
- `403 FORBIDDEN` — Không có quyền
- `404 NOT FOUND` — Không tìm thấy resource
- `409 CONFLICT` — Conflict (ví dụ: đã review)
- `500 INTERNAL SERVER ERROR` — Server lỗi

## 🔒 Security

- **Mật khẩu:** Hash bằng **BCrypt**, không lưu plaintext
- **JWT:** Signed với secret key, không thể giả mạo
- **CORS:** Cho phép request từ frontend `http://localhost:5173`
- **Password ẩn:** Không trả `password` field trong API response
- **Phân quyền:** Dùng Spring Security `@PreAuthorize` và annotation

## 📝 Lưu ý

- Backend mặc định sử dụng profile `mysql` (kết nối MySQL XAMPP)
- Dữ liệu seed được tạo tự động lần đầu chạy (`DataInitializer`)
- H2 in-memory database còn lại nếu muốn test offline (chỉ cần chuyển profile `dev`)
- Không commit `target/`, `.env`, hoặc password thật vào Git

## 🎯 Kết nối Frontend

Frontend (React + Vite) chạy ở `http://localhost:5173` và gọi backend tại:

```javascript
// axiosClient.js
baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000"
```

Frontend tự động:
- Gắn JWT token vào header `Authorization: Bearer <token>`
- Redirect về `/login` nếu token hết hạn (401)

## 👤 Tác Giả

Dự án sinh viên — Vinamilk e-commerce platform.

---

**Để chạy toàn bộ hệ thống:**

1. Bật MySQL XAMPP
2. Chạy backend: `java -jar target/...jar` (hoặc `mvn spring-boot:run`)
3. Chạy frontend: `npm run dev` (ở thư mục `vinamilk-frontend`)
4. Mở trình duyệt: `http://localhost:5173`
## Backend Notes

The backend provides product, order, review, authentication, and order cancellation APIs.

