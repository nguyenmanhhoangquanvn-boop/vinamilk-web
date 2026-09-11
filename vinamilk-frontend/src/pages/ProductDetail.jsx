import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiShoppingCart, FiZap, FiHeart, FiShare2, FiShield,
  FiTruck, FiRefreshCw, FiStar, FiCheck, FiChevronRight, FiArrowUp, FiArrowLeft, FiPackage
} from "react-icons/fi";

import ProductGallery from "../components/ProductGallery";
import QuantitySelector from "../components/QuantitySelector";
import ProductBenefits from "../components/ProductBenefits";
import ProductInfoBanner from "../components/ProductInfoBanner";
import { useCart } from "../context/CartContext";
import axiosClient from "../services/axiosClient";
import { mockProducts } from "./ProductList";

// ─── Mock product ─────────────────────────────────────────────────────────────
const mockProduct = {
  _id: "1",
  name: "Sữa Tươi Tiệt Trùng Vinamilk 100% Có Đường 1 Lít",
  price: 29000, oldPrice: 36000, discount: 20,
  rating: 4.8, reviewCount: 2341, sold: 12500, stock: 48,
  image: "/images/p1.png",
  images: [
    { id: 1, url: "/images/p1.png" },
    { id: 2, url: "/images/p1_2.png" },
    { id: 3, url: "/images/p1_3.png" },
  ],
  emoji: "🥛", category: "Sữa tươi", brand: "Vinamilk", sku: "VMK-ST-001",
  description: "Sữa tươi tiệt trùng Vinamilk được làm từ 100% sữa tươi nguyên chất, giàu canxi và vitamin D3 giúp xương chắc khỏe. Hương vị thơm ngon tự nhiên, không chất bảo quản.",
  benefits: ["100% sữa tươi nguyên chất", "Giàu canxi & Vitamin D3", "Không chất bảo quản", "Tốt cho xương và răng", "Phù hợp mọi lứa tuổi"],
  specs: [
    { label: "Khối lượng", value: "1 Lít" },
    { label: "Xuất xứ", value: "Việt Nam" },
    { label: "Thương hiệu", value: "Vinamilk" },
    { label: "Hạn sử dụng", value: "6 tháng" },
    { label: "Bảo quản", value: "Nhiệt độ 2–8°C" },
  ],
  tags: ["sữa tươi", "vinamilk", "canxi", "vitamin D"],
  variants: [
    { pack: "65ml", size: "Lốc 4 chai", price: 22000, oldPrice: 25000, stock: 48 },
    { pack: "65ml", size: "Lốc 5 chai", price: 26000, oldPrice: 30000, stock: 30 },
    { pack: "130ml", size: "Lốc 4 chai", price: 34000, oldPrice: 40000, stock: 120 },
    { pack: "130ml", size: "Thùng 24 chai", price: 200310, oldPrice: 230000, stock: 15 },
    { pack: "400ml", size: "Chai", price: 18000, oldPrice: 20000, stock: 100 },
    { pack: "1L", size: "Hộp", price: 32000, oldPrice: 36000, stock: 50 },
  ],
};

// ─── Mọi người nói gì — giống Vinamilk thật ──────────────────────────────────
const StarRow = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? "#003087" : "#e0e4ef"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const mockReviews = [
  { id: 1, name: "T**** l* T** T****", date: "02/05/2026", stars: 5, content: "tôi đăng ký mua 1 thùng sữa và tặng kèm 1 cốc sứ tại sao k có cái cốc" },
  { id: 2, name: "P***** A** N***** T**", date: "20/04/2026", stars: 5, content: "" },
  { id: 3, name: "L*** Đ*** N***", date: "02/04/2026", stars: 5, content: "" },
  { id: 4, name: "T**** T*** N***", date: "31/03/2026", stars: 5, content: "" },
  { id: 5, name: "T*** P*** T** N***", date: "10/02/2026", stars: 5, content: "" },
];

const MoiNguoiNoiGi = ({ product }) => {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ stars: 5, content: "" });
  const [reviews, setReviews] = useState(mockReviews);
  const [submitted, setSubmitted] = useState(false);

  const totalRating = 5;
  const totalCount = reviews.length;

  const handleSubmit = () => {
    if (!newReview.content.trim()) return;
    const now = new Date();
    const date = `${String(now.getDate()).padStart(2,"0")}/${String(now.getMonth()+1).padStart(2,"0")}/${now.getFullYear()}`;
    setReviews(prev => [{ id: Date.now(), name: "Bạn", date, stars: newReview.stars, content: newReview.content }, ...prev]);
    setNewReview({ stars: 5, content: "" });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section style={{ borderTop: "1px solid #e8e8e8", paddingTop: 48, marginBottom: 48 }}>

      {/* ── Header row ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        {/* Title */}
        <h2 style={{
          fontFamily: "system-ui, -apple-system, Arial, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          color: "#003087",
          margin: 0,
          lineHeight: 1.1,
        }}>
          Mọi người nói gì
        </h2>

        {/* Rating summary */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontFamily: "system-ui, -apple-system, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "3.5rem",
            color: "#003087",
            lineHeight: 1,
          }}>
            {totalRating}
          </span>
          <div>
            <StarRow count={totalRating} />
            <p style={{
              fontSize: 13,
              color: "#003087",
              fontFamily: "system-ui, -apple-system, Arial, sans-serif",
              marginTop: 4,
              fontWeight: 600,
            }}>
              {totalCount} đánh giá
            </p>
          </div>
        </div>
      </div>



      {/* ── Review list ── */}
      <div>
        {reviews.length === 0 && (
          <p style={{ color: "#888", fontFamily: "system-ui, Arial, sans-serif", fontSize: 14 }}>
            Chưa có đánh giá nào.
          </p>
        )}
        {reviews.map((r, i) => (
          <div key={r.id} style={{
            borderTop: i === 0 ? "none" : "1px solid #e8e8e8",
            paddingTop: i === 0 ? 0 : 24,
            paddingBottom: 24,
          }}>
            {/* Name */}
            <p style={{
              fontFamily: "system-ui, -apple-system, Arial, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#003087",
              marginBottom: 6,
            }}>
              {r.name}
            </p>
            {/* Stars + date */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: r.content ? 10 : 0 }}>
              <StarRow count={r.stars} />
              <span style={{
                fontSize: 13,
                color: "#003087",
                fontFamily: "system-ui, Arial, sans-serif",
                fontWeight: 500,
              }}>
                {r.date}
              </span>
            </div>
            {/* Content */}
            {r.content && (
              <p style={{
                fontSize: 14,
                color: "#333",
                fontFamily: "system-ui, -apple-system, Arial, sans-serif",
                lineHeight: 1.6,
                marginTop: 8,
              }}>
                {r.content}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ── Viết đánh giá button ── */}
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "12px 28px",
            background: "#003087",
            color: "#fff",
            fontFamily: "system-ui, -apple-system, Arial, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          {showForm ? "Hủy" : "Viết đánh giá"}
        </button>
        {submitted && (
          <span style={{ color: "#003087", fontWeight: 700, fontSize: 13 }}>
            ✓ Đã gửi đánh giá!
          </span>
        )}
      </div>

      {/* ── Form viết đánh giá ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden", marginTop: 20 }}
          >
            <div style={{
              border: "1px solid #ccd1e0",
              padding: 24,
              background: "#fafaf7",
            }}>
              {/* Chọn số sao */}
              <div style={{ marginBottom: 16 }}>
                <p style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#003087",
                  fontFamily: "system-ui, Arial, sans-serif",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>
                  Đánh giá của bạn
                </p>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1,2,3,4,5].map(s => (
                    <button
                      key={s}
                      onClick={() => setNewReview(p => ({ ...p, stars: s }))}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24"
                        fill={s <= newReview.stars ? "#003087" : "#e0e4ef"}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <textarea
                value={newReview.content}
                onChange={e => setNewReview(p => ({ ...p, content: e.target.value }))}
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1.5px solid #ccd1e0",
                  fontFamily: "system-ui, -apple-system, Arial, sans-serif",
                  fontSize: 14,
                  color: "#222",
                  background: "#fff",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!newReview.content.trim()}
                style={{
                  marginTop: 12,
                  padding: "11px 28px",
                  background: newReview.content.trim() ? "#003087" : "#ccd1e0",
                  color: "#fff",
                  fontFamily: "system-ui, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  border: "none",
                  cursor: newReview.content.trim() ? "pointer" : "not-allowed",
                  letterSpacing: "0.04em",
                  transition: "background 0.2s",
                }}
              >
                Gửi đánh giá
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const DetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
    <div className="space-y-4">
      <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-3xl" />
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-xl" />)}
      </div>
    </div>
    <div className="space-y-4 pt-4">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24" />
      <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-full" />
      <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-32" />
      <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-40" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
      <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      <div className="flex gap-3">
        <div className="flex-1 h-14 bg-slate-200 dark:bg-slate-700 rounded-xl" />
        <div className="flex-1 h-14 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      </div>
    </div>
  </div>
);

// ─── Product Info panel ───────────────────────────────────────────────────────
const ProductInfo = ({ product, quantity, onQuantityChange }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");
  const [packType, setPackType] = useState("le"); // "le" | "vi" | "thuong"
  const fmt = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  const hasThuong = !!product.thuong;
  const hasVi = !!product.vi;
  const currentPackInfo = packType === "thuong" && hasThuong ? product.thuong : (packType === "vi" && hasVi ? product.vi : null);
  const currentPrice = currentPackInfo ? currentPackInfo.price : product.price;
  const currentOldPrice = currentPackInfo ? currentPackInfo.oldPrice : product.oldPrice;
  const currentStock = product.stock;

  const handleAddToCart = () => {
    addToCart(product, quantity, packType, currentPackInfo);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (product.category === "Kem") {
      navigate("/");
      return;
    }
    addToCart(product, quantity, packType, currentPackInfo);
    toast.success("Đang chuyển đến trang thanh toán...", { duration: 1500, id: "redirect-checkout" });
    setTimeout(() => navigate("/checkout"), 800);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép link!");
    } catch {
      toast.error("Không thể sao chép link");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Category & Title & Rating Block */}
      <div className="flex flex-col gap-2">
        <div className="text-base font-bold tracking-wider uppercase" style={{ color: "var(--vnm-navy)" }}>
          {product.category}
        </div>
        <h1 className="text-5xl lg:text-[56px] font-black leading-tight tracking-tight" style={{ color: "var(--vnm-navy)" }}>
          {product.name}
        </h1>
        
        <div className="flex items-center gap-3 mt-1 text-sm font-bold" style={{ color: "var(--vnm-navy)" }}>
          <span>{product.rating?.toFixed(1) || "5.0"}</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <FiStar key={i} size={16} className="fill-current" />)}
          </div>
          <span className="underline cursor-pointer ml-1">{product.reviewCount || 3} đánh giá</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium my-4">
          <div className="flex items-center gap-2">
            <FiZap size={16} />
            <span>Giao 2H</span>
          </div>
          <div className="flex items-center gap-2">
            <FiShoppingCart size={16} />
            <span>Nhận tại cửa hàng</span>
          </div>
        </div>

        <ul className="flex flex-col gap-3 mb-6" style={{ color: "var(--vnm-navy)" }}>
          {product.category === "Sữa chua" ? (
            <li className="flex items-start gap-3 text-lg leading-relaxed font-medium">
              <span className="mt-2 w-1.5 h-1.5 rounded-sm bg-current shrink-0" />
              <span>Từ 6 chủng men sống và lợi khuẩn Châu Âu đầu tiên và duy nhất tại Việt Nam.</span>
            </li>
          ) : (
            product.benefits?.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-lg leading-relaxed font-medium">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-sm bg-current shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: b }} />
              </li>
            ))
          )}
        </ul>

        {product.category === "Sữa chua" || product.category === "Kem" || product.category === "Kem lạnh" ? (
          <div className="mb-4">
            <div className="text-sm font-bold uppercase mb-1" style={{ color: "var(--vnm-navy)" }}>
              LƯU Ý:
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "var(--vnm-navy)" }}>
              <p className="mb-2">Để đảm bảo chất lượng sản phẩm tốt nhất, các đơn hàng bao gồm kem, sữa chua ăn và sữa chua uống sẽ chỉ được giao trong bán kính 10km từ cửa hàng Vinamilk gần nhất. Đơn hàng của bạn có thể sẽ được hủy nếu không có cửa hàng Vinamilk trong vòng bán kính 10km từ địa chỉ nhận hàng.</p>
              <p>Mong Quý khách kiểm tra lại địa chỉ giao hàng hoặc liên hệ với chúng tôi qua hotline: <strong>1900 636 979 phím 1</strong> để được hỗ trợ thêm.</p>
            </div>
          </div>
        ) : (
          <div className="text-sm font-bold uppercase mb-4" style={{ color: "var(--vnm-navy)" }}>
            LƯU Ý:
          </div>
        )}

        {/* Pack type selector (Lẻ / Vỉ / Thùng) */}
        {(hasThuong || hasVi) && (
          <div className="mb-4">
            <p className="text-sm font-bold uppercase mb-2" style={{ color: "var(--vnm-navy)" }}>Chọn loại mua:</p>
            <div className="flex gap-2">
              <button
                onClick={() => setPackType("le")}
                className="flex items-center gap-2 px-4 py-2.5 border-2 font-semibold text-sm transition-all rounded-lg"
                style={{
                  background: packType === "le" ? "var(--vnm-navy)" : "transparent",
                  color: packType === "le" ? "#fff" : "var(--vnm-navy)",
                  borderColor: "var(--vnm-navy)"
                }}
              >
                {product._id === "21" ? "Lốc 4 hộp" : "Lẻ"} — {fmt(product.price)}{product._id !== "21" ? "/hộp" : ""}
              </button>
              {hasVi && (
                <button
                  onClick={() => setPackType("vi")}
                  className="flex items-center gap-2 px-4 py-2.5 border-2 font-semibold text-sm transition-all rounded-lg"
                  style={{
                    background: packType === "vi" ? "var(--vnm-navy)" : "transparent",
                    color: packType === "vi" ? "#fff" : "var(--vnm-navy)",
                    borderColor: "var(--vnm-navy)"
                  }}
                >
                  <FiPackage size={15} />
                  Vỉ {product.vi.size} — {fmt(product.vi.price)}
                </button>
              )}
              {hasThuong && (
                <button
                  onClick={() => setPackType("thuong")}
                  className="flex items-center gap-2 px-4 py-2.5 border-2 font-semibold text-sm transition-all rounded-lg"
                  style={{
                    background: packType === "thuong" ? "var(--vnm-navy)" : "transparent",
                    color: packType === "thuong" ? "#fff" : "var(--vnm-navy)",
                    borderColor: "var(--vnm-navy)"
                  }}
                >
                  <FiPackage size={15} />
                  Thùng {product.thuong.size} — {fmt(product.thuong.price)}
                </button>
              )}
            </div>
            {currentPackInfo && (
              <p className="text-xs mt-1.5" style={{ color: "var(--vnm-text-sec)" }}>
                ≈ {fmt(Math.round(currentPackInfo.price / currentPackInfo.size))}/hộp — tiết kiệm hơn mua lẻ
              </p>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-end gap-3 mt-4 mb-2">
          <span className="text-5xl font-bold" style={{ color: "var(--vnm-navy)" }}>{fmt(currentPrice * quantity)}</span>
          {currentOldPrice && (
            <span className="text-slate-500 line-through text-xl mb-1">{fmt(currentOldPrice * quantity)}</span>
          )}
          {product.discount && (
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-lg mb-1">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Action buttons (Quantity + Add to Cart) */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center gap-3 h-[48px]">
          <QuantitySelector quantity={quantity} onChange={onQuantityChange} max={currentStock} />
          
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className={`flex-1 h-full rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all border-2
                ${addedToCart ? "bg-green-50 border-green-500 text-green-600" : "bg-[var(--vnm-navy)] border-[var(--vnm-navy)] text-white hover:opacity-90"}
                disabled:opacity-50`}
          >
            {addedToCart ? <><FiCheck size={20} /> Đã thêm</> : <>{fmt(currentPrice * quantity)} | Thêm vào giỏ</>}
          </button>
          
          <button
            onClick={() => setLiked(!liked)}
            className={`w-[48px] h-full rounded-lg border-2 flex items-center justify-center transition-all`}
            style={{
               borderColor: liked ? "var(--vnm-red)" : "var(--vnm-border)",
               color: liked ? "var(--vnm-red)" : "var(--vnm-text-sec)",
               background: liked ? "var(--vnm-cream)" : "transparent"
            }}
          >
            <FiHeart size={20} className={liked ? "fill-current" : ""} />
          </button>
        </div>
        <p className="text-sm text-slate-500 mt-1">{currentStock > 10 ? "Tình trạng: Còn hàng" : currentStock > 0 ? `Chỉ còn ${currentStock} sản phẩm` : "Hết hàng"}</p>
      </div>

      {/* Note Block */}
      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/80 dark:bg-blue-900/20 dark:border-blue-800 text-sm">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-lg text-blue-600 dark:text-blue-400">
            <FiTruck size={20} />
          </div>
          <div>
             <p className="font-bold text-blue-900 dark:text-blue-100 mb-1">Giao hàng & Bảo quản</p>
             <p className="text-blue-700 dark:text-blue-300">Sản phẩm cần bảo quản lạnh 6-8°C. Giao hàng tiêu chuẩn trong 2-4 ngày trên toàn quốc.</p>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: FiShield, label: "Hàng chính hãng", sub: "100% đảm bảo" },
          { icon: FiRefreshCw, label: "Đổi trả dễ dàng", sub: "Trong 7 ngày" },
          { icon: FiShare2, label: "Chia sẻ", sub: "Lưu sản phẩm", action: handleShare },
        ].map(({ icon: Icon, label, sub, action }) => (
          <div key={label} onClick={action} className={`flex flex-col items-center gap-1.5 rounded-xl p-3 text-center border transition-all ${action ? "cursor-pointer hover:border-blue-400" : ""}`} style={{ borderColor: "var(--vnm-border)", background: "var(--vnm-cream-2)" }}>
            <Icon size={18} style={{ color: "var(--vnm-navy)" }} />
            <p className="text-xs font-bold leading-tight" style={{ color: "var(--vnm-navy)" }}>{label}</p>
            <p className="text-[10px] sm:text-xs" style={{ color: "var(--vnm-text-sec)" }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border rounded-2xl overflow-hidden mt-4" style={{ borderColor: "var(--vnm-border)" }}>
        <div className="flex border-b" style={{ borderColor: "var(--vnm-border)" }}>
          {[
            { id: "desc", label: "Mô tả" },
            { id: "specs", label: "Thông số" },
            { id: "benefits", label: "Lợi ích" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-3 text-sm font-bold transition-all"
              style={{
                background: activeTab === tab.id ? "var(--vnm-navy)" : "transparent",
                color: activeTab === tab.id ? "#fff" : "var(--vnm-text-sec)"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="min-h-[250px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
            {activeTab === "desc" && (
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{product.description}</p>
            )}
            {activeTab === "specs" && (
              <table className="w-full text-sm">
                <tbody>
                  {product.specs?.map(({ label, value }) => (
                    <tr key={label} className="border-b border-slate-100 dark:border-slate-700 last:border-0">
                      <td className="py-3 text-slate-500 dark:text-slate-400 font-medium w-1/2">{label}</td>
                      <td className="py-3 text-slate-800 dark:text-white font-semibold">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === "benefits" && (
              <ul className="space-y-3">
                {product.benefits?.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <FiCheck size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ─── Sticky Bottom Bar ────────────────────────────────────────────────────────
const StickyBottomBar = ({ product, quantity, onQuantityChange }) => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  const currentPrice = product?.price || 0;
  const currentStock = product?.stock ?? 0;

  const fmt = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible || !product) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <div 
        className="pointer-events-auto flex items-center justify-between w-full max-w-5xl bg-white border shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl px-4 py-3"
        style={{ borderColor: "var(--vnm-border)" }}
      >
        {/* Product Info */}
        <div className="hidden lg:flex items-center gap-4">
          <img src={product.images?.[0]?.url || product.image} alt="thumb" className="w-10 h-10 object-contain" />
          <span className="font-bold text-sm" style={{ color: "var(--vnm-navy)" }}>
            {product.name}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <div className="hidden sm:block">
            <QuantitySelector quantity={quantity} onChange={onQuantityChange} max={currentStock} />
          </div>
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className="flex-1 sm:flex-none h-[42px] px-6 rounded-lg font-bold text-sm text-white flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--vnm-navy)" }}
          >
            {fmt(currentPrice * quantity)} | Thêm vào giỏ
          </button>
          
          <button 
            onClick={scrollToTop}
            className="w-[42px] h-[42px] shrink-0 rounded-lg border flex items-center justify-center transition-colors hover:bg-slate-50"
            style={{ borderColor: "var(--vnm-navy)", color: "var(--vnm-navy)" }}
          >
            <FiArrowUp size={20} />
          </button>
        </div>
      </div>
      
      {/* Fake Chat Button (for visual similarity to mockup) */}
      <div className="pointer-events-auto hidden md:flex w-[50px] h-[50px] ml-4 shrink-0 rounded-full border border-cyan-400 bg-cyan-100 items-center justify-center text-[var(--vnm-navy)] shadow-lg cursor-pointer hover:bg-cyan-200 transition-colors">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11Z" />
         </svg>
      </div>
    </motion.div>
  );
};

// ─── Main ProductDetail ───────────────────────────────────────────────────────
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [howToUseOpen, setHowToUseOpen] = useState(false);
  const [ingredientOpen, setIngredientOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    
    // Tạm thời bỏ qua gọi API để web load lập tức (chưa có Backend)
    setTimeout(() => {
      const found = mockProducts.find((p) => p._id === String(id));
      if (found) {
        setProduct({
          ...mockProduct,
          ...found,
          images: found.images 
            ? found.images.map((url, i) => ({ id: i + 1, url }))
            : [{ id: 1, url: found.image || "/images/p1.png" }]
        });
      } else {
        setProduct(mockProduct);
      }
      setLoading(false);
    }, 150);
  }, [id]);

  return (
    <div className="w-full relative pb-24">
      <main className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 xl:px-12 py-10">

        {/* Back Button */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[var(--vnm-navy)] transition-all"
          >
            <div className="w-9 h-9 rounded-full border border-slate-200 group-hover:border-[var(--vnm-navy)] flex items-center justify-center transition-all bg-white shadow-sm group-hover:bg-blue-50">
              <FiArrowLeft size={18} />
            </div>
            <span>Quay lại</span>
          </button>
        </div>

        {/* Main detail */}
        <div className="bg-transparent mb-12">
          {loading ? <DetailSkeleton /> : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-20 items-start">
              <div className="lg:col-span-6 xl:col-span-6">
                <ProductGallery images={product?.images} emoji={product?.emoji} productName={product?.name} />
              </div>
              <div className="lg:col-span-6 xl:col-span-6">
                <ProductInfo product={product} quantity={quantity} onQuantityChange={setQuantity} />
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Marketing Sections based on category */}
        {product?.category === "Sữa tươi" && product?._id !== "21" && (
          <div className="bg-transparent mb-12">
            <ProductBenefits />
            <ProductInfoBanner />
          </div>
        )}

        {product?._id === "21" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--vnm-navy)" }}>Có gì đặc sắc?</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-10">
              <img src="https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_49_8a8fefce53.webp" alt="Siêu sữa tươi đạm quý A2" className="w-full rounded-2xl shadow-sm" />
              <div>
                <p className="text-xl leading-loose font-medium" style={{ color: "var(--vnm-navy)" }}>
                  Siêu sữa tươi đạm quý A2 từ đàn bò gen sở hữu nguồn gen A2/A2 thuần chủng có mặt từ cách đây 10.000 năm trước khi trải qua quá trình tiến hóa tự nhiên. Kiểm soát nghiêm ngặt nguồn gen đến giọt sữa đảm bảo nguồn đạm A2 thuần túy. Đạm quý A2 beta casein có cấu trúc gần với đạm beta casein trong sữa mẹ. Một lựa chọn dịu dàng dành riêng cho những chiếc bụng khó tính và nhạy cảm: Béo mịn mịn màng, êm đềm mềm mại, nguyên vị nguyên bản.
                </p>
              </div>
            </div>

            <div style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", width: "100vw" }}>
              <img
                src={product.featureBanner}
                alt="Infographic Green Farm A2"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        {product?.category === "Sữa đặc" && (
          <>
            {/* Có gì đặc sắc */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--vnm-navy)" }}>Có gì đặc sắc?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: "☕",
                    title: "Nguyên liệu cà phê sữa đúng điệu",
                    desc: "Nguyên liệu không thể thiếu cho ly cà phê sữa thơm ngon, đậm đà, chuẩn vị người Việt."
                  },
                  {
                    icon: "🌿",
                    title: "Ngọt thanh từ dầu thực vật",
                    desc: "Sử dụng dầu thực vật cho hương vị ngọt thanh, ngày bảo vừa phải, không lấn át mùi vị đặc trưng của cà phê sau khi pha."
                  },
                  {
                    icon: "🥛",
                    title: "Giàu protein & canxi",
                    desc: "Cung cấp protein và canxi cần thiết, hỗ trợ cơ thể khỏe mạnh và tràn đầy năng lượng."
                  },
                  {
                    icon: "🏆",
                    title: "Thương hiệu Ngôi Sao Phương Nam",
                    desc: "Thương hiệu creamer đặc uy tín hàng đầu Việt Nam, được hàng triệu gia đình tin dùng qua nhiều thế hệ."
                  },
                  {
                    icon: "📦",
                    title: "Đóng gói tiện lợi",
                    desc: "Hộp giấy 380g tiện dụng, dễ bảo quản. Thùng 12 hộp tiết kiệm, phù hợp gia đình và quán cà phê."
                  },
                  {
                    icon: "✅",
                    title: "Kiểm soát chất lượng nghiêm ngặt",
                    desc: "Sản xuất theo quy trình chuẩn quốc tế tại nhà máy Vinamilk, đảm bảo an toàn vệ sinh thực phẩm."
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl border transition-all hover:shadow-md" style={{ borderColor: "var(--vnm-border)", background: "var(--vnm-cream-2)" }}>
                    <div className="text-3xl shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-sm mb-1" style={{ color: "var(--vnm-navy)" }}>{item.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--vnm-text-sec)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full-width banner */}
            <div className="mb-12" style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", width: "100vw" }}>
              <img 
                src="https://d8um25gjecm9v.cloudfront.net/cms/CRM_NSPN_CREAMER_INFO_09214b32cb_a01e67f8bc.jpg" 
                alt="Thông tin sữa đặc" 
                className="w-full h-auto object-cover" 
              />
            </div>
          </>
        )}

        {/* Kem category sections */}
        {product?.category === "Kem" && (
          <>
            {/* Accordions: Thành phần & Hướng dẫn sử dụng */}
            <div className="mb-10 max-w-3xl mx-auto">
              {/* Ingredients accordion */}
              <div className="border-t border-b border-blue-100 divide-y divide-blue-100">
                <div>
                  <button
                    onClick={() => setIngredientOpen(!ingredientOpen)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <div>
                      <span className="font-bold text-sm uppercase tracking-wider" style={{ color: "var(--vnm-navy)" }}>THÀNH PHẦN &amp; DINH DƯỠNG</span>
                      {!ingredientOpen && <p className="text-sm mt-0.5" style={{ color: "var(--vnm-text-sec)" }}>{product.ingredients?.slice(0,60)}…</p>}
                    </div>
                    <span className="text-2xl font-light ml-4" style={{ color: "var(--vnm-navy)" }}>{ingredientOpen ? "−" : "+"}</span>
                  </button>
                  {ingredientOpen && (
                    <div className="pb-4 text-sm leading-relaxed" style={{ color: "var(--vnm-text-sec)" }}>
                      {product.ingredients}
                    </div>
                  )}
                </div>

                {/* How to use accordion — opens modal */}
                <div>
                  <button
                    onClick={() => setHowToUseOpen(true)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="font-bold text-sm uppercase tracking-wider" style={{ color: "var(--vnm-navy)" }}>HƯỚNG DẪN SỬ DỤNG</span>
                    <span className="text-2xl font-light ml-4" style={{ color: "var(--vnm-navy)" }}>+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* How-to-use Modal */}
            <AnimatePresence>
              {howToUseOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                  onClick={() => setHowToUseOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setHowToUseOpen(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-light"
                    >×</button>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--vnm-navy)" }}>How to use</h2>
                    <div className="text-sm leading-loose" style={{ color: "var(--vnm-navy)" }}>
                      {product.howToUse?.split('\n').map((line, i) => (
                        <p key={i} className={line ? "mb-4" : "mb-2"}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Có gì đặc sắc — with feature banner image */}
            {product.featureBanner && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--vnm-navy)" }}>Có gì đặc sắc?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: "🍫", title: "Socola đen thượng hạng", desc: "Sô cô la chip chất lượng cao (4,9%) mang lại hương vị đậm đà, đắng nhẹ đặc trưng của Gelato Ý chính hiệu." },
                    { icon: "🥛", title: "100% Sữa tươi Vinamilk", desc: "Nền kem được làm từ sữa tươi Vinamilk nguyên chất, cho kết cấu mịn màng, béo ngậy và thơm tự nhiên." },
                    { icon: "🇮🇹", title: "Công nghệ Gelato Ý", desc: "Ít béo hơn kem truyền thống nhưng đậm đà hơn, kết cấu mềm mịn tan ngay trên đầu lưỡi." },
                    { icon: "🌿", title: "Không chất bảo quản nhân tạo", desc: "Không phẩm màu, không hương liệu nhân tạo — nguyên liệu sạch cho từng muỗng kem." },
                    { icon: "❄️", title: "Bảo quản đông lạnh chuẩn", desc: "Bảo quản ≤ -18°C, dùng hết trong 5 ngày sau khi mở. Ngon nhất khi thưởng thức với bánh côn giòn." },
                    { icon: "🏆", title: "Thương hiệu uy tín hàng đầu", desc: "Vinamilk — thương hiệu sữa số 1 Việt Nam, được hàng triệu gia đình tin dùng qua nhiều thế hệ." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl border transition-all hover:shadow-md" style={{ borderColor: "var(--vnm-border)", background: "var(--vnm-cream-2)" }}>
                      <div className="text-3xl shrink-0">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-sm mb-1" style={{ color: "var(--vnm-navy)" }}>{item.title}</h3>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--vnm-text-sec)" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Feature image */}
                <img
                  src={product.featureBanner}
                  alt="Gelato đặc sắc"
                  className="w-full rounded-2xl object-cover shadow-lg"
                  style={{ maxHeight: 480 }}
                />
              </div>
            )}

            {/* Full-width banner */}
            {product.bottomBanner && (
              <div className="mb-12" style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", width: "100vw" }}>
                <img
                  src={product.bottomBanner}
                  alt={`${product.name} banner`}
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: 520, objectPosition: "center" }}
                />
              </div>
            )}
          </>
        )}

        {/* Reviews */}
        <div className="bg-transparent mb-12">
          {product?.commentBanner && (
            <div className="mb-8" style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", width: "100vw" }}>
              <img
                src={product.commentBanner}
                alt="Thông tin kem Vinamilk"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <MoiNguoiNoiGi product={product} />
        </div>



      </main>
      <StickyBottomBar product={product} quantity={quantity} onQuantityChange={setQuantity} />
    </div>
  );
};

export default ProductDetail;