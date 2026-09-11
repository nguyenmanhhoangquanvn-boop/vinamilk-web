import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiSearch, FiFilter, FiChevronDown, FiX, FiEye, FiCheck,
  FiTruck, FiPackage, FiXCircle, FiClock, FiChevronLeft, FiChevronRight,
} from "react-icons/fi";

const MOCK_ORDERS = [
  { id: "VNM-2001", customer: "Nguyễn Văn An",   email: "an@gmail.com",    phone: "0901234567", total: 245000, status: "pending",   date: "01/06/2026", items: [{ name: "Sữa tươi Green Farm 1L", qty: 3, price: 32000, img: "/images/p1.png" }], address: "123 Nguyễn Huệ, Q1, TP.HCM" },
  { id: "VNM-2002", customer: "Trần Thị Bình",   email: "binh@gmail.com",   phone: "0912345678", total: 520000, status: "confirmed", date: "01/06/2026", items: [{ name: "Sữa chua Green Farm", qty: 5, price: 32000, img: "/images/p2.png" }], address: "456 Lê Lợi, Q3, TP.HCM" },
  { id: "VNM-2003", customer: "Lê Minh Cường",   email: "cuong@gmail.com",  phone: "0923456789", total: 89000,  status: "shipping",  date: "31/05/2026", items: [{ name: "Sữa hạt 9 loại", qty: 1, price: 89000, img: "/images/p4.png" }], address: "789 Nguyễn Thị Minh Khai, Q5, TP.HCM" },
  { id: "VNM-2004", customer: "Phạm Lan Hương",  email: "huong@gmail.com",  phone: "0934567890", total: 370000, status: "delivered", date: "31/05/2026", items: [{ name: "Vinamilk Gelato Sôcôla", qty: 4, price: 79000, img: "/images/p5.png" }], address: "12 Hai Bà Trưng, Q1, TP.HCM" },
  { id: "VNM-2005", customer: "Võ Đình Tuấn",   email: "tuan@gmail.com",   phone: "0945678901", total: 152000, status: "cancelled", date: "30/05/2026", items: [{ name: "Kem hộp Dừa 870ml", qty: 2, price: 85000, img: "/images/p6.png" }], address: "321 Lê Văn Sỹ, Q3, TP.HCM" },
  { id: "VNM-2006", customer: "Hoàng Thu Hà",   email: "ha@gmail.com",     phone: "0956789012", total: 96000,  status: "pending",   date: "30/05/2026", items: [{ name: "Sữa chua uống 180ml", qty: 12, price: 6500, img: "/images/p3.png" }], address: "654 Cách Mạng Tháng 8, Q10, TP.HCM" },
  { id: "VNM-2007", customer: "Đặng Văn Khoa",  email: "khoa@gmail.com",   phone: "0967890123", total: 340000, status: "confirmed", date: "29/05/2026", items: [{ name: "Sữa tươi tiệt trùng 1L", qty: 12, price: 28000, img: "/images/p7.png" }], address: "987 Đinh Tiên Hoàng, BT, TP.HCM" },
  { id: "VNM-2008", customer: "Bùi Thị Lan",    email: "lan@gmail.com",    phone: "0978901234", total: 420000, status: "delivered", date: "28/05/2026", items: [{ name: "Sữa đặc Ngôi Sao", qty: 24, price: 18000, img: "/images/p8.png" }], address: "135 Nguyễn Đình Chiểu, Q1, TP.HCM" },
];

const STATUS_FLOW = ["pending", "confirmed", "shipping", "delivered"];

const statusConfig = {
  pending:   { label: "Chờ xác nhận", icon: FiClock,    bg: "#FEF3C7", color: "#92400E", nextLabel: "Xác nhận đơn" },
  confirmed: { label: "Đã xác nhận",  icon: FiCheck,    bg: "#DBEAFE", color: "#1E40AF", nextLabel: "Bắt đầu giao" },
  shipping:  { label: "Đang giao",    icon: FiTruck,    bg: "#E0F2FE", color: "#0369A1", nextLabel: "Đã giao xong" },
  delivered: { label: "Đã giao",      icon: FiPackage,  bg: "#D1FAE5", color: "#065F46", nextLabel: null },
  cancelled: { label: "Đã hủy",       icon: FiXCircle,  bg: "#FEE2E2", color: "#991B1B", nextLabel: null },
};

const StatusBadge = ({ status }) => {
  const c = statusConfig[status] || statusConfig.pending;
  const Icon = c.icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: c.bg, color: c.color }}>
      <Icon size={10} /> {c.label}
    </span>
  );
};

// ── Order Detail Modal ────────────────────────────────────────────────────────
const OrderDetailModal = ({ open, order, onClose, onUpdateStatus }) => {
  if (!order) return null;
  const config = statusConfig[order.status];
  const currentIdx = STATUS_FLOW.indexOf(order.status);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D4] sticky top-0 bg-white">
              <div>
                <h2 className="font-black text-[#1a2e5a] text-lg">{order.id}</h2>
                <p className="text-xs text-[#5a7299]">{order.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={order.status} />
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#E8F0FB] text-[#5a7299]"><FiX size={18} /></button>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Progress */}
              {order.status !== "cancelled" && (
                <div className="flex items-center gap-1">
                  {STATUS_FLOW.map((s, i) => (
                    <div key={s} className="flex-1 flex items-center">
                      <div className={`flex-1 h-1 rounded-full transition-all ${i <= currentIdx ? "bg-[#003087]" : "bg-[#E8E2D4]"}`} />
                      {i < STATUS_FLOW.length - 1 && (
                        <div className={`w-2.5 h-2.5 rounded-full mx-1 flex-shrink-0 transition-all ${i <= currentIdx ? "bg-[#003087]" : "bg-[#E8E2D4]"}`} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Info */}
              <div className="bg-[#FAF6EC] rounded-xl p-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#5a7299] mb-3">Thông tin khách hàng</h4>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-bold text-[#1a2e5a]">{order.customer}</p>
                  <p className="text-sm text-[#5a7299]">{order.email}</p>
                  <p className="text-sm text-[#5a7299]">{order.phone}</p>
                  <p className="text-sm text-[#5a7299]">{order.address}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#5a7299] mb-3">Sản phẩm đặt mua</h4>
                <div className="flex flex-col gap-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#E8E2D4]">
                      <img src={item.img} alt={item.name} className="w-12 h-12 object-contain rounded-lg bg-white border border-[#E8E2D4] flex-shrink-0" style={{ mixBlendMode: "multiply" }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1a2e5a] line-clamp-2">{item.name}</p>
                        <p className="text-xs text-[#5a7299] mt-0.5">x{item.qty} · {Number(item.price).toLocaleString("vi-VN")}₫ mỗi sp</p>
                      </div>
                      <span className="text-sm font-black text-[#003087] flex-shrink-0">
                        {(item.qty * item.price).toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between py-3 border-t border-[#E8E2D4]">
                <span className="text-sm font-bold text-[#5a7299]">Tổng thanh toán</span>
                <span className="text-xl font-black text-[#003087]">{order.total.toLocaleString("vi-VN")}₫</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {config.nextLabel && (
                  <button
                    onClick={() => { onUpdateStatus(order.id, STATUS_FLOW[currentIdx + 1]); onClose(); }}
                    className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-sm transition-all"
                    style={{ background: "#003087" }}
                  >
                    ✓ {config.nextLabel}
                  </button>
                )}
                {order.status !== "cancelled" && order.status !== "delivered" && (
                  <button
                    onClick={() => { onUpdateStatus(order.id, "cancelled"); onClose(); }}
                    className="px-4 py-3 rounded-xl text-sm font-bold border border-red-200 text-red-600 hover:bg-red-50 transition-all"
                  >
                    Hủy đơn
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── AdminOrders ───────────────────────────────────────────────────────────────
const AdminOrders = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    const labels = { confirmed: "Đã xác nhận đơn hàng", shipping: "Bắt đầu giao hàng", delivered: "Đã giao thành công", cancelled: "Đã hủy đơn hàng" };
    toast.success(labels[newStatus] || "Đã cập nhật trạng thái!");
  };

  const statusCounts = Object.keys(statusConfig).reduce((acc, k) => {
    acc[k] = orders.filter((o) => o.status === k).length;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-black text-[#1a2e5a]">Quản lý Đơn hàng</h1>
        <p className="text-sm text-[#5a7299] mt-0.5">{orders.length} đơn hàng trong hệ thống</p>
      </div>

      {/* Status Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "Tất cả", count: orders.length },
          ...Object.entries(statusConfig).map(([k, v]) => ({ key: k, label: v.label, count: statusCounts[k] || 0 })),
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => { setFilterStatus(key); setPage(1); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border ${
              filterStatus === key
                ? "text-white border-transparent shadow-sm"
                : "text-[#5a7299] border-[#E8E2D4] bg-white hover:border-[#003087] hover:text-[#003087]"
            }`}
            style={filterStatus === key ? { background: "#003087" } : {}}
          >
            {label}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${filterStatus === key ? "bg-white/20" : "bg-[#E8F0FB] text-[#003087]"}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#E8E2D4] p-4 shadow-sm">
        <div className="relative max-w-sm">
          <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7299]" />
          <input
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Tìm theo mã đơn hoặc tên khách..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FAF6EC] border border-[#E8E2D4] rounded-xl text-[#1a2e5a] placeholder-[#5a7299] focus:outline-none focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] transition-all"
            id="admin-order-search"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#E8E2D4] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#FAF6EC" }}>
                {["Mã đơn", "Khách hàng", "Sản phẩm", "Tổng tiền", "Trạng thái", "Ngày đặt", "Hành động"].map((h) => (
                  <th key={h} className="text-left px-4 py-3.5 text-[11px] font-black uppercase tracking-wider text-[#5a7299] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((order, i) => {
                const config = statusConfig[order.status];
                const currentIdx = STATUS_FLOW.indexOf(order.status);
                return (
                  <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="border-t border-[#E8E2D4] hover:bg-[#FAF6EC] transition-colors group">
                    <td className="px-4 py-3">
                      <span className="text-xs font-black text-[#003087]">{order.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-bold text-[#1a2e5a]">{order.customer}</p>
                      <p className="text-xs text-[#5a7299]">{order.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={order.items[0]?.img} alt="" className="w-9 h-9 object-contain rounded-lg bg-white border border-[#E8E2D4]" style={{ mixBlendMode: "multiply" }} />
                        <p className="text-xs text-[#5a7299] line-clamp-2 max-w-[160px]">
                          {order.items[0]?.name} {order.items.length > 1 && `+${order.items.length - 1} SP`}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-black text-[#1a2e5a] whitespace-nowrap">
                      {order.total.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                    <td className="px-4 py-3 text-xs text-[#5a7299]">{order.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 rounded-lg hover:bg-blue-50 text-[#5a7299] hover:text-blue-600 transition-all"
                          title="Xem chi tiết"
                          id={`view-order-${order.id}`}
                        >
                          <FiEye size={15} />
                        </button>
                        {config.nextLabel && currentIdx < STATUS_FLOW.length - 1 && (
                          <button
                            onClick={() => updateStatus(order.id, STATUS_FLOW[currentIdx + 1])}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap"
                            style={{ background: "#E8F0FB", color: "#003087" }}
                            title={config.nextLabel}
                          >
                            {config.nextLabel}
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          {paged.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-[#5a7299]">
              <FiPackage size={40} className="mb-3 opacity-30" />
              <p className="font-semibold">Không tìm thấy đơn hàng nào</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#E8E2D4]">
            <span className="text-xs text-[#5a7299]">Trang {page} / {totalPages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="p-2 rounded-lg hover:bg-[#E8F0FB] text-[#5a7299] disabled:opacity-40 transition-all">
                <FiChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${n === page ? "text-white" : "text-[#5a7299] hover:bg-[#E8F0FB]"}`}
                  style={n === page ? { background: "#003087" } : {}}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-2 rounded-lg hover:bg-[#E8F0FB] text-[#5a7299] disabled:opacity-40 transition-all">
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <OrderDetailModal
        open={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={updateStatus}
      />
    </div>
  );
};

export default AdminOrders;
