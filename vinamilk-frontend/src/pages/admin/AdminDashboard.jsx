import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiPackage, FiShoppingCart, FiUsers, FiTrendingUp,
  FiArrowUp, FiArrowDown, FiDollarSign, FiEye,
  FiMoreHorizontal, FiArrowRight, FiAlertCircle, FiBarChart2,
} from "react-icons/fi";
import axiosClient from "../../services/axiosClient";

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, change, color, bg, delay = 0 }) => {
  const isPositive = change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: bg }}>
          <Icon size={20} style={{ color }} />
        </div>
        <button className="p-1 rounded-lg text-[#5a7299] hover:bg-[#E8F0FB] transition-all opacity-0 group-hover:opacity-100">
          <FiMoreHorizontal size={16} />
        </button>
      </div>
      <p className="text-2xl font-black text-[#1a2e5a] mb-1">{value}</p>
      <p className="text-sm text-[#5a7299] font-medium mb-3">{label}</p>
      <div className="flex items-center gap-1.5">
        <span
          className="flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            color: isPositive ? "#166534" : "#991b1b",
            background: isPositive ? "#f0fdf4" : "#fef2f2",
          }}
        >
          {isPositive ? <FiArrowUp size={10} /> : <FiArrowDown size={10} />}
          {Math.abs(change)}%
        </span>
        <span className="text-xs text-[#5a7299]">so với tháng trước</span>
      </div>
    </motion.div>
  );
};

// ── Recent Orders Table ───────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    pending:    { label: "Chờ xác nhận", bg: "#FEF3C7", color: "#92400E" },
    confirmed:  { label: "Đã xác nhận",  bg: "#DBEAFE", color: "#1E40AF" },
    shipping:   { label: "Đang giao",    bg: "#E0F2FE", color: "#0369A1" },
    delivered:  { label: "Đã giao",      bg: "#D1FAE5", color: "#065F46" },
    cancelled:  { label: "Đã hủy",       bg: "#FEE2E2", color: "#991B1B" },
  };
  const c = config[status] || config.pending;
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold" style={{ background: c.bg, color: c.color }}>
      {c.label}
    </span>
  );
};

// ── Mini Bar Chart ────────────────────────────────────────────────────────────
const MiniChart = ({ data, color }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="flex-1 rounded-t"
          style={{ background: color, opacity: i === data.length - 1 ? 1 : 0.4 }}
        />
      ))}
    </div>
  );
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.allSettled([
          axiosClient.get("/api/orders"),
          axiosClient.get("/api/products"),
        ]);
        if (ordersRes.status === "fulfilled") setOrders(ordersRes.value.data?.orders || ordersRes.value.data || []);
        if (productsRes.status === "fulfilled") setProducts(productsRes.value.data?.products || productsRes.value.data || []);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Mock stats
  const stats = [
    { icon: FiDollarSign, label: "Doanh thu tháng này", value: "₫284.5M", change: 12.5, color: "#003087", bg: "#E8F0FB", delay: 0 },
    { icon: FiShoppingCart, label: "Đơn hàng mới", value: "1,248", change: 8.2, color: "#0369A1", bg: "#E0F2FE", delay: 0.05 },
    { icon: FiPackage, label: "Sản phẩm đang bán", value: "86", change: -2.1, color: "#6D28D9", bg: "#EDE9FE", delay: 0.1 },
    { icon: FiUsers, label: "Tài khoản mới", value: "342", change: 18.7, color: "#065F46", bg: "#D1FAE5", delay: 0.15 },
  ];

  const revenueData = [120, 180, 150, 210, 190, 250, 284];
  const ordersData = [80, 110, 95, 145, 120, 165, 200];

  const mockOrders = [
    { id: "VNM-2001", customer: "Nguyễn Văn An", total: 245000, status: "pending", date: "01/06/2026", items: 3, img: "/images/p1.png" },
    { id: "VNM-2002", customer: "Trần Thị Bình", total: 520000, status: "confirmed", date: "01/06/2026", items: 5, img: "/images/p2.png" },
    { id: "VNM-2003", customer: "Lê Minh Cường", total: 89000, status: "shipping", date: "31/05/2026", items: 1, img: "/images/p4.png" },
    { id: "VNM-2004", customer: "Phạm Lan Hương", total: 370000, status: "delivered", date: "31/05/2026", items: 4, img: "/images/p5.png" },
    { id: "VNM-2005", customer: "Võ Đình Tuấn", total: 152000, status: "cancelled", date: "30/05/2026", items: 2, img: "/images/p6.png" },
  ];

  const topProducts = [
    { name: "Sữa tươi Green Farm Có đường 1L", sold: 1248, revenue: "₫62.4M", img: "/images/p1.png" },
    { name: "Sữa chua ăn Green Farm Ít Đường", sold: 986, revenue: "₫31.5M", img: "/images/p2.png" },
    { name: "Sữa hạt Vinamilk 9 loại hạt", sold: 742, revenue: "₫26.0M", img: "/images/p4.png" },
    { name: "Vinamilk Gelato Sôcôla 400ml", sold: 521, revenue: "₫41.2M", img: "/images/p5.png" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1a2e5a]">Dashboard</h1>
          <p className="text-sm text-[#5a7299] mt-0.5">Chào mừng trở lại! Đây là tổng quan hôm nay.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5a7299] font-medium hidden sm:block">
            {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </span>
          <Link
            to="/admin/orders"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-xl text-white transition-all hover:opacity-90 shadow-sm"
            style={{ background: "#003087" }}
          >
            Xem đơn hàng <FiArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── Alert ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-start gap-3 px-4 py-3 rounded-xl border"
        style={{ background: "#FEF3C7", borderColor: "#F59E0B" }}
      >
        <FiAlertCircle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-amber-800 font-medium">
          Có <strong>5 đơn hàng</strong> đang chờ xác nhận và <strong>3 sản phẩm</strong> sắp hết hàng.{" "}
          <Link to="/admin/orders" className="underline font-bold">Xem ngay →</Link>
        </p>
      </motion.div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[#1a2e5a]">Doanh thu 7 ngày qua</h3>
              <p className="text-xs text-[#5a7299] mt-0.5">Triệu đồng (VNĐ)</p>
            </div>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <FiArrowUp size={10} /> +12.5%
            </span>
          </div>
          <div className="flex items-end gap-2 h-32">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(revenueData[i] / 284) * 100}%` }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="w-full rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ background: i === 6 ? "#003087" : "#E8F0FB", minHeight: "4px" }}
                  title={`${revenueData[i]}M`}
                />
                <span className="text-[10px] text-[#5a7299] font-medium">{day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Orders mini chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[#1a2e5a]">Đơn hàng</h3>
            <FiBarChart2 size={16} className="text-[#5a7299]" />
          </div>
          <MiniChart data={ordersData} color="#0369A1" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "Chờ xác nhận", val: 5, color: "#F59E0B" },
              { label: "Đang giao", val: 18, color: "#0369A1" },
              { label: "Đã giao", val: 127, color: "#10B981" },
              { label: "Đã hủy", val: 7, color: "#EF4444" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-lg font-black" style={{ color: item.color }}>{item.val}</span>
                <span className="text-[10px] text-[#5a7299] font-medium leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Row: Orders + Top Products ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 bg-white rounded-2xl border border-[#E8E2D4] shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E2D4]">
            <h3 className="font-bold text-[#1a2e5a]">Đơn hàng gần đây</h3>
            <Link to="/admin/orders" className="text-xs font-bold text-[#003087] hover:underline flex items-center gap-1">
              Xem tất cả <FiArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#FAF6EC" }}>
                  {["Mã đơn", "Khách hàng", "SP", "Tổng tiền", "Trạng thái", "Ngày"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#5a7299]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="border-t border-[#E8E2D4] hover:bg-[#FAF6EC] transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <span className="text-xs font-black text-[#003087]">{order.id}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#1a2e5a]">{order.customer}</td>
                    <td className="px-4 py-3 text-sm text-[#5a7299]">{order.items}</td>
                    <td className="px-4 py-3 text-sm font-bold text-[#1a2e5a]">
                      {order.total.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                    <td className="px-4 py-3 text-xs text-[#5a7299]">{order.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-[#E8E2D4] shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E2D4]">
            <h3 className="font-bold text-[#1a2e5a]">Sản phẩm bán chạy</h3>
            <Link to="/admin/products" className="text-xs font-bold text-[#003087] hover:underline flex items-center gap-1">
              Xem tất cả <FiArrowRight size={12} />
            </Link>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {topProducts.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FAF6EC] transition-all group cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
                  style={{ background: i === 0 ? "#F59E0B" : i === 1 ? "#6B7280" : i === 2 ? "#B45309" : "#003087" }}>
                  {i + 1}
                </span>
                <img src={p.img} alt={p.name} className="w-10 h-10 object-contain flex-shrink-0" style={{ mixBlendMode: "multiply" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#1a2e5a] line-clamp-2 leading-tight">{p.name}</p>
                  <p className="text-[10px] text-[#5a7299] mt-0.5">{p.sold} đã bán</p>
                </div>
                <span className="text-xs font-black text-[#003087] flex-shrink-0">{p.revenue}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
