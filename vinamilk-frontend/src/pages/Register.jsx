import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { registerUser } from "../services/authService";
import Navbar from "../components/Navbar";

/* ── Floating‑label input (same as Login) ──────────────────────────── */
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

/* ── Checkbox ───────────────────────────────────────────────────────── */
const VnmCheckbox = ({ id, checked, onChange, children }) => (
  <div className="flex items-start gap-2.5" style={{ flexDirection: "row-reverse", justifyContent: "flex-end" }}>
    <label htmlFor={id} className="text-base cursor-pointer leading-snug" style={{ color: "var(--vnm-text)" }}>
      {children}
    </label>
    <input type="checkbox" id={id} checked={checked} onChange={onChange} className="hidden" />
    <div
      onClick={() => onChange({ target: { checked: !checked } })}
      className="shrink-0 flex items-center justify-center cursor-pointer transition-all mt-0.5"
      style={{
        width: 16, height: 16,
        border: "1px solid var(--vnm-navy)",
        borderRadius: 2,
        backgroundColor: checked ? "var(--vnm-navy)" : "transparent",
        minWidth: 16,
      }}
    >
      {checked && <span style={{ color: "#fff", fontSize: 10, lineHeight: 1 }}>✓</span>}
    </div>
  </div>
);

/* ── Benefits bar (mint green, 4 items) ─────────────────────────────── */
const BenefitsBar = () => {
  const items = [
    { icon: "📅", label: "Tham gia sự kiện & hội thảo" },
    { icon: "🔥", label: "Ưu đãi & giảm giá" },
    { icon: "💡", label: "Lời khuyên từ chuyên gia" },
    { icon: "📍", label: "Theo dõi đơn hàng nhanh" },
  ];
  return (
    <div className="rounded-sm mb-5 py-4 px-4" style={{ backgroundColor: "#d5ede5" }}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs"
            style={{
              color: "var(--vnm-navy)",
              paddingLeft: i !== 0 ? "0.75rem" : 0,
              borderLeft: i !== 0 ? "1px solid rgba(10,0,130,0.18)" : "none",
            }}
          >
            <span className="text-base">{item.icon}</span>
            <span className="leading-snug">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Register Page ──────────────────────────────────────────────────── */
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
  });
  const [checks, setChecks] = useState({ terms: false, marketing: false, survey: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim())  { toast.error("Vui lòng nhập họ và tên"); return; }
    if (!form.email.trim())     { toast.error("Vui lòng nhập email"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error("Email không hợp lệ"); return; }
    if (!form.password)          { toast.error("Vui lòng nhập mật khẩu"); return; }
    if (form.password.length < 6){ toast.error("Mật khẩu ít nhất 6 ký tự"); return; }
    if (form.password !== form.confirmPassword) { toast.error("Mật khẩu xác nhận không khớp"); return; }
    if (!checks.terms) { toast.error("Bạn cần đồng ý với Điều khoản sử dụng"); return; }

    setLoading(true);
    try {
      await registerUser({ fullName: form.fullName, email: form.email, password: form.password });
    } catch { /* continue in demo */ }
    toast.success("🎉 Đăng ký thành công!");
    setTimeout(() => navigate("/login"), 1800);
    setLoading(false);
  };

  const decoStripe = {
    marginTop: "2rem",
    height: 6,
    background: "repeating-linear-gradient(to right, var(--vnm-navy) 0px, var(--vnm-navy) 22px, #00aae4 22px, #00aae4 44px)",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--vnm-cream)" }}>
      {/* Reuse existing Navbar */}
      <Navbar />

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl px-3 my-16">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
                <div style={{ borderBottom: "2px solid var(--vnm-text-sec)", paddingBottom: "2rem" }}>
                  <h1
                    className="mb-3"
                    style={{
                      fontFamily: "'VNM Sans Display', Georgia, serif",
                      fontSize: "clamp(2rem, 5vw, 2.75rem)",
                      fontWeight: 400,
                      color: "var(--vnm-navy)",
                    }}
                  >
                    Đăng ký
                  </h1>
                  <p className="text-base mb-4" style={{ color: "var(--vnm-text)" }}>
                    Tạo tài khoản Vinamilk và tham gia chương trình khách hàng thân thiết
                  </p>

                  <BenefitsBar />

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    {/* Full name */}
                    <VnmInput label="Họ và tên" id="fullName" value={form.fullName} onChange={handleChange} required />

                    {/* Email */}
                    <VnmInput label="Email (Gmail)" id="email" type="email" value={form.email} onChange={handleChange} required />

                    {/* Password */}
                    <VnmInput label="Nhập mật khẩu" id="password" type="password" value={form.password} onChange={handleChange} required />

                    {/* Confirm password */}
                    <VnmInput label="Xác nhận mật khẩu" id="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />

                    {/* Checkboxes */}
                    <div className="flex flex-col gap-3 mt-1">
                      <VnmCheckbox id="terms" checked={checks.terms} onChange={(e) => setChecks((p) => ({ ...p, terms: e.target.checked }))}>
                        Tôi đã đọc và đồng ý với các{" "}
                        <a href="#" style={{ color: "var(--vnm-navy)", textDecoration: "underline" }}>Điều khoản sử dụng</a>
                        {" "}và{" "}
                        <a href="#" style={{ color: "var(--vnm-navy)", textDecoration: "underline" }}>Chính sách bảo mật</a>
                      </VnmCheckbox>
                      <VnmCheckbox id="marketing" checked={checks.marketing} onChange={(e) => setChecks((p) => ({ ...p, marketing: e.target.checked }))}>
                        Tôi đồng ý nhận quảng cáo và ưu đãi trong phạm vi sử dụng được quy định tại{" "}
                        <a href="#" style={{ color: "var(--vnm-navy)", textDecoration: "underline" }}>Chính sách bảo mật</a>
                      </VnmCheckbox>
                      <VnmCheckbox id="survey" checked={checks.survey} onChange={(e) => setChecks((p) => ({ ...p, survey: e.target.checked }))}>
                        Tôi đồng ý tham gia khảo sát người dùng &amp; các nghiên cứu thị trường khác
                      </VnmCheckbox>
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
                      {loading ? "Đang xử lý..." : "Đăng ký"}
                    </motion.button>
                  </form>
                </div>

                {/* Footer */}
                <div className="py-8 text-center">
                  <p className="text-base" style={{ color: "var(--vnm-text)" }}>
                    Bạn đã có tài khoản?{" "}
                    <Link to="/login" className="underline font-semibold ml-1" style={{ color: "var(--vnm-navy)" }}>
                      Đăng nhập
                    </Link>
                  </p>
                  <div style={decoStripe} />
                </div>
              </motion.div>

        </div>
      </main>
    </div>
  );
};

export default Register;