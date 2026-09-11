import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiTrash2, FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import EmptyCart from "../components/EmptyCart";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { items, selected, totalItems, toggleSelectAll, removeItem } = useCart();

  const handleRemoveSelected = () => {
    if (selected.length === 0) {
      toast.error("Chưa chọn sản phẩm nào!");
      return;
    }
    selected.forEach((id) => removeItem(id));
    toast.success(`Đã xóa ${selected.length} sản phẩm!`);
  };

  const allSelected = items.length > 0 && selected.length === items.length;
  const someSelected = selected.length > 0 && selected.length < items.length;

  return (
    <div className="w-full">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6"
        >
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Trang chủ
          </Link>
          <FiChevronRight size={13} />
          <span className="text-blue-600 dark:text-blue-400 font-semibold">Giỏ hàng</span>
        </motion.div>

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                 style={{ background: "var(--vnm-navy)" }}>
              <FiShoppingCart size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-bradford" style={{ color: "var(--vnm-navy)", fontFamily: "'Playfair Display', serif" }}>
                Giỏ hàng của bạn
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--vnm-text-sec)" }}>
                {totalItems > 0 ? `${totalItems} sản phẩm` : "Trống"}
              </p>
            </div>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Select all bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl px-4 py-3 border flex items-center justify-between"
                style={{ background: "var(--vnm-cream-2)", borderColor: "var(--vnm-border)" }}
              >
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <button
                    onClick={toggleSelectAll}
                    className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all relative"
                    style={{
                      background: allSelected ? "var(--vnm-navy)" : (someSelected ? "var(--vnm-cream)" : "transparent"),
                      borderColor: (allSelected || someSelected) ? "var(--vnm-navy)" : "var(--vnm-border)"
                    }}
                  >
                    {allSelected && (
                      <svg viewBox="0 0 12 12" className="w-3 h-3 text-white fill-current">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                      </svg>
                    )}
                    {someSelected && !allSelected && (
                      <div className="w-2 h-0.5 rounded-full" style={{ background: "var(--vnm-navy)" }} />
                    )}
                  </button>
                  <span className="text-sm font-semibold" style={{ color: "var(--vnm-navy)" }}>
                    Chọn tất cả ({items.length})
                  </span>
                  {someSelected && (
                    <span className="text-xs text-blue-500 dark:text-blue-400">Đã chọn {selected.length}</span>
                  )}
                </label>

                <AnimatePresence>
                  {selected.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={handleRemoveSelected}
                      className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700
                                 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40
                                 px-3 py-1.5 rounded-lg transition-all"
                    >
                      <FiTrash2 size={13} /> Xóa đã chọn ({selected.length})
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Items */}
              <div className="space-y-3">
                <AnimatePresence>
                  {items.map((item, i) => (
                    <CartItem key={item._id} item={item} index={i} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Voucher hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl p-4 border"
                style={{ background: "var(--vnm-cream-2)", borderColor: "var(--vnm-border)" }}
              >
                <p className="text-sm font-semibold flex items-center gap-2 flex-wrap" style={{ color: "var(--vnm-navy)" }}>
                  🎁 Nhập mã{" "}
                  <span className="font-black px-2 py-0.5 rounded-lg border"
                        style={{ background: "#fff", borderColor: "var(--vnm-border)" }}>
                    VINAMILK05
                  </span>
                  trong phần tóm tắt để được giảm thêm 5%!
                </p>
              </motion.div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;