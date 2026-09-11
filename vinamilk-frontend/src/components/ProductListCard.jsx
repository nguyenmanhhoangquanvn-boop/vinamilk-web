import { useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiStar, FiEye, FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

const ProductListCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [packType, setPackType] = useState("le"); // "le" | "vi" | "thuong"

  const hasThuong = !!product.thuong;
  const hasVi = !!product.vi;
  const currentPackInfo = packType === "thuong" && hasThuong ? product.thuong : (packType === "vi" && hasVi ? product.vi : null);
  const currentPrice = currentPackInfo ? currentPackInfo.price : product.price;
  const currentOldPrice = currentPackInfo ? currentPackInfo.oldPrice : product.oldPrice;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1, packType, currentPackInfo);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handlePackToggle = (e, type) => {
    e.stopPropagation();
    setPackType(type);
  };

  const formatPrice = (p) =>
    new Intl.NumberFormat("vi-VN").format(p) + "₫";

  const discount = product.discount || 0;
  const rating = product.rating || 4.5;
  const sold = product.sold || 0;

  return (
    <motion.div
      onClick={() => {
        sessionStorage.setItem("vnm_shop_should_restore", "true");
        navigate(`/products/${product._id}`);
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className="relative flex flex-col py-6 px-4 cursor-pointer group bg-transparent"
    >
      {/* Badge row */}
      {product.badge ? (
        <div className="mb-3 h-6 flex items-center">
          <span className="text-[11px] font-medium px-2 py-0.5 tracking-wide bg-[#dde8f5] text-[#003087] dark:bg-[#1e3a8a] dark:text-[#bfdbfe]">
            {product.badge}
          </span>
        </div>
      ) : (
        <div className="mb-3 h-6" />
      )}

      {/* Image area */}
      <div className="relative flex items-center justify-center mb-4" style={{ height: "200px" }}>
        {/* Discount */}
        {discount > 0 && (
          <div className="absolute top-0 left-0 z-10 text-[11px] font-semibold px-1.5 py-0.5"
               style={{ background: "var(--vnm-red)", color: "#fff" }}>
            -{discount}%
          </div>
        )}

        {/* Stock label */}
        {sold > 1000 && (
          <div className="absolute top-0 right-8 z-10 text-[11px] font-medium px-2 py-0.5"
               style={{ background: "#f59e0b", color: "#fff" }}>
            Bán chạy
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleLike}
          className="absolute top-0 right-0 z-10 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: liked ? "#D0021B" : "#999" }}
        >
          <FiHeart size={15} className={liked ? "fill-current" : ""} />
        </button>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
             style={{ background: "rgba(249,247,242,0.6)" }}>
          <button className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 border bg-white dark:bg-transparent border-[#003087] dark:border-white text-[#003087] dark:text-white">
            <FiEye size={14} /> Xem chi tiết
          </button>
        </div>

        {/* Product image */}
        {product.image ? (
          <div className="relative h-full w-full flex items-center justify-center dark:bg-white/95 dark:rounded-xl dark:p-2 dark:shadow-sm">
            <img src={product.image} alt={product.name} className={`absolute w-full h-full object-contain mix-blend-darken dark:mix-blend-normal transition-all duration-500 group-hover:scale-105 ${product.images?.length > 1 ? 'group-hover:opacity-0' : ''}`} />
            {product.images?.length > 1 && (
              <img src={product.images[1]} alt={product.name} className="absolute w-full h-full object-contain mix-blend-darken dark:mix-blend-normal opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105" />
            )}
          </div>
        ) : (
          <span className="text-8xl drop-shadow select-none transition-transform duration-300 group-hover:scale-105">
            {product.emoji || "🥛"}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        {/* Category */}
        <div className="text-sm mb-1.5 text-slate-500 dark:text-slate-400" style={{ fontFamily: "'DM Mono', monospace" }}>
          {product.category || "Sữa tươi"}
        </div>

        {/* Name and Cart Icon row */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bradford text-xl leading-snug line-clamp-2 transition-colors duration-200 flex-1 min-w-0 pr-1 text-[#003087] dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>
            {product.name}
          </h3>
          <button
            onClick={handleAdd}
            className="flex-shrink-0 mt-1 transition-colors text-[#003087] dark:text-white"
            style={{ color: added ? "#22c55e" : undefined }}
            title="Thêm vào giỏ"
          >
            <FiShoppingCart size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <FiStar key={s} size={13}
                className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-[#ccc]"} />
            ))}
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400" style={{ fontFamily: "DM Mono, monospace" }}>
            {rating} ({sold > 1000 ? `${Math.round(sold / 1000)}K` : sold} bán)
          </span>
        </div>

        {/* Pack toggle (Lẻ / Vỉ / Thùng) */}
        {(hasThuong || hasVi) && (
          <div className="flex gap-1.5 mb-3" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => handlePackToggle(e, "le")}
              className={`text-[11px] font-semibold px-2.5 py-1 border transition-all rounded-[3px] ${packType === "le" ? "bg-[#003087] text-white border-[#003087] dark:bg-white dark:text-[#003087] dark:border-white" : "bg-transparent text-[#003087] border-[#003087] dark:text-white dark:border-white"}`}
            >Lẻ</button>
            {hasVi && (
              <button
                onClick={(e) => handlePackToggle(e, "vi")}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 border transition-all rounded-[3px] ${packType === "vi" ? "bg-[#003087] text-white border-[#003087] dark:bg-white dark:text-[#003087] dark:border-white" : "bg-transparent text-[#003087] border-[#003087] dark:text-white dark:border-white"}`}
              ><FiPackage size={10} /> Vỉ {product.vi.size}</button>
            )}
            {hasThuong && (
              <button
                onClick={(e) => handlePackToggle(e, "thuong")}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 border transition-all rounded-[3px] ${packType === "thuong" ? "bg-[#003087] text-white border-[#003087] dark:bg-white dark:text-[#003087] dark:border-white" : "bg-transparent text-[#003087] border-[#003087] dark:text-white dark:border-white"}`}
              ><FiPackage size={10} /> Thùng {product.thuong.size}</button>
            )}
          </div>
        )}

        {/* Price row */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex flex-col">
            {currentOldPrice && (
              <span className="text-sm line-through mb-0.5 text-slate-400 dark:text-slate-500" style={{ fontFamily: "'DM Mono', monospace" }}>
                {formatPrice(currentOldPrice)}
              </span>
            )}
            <span className="text-lg font-semibold text-[#003087] dark:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
              {formatPrice(currentPrice)}
            </span>
          </div>
          {currentPackInfo && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 bg-[#e8f4fd] text-[#003087] dark:bg-[#1e3a8a] dark:text-[#bfdbfe] rounded-[3px]">
              {currentPackInfo.size} hộp
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductListCard;