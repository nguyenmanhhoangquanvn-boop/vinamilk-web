import { useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus, FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";
import { useCart } from "../context/CartContext";

const fmt = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

const CartItem = ({ item, index }) => {
  const { updateQuantity, removeItem, toggleSelect, selected } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [qtyLoading, setQtyLoading] = useState(false);

  const isSelected = selected.includes(item._id);
  const subtotal = item.price * item.quantity;

  const handleQty = async (newQty) => {
    if (newQty < 1 || newQty > item.stock) return;
    setQtyLoading(true);
    updateQuantity(item._id, newQty);
    setQtyLoading(false);
  };

  const handleRemove = async () => {
    setRemoving(true);
    await new Promise((r) => setTimeout(r, 300));
    removeItem(item._id);
    setConfirmOpen(false);
    toast.success(`Đã xóa "${item.name}" khỏi giỏ hàng`);
  };

  if (removing) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, overflow: 'hidden' }}
        transition={{ delay: index * 0.03, duration: 0.2 }}
        className="bg-transparent rounded-2xl p-4 border transition-colors duration-200"
        style={{ borderColor: isSelected ? "var(--vnm-navy)" : "var(--vnm-border)" }}
      >
        <div className="flex gap-4">
          {/* Checkbox */}
          <div className="flex items-start pt-1">
            <button onClick={() => toggleSelect(item._id)}
              className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                background: isSelected ? "var(--vnm-navy)" : "transparent",
                borderColor: isSelected ? "var(--vnm-navy)" : "var(--vnm-border)"
              }}>
              {isSelected && (
                <svg viewBox="0 0 12 12" className="w-3 h-3 text-white fill-current">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>

          {/* Product image */}
          <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 text-4xl shadow-sm overflow-hidden"
               style={{ background: "var(--vnm-cream-2)" }}>
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-1" loading="lazy" />
            ) : (
              item.emoji
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "var(--vnm-cream-2)", color: "var(--vnm-text-sec)" }}>
                    {item.category}
                  </span>
                  {/* Pack type badge */}
                  {(item.packType === "thuong" || item.packType === "vi") ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: "#003087", color: "#fff" }}>
                      <FiPackage size={10} /> {item.packLabel || (item.packType === "thuong" ? "Thùng" : "Vỉ")}
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: "#f0f4f8", color: "var(--vnm-navy)" }}>
                      Lẻ
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bradford font-medium mt-1.5 line-clamp-2 leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif", color: "var(--vnm-navy)" }}>
                  {item.name}
                </h3>
                {(item.packType === "thuong" || item.packType === "vi") && item.packSize && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--vnm-text-sec)" }}>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Math.round(item.price / item.packSize))}/hộp × {item.packSize} hộp
                  </p>
                )}
              </div>
              <button onClick={() => setConfirmOpen(true)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0">
                <FiTrash2 size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-base font-black" style={{ color: "var(--vnm-navy)", fontFamily: "'DM Mono', monospace" }}>{fmt(item.price)}</span>
                {item.oldPrice && (
                  <span className="text-xs line-through" style={{ color: "var(--vnm-text-sec)", fontFamily: "'DM Mono', monospace" }}>{fmt(item.oldPrice)}</span>
                )}
                {item.discount > 0 && (
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: "var(--vnm-red)", color: "#fff" }}>
                    -{item.discount}%
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center border rounded-xl overflow-hidden" style={{ borderColor: "var(--vnm-border)", background: "var(--vnm-cream-2)" }}>
                <button onClick={() => handleQty(item.quantity - 1)} disabled={item.quantity <= 1 || qtyLoading}
                  className="w-9 h-9 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ color: "var(--vnm-navy)" }}>
                  <FiMinus size={13} />
                </button>
                <div className="w-10 h-9 flex items-center justify-center border-x" style={{ borderColor: "var(--vnm-border)" }}>
                  {qtyLoading ? (
                    <div className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--vnm-navy)" }} />
                  ) : (
                    <span className="text-sm font-black" style={{ color: "var(--vnm-navy)" }}>
                      {item.quantity}
                    </span>
                  )}
                </div>
                <button onClick={() => handleQty(item.quantity + 1)} disabled={item.quantity >= item.stock || qtyLoading}
                  className="w-9 h-9 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ color: "var(--vnm-navy)" }}>
                  <FiPlus size={13} />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right">
                <p className="text-xs" style={{ color: "var(--vnm-text-sec)" }}>Thành tiền</p>
                <p className="text-sm font-black" style={{ color: "var(--vnm-navy)", fontFamily: "'DM Mono', monospace" }}>
                  {fmt(subtotal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <ConfirmModal
        open={confirmOpen}
        title="Xóa sản phẩm?"
        message={`Bạn có chắc muốn xóa "${item.name}" khỏi giỏ hàng không?`}
        onConfirm={handleRemove}
        onCancel={() => setConfirmOpen(false)}
        loading={removing}
      />
    </>
  );
};

export default CartItem;