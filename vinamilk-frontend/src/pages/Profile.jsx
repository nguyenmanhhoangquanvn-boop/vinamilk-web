import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiUser, FiShoppingBag, FiMapPin, FiLock,
  FiLogOut, FiChevronRight, FiMoon, FiSun,
} from "react-icons/fi";

import ProfileForm, { AvatarUpload, ProfileInfoForm, ChangePasswordForm } from "../components/ProfileForm";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext";
import { getProfile } from "../services/profileService";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const ProfileSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="flex flex-col items-center gap-3">
      <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-48" />
    </div>
    {[...Array(3)].map((_, i) => (
      <div key={i} className="space-y-1.5">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />
        <div className="h-11 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      </div>
    ))}
  </div>
);

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const ProfileSidebar = ({ active, onChange, user, onLogout }) => {
  const { dark } = useDarkMode();

  const menuItems = [
    { id: "info", icon: FiUser, label: "Thông tin cá nhân" },
    { id: "orders", icon: FiShoppingBag, label: "Đơn hàng của tôi", link: "/orders" },
    { id: "address", icon: FiMapPin, label: "Địa chỉ giao hàng" },
    { id: "password", icon: FiLock, label: "Đổi mật khẩu" },
  ];

  const initials = user?.fullName
    ? user.fullName.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase()
    : "U";

  return (
    <div className="bg-transparent rounded-2xl border border-[var(--vnm-border)] overflow-hidden">
      {/* User info */}
      <div className="p-5 border-b border-[var(--vnm-border)] bg-[var(--vnm-cream-2)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0"
               style={{ background: "var(--vnm-navy)" }}>
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-black text-sm truncate" style={{ color: "var(--vnm-navy)" }}>
              {user?.fullName || "Người dùng"}
            </p>
            <p className="text-xs truncate" style={{ color: "var(--vnm-text-sec)" }}>{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const content = (
            <motion.div
              whileHover={{ x: 2 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all`}
              style={{
                background: isActive ? "var(--vnm-navy)" : "transparent",
                color: isActive ? "#fff" : "var(--vnm-text)",
              }}
              onClick={() => !item.link && onChange(item.id)}
            >
              <Icon size={17} />
              <span className="text-sm font-semibold flex-1">{item.label}</span>
              <FiChevronRight size={14} style={{ color: isActive ? "rgba(255,255,255,0.6)" : "var(--vnm-text-sec)" }} />
            </motion.div>
          );

          return item.link ? (
            <Link key={item.id} to={item.link}>{content}</Link>
          ) : (
            <div key={item.id}>{content}</div>
          );
        })}
      </nav>

      {/* Dark mode toggle */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
          {dark ? <FiMoon size={16} className="text-blue-400" /> : <FiSun size={16} className="text-amber-500" />}
          {dark ? "Giao diện tối" : "Giao diện sáng"}
        </div>
        <ThemeToggle size="sm" />
      </div>

      {/* Logout */}
      <div className="p-2 border-t border-slate-100 dark:border-slate-700">
        <motion.button
          whileHover={{ x: 2 }}
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500
                     hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <FiLogOut size={17} />
          <span className="text-sm font-semibold">Đăng xuất</span>
        </motion.button>
      </div>
    </div>
  );
};

// ─── Section titles ───────────────────────────────────────────────────────────
const sectionMeta = {
  info: { title: "Thông tin cá nhân", sub: "Quản lý thông tin hồ sơ để bảo mật tài khoản" },
  address: { title: "Địa chỉ giao hàng", sub: "Quản lý địa chỉ nhận hàng của bạn" },
  password: { title: "Đổi mật khẩu", sub: "Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu" },
};

// ─── Main Profile ─────────────────────────────────────────────────────────────
const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("info");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load ngay lập tức
    setProfileData(user);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất!");
    navigate("/login");
  };

  const displayUser = profileData || user;
  const meta = sectionMeta[activeSection] || sectionMeta.info;

  return (
    <div className="w-full">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Trang chủ</Link>
          <FiChevronRight size={13} />
          <span className="text-blue-600 dark:text-blue-400 font-semibold">Tài khoản</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar
              active={activeSection}
              onChange={setActiveSection}
              user={displayUser}
              onLogout={handleLogout}
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-transparent rounded-2xl border border-[var(--vnm-border)] p-6"
            >
              {/* Section header */}
              <div className="mb-6 pb-4 border-b border-[var(--vnm-border)]">
                <h2 className="text-lg font-black" style={{ color: "var(--vnm-navy)", fontFamily: "'Playfair Display', serif" }}>{meta.title}</h2>
                <p className="text-sm mt-0.5" style={{ color: "var(--vnm-text-sec)" }}>{meta.sub}</p>
              </div>

              {/* Content */}
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeSection === "info" && (
                      <div className="space-y-6">
                        <AvatarUpload user={displayUser} />
                        <ProfileInfoForm user={displayUser} />
                      </div>
                    )}

                    {activeSection === "address" && (
                      <div className="space-y-4">
                        <div className="rounded-xl p-4 border" style={{ background: "var(--vnm-cream-2)", borderColor: "var(--vnm-border)" }}>
                          <p className="text-sm font-bold mb-1" style={{ color: "var(--vnm-navy)" }}>📍 Địa chỉ mặc định</p>
                          <p className="text-sm" style={{ color: "var(--vnm-text)" }}>
                            {displayUser?.address || "Chưa có địa chỉ. Vui lòng cập nhật trong phần Thông tin cá nhân."}
                          </p>
                        </div>
                        <p className="text-xs" style={{ color: "var(--vnm-text-sec)" }}>
                          💡 Chỉnh sửa địa chỉ trong phần{" "}
                          <button
                            onClick={() => setActiveSection("info")}
                            className="font-semibold hover:underline"
                            style={{ color: "var(--vnm-navy)" }}
                          >
                            Thông tin cá nhân
                          </button>
                        </p>
                      </div>
                    )}

                    {activeSection === "password" && <ChangePasswordForm />}
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;