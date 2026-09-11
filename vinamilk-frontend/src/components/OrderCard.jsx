import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiChevronDown, FiEye, FiRotateCcw, FiPackage, FiX } from "react-icons/fi";
import OrderStatusBadge from "./OrderStatusBadge";
import { cancelOrder } from "../services/orderService";
import { useOrders } from "../context/OrderContext";
import toast from "react-hot-toast";

const fmt = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

const OrderCard = ({ order, index, onViewDetail }) => {
  const [expanded, setExpanded] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const { updateOrder } = useOrders();
  
  const canCancel = ["pending", "confirmed"].includes(order.status);

  const handleCancel = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Bạn chắc chắn muốn hủy đơn hàng này?")) return;
    
    setCancelling(true);
    try {
      const res = await cancelOrder(order.orderId || order._id);
      updateOrder(order.orderId || order._id, { status: "cancelled" });
      toast.success("Đơn hàng đã được hủy", { duration: 3000 });
    } catch (err) {
      const msg = err.response?.data?.message || "Lỗi khi hủy đơn hàng";
      toast.error(msg, { duration: 3000 });
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div
      className="bg-vnm-card rounded-2xl border border-vnm-border hover:border-vnm-navy-60 
                 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 overflow-hidden font-sans vnm-card-shadow"
    >
      {/* Order header */}
      <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-vnm-border-light bg-vnm-cream">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <p className="text-xs text-vnm-text-sec font-medium mb-0.5">Mã đơn hàng</p>
            <p className="text-sm font-bold text-vnm-navy">#{order.orderId}</p>
          </div>
          <div className="w-px h-8 bg-vnm-border hidden sm:block" />
          <div>
            <p className="text-xs text-vnm-text-sec font-medium mb-0.5">Ngày đặt</p>
            <p className="text-sm font-semibold text-vnm-text">{order.date}</p>
          </div>
          <div className="w-px h-8 bg-vnm-border hidden sm:block" />
          <div>
            <p className="text-xs text-vnm-text-sec font-medium mb-0.5">Phương thức</p>
            <p className="text-sm font-semibold text-vnm-text flex items-center gap-1.5">
              {order.paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : order.paymentMethod === "bank" ? "Chuyển khoản ngân hàng" : "Ví điện tử"}
            </p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Products preview */}
      <div className="px-6 py-5">
        <div className="flex flex-col gap-4">
          {order.items.slice(0, expanded ? order.items.length : 2).map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-vnm-text line-clamp-1 mb-1">{item.name}</p>
                <p className="text-sm text-vnm-text-sec">{item.category || "Sản phẩm"}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-vnm-text">{fmt(item.price)}</p>
                <p className="text-sm text-vnm-text-sec font-medium mt-1">x{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {order.items.length > 2 && (
          <div className="mt-4 pt-4 border-t border-vnm-border-light flex justify-center">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-sm font-semibold text-vnm-navy-60 hover:text-vnm-navy transition-colors bg-vnm-blue-tag hover:bg-vnm-blue-tag/80 px-4 py-1.5 rounded-full"
            >
              <span>{expanded ? "Thu gọn" : `Xem thêm ${order.items.length - 2} sản phẩm`}</span>
              <FiChevronDown className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-vnm-cream border-t border-vnm-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-vnm-text-sec">Thành tiền:</p>
          <p className="text-lg font-black text-vnm-navy">{fmt(order.total)}</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {canCancel && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-red-300 text-red-600 text-sm font-bold hover:border-red-500 hover:bg-red-50 transition-all bg-vnm-card disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiX size={15} /> {cancelling ? "Đang hủy..." : "Hủy đơn"}
            </button>
          )}
          {order.status === "delivered" && (
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-vnm-border text-vnm-navy text-sm font-bold hover:border-vnm-navy hover:bg-vnm-cream transition-all bg-vnm-card"
            >
              <FiRotateCcw size={15} /> Mua lại
            </button>
          )}
          <button
            onClick={() => onViewDetail(order)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-md hover:shadow-lg transition-all
                       bg-gradient-to-r from-vnm-navy to-vnm-navy-60 hover:from-vnm-navy-60 hover:to-vnm-navy"
          >
            <FiEye size={15} /> Chi tiết đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
