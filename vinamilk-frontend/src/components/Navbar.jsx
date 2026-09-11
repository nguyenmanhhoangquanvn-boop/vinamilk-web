import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiUser, FiLogOut, FiShoppingCart, FiHeart,
  FiSettings, FiPackage, FiMenu, FiX, FiChevronDown,
  FiBookOpen, FiAward, FiBarChart2,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

// ─── Avatar initials ──────────────────────────────────────────────────────────
const Avatar = ({ name }) => {
  const initials = name
    ? name.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase()
    : "U";
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow select-none"
         style={{ background: "var(--vnm-navy)" }}>
      {initials}
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const dropRefTop = useRef(null);
  const dropRefMain = useRef(null);
  const megaRef = useRef(null);

  const [megaHovered, setMegaHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !scrolled && !isHovered && !mobileOpen && !dropOpen && !megaHovered;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // initialize on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
    setMegaHovered(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      const target = e.target;
      const inTop = dropRefTop.current?.contains(target);
      const inMain = dropRefMain.current?.contains(target);
      if (!inTop && !inMain) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    setDropOpen(false);
    logout();
    toast.success("Đã đăng xuất thành công!");
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Trang chủ" },
    { to: "/products", label: "Sản phẩm", hasMega: true },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "Giới thiệu" },
    { to: "/care", label: "Vinamilk Care" },
  ];

  const megaMenuData = {
    nganhHang: [
      { name: "Sữa Tươi", id: 1, type: "categories", count: 24 },
      { name: "Sữa Chua", id: 2, type: "categories", count: 18 },
      { name: "Sữa Đặc", id: 3, type: "categories", count: 8 },
      { name: "Sữa Bột", id: 4, type: "categories", count: 15 },
      { name: "Sữa Trái Cây", id: 5, type: "categories", count: 3 },
      { name: "Sữa Dinh Dưỡng", id: 6, type: "categories", count: 12 },
      { name: "Sữa Thực Vật", id: 7, type: "categories", count: 5 },
      { name: "Kem", id: 8, type: "categories", count: 6 },
    ],
    thuongHieu: [
      { name: "Vinamilk", id: 1, type: "brands", count: 42 },
      { name: "Cô gái Hà Lan", id: 2, type: "brands", count: 15 },
      { name: "TH true Milk", id: 3, type: "brands", count: 12 },
      { name: "Lothamilk", id: 4, type: "brands", count: 8 },
    ],
    huongVi: [
      { name: "Nguyên chất", id: "original", type: "flavors" },
      { name: "Dâu tây", id: "strawberry", type: "flavors" },
      { name: "Socola", id: "chocolate", type: "flavors" },
      { name: "Chuối", id: "banana", type: "flavors" },
      { name: "Việt quất", id: "blueberry", type: "flavors" },
      { name: "Vani", id: "vanilla", type: "flavors" },
      { name: "Cà phê", id: "coffee", type: "flavors" },
    ],
    doiTuongDacBiet: [
      { name: "Người bệnh tiểu đường", id: "diabetes", type: "specialTarget", count: 1 },
    ]
  };

  const handleMegaMenuClick = (item) => {
    const emptyFilters = { categories: [], brands: [], rating: [], priceMin: 0, priceMax: 0, search: "", flavors: [], specialTarget: [] };
    let currentFilters = emptyFilters;
    try {
      const saved = sessionStorage.getItem("vnm_shop_filters");
      if (saved) currentFilters = { ...emptyFilters, ...JSON.parse(saved) };
    } catch (e) {}

    // Add the new filter if not already present
    const newFilters = { ...currentFilters };
    if (!newFilters[item.type]) newFilters[item.type] = [];
    if (!newFilters[item.type].includes(item.id)) {
      newFilters[item.type] = [...newFilters[item.type], item.id];
    }

    sessionStorage.setItem("vnm_shop_filters", JSON.stringify(newFilters));
    sessionStorage.setItem("vnm_shop_should_restore", "true");
    sessionStorage.setItem("vnm_shop_page", "1");
    sessionStorage.setItem("vnm_shop_sort", "relevant");
    window.dispatchEvent(new CustomEvent("vnm_shop_filters_updated", { detail: newFilters }));
    setMegaHovered(false); // Force close mega menu
  };

  const dropItems = [
    { icon: FiUser, label: "Hồ sơ cá nhân", to: "/profile" },
    { icon: FiPackage, label: "Đơn hàng của tôi", to: "/orders" },
    { icon: FiAward, label: "Vinamilk Rewards", to: "/rewards" },
    { icon: FiBarChart2, label: "Admin Panel", to: "/admin", adminOnly: true },
  ];

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const renderCartAndAccount = (inTopStrip) => {
    const iconColor = inTopStrip ? "#fff" : (isTransparent ? "#fff" : "var(--vnm-text-sec)");
    const textColor = inTopStrip ? "#fff" : (isTransparent ? "#fff" : "var(--vnm-text)");
    const subTextColor = inTopStrip ? "rgba(255,255,255,0.8)" : (isTransparent ? "rgba(255,255,255,0.8)" : "var(--vnm-text-sec)");
    const bgHover = inTopStrip ? "rgba(255,255,255,0.1)" : (isTransparent ? "rgba(255,255,255,0.1)" : "transparent");

    return (
      <>
        {/* Cart and Slogans */}
        <div className="flex items-center">
          {inTopStrip && (
            <div className="flex items-center gap-4 mr-3">
              <div className="uppercase font-bold tracking-widest text-[10px] opacity-95">
                Luôn là Vinamilk
              </div>
              <div className="uppercase font-bold tracking-widest text-[10px] opacity-95">
                Luôn cầu tiến
              </div>
            </div>
          )}

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 transition-colors duration-150"
            style={{ color: iconColor }}
          >
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] text-white
                           text-[9px] font-black rounded-full flex items-center justify-center px-1"
                style={{ background: "var(--vnm-red)" }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </motion.span>
            )}
          </button>
        </div>

        {/* Account / Login */}
        {isLoggedIn ? (
          <div className="relative" ref={inTopStrip ? dropRefTop : dropRefMain}>
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className="p-2 rounded-full transition-all flex items-center justify-center"
              style={{ color: iconColor, backgroundColor: bgHover }}
              aria-label="Tài khoản"
            >
              <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-current flex items-center justify-center">
                <FiUser size={13} />
              </div>
            </button>

            <AnimatePresence>
              {dropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl
                             border border-slate-100 overflow-hidden z-50"
                >
                  <div className="px-4 py-3.5 bg-gradient-to-r from-blue-50 to-sky-50 border-b border-slate-100">
                    <p className="font-bold text-slate-800 text-sm truncate">{user?.fullName}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1.5">
                    {dropItems.map(({ icon: Icon, label, to }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700
                                   hover:bg-blue-50 hover:text-blue-700 transition-all font-medium"
                      >
                        <Icon size={15} className="text-slate-400" />
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 p-1.5">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600
                                 hover:bg-red-50 rounded-xl transition-all font-semibold"
                    >
                      <FiLogOut size={15} />
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-1.5 text-sm font-medium border transition-colors hidden sm:block rounded"
              style={{ 
                borderColor: iconColor, 
                color: iconColor, 
                background: "transparent" 
              }}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-4 py-1.5 text-sm font-medium transition-all rounded"
              style={{ 
                background: inTopStrip ? "#fff" : (isTransparent ? "#fff" : "var(--vnm-navy)"),
                color: inTopStrip ? "var(--vnm-navy)" : (isTransparent ? "var(--vnm-navy)" : "#fff")
              }}
            >
              Đăng ký
            </Link>
          </div>
        )}
      </>
    );
  };

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`sticky z-50 border-b transition-all duration-300
        ${scrolled && !isTransparent ? "shadow-md" : ""}`}
      style={{ 
        top: scrolled ? "-44px" : "0",
        background: isTransparent ? "transparent" : "#fff", 
        borderColor: isTransparent ? "transparent" : "var(--vnm-border)",
        marginBottom: isHomePage ? "-60px" : "0"
      }}
    >
      {/* Top info strip with account */}
      <div className="hidden md:flex items-center justify-between px-6 text-xs font-medium h-[44px]"
           style={{ background: "var(--vnm-navy)", color: "#fff" }}>
        <span>Miễn phí vận chuyển cho đơn từ 300.000đ &nbsp;·&nbsp; Hotline: 1800 1260</span>
        <div className="flex items-center gap-4">
          {!scrolled && renderCartAndAccount(true)}
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-300 flex items-center justify-between gap-4 ${scrolled ? "h-[56px]" : "h-[60px]"}`}>

        {/* Logo — Vinamilk EST 1976 style */}
        <Link to="/" className="flex flex-col items-center flex-shrink-0 group select-none leading-none transition-colors duration-300">
          <span className="font-black font-display text-[28px] sm:text-[34px] tracking-tight transition-colors duration-300"
                style={{ color: isTransparent ? "#fff" : "var(--vnm-navy)", letterSpacing: "-0.02em", lineHeight: 1 }}>
            Vinamilk<sup className="text-[10px] sm:text-[11px] font-bold relative" style={{ top: "-12px" }}>®</sup>
          </span>
          <span className="flex items-center gap-[2px] transition-colors duration-300"
                style={{ color: isTransparent ? "rgba(255,255,255,0.85)" : "var(--vnm-navy)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", marginTop: "-2px" }}>
            <span>EST</span>
            <span style={{ flex: 1, borderBottom: `1px solid ${isTransparent ? "rgba(255,255,255,0.4)" : "var(--vnm-navy)"}`, margin: "0 6px", opacity: 0.4, minWidth: "20px" }}></span>
            <span>1976</span>
          </span>
        </Link>

        {/* Desktop nav links — Vinamilk style mega menu */}
        <div className="hidden md:flex items-center gap-1 xl:gap-2 h-full">
          {navLinks.map(({ to, label, hasMega }) => (
            <div 
              key={label} 
              className="h-full flex items-center"
              onMouseEnter={() => hasMega && setMegaHovered(true)}
              onMouseLeave={() => hasMega && setMegaHovered(false)}
            >
              <Link
                to={to}
                onClick={() => {
                  if (to.includes("/products")) {
                    sessionStorage.removeItem("vnm_shop_should_restore");
                    sessionStorage.removeItem("vnm_shop_filters");
                    sessionStorage.removeItem("vnm_shop_page");
                    sessionStorage.removeItem("vnm_shop_sort");
                    window.dispatchEvent(new CustomEvent("vnm_shop_filters_updated", { detail: null }));
                  }
                  if (hasMega) setMegaHovered(false);
                }}
                className="px-2 xl:px-3 py-2 text-[13px] xl:text-[15px] font-medium transition-colors duration-150 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                style={{
                  color: isTransparent ? "#fff" : (isActive(to) ? "var(--vnm-navy)" : "var(--vnm-text)"),
                }}
              >
                {label}
                {hasMega && <FiChevronDown size={14} className={`mt-0.5 opacity-60 transition-transform ${megaHovered ? "rotate-180" : ""}`} />}
              </Link>
              
              {/* Mega Menu Dropdown */}
              {hasMega && (
                <div className={`absolute top-full left-0 w-full bg-[#FFFDF8] transition-all duration-300 shadow-xl border-t-2 ${megaHovered ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`} style={{ borderColor: "var(--vnm-navy)", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                  <div className="p-8 flex gap-8 mx-auto w-full max-w-7xl">
                    {/* Left Banner & Buttons */}
                    <div className="w-[280px] flex-shrink-0 flex flex-col gap-3">
                      <Link to="/products" onClick={() => setMegaHovered(false)} className="rounded-xl overflow-hidden shadow-sm relative group/banner border border-[#E5E7EB] block">
                        <img src="https://d8um25gjecm9v.cloudfront.net/cms/crop_750x525_27aadef294.png" alt="Banner" className="w-full h-auto object-cover transform group-hover/banner:scale-105 transition-transform duration-500" />
                      </Link>
                      <div className="flex flex-col gap-2 mt-2">
                        {[
                          { title: "BÁN CHẠY", icon: "BEST", color: "#E0F7FA", to: "/products" },
                          { title: "VINAMILK CARE", icon: "SUBS", color: "#E0F7FA", to: "/care" },
                          { title: "FLASH SALE", icon: "HOT", color: "#FCE4EC", to: "/products" },
                        ].map((btn) => (
                          <Link 
                            key={btn.title} 
                            to={btn.to}
                            onClick={() => setMegaHovered(false)}
                            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold text-[#003087] hover:brightness-95 transition-all" 
                            style={{ backgroundColor: btn.color }}
                          >
                            {btn.title}
                            <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#003087] font-black">{btn.icon}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Columns */}
                    <div className="flex-1 grid grid-cols-4 gap-6">
                      {/* Column 1 */}
                      <div>
                        <h4 className="text-[13px] font-bold mb-4 uppercase tracking-wider" style={{ color: "var(--vnm-navy)" }}>Ngành hàng</h4>
                        <ul className="space-y-2.5">
                          {megaMenuData.nganhHang.map((item) => (
                            <li key={item.name}>
                              <Link to="/products" onClick={() => handleMegaMenuClick(item)} className="text-[14px] text-slate-700 hover:text-[#003087] font-medium transition-colors flex">
                                {item.name}
                                {item.count && <sup className="ml-1 text-[10px] opacity-70 mt-1">{item.count}</sup>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Column 2 */}
                      <div>
                        <h4 className="text-[13px] font-bold mb-4 uppercase tracking-wider" style={{ color: "var(--vnm-navy)" }}>Thương hiệu</h4>
                        <ul className="space-y-2.5">
                          {megaMenuData.thuongHieu.map((item) => (
                            <li key={item.name}>
                              <Link to="/products" onClick={() => handleMegaMenuClick(item)} className="text-[14px] text-slate-700 hover:text-[#003087] font-medium transition-colors flex">
                                {item.name}
                                {item.count && <sup className="ml-1 text-[10px] opacity-70 mt-1">{item.count}</sup>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Column 3 */}
                      <div>
                        <h4 className="text-[13px] font-bold mb-4 uppercase tracking-wider" style={{ color: "var(--vnm-navy)" }}>Hương vị</h4>
                        <ul className="space-y-2.5">
                          {megaMenuData.huongVi.map((item) => (
                            <li key={item.name}>
                              <Link to="/products" onClick={() => handleMegaMenuClick(item)} className="text-[14px] text-slate-700 hover:text-[#003087] font-medium transition-colors flex">
                                {item.name}
                                {item.count && <sup className="ml-1 text-[10px] opacity-70 mt-1">{item.count}</sup>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Column 4 - Special Targets & All products */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <h4 className="text-[13px] font-bold mb-4 uppercase tracking-wider" style={{ color: "var(--vnm-navy)" }}>Đối tượng đặc biệt</h4>
                          <ul className="space-y-2.5">
                            {megaMenuData.doiTuongDacBiet.map((item) => (
                              <li key={item.name}>
                                <Link to="/products" onClick={() => handleMegaMenuClick(item)} className="text-[14px] text-slate-700 hover:text-[#003087] font-medium transition-colors flex">
                                  {item.name}
                                  {item.count && <sup className="ml-1 text-[10px] opacity-70 mt-1">{item.count}</sup>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pb-2 mt-6">
                          <Link to="/products" onClick={() => {
                            sessionStorage.removeItem("vnm_shop_should_restore");
                            sessionStorage.removeItem("vnm_shop_filters");
                            sessionStorage.removeItem("vnm_shop_page");
                            sessionStorage.removeItem("vnm_shop_sort");
                            window.dispatchEvent(new CustomEvent("vnm_shop_filters_updated", { detail: null }));
                            setMegaHovered(false);
                          }} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all text-sm" style={{ background: "var(--vnm-navy)" }}>
                            Xem tất cả sản phẩm
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-3 ${!scrolled ? "md:hidden" : ""}`}>
            {renderCartAndAccount(false)}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl transition-all"
            style={{ color: isTransparent ? "#fff" : "var(--vnm-text-sec)" }}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => {
                    setMobileOpen(false);
                    if (to === "/products") {
                      sessionStorage.removeItem("vnm_shop_should_restore");
                      sessionStorage.removeItem("vnm_shop_filters");
                      sessionStorage.removeItem("vnm_shop_page");
                      sessionStorage.removeItem("vnm_shop_sort");
                      sessionStorage.removeItem("vnm_shop_scroll");
                    }
                  }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                    ${isActive(to)
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                >
                  {label}
                </Link>
              ))}

              {/* Đối tượng đặc biệt */}
              <div className="border-t border-slate-100 mt-1 pt-2">
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--vnm-navy)", opacity: 0.5 }}>Đối tượng đặc biệt</p>
                <Link
                  to="/products"
                  onClick={() => {
                    setMobileOpen(false);
                    handleMegaMenuClick({ name: "Người bệnh tiểu đường", id: "diabetes", type: "specialTarget" });
                  }}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"
                >
                  <span>Người bệnh tiểu đường</span>
                </Link>
              </div>

              {isLoggedIn && (
                <>
                  <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1" />
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300
                               hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-all"
                  >
                    <FiUser size={14} /> Hồ sơ cá nhân
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300
                               hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-all"
                  >
                    <FiPackage size={14} /> Đơn hàng của tôi
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold
                               text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 transition-all text-left"
                  >
                    <FiLogOut size={14} /> Đăng xuất
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;