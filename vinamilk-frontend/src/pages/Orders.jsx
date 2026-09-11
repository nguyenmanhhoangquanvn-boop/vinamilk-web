import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiChevronRight, FiSearch } from "react-icons/fi";

import OrderCard from "../components/OrderCard";
import OrderDetailModal from "../components/OrderDetailModal";
import { useOrders } from "../context/OrderContext";

const F = "system-ui, -apple-system, Arial, sans-serif";

const statusTabs = [
  { key: "all",       label: "Tất cả" },
  { key: "pending",   label: "Chờ xác nhận" },
  { key: "confirmed", label: "Đã xác nhận" },
  { key: "shipping",  label: "Đang giao" },
  { key: "delivered", label: "Đã giao" },
  { key: "cancelled", label: "Đã hủy" },
];

const EmptyState = ({ isSearch }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "64px 24px",
    background: "#fff", border: "1px solid #e8e8e8", textAlign: "center",
  }}>
    <FiShoppingBag size={44} style={{ color: "#003087", opacity: 0.35, marginBottom: 18 }} />
    <h3 style={{ fontSize: 17, fontWeight: 800, color: "#003087", margin: "0 0 8px", fontFamily: F }}>
      {isSearch ? "Không tìm thấy đơn hàng" : "Chưa có đơn hàng nào"}
    </h3>
    <p style={{ color: "#888", marginBottom: 28, maxWidth: 340, fontSize: 13, fontFamily: F, lineHeight: 1.6, margin: "0 0 24px" }}>
      {isSearch
        ? "Thử thay đổi từ khóa tìm kiếm hoặc chọn trạng thái khác"
        : "Bạn chưa có đơn hàng nào. Hãy mua sắm ngay để trải nghiệm sản phẩm từ Vinamilk!"}
    </p>
    <Link to="/products" style={{ textDecoration: "none" }}>
      <button style={{
        padding: "12px 32px", background: "#003087", color: "#fff",
        fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer",
        fontFamily: F, letterSpacing: "0.04em",
      }}>
        Tiếp tục mua sắm
      </button>
    </Link>
  </div>
);

const Orders = () => {
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch]       = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = useMemo(() => orders.filter((o) => {
    const matchTab    = activeTab === "all" || o.status === activeTab;
    const matchSearch = !search
      || o.orderId.toLowerCase().includes(search.toLowerCase())
      || o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    return matchTab && matchSearch;
  }), [orders, activeTab, search]);

  const countByStatus = (key) =>
    key === "all" ? orders.length : orders.filter((o) => o.status === key).length;

  return (
    <>
      {/* Drawer — always mounted, CSS slide */}
      <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />

      <div style={{ minHeight: "100vh", background: "var(--vnm-cream)", paddingBottom: 64 }}>
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#888", marginBottom: 24, fontFamily: F }}>
            <Link to="/" style={{ color: "#888", textDecoration: "none" }}>Trang chủ</Link>
            <FiChevronRight size={12} />
            <span style={{ color: "#003087", fontWeight: 700 }}>Đơn hàng của tôi</span>
          </div>

          {/* Header + Search */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, color: "#003087", margin: "0 0 6px", fontFamily: F }}>
                Đơn hàng của tôi
              </h1>
              <p style={{ color: "#888", fontSize: 14, margin: 0, fontFamily: F }}>
                Quản lý và theo dõi trạng thái các đơn hàng bạn đã đặt.
              </p>
            </div>
            <div style={{ position: "relative", width: "100%", maxWidth: 280 }}>
              <FiSearch size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm mã đơn, sản phẩm..."
                style={{
                  width: "100%", paddingLeft: 34, paddingRight: 12,
                  paddingTop: 10, paddingBottom: 10,
                  border: "1.5px solid #d0d5e8", fontSize: 13,
                  fontFamily: F, color: "#333", background: "#fff",
                  outline: "none", boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#003087"}
                onBlur={e => e.target.style.borderColor = "#d0d5e8"}
              />
            </div>
          </div>

          {/* Status Tabs */}
          <div style={{
            display: "flex", overflowX: "auto", gap: 2,
            background: "#fff", padding: 4,
            border: "1px solid #e8e8e8", marginBottom: 16,
            scrollbarWidth: "none",
          }}>
            {statusTabs.map((tab) => {
              const count  = countByStatus(tab.key);
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "9px 16px", flexShrink: 0,
                    border: "none", cursor: "pointer",
                    background: active ? "#003087" : "transparent",
                    color: active ? "#fff" : "#555",
                    fontWeight: 700, fontSize: 13, fontFamily: F,
                    transition: "all 0.15s",
                  }}
                >
                  {tab.label}
                  {count > 0 && (
                    <span style={{
                      fontSize: 10, fontWeight: 900,
                      padding: "1px 7px", borderRadius: 99,
                      background: active ? "rgba(255,255,255,0.2)" : "#eee",
                      color: active ? "#fff" : "#666",
                      fontFamily: F,
                    }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <EmptyState isSearch={activeTab !== "all" || !!search} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map((order, i) => (
                <OrderCard key={order._id} order={order} index={i} onViewDetail={setSelectedOrder} />
              ))}
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default Orders;