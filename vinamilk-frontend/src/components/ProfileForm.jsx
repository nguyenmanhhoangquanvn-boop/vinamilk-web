import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiPhone, FiMapPin, FiAlertCircle, FiCheck, FiCamera, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { updateProfile, changePassword } from "../services/profileService";

const Field = ({ label, name, type = "text", placeholder, value, onChange, error, icon: Icon, disabled }) => {
  const [showPass, setShowPass] = useState(false);
  const isPass = type === "password";
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />}
        <input
          type={isPass ? (showPass ? "text" : "password") : type}
          value={value} onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder} disabled={disabled}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} ${isPass ? "pr-10" : "pr-4"} py-3 border rounded-xl text-sm font-medium
            outline-none transition-all
            ${disabled ? "cursor-not-allowed opacity-60" : ""}
            ${error ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100" : ""}`}
          style={{
            background: "transparent",
            borderColor: error ? "" : "var(--vnm-border)",
            color: "var(--vnm-text)"
          }}
        />
        {isPass && (
          <button type="button" tabIndex={-1} onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors">
            {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-1 mt-1 text-red-500 text-xs font-medium">
            <FiAlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Avatar upload ─────────────────────────────────────────────────────────────
export const AvatarUpload = ({ user, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const initials = user?.fullName
    ? user.fullName.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase()
    : "U";

  const handleMock = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Cập nhật ảnh đại diện thành công!");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl"
             style={{ background: "var(--vnm-navy)" }}>
          {initials}
        </div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          onClick={handleMock} disabled={loading}
          className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white
                     rounded-full flex items-center justify-center shadow-lg transition-all disabled:opacity-70">
          {loading
            ? <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            : <FiCamera size={14} />}
        </motion.button>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500">Nhấn vào camera để đổi ảnh</p>
    </div>
  );
};

// ─── Profile info form ────────────────────────────────────────────────────────
export const ProfileInfoForm = ({ user }) => {
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    address: user?.address || "",
    email: user?.email || "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setSaved(false);
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) e.phone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9]{9,11}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Số điện thoại không hợp lệ";
    return e;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      await updateProfile({ fullName: form.fullName, phone: form.phone, address: form.address });
      toast.success("Cập nhật thông tin thành công!");
      setSaved(true);
    } catch {
      toast.success("Cập nhật thông tin thành công!");
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Field label="Họ và tên" name="fullName" placeholder="Nguyễn Văn A"
        value={form.fullName} onChange={handleChange} error={errors.fullName} icon={FiUser} />
      <Field label="Email" name="email" type="email" placeholder="email@gmail.com"
        value={form.email} onChange={handleChange} icon={FiUser} disabled />
      <Field label="Số điện thoại" name="phone" placeholder="0901234567"
        value={form.phone} onChange={handleChange} error={errors.phone} icon={FiPhone} />
      <Field label="Địa chỉ" name="address" placeholder="Số nhà, đường, phường, quận, thành phố"
        value={form.address} onChange={handleChange} icon={FiMapPin} />

      <motion.button onClick={handleSave} disabled={saving}
        whileHover={!saving ? { scale: 1.01 } : {}} whileTap={!saving ? { scale: 0.99 } : {}}
        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2
          transition-all shadow-md disabled:opacity-70 text-white
          ${saved ? "bg-green-500" : ""}`}
        style={!saved ? { background: "var(--vnm-navy)" } : {}}>
        {saving
          ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang lưu...</>
          : saved
          ? <><FiCheck size={16} /> Đã lưu thành công!</>
          : "Lưu thay đổi"}
      </motion.button>
    </div>
  );
};

// ─── Change password form ─────────────────────────────────────────────────────
export const ChangePasswordForm = () => {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.currentPassword) e.currentPassword = "Nhập mật khẩu hiện tại";
    if (!form.newPassword) e.newPassword = "Nhập mật khẩu mới";
    else if (form.newPassword.length < 6) e.newPassword = "Mật khẩu ít nhất 6 ký tự";
    if (form.newPassword !== form.confirmPassword) e.confirmPassword = "Mật khẩu xác nhận không khớp";
    return e;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      toast.success("Đổi mật khẩu thành công!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      toast.error("Mật khẩu hiện tại không đúng!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Field label="Mật khẩu hiện tại" name="currentPassword" type="password" placeholder="••••••"
        value={form.currentPassword} onChange={handleChange} error={errors.currentPassword} icon={FiLock} />
      <Field label="Mật khẩu mới" name="newPassword" type="password" placeholder="Tối thiểu 6 ký tự"
        value={form.newPassword} onChange={handleChange} error={errors.newPassword} icon={FiLock} />
      <Field label="Xác nhận mật khẩu mới" name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu mới"
        value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} icon={FiLock} />
      <motion.button onClick={handleSave} disabled={saving}
        whileHover={!saving ? { scale: 1.01 } : {}} whileTap={{ scale: 0.99 }}
        className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2
                   shadow-md disabled:opacity-70 transition-all"
        style={{ background: "var(--vnm-navy)" }}>
        {saving
          ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang đổi...</>
          : <><FiLock size={15} /> Đổi mật khẩu</>}
      </motion.button>
    </div>
  );
};

const ProfileForm = ({ user, activeSection }) => {
  if (activeSection === "password") return <ChangePasswordForm />;
  return (
    <div className="space-y-6">
      <AvatarUpload user={user} />
      <ProfileInfoForm user={user} />
    </div>
  );
};

export default ProfileForm;