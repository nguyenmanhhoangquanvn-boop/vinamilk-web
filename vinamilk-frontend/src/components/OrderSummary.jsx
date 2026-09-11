import { useState } from "react";
import { motion } from "framer-motion";
import { FiShield, FiLock } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const fmt = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

const OrderSummary = ({ onCheckout, submitting }) => {
  const { items, selected } = useCart();
  const selectedItems = items.filter((i) => selected.includes(i._id));
  const subtotal = selectedItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const originalTotal = selectedItems.reduce((s, i) => s + (i.oldPrice || i.price) * i.quantity, 0);
  const productDiscount = originalTotal - subtotal;
  const shipping = subtotal >= 200000 ? 0 : 30000;
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(0);
  const [voucherMsg, setVoucherMsg] = useState("");

  const handleApplyVoucher = () => {
    if (voucherCode.toUpperCase() === "VINAMILK05") {
      setAppliedVoucher(subtotal * 0.05);
      setVoucherMsg("✓ Áp dụng thành công!");
    } else {
      setAppliedVoucher(0);
      setVoucherMsg("Mã không hợp lệ");
    }
  };

  const total = subtotal - appliedVoucher + shipping;

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
    fontFamily: "system-ui, -apple-system, Arial, sans-serif",
  };

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e8e8e8",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid #e8e8e8",
        background: "#fff",
      }}>
        <h3 style={{
          fontWeight: 800,
          color: "#003087",
          fontSize: 15,
          fontFamily: "system-ui, -apple-system, Arial, sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          margin: 0,
        }}>
          Thông tin đơn hàng
        </h3>
      </div>

      {/* Items */}
      <div style={{ padding: "16px 20px", maxHeight: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
        {selectedItems.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
          >
            {/* Thumb */}
            <div style={{
              width: 48, height: 48, flexShrink: 0,
              border: "1px solid #e8e8e8",
              background: "#fafaf7",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              {item.image
                ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply" }} />
                : <span style={{ fontSize: 22 }}>{item.emoji}</span>
              }
              <span style={{
                position: "absolute", top: -1, right: -1,
                width: 18, height: 18,
                background: "#003087", color: "#fff",
                borderRadius: "50%",
                fontSize: 10, fontWeight: 900,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "system-ui, Arial, sans-serif",
              }}>
                {item.quantity}
              </span>
            </div>

            {/* Name + pack */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: 13, fontWeight: 600, color: "#111",
                fontFamily: "system-ui, -apple-system, Arial, sans-serif",
                lineHeight: 1.4,
                overflow: "hidden", display: "-webkit-box",
                WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                margin: 0,
              }}>
                {item.name}
              </p>
              <p style={{ fontSize: 11, color: "#888", marginTop: 3, fontFamily: "system-ui, Arial, sans-serif" }}>
                {(item.packType === "thuong" || item.packType === "vi") ? item.packLabel : "Lẻ"}
              </p>
            </div>

            {/* Price */}
            <p style={{
              fontSize: 13, fontWeight: 700, color: "#003087",
              fontFamily: "system-ui, Arial, sans-serif",
              flexShrink: 0,
            }}>
              {fmt(item.price * item.quantity)}
            </p>
          </motion.div>
        ))}
      </div>

      <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Divider */}
        <div style={{ height: 1, background: "#e8e8e8" }} />

        {/* Voucher */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="NHẬP MÃ KHUYẾN MÃI"
            value={voucherCode}
            onChange={e => { setVoucherCode(e.target.value); setVoucherMsg(""); }}
            style={{
              flex: 1, padding: "10px 12px",
              border: "1.5px solid #d0d5e8",
              fontSize: 12, fontWeight: 700,
              fontFamily: "system-ui, Arial, sans-serif",
              color: "#003087", background: "#fff",
              outline: "none", letterSpacing: "0.05em",
            }}
            onFocus={e => e.target.style.borderColor = "#003087"}
            onBlur={e => e.target.style.borderColor = "#d0d5e8"}
          />
          <button
            onClick={handleApplyVoucher}
            style={{
              padding: "10px 16px",
              background: "#fff",
              border: "1.5px solid #003087",
              color: "#003087",
              fontWeight: 700, fontSize: 12,
              fontFamily: "system-ui, Arial, sans-serif",
              cursor: "pointer", letterSpacing: "0.04em",
              transition: "all 0.15s",
            }}
            onMouseOver={e => { e.target.style.background = "#003087"; e.target.style.color = "#fff"; }}
            onMouseOut={e => { e.target.style.background = "#fff"; e.target.style.color = "#003087"; }}
          >
            Áp dụng
          </button>
        </div>
        {voucherMsg && (
          <p style={{
            fontSize: 12, marginTop: -8,
            color: appliedVoucher > 0 ? "#2d7d46" : "#e53e3e",
            fontFamily: "system-ui, Arial, sans-serif",
          }}>
            {voucherMsg}
          </p>
        )}

        {/* Price rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={rowStyle}>
            <span style={{ color: "#666" }}>Tạm tính</span>
            <span style={{ fontWeight: 600, color: "#111" }}>{fmt(originalTotal)}</span>
          </div>
          {productDiscount > 0 && (
            <div style={rowStyle}>
              <span style={{ color: "#666" }}>Giảm giá sản phẩm</span>
              <span style={{ fontWeight: 700, color: "#2d7d46" }}>-{fmt(productDiscount)}</span>
            </div>
          )}
          {appliedVoucher > 0 && (
            <div style={rowStyle}>
              <span style={{ color: "#666" }}>Voucher giảm giá</span>
              <span style={{ fontWeight: 700, color: "#2d7d46" }}>-{fmt(appliedVoucher)}</span>
            </div>
          )}
          <div style={rowStyle}>
            <span style={{ color: "#666" }}>Phí vận chuyển</span>
            {shipping === 0
              ? <span style={{ fontWeight: 700, color: "#2d7d46" }}>Miễn phí</span>
              : <span style={{ fontWeight: 600, color: "#111" }}>{fmt(shipping)}</span>
            }
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#e8e8e8" }} />

        {/* Total */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontWeight: 700, fontSize: 15, color: "#111",
            fontFamily: "system-ui, Arial, sans-serif",
          }}>
            Tổng thanh toán
          </span>
          <motion.p
            key={total}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: 22, fontWeight: 900, color: "#003087",
              fontFamily: "system-ui, Arial, sans-serif",
              margin: 0,
            }}
          >
            {fmt(total)}
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={!submitting ? { scale: 1.01 } : {}}
          whileTap={!submitting ? { scale: 0.99 } : {}}
          onClick={onCheckout}
          disabled={submitting}
          style={{
            width: "100%",
            padding: "15px 0",
            background: submitting ? "#6688c0" : "#003087",
            color: "#fff",
            fontWeight: 800,
            fontSize: 15,
            fontFamily: "system-ui, -apple-system, Arial, sans-serif",
            border: "none",
            cursor: submitting ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            letterSpacing: "0.04em",
            transition: "background 0.15s",
          }}
        >
          {submitting ? (
            <>
              <div style={{
                width: 18, height: 18,
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }} />
              Đang xử lý...
            </>
          ) : (
            <>
              <FiShield size={18} />
              Thanh toán ngay
            </>
          )}
        </motion.button>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

        {/* Security note */}
        <p style={{
          textAlign: "center", fontSize: 12, color: "#888",
          fontFamily: "system-ui, Arial, sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          margin: 0,
        }}>
          <FiLock size={11} />
          Thông tin được mã hóa và bảo mật tuyệt đối
        </p>

      </div>
    </div>
  );
};

export default OrderSummary;