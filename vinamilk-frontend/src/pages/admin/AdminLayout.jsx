import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiHome, FiPackage, FiShoppingCart, FiUsers, FiGrid,
  FiLogOut, FiMenu, FiX, FiChevronDown, FiSearch,
  FiBell, FiSettings, FiTrendingUp, FiBarChart2,
  FiChevronRight, FiSun, FiMoon,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext";

// ── Admin Sidebar NavLink ────────────────────────────────────────────────────
const NavItem = ({ to, icon: Icon, label, badge, isCollapsed, children }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = children
    ? children.some((c) => location.pathname === c.to)
    : location.pathname === to || (to !== "/admin" && location.pathname.startsWith(to));

  if (children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group ${
            isActive
              ? "bg-[#003087] text-white shadow-sm"
              : "text-[#1a2e5a] hover:bg-[#E8F0FB] hover:text-[#003087]"
          }`}
        >
          <Icon size={17} className={isActive ? "text-white" : "text-[#5a7299] group-hover:text-[#003087]"} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{label}</span>
              <FiChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </>
          )}
        </button>
        <AnimatePresence>
          {open && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden ml-4 mt-1 border-l-2 border-[#E8E2D4] pl-3 flex flex-col gap-1"
            >
              {children.map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className={`text-sm px-3 py-2 rounded-lg font-medium transition-all ${
                    location.pathname === c.to
                      ? "text-[#003087] bg-[#E8F0FB]"
                      : "text-[#5a7299] hover:text-[#003087] hover:bg-[#E8F0FB]"
                  }`}
                >
                  {c.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group relative ${
        isActive
          ? "bg-[#003087] text-white shadow-sm"
          : "text-[#1a2e5a] hover:bg-[#E8F0FB] hover:text-[#003087]"
      }`}
    >
      <Icon size={17} className={isActive ? "text-white" : "text-[#5a7299] group-hover:text-[#003087]"} />
      {!isCollapsed && <span className="flex-1">{label}</span>}
      {!isCollapsed && badge && (
        <span className="min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-black flex items-center justify-center"
          style={{ background: isActive ? "rgba(255,255,255,0.25)" : "#D0021B", color: "#fff" }}>
          {badge}
        </span>
      )}
      {isCollapsed && badge && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
      )}
    </Link>
  );
};

// ── AdminLayout ──────────────────────────────────────────────────────────────
const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { dark, setDark } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất thành công!");
    navigate("/login");
  };

  const navGroups = [
    {
      label: "Tổng quan",
      items: [
        { to: "/admin", icon: FiHome, label: "Dashboard" },
        { to: "/admin/analytics", icon: FiTrendingUp, label: "Phân tích" },
      ],
    },
    {
      label: "Quản lý",
      items: [
        { to: "/admin/products", icon: FiPackage, label: "Sản phẩm", badge: null },
        { to: "/admin/categories", icon: FiGrid, label: "Danh mục" },
        { to: "/admin/orders", icon: FiShoppingCart, label: "Đơn hàng", badge: 5 },
        { to: "/admin/users", icon: FiUsers, label: "Tài khoản" },
      ],
    },
    {
      label: "Hệ thống",
      items: [
        { to: "/admin/settings", icon: FiSettings, label: "Cài đặt" },
      ],
    },
  ];

  const initials = user?.fullName
    ? user.fullName.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase()
    : "AD";

  const pageTitle = {
    "/admin": "Dashboard",
    "/admin/analytics": "Phân tích",
    "/admin/products": "Quản lý Sản phẩm",
    "/admin/categories": "Quản lý Danh mục",
    "/admin/orders": "Quản lý Đơn hàng",
    "/admin/users": "Quản lý Tài khoản",
    "/admin/settings": "Cài đặt hệ thống",
  }[location.pathname] || "Admin Panel";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-[#E8E2D4] ${collapsed ? "justify-center" : ""}`}>
        <Link to="/" className="flex flex-col items-center leading-none select-none">
          <span className="font-black text-[22px] tracking-tight text-[#003087]" style={{ letterSpacing: "-0.02em", lineHeight: 1 }}>
            Vinamilk<sup className="text-[9px] font-bold relative" style={{ top: "-8px" }}>®</sup>
          </span>
          {!collapsed && (
            <span className="text-[9px] font-bold tracking-[0.15em] text-[#003087] opacity-60 mt-0.5">
              ADMIN PANEL
            </span>
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="ml-auto p-1.5 rounded-lg hover:bg-[#E8F0FB] text-[#5a7299] transition-all hidden lg:block"
          >
            <FiChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-[#5a7299] opacity-60">
                {group.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavItem key={item.to} {...item} isCollapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className={`border-t border-[#E8E2D4] p-3 flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shadow flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #003087, #0057b8)" }}>
          {initials}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1a2e5a] truncate">{user?.fullName || "Admin"}</p>
            <p className="text-[11px] text-[#5a7299] truncate">{user?.email}</p>
          </div>
        )}
        {!collapsed && (
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg hover:bg-red-50 text-[#5a7299] hover:text-red-600 transition-all"
            title="Đăng xuất"
          >
            <FiLogOut size={16} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "var(--vnm-cream)" }}>
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 bg-white border-r border-[#E8E2D4] transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[240px]"}`}
        style={{ height: "100vh", position: "sticky", top: 0 }}
      >
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full bg-[#003087] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <FiChevronRight size={12} className="rotate-180" />
          </button>
        )}
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[240px] bg-white border-r border-[#E8E2D4] flex flex-col lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[#E8F0FB] text-[#5a7299]"
              >
                <FiX size={18} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-[60px] bg-white border-b border-[#E8E2D4] flex items-center px-4 gap-3 sticky top-0 z-30 shadow-sm">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-[#E8F0FB] text-[#5a7299] transition-all"
          >
            <FiMenu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link to="/admin" className="text-[#5a7299] hover:text-[#003087] transition-colors font-medium">Admin</Link>
            {location.pathname !== "/admin" && (
              <>
                <FiChevronRight size={12} className="text-[#5a7299]" />
                <span className="font-bold text-[#1a2e5a]">{pageTitle}</span>
              </>
            )}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs ml-4 hidden sm:block">
            <div className="relative">
              <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7299]" />
              <input
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Tìm kiếm nhanh..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF6EC] border border-[#E8E2D4] rounded-xl text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Dark mode */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl hover:bg-[#E8F0FB] text-[#5a7299] hover:text-[#003087] transition-all"
            >
              {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-[#E8F0FB] text-[#5a7299] hover:text-[#003087] transition-all">
              <FiBell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {/* Back to site */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white transition-all"
            >
              ← Về trang chủ
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
