/**
 * validation.js — Vinamilk Register Form Validation
 */

export const validateRegisterForm = ({ fullName, email, phone, password, confirmPassword }) => {
  const errors = {};

  // Họ và tên
  if (!fullName?.trim()) {
    errors.fullName = "Vui lòng nhập họ và tên";
  } else if (fullName.trim().length < 2) {
    errors.fullName = "Họ và tên phải có ít nhất 2 ký tự";
  }

  // Email
  if (!email?.trim()) {
    errors.email = "Vui lòng nhập email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email không đúng định dạng";
  }

  // Số điện thoại
  if (!phone?.trim()) {
    errors.phone = "Vui lòng nhập số điện thoại";
  } else if (!/^[0-9]{9,11}$/.test(phone.replace(/\s/g, ""))) {
    errors.phone = "Số điện thoại không hợp lệ (9–11 chữ số)";
  }

  // Mật khẩu
  if (!password) {
    errors.password = "Vui lòng nhập mật khẩu";
  } else if (password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  // Xác nhận mật khẩu
  if (!confirmPassword) {
    errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  }

  return errors;
};

export const getPasswordStrength = (password) => {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) || /[0-9]/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;
  return Math.min(score, 3); // 0=none, 1=yếu, 2=vừa, 3=mạnh
};