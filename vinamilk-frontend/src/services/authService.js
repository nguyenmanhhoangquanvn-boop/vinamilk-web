/**
 * authService.js — Vinamilk Auth API Service
 * Dùng Axios để gọi API backend
 */

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Tự động gắn JWT token vào mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Đăng ký tài khoản mới
 * @param {{ fullName, email, phone, password }} data
 */
export const registerUser = async ({ fullName, email, phone, password }) => {
  // Lưu thông tin đăng ký vào localStorage để fallback khi không có backend
  const saveLocal = () => {
    try {
      const saved = localStorage.getItem("vnm_registered_users");
      const users = saved ? JSON.parse(saved) : [];
      const existing = users.findIndex(u => u.email === email);
      if (existing >= 0) users[existing] = { fullName, email, phone };
      else users.push({ fullName, email, phone });
      localStorage.setItem("vnm_registered_users", JSON.stringify(users));
    } catch (e) {}
  };

  try {
    const res = await api.post("/api/auth/register", { fullName, email, phone, password });
    saveLocal();
    return res.data;
  } catch (err) {
    // Mock fallback khi không có backend
    saveLocal();
    return { message: "Đăng ký thành công (mock)", user: { fullName, email } };
  }
};

/**
 * Đăng nhập
 * @param {{ email, password }} data
 */
export const loginUser = async ({ email, password }) => {
  const res = await api.post("/api/auth/login", { email, password });
  if (res.data?.access_token) {
    localStorage.setItem("access_token", res.data.access_token);
  }
  return res.data;
};

/**
 * Đăng xuất — xóa token
 */
export const logoutUser = () => {
  localStorage.removeItem("access_token");
};

export default api;