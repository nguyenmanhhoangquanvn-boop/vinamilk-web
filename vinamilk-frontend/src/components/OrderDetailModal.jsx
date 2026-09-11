import { useEffect, useState } from "react";
import { FiX, FiMapPin, FiPhone, FiUser, FiCheck, FiClock, FiTruck, FiPackage } from "react-icons/fi";
import OrderStatusBadge from "./OrderStatusBadge";
import { cancelOrder } from "../services/orderService";
import { useOrders } from "../context/OrderContext";
import toast from "react-hot-toast";

const fmt = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);
const vnmFont = "system-ui, -apple-system, Arial, sans-serif";

const timeline = [
  { key: "pending",   label: "Đặt hàng thành công",    icon: FiClock },
  { key: "confirmed", label: "Đơn hàng được xác nhận", icon: FiCheck },
  { key: "shipping",  label: "Đang giao hàng",          icon: FiTruck },
  { key: "delivered", label: "Giao hàng thành công",    icon: FiPackage },
];
const statusOrder = ["pending", "confirmed", "shipping", "delivered"];

const OrderDetailModal = ({ order, onClose }) => {
  const isOpen = !!order;
  const currentIdx = order ? statusOrder.indexOf(order.status) : -1;
  const [cancelling, setCancelling] = useState(false);
  const { updateOrder } = useOrders();
  
  const canCancel = order && ["pending", "confirmed"].includes(order.status);

  // Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Bạn chắc chắn muốn hủy đơn hàng này?")) return;
    
    setCancelling(true);
    try {
      await cancelOrder(order.orderId);
      updateOrder(order.orderId, { status: "cancelled" });
      toast.success("Đơn hàng đã được hủy", { duration: 3000 });
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || "Lỗi khi hủy đơn hàng";
      toast.error(msg, { duration: 3000 });
    } finally {
      setCancelling(false);
    }
  };

  return (
    <>
      {/* Backdrop — CSS opacity, no framer */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,0,0,0.5)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Drawer — slide từ phải giống CartDrawer */}
      <div
        style={{
          position: "fixed", top: 0, right: 0,
          width: "100%", maxWidth: 420,
          height: "100%",
          background: "#fff",
          zIndex: 1000,
          display: "flex", flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.22s ease-out",
          willChange: "transform",
        }}
      >
        {/* Header */}
        <div style={{
          flexShrink: 0,
          padding: "16px 24px",
          background: "#003087",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 16, margin: 0, fontFamily: vnmFont }}>
              Chi tiết đơn hàng
            </h2>
            {order && (
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: "3px 0 0", fontFamily: vnmFont }}>
                #{order.orderId}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
              padding: 8, color: "#fff", display: "flex", alignItems: "center",
              borderRadius: "50%", transition: "background 0.15s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body — scrollable */}
        {order && (
          <div style={{
            flex: 1, overflowY: "auto",
            background: "#FCFAEE",
            overscrollBehavior: "contain",
          }}>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Status + date */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <OrderStatusBadge status={order.status} />
                <span style={{ fontSize: 12, color: "#aaa", fontFamily: vnmFont }}>{order.date}</span>
              </div>

              {/* Timeline */}
              {order.status !== "cancelled" && (
                <div style={{ background: "#fff", padding: "16px", border: "1px solid #e8e8e8" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#003087", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14, fontFamily: vnmFont }}>
                    Tiến trình đơn hàng
                  </p>
                  {timeline.map((step, i) => {
                    const done = i <= currentIdx;
                    const active = i === currentIdx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} style={{ display: "flex", gap: 12 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: done ? "#003087" : "#eee",
                          }}>
                            <Icon size={12} color={done ? "#fff" : "#aaa"} />
                          </div>
                          {i < timeline.length - 1 && (
                            <div style={{
                              width: 2, flex: 1, minHeight: 24, marginTop: 3,
                              background: i < currentIdx ? "#003087" : "#eee",
                            }} />
                          )}
                        </div>
                        <div style={{ paddingBottom: 16 }}>
                          <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: done ? "#111" : "#aaa", fontFamily: vnmFont }}>
                            {step.label}
                          </p>
                          {active && (
                            <p style={{ fontSize: 11, color: "#003087", margin: "3px 0 0", fontFamily: vnmFont }}>
                              Đang ở bước này
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Thông tin nhận hàng */}
              <div style={{ background: "#fff", padding: "16px", border: "1px solid #e8e8e8" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#003087", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14, fontFamily: vnmFont }}>
                  Thông tin nhận hàng
                </p>
                {[
                  { icon: FiUser,   label: "Người nhận",    value: order.fullName },
                  { icon: FiPhone,  label: "Số điện thoại", value: order.phone },
                  { icon: FiMapPin, label: "Địa chỉ",       value: order.address },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                    <Icon size={14} color="#003087" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 11, color: "#aaa", margin: 0, fontFamily: vnmFont }}>{label}</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: "2px 0 0", fontFamily: vnmFont }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sản phẩm */}
              <div style={{ background: "#fff", padding: "16px", border: "1px solid #e8e8e8" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#003087", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14, fontFamily: vnmFont }}>
                  Sản phẩm đã đặt
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 56, height: 56, flexShrink: 0,
                        background: "#f5f5f5", border: "1px solid #e8e8e8",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 24,
                      }}>
                        {item.image
                          ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
                          : item.emoji
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: 13, fontWeight: 600, color: "#111", margin: 0,
                          fontFamily: vnmFont, lineHeight: 1.4,
                          overflow: "hidden", display: "-webkit-box",
                          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                        }}>
                          {item.name}
                        </p>
                        <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 0", fontFamily: vnmFont }}>
                          x{item.quantity}
                        </p>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#003087", flexShrink: 0, fontFamily: vnmFont }}>
                        {fmt(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tổng tiền */}
              <div style={{ background: "#fff", padding: "16px", border: "1px solid #e8e8e8", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: vnmFont }}>
                  <span style={{ color: "#888" }}>Tạm tính</span>
                  <span style={{ fontWeight: 600, color: "#333" }}>{fmt(order.subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: vnmFont }}>
                  <span style={{ color: "#888" }}>Phí vận chuyển</span>
                  {order.shipping === 0
                    ? <span style={{ fontWeight: 700, color: "#2d7d46" }}>Miễn phí</span>
                    : <span style={{ fontWeight: 600, color: "#333" }}>{fmt(order.shipping)}</span>
                  }
                </div>
                <div style={{ height: 1, background: "#e8e8e8" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: 14, color: "#111", fontFamily: vnmFont }}>Tổng cộng</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "#003087", fontFamily: vnmFont }}>{fmt(order.total)}</span>
                </div>
              </div>

              {/* Phương thức thanh toán */}
              <div style={{
                background: "#fff", padding: "14px 16px",
                border: "1px solid #e8e8e8",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: 13, fontFamily: vnmFont,
              }}>
                <span style={{ color: "#888" }}>Phương thức thanh toán</span>
                <span style={{ fontWeight: 700, color: "#111" }}>
                  {order.paymentMethod === "cod" ? "Tiền mặt (COD)"
                    : order.paymentMethod === "bank" ? "Chuyển khoản"
                    : "Ví điện tử"}
                </span>
              </div>

              {/* Nút Hủy */}
              {canCancel && (
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  style={{
                    width: "100%", padding: "14px 16px",
                    background: "#fff", border: "1.5px solid #ff6b6b", borderRadius: 8,
                    color: "#ff6b6b", fontWeight: 700, fontSize: 14, fontFamily: vnmFont,
                    cursor: cancelling ? "not-allowed" : "pointer",
                    opacity: cancelling ? 0.6 : 1,
                    transition: "all 0.15s",
                  }}
                  onMouseOver={e => !cancelling && (e.currentTarget.style.background = "#ffe0e0")}
                  onMouseOut={e => !cancelling && (e.currentTarget.style.background = "#fff")}
                >
                  {cancelling ? "Đang hủy..." : "Hủy đơn hàng"}
                </button>
              )}

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetailModal;