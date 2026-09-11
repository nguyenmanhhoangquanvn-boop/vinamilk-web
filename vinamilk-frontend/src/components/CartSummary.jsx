import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiTag, FiTruck, FiChevronRight, FiPercent } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const fmt = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

const CartSummary = () => {
  const { items, selected } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const selectedItems = items.filter((i) => selected.includes(i._id));
  const subtotal = selectedItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const originalTotal = selectedItems.reduce((s, i) => s + (i.oldPrice || i.price) * i.quantity, 0);
  const discount = originalTotal - subtotal;
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.05) : 0;
  const shipping = subtotal >= 200000 ? 0 : 30000;
  const total = subtotal - couponDiscount + shipping;

  const handleCoupon = () => {
    if (coupon.toUpperCase() === "VINAMILK05") {
      setCouponApplied(true);
      toast.success("🎉 Áp dụng mã giảm giá thành công! Giảm 5%");
    } else {
      toast.error("Mã giảm giá không hợp lệ");
    }
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) { toast.error("Vui lòng chọn ít nhất 1 sản phẩm!"); return; }
    setCheckingOut(true);
    toast.success("Đang chuyển đến trang thanh toán...", { duration: 800, id: "redirect-checkout" });
    await new Promise((r) => setTimeout(r, 400));
    navigate("/checkout");
  };

  return (
    <div className="rounded-2xl border shadow-sm overflow-hidden sticky top-20 bg-transparent" style={{ borderColor: "var(--vnm-border)" }}>
      {/* Header */}
      <div className="px-5 py-4" style={{ background: "var(--vnm-navy)" }}>
        <h3 className="font-black text-white flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          <FiShoppingBag size={18} /> Tóm tắt đơn hàng
        </h3>
        <p className="text-white/80 text-xs mt-0.5">{selectedItems.length} sản phẩm đã chọn</p>
      </div>

      <div className="p-5 space-y-4">
        {/* Price rows */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--vnm-text-sec)" }}>Tạm tính</span>
            <span className="font-semibold" style={{ color: "var(--vnm-navy)" }}>{fmt(originalTotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1" style={{ color: "var(--vnm-text-sec)" }}><FiTag size={13} /> Giảm giá sản phẩm</span>
              <span className="font-bold" style={{ color: "var(--vnm-red)" }}>-{fmt(discount)}</span>
            </div>
          )}
          {couponApplied && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1" style={{ color: "var(--vnm-text-sec)" }}><FiPercent size={13} /> Mã VINAMILK05</span>
              <span className="font-bold" style={{ color: "var(--vnm-red)" }}>-{fmt(couponDiscount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1" style={{ color: "var(--vnm-text-sec)" }}><FiTruck size={13} /> Phí vận chuyển</span>
            {shipping === 0
              ? <span className="font-bold" style={{ color: "var(--vnm-navy)" }}>Miễn phí</span>
              : <span className="font-semibold" style={{ color: "var(--vnm-navy)" }}>{fmt(shipping)}</span>
            }
          </div>
          {subtotal < 200000 && subtotal > 0 && (
            <p className="text-xs px-3 py-2 rounded-xl mt-2" style={{ color: "var(--vnm-navy)", background: "var(--vnm-cream-2)" }}>
              💡 Mua thêm {fmt(200000 - subtotal)} để được miễn phí vận chuyển!
            </p>
          )}
        </div>

        {/* Coupon */}
        {!couponApplied && (
          <div className="flex gap-2 mt-4">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              placeholder="Mã giảm giá..." onKeyDown={(e) => e.key === "Enter" && handleCoupon()}
              className="flex-1 px-3 py-2.5 border rounded-xl text-sm font-medium outline-none uppercase bg-transparent"
              style={{ borderColor: "var(--vnm-border)", color: "var(--vnm-navy)" }} />
            <button onClick={handleCoupon}
              className="px-4 py-2.5 text-white text-sm font-bold rounded-xl transition-all"
              style={{ background: "var(--vnm-navy)" }}>
              Áp dụng
            </button>
          </div>
        )}
        {couponApplied && (
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border mt-4"
               style={{ background: "var(--vnm-cream-2)", borderColor: "var(--vnm-border)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--vnm-navy)" }}>✓ VINAMILK05 đã áp dụng</span>
            <button onClick={() => { setCouponApplied(false); setCoupon(""); }}
              className="text-xs hover:underline" style={{ color: "var(--vnm-red)" }}>Xóa</button>
          </div>
        )}

        <div className="h-px w-full my-4" style={{ background: "var(--vnm-border)" }} />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-black" style={{ color: "var(--vnm-navy)", fontFamily: "'Playfair Display', serif" }}>Tổng thanh toán</span>
          <div className="text-right">
            <motion.p key={total} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="text-xl font-black" style={{ color: "var(--vnm-navy)", fontFamily: "'DM Mono', monospace" }}>{fmt(total)}</motion.p>
            {discount + couponDiscount > 0 && (
              <p className="text-xs font-semibold" style={{ color: "var(--vnm-text-sec)" }}>Tiết kiệm {fmt(discount + couponDiscount)}</p>
            )}
          </div>
        </div>

        {/* CTA */}
        <motion.button whileHover={!checkingOut ? { scale: 1.02, y: -1 } : {}} whileTap={{ scale: 0.98 }}
          onClick={handleCheckout} disabled={checkingOut || selectedItems.length === 0}
          className="w-full py-4 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2
                     shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-4"
          style={{ background: "var(--vnm-navy)" }}>
          {checkingOut
            ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang xử lý...</>
            : <><FiShoppingBag size={17} /> Tiến hành thanh toán <FiChevronRight size={16} /></>
          }
        </motion.button>

        <button onClick={() => navigate("/products")}
          className="w-full py-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          ← Tiếp tục mua sắm
        </button>

        {/* Trust */}
        <div className="flex justify-center gap-3 pt-1">
          {["Visa","MasterCard","MoMo","ZaloPay"].map((p) => (
            <span key={p} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded font-medium">{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;