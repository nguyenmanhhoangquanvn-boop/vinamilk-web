import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../services/axiosClient";
import Navbar from "../components/Navbar";

/* ── Floating‑label input field matching the real Vinamilk design ─────── */
const VnmInput = ({ label, id, type = "text", value, onChange, required }) => {
  const [showPw, setShowPw] = useState(false);
  const isPass = type === "password";
  const filled = Boolean(value);

  return (
    <div className="w-full">
      <div
        className="relative flex items-end transition-all duration-200"
        style={{
          height: "4rem",
          paddingLeft: "0.625rem",
          paddingRight: "0.625rem",
          paddingBottom: "0.5rem",
          backgroundColor: "var(--vnm-cream-2)",
          borderBottom: "1px solid var(--vnm-navy)",
        }}
      >
        {/* Floating label */}
        <label
          htmlFor={id}
          className="absolute pointer-events-none select-none"
          style={{
            fontSize: filled ? "0.75rem" : "0.9375rem",
            color: "var(--vnm-text-sec)",
            top: filled ? "6px" : "50%",
            transform: filled ? "none" : "translateY(-50%)",
            left: "0.625rem",
            whiteSpace: "nowrap",
            transition: "top 0.18s ease, font-size 0.18s ease, transform 0.18s ease",
            lineHeight: 1,
          }}
        >
          {label}{required && <span className="ml-1">*</span>}
        </label>

        {/* Input sits at the bottom */}
        <input
          id={id}
          name={id}
          type={isPass ? (showPw ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-transparent border-none text-base leading-none"
          style={{ color: "var(--vnm-text)", paddingLeft: "6px", outline: "none" }}
        />

        {isPass && (
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="flex items-center shrink-0 p-0 bg-transparent border-none cursor-pointer"
            style={{ color: "var(--vnm-navy)", marginLeft: "auto" }}
            aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPw ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

/* ── Login Page ──────────────────────────────────────────────────────── */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) { toast.error("Vui lòng nhập email"); return; }
    if (!form.password)     { toast.error("Vui lòng nhập mật khẩu"); return; }

    setLoading(true);
    try {
      const res = await axiosClient.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });
      const { access_token, user } = res.data;
      login(access_token, user, remember);
      toast.success(`Chào mừng trở lại, ${user?.fullName || "bạn"}! 👋`);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Email hoặc mật khẩu không đúng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--vnm-cream)" }}
    >
      {/* Reuse existing Navbar */}
      <Navbar />

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl px-3 my-20">

          {/* Section header with bottom border */}
          <div style={{ borderBottom: "2px solid var(--vnm-text-sec)", paddingBottom: "2rem" }}>
            <h1
              className="mb-6"
              style={{
                fontFamily: "'VNM Sans Display', Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                fontWeight: 400,
                color: "var(--vnm-navy)",
                letterSpacing: "-0.01em",
              }}
            >
              Đăng nhập
            </h1>
            <p className="text-base mb-4" style={{ color: "var(--vnm-text)" }}>
              Đăng nhập vào tài khoản thành viên của bạn
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 mt-4">
              <VnmInput
                label="Email (Gmail)"
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <VnmInput
                label="Nhập mật khẩu"
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between mt-2">
                <label
                  className="flex items-center gap-2 cursor-pointer select-none text-base"
                  style={{ color: "var(--vnm-text)" }}
                >
                  {/* Custom checkbox */}
                  <span
                    onClick={() => setRemember(!remember)}
                    className="shrink-0"
                    style={{
                      width: 16, height: 16,
                      border: "1px solid var(--vnm-navy)",
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: remember ? "var(--vnm-navy)" : "transparent",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                  >
                    {remember && <span style={{ color: "#fff", fontSize: 10, lineHeight: 1 }}>✓</span>}
                  </span>
                  Ghi nhớ đăng nhập
                </label>

                <button
                  type="button"
                  className="text-base underline bg-transparent border-none cursor-pointer"
                  style={{ color: "var(--vnm-navy)" }}
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { opacity: 0.88 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full h-12 flex items-center justify-center gap-2 text-white font-semibold text-base border-none cursor-pointer disabled:cursor-not-allowed transition-all"
                style={{
                  backgroundColor: loading ? "#aaa" : "var(--vnm-navy)",
                  borderRadius: "2px",
                  letterSpacing: "0.02em",
                }}
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <div className="py-8 text-center">
            <p className="text-base" style={{ color: "var(--vnm-text)" }}>
              Bạn chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="underline font-semibold ml-1"
                style={{ color: "var(--vnm-navy)" }}
              >
                Đăng ký
              </Link>
            </p>

            {/* Deco stripe */}
            <div
              className="mt-8 h-1.5"
              style={{
                background:
                  "repeating-linear-gradient(to right, var(--vnm-navy) 0px, var(--vnm-navy) 22px, #00aae4 22px, #00aae4 44px)",
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;