import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiChevronRight, FiLock, FiShield } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import PaymentMethod from "../components/PaymentMethod";
import SuccessModal from "../components/SuccessModal";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { createOrder } from "../services/orderService";

// ─── Step indicator giống Vinamilk ───────────────────────────────────────────
const Steps = ({ current }) => {
  const steps = ["Giỏ hàng", "Thanh toán", "Hoàn tất"];
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 text-sm font-bold transition-all"
              style={{
                color: active ? "#003087" : done ? "#003087" : "#aaa",
                fontFamily: "system-ui, -apple-system, Arial, sans-serif",
              }}
            >
              <div
                className="w-6 h-6 flex items-center justify-center text-xs font-black"
                style={{
                  background: active || done ? "#003087" : "#e8e8e8",
                  color: active || done ? "#fff" : "#aaa",
                  borderRadius: "50%",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <span className="hidden sm:block">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <FiChevronRight size={13} style={{ color: done ? "#003087" : "#ccc" }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Validation ───────────────────────────────────────────────────────────────
const validate = (form) => {
  const errors = {};
  if (!form.fullName?.trim()) errors.fullName = "Vui lòng nhập họ và tên";
  if (!form.phone?.trim()) errors.phone = "Vui lòng nhập số điện thoại";
  else if (!/^[0-9]{9,11}$/.test(form.phone.replace(/\s/g, ""))) errors.phone = "Số điện thoại không hợp lệ";
  if (!form.address?.trim()) errors.address = "Vui lòng nhập địa chỉ";
  if (!form.city) errors.city = "Vui lòng chọn thành phố";
  if (!form.district) errors.district = "Vui lòng chọn quận/huyện";
  return errors;
};

// ─── Checkout ─────────────────────────────────────────────────────────────────
const Checkout = () => {
  const navigate = useNavigate();
  const { items, selected, clearCart } = useCart();
  const { addOrder } = useOrders();
  const selectedItems = items.filter((i) => selected.includes(i._id));
  const [form, setForm] = useState({ fullName: "", phone: "", address: "", city: "", district: "", note: "" });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Vui lòng điền đầy đủ thông tin!");
      document.querySelector(".border-red-400")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (selectedItems.length === 0) {
      toast.error("Giỏ hàng trống! Vui lòng thêm sản phẩm.");
      return;
    }
    setSubmitting(true);
    const subtotal = selectedItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = subtotal >= 200000 ? 0 : 30000;
    const total = subtotal + shipping;
    const orderPayload = {
      paymentMethod, fullName: form.fullName, phone: form.phone,
      address: `${form.address}, ${form.district}, ${form.city}`,
      note: form.note, subtotal, shipping, total,
      items: selectedItems.map((i) => ({
        name: i.name, price: i.price, quantity: i.quantity,
        emoji: i.emoji || "🥛", category: i.category || "", image: i.image,
      })),
    };
    try {
      const payload = {
        items: selectedItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        address: orderPayload.address, phone: form.phone,
        fullName: form.fullName, note: form.note, paymentMethod,
      };
      const res = await createOrder(payload);
      const newOrder = addOrder({ ...orderPayload, orderId: res.data?.orderId || res.data?._id || `VNM${Date.now()}` });
      setOrderId(newOrder.orderId);
      clearCart(); setSuccessModal(true);
      toast.success("🎉 Đặt hàng thành công!", { duration: 3000 });
    } catch {
      const newOrder = addOrder({ ...orderPayload, orderId: `VNM${Date.now()}` });
      setOrderId(newOrder.orderId);
      clearCart(); setSuccessModal(true);
      toast.success("🎉 Đặt hàng thành công!", { duration: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SuccessModal open={successModal} orderId={orderId} />

      <div style={{ background: "var(--vnm-cream)", minHeight: "100vh" }}>
        <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>

          {/* ── Breadcrumb + Steps ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#888", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}>
              <Link to="/" style={{ color: "#888", textDecoration: "none" }} onMouseOver={e => e.target.style.color="#003087"} onMouseOut={e => e.target.style.color="#888"}>Trang chủ</Link>
              <FiChevronRight size={12} />
              <Link to="/cart" style={{ color: "#888", textDecoration: "none" }} onMouseOver={e => e.target.style.color="#003087"} onMouseOut={e => e.target.style.color="#888"}>Giỏ hàng</Link>
              <FiChevronRight size={12} />
              <span style={{ color: "#003087", fontWeight: 700 }}>Thanh toán</span>
            </div>
            <Steps current={1} />
          </motion.div>

          {/* ── Title ── */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              fontWeight: 900,
              color: "#003087",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "system-ui, -apple-system, Arial, sans-serif",
            }}
          >
            <FiLock size={20} color="#003087" />
            Thông tin thanh toán
          </motion.h1>

          {/* ── Main grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} className="checkout-grid">
            <style>{`
              @media (min-width: 1024px) {
                .checkout-grid { grid-template-columns: 1fr 380px !important; }
              }
            `}</style>

            {/* LEFT: Form sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Section 1: Thông tin giao hàng */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  padding: "28px 28px",
                }}
              >
                <h2 style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#003087",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "system-ui, -apple-system, Arial, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  <span style={{
                    width: 24, height: 24,
                    background: "#003087",
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 900,
                  }}>1</span>
                  Thông tin giao hàng
                </h2>
                <CheckoutForm form={form} errors={errors} onChange={handleChange} />
              </motion.div>

              {/* Section 2: Phương thức thanh toán */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  padding: "28px 28px",
                }}
              >
                <h2 style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#003087",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "system-ui, -apple-system, Arial, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  <span style={{
                    width: 24, height: 24,
                    background: "#003087",
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 900,
                  }}>2</span>
                  Phương thức thanh toán
                </h2>
                <PaymentMethod selected={paymentMethod} onChange={setPaymentMethod} />
              </motion.div>

            </div>

            {/* RIGHT: Order summary */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              style={{ position: "sticky", top: 88 }}
            >
              <OrderSummary onCheckout={handleSubmit} submitting={submitting} />
            </motion.div>

          </div>
        </main>
      </div>
    </>
  );
};

export default Checkout;