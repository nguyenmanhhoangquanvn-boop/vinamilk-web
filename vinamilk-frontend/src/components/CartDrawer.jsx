import React, { useEffect, useRef } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const fmt = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, totalItems, removeItem } = useCart();
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Handle escape key — no body overflow manipulation (avoids reflow)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const total = items.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <>
      {/* Backdrop — CSS transition, no framer-motion */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[999] transition-opacity duration-200"
        style={{
          background: "rgba(0,0,0,0.5)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />

      {/* Drawer — always in DOM, slide via CSS transform */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 w-full md:w-[420px] h-full bg-white shadow-2xl z-[1000] flex flex-col"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.22s ease-out",
          willChange: "transform",
        }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0" style={{ background: "#00129B" }}>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Giỏ hàng {totalItems > 0 && <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">{totalItems}</span>}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <FiX size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-5 bg-[#FCFAEE]">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#00129B]" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[#00129B] font-bold text-base mb-1">Giỏ hàng trống</p>
              <p className="text-slate-500 text-sm">Hãy thêm sản phẩm vào giỏ hàng!</p>
            </div>
            <button
              onClick={() => { onClose(); navigate("/products"); }}
              className="px-6 py-3 bg-[#00129B] text-white font-bold rounded-xl hover:bg-blue-800 transition-colors text-sm"
            >
              Xem sản phẩm
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto bg-[#FCFAEE]">
              <div className="p-4 space-y-3">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3 bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 relative">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-18 h-18 object-contain rounded-xl border border-slate-50 flex-shrink-0"
                        style={{ width: 72, height: 72 }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-[72px] h-[72px] bg-blue-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {item.emoji}
                      </div>
                    )}
                    <div className="flex-1 min-w-0 pr-6">
                      <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">{item.name}</p>
                      <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-[#00129B]">{fmt(item.price)}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-[#00129B]">
                          {item.packType === "thuong" ? "Thùng" : item.packType === "vi" ? "Vỉ" : "Lẻ"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">Số lượng: <span className="font-semibold text-slate-600">{item.quantity}</span></p>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="absolute top-3.5 right-3.5 p-1 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white p-5 border-t border-slate-100 flex-shrink-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-slate-600">Tổng tạm tính</span>
                <span className="text-xl font-black text-[#00129B]">{fmt(total)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { onClose(); navigate("/checkout"); }}
                  className="w-full bg-[#00129B] text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-colors text-sm"
                >
                  Thanh toán ngay
                </button>
                <button
                  onClick={() => { onClose(); navigate("/cart"); }}
                  className="w-full text-[#00129B] font-semibold py-2.5 hover:bg-blue-50 rounded-xl transition-colors text-sm"
                >
                  Xem chi tiết giỏ hàng
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
