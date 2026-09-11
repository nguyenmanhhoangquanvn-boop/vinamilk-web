import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Request interceptor — tự gắn token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — xử lý 401
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_info");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
  
);
/* Mock fallback removed: authentication must use the real backend JWT. */
/* axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Fallback mock response khi API lỗi
    if (error.config?.url?.includes("/api/auth/login")) {
      const email = error.config.data ? JSON.parse(error.config.data).email : "user@test.com";
      // Lấy tên từ localStorage nếu đã đăng ký trước đó
      let fullName = email.split("@")[0];
      try {
        const saved = localStorage.getItem("vnm_registered_users");
        if (saved) {
          const users = JSON.parse(saved);
          const match = users.find(u => u.email === email);
          if (match?.fullName) fullName = match.fullName;
        }
      } catch (e) {}
      return Promise.resolve({
        data: {
          access_token: "mock_token_12345",
          user: {
            fullName,
            email,
            id: "123",
          },
        },
      });
    }
    return Promise.reject(error);
  }
); */
export default axiosClient;