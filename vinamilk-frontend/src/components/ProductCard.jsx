import { useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiStar, FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// ─── Mock data ────────────────────────────────────────────────────────────────
export const mockProducts = [
  { _id: "1", name: "Sữa tươi tiệt trùng có đường 1L", price: 29000, oldPrice: 36000, rating: 4.8, sold: 2451, discount: 19, image: "/images/p1_2.png", emoji: "🥛", category: "Sữa tươi", badge: "Dòng cao cấp", vi: { size: 16, price: 464000, oldPrice: 576000 }, thuong: { size: 48, price: 1392000, oldPrice: 1728000 } },
  { _id: "2", name: "Sữa chua uống Probi 65ml", price: 12000, oldPrice: 15000, rating: 4.9, sold: 3410, discount: 20, image: "https://d8um25gjecm9v.cloudfront.net/cms/PROBI_ID_65_1_f23981958c_fc5aa4f505.png", emoji: "🧴", category: "Sữa chua", badge: "Bán chạy", vi: { size: 16, price: 192000, oldPrice: 240000 }, thuong: { size: 48, price: 576000, oldPrice: 720000 } },
  { _id: "3", name: "Sữa đặc Có Đường Ông Thọ Nhãn Vàng 380g", price: 22000, oldPrice: 26000, rating: 4.8, sold: 2310, discount: 15, image: "https://d8um25gjecm9v.cloudfront.net/cms/SD_Ong_Tho_Vang_380_1_c137c7416e_a53a3fb278.png", emoji: "🥫", category: "Sữa đặc", badge: "Yêu thích số 1", vi: { size: 16, price: 352000, oldPrice: 416000 }, thuong: { size: 24, price: 528000, oldPrice: 624000 } },
  { _id: "4", name: "Sữa bột Dielac Alpha Gold S4 900g", price: 375000, oldPrice: 420000, rating: 4.9, sold: 4120, discount: 11, image: "https://d8um25gjecm9v.cloudfront.net/cms/SBTE_DIELAC_ALPHA_S4_900_G_01_c1baccd13e.png", emoji: "🍼", category: "Sữa bột", badge: "Được yêu thích", vi: { size: 6, price: 2250000, oldPrice: 2520000 }, thuong: { size: 12, price: 4500000, oldPrice: 5040000 } },
  { _id: "5", name: "Sữa Tươi Tiệt Trùng Green Farm Không Đường 1L", price: 45000, oldPrice: 52000, rating: 4.8, sold: 1543, discount: 13, image: "https://d8um25gjecm9v.cloudfront.net/cms/SP_2_Side_fd31695433_acdfead97a_06beb07177.webp", emoji: "🥛", category: "Sữa tươi", badge: "Purity Award", vi: { size: 16, price: 680000, oldPrice: 780000 }, thuong: { size: 12, price: 486000, oldPrice: 564000 } },
  { _id: "6", name: "Kem Hộp Dừa Non Vinamilk Mát Lạnh", price: 15000, oldPrice: 18000, rating: 4.9, sold: 2892, discount: 16, image: "https://d8um25gjecm9v.cloudfront.net/cms/new_kem_1_7e7e140849.webp", emoji: "🥥", category: "Kem lạnh", badge: "Đặc sản mùa hè", vi: { size: 16, price: 224000, oldPrice: 260000 }, thuong: { size: 24, price: 324000, oldPrice: 384000 } },
  { _id: "7", name: "Sữa trái cây Hero Hương Dâu", price: 20000, oldPrice: 24000, rating: 4.8, sold: 1200, discount: 10, image: "https://d8um25gjecm9v.cloudfront.net/cms/STC_HERO_DAU_110_1_cf180aafa0_06456d3f58.png", emoji: "🍓", category: "Sữa trái cây", badge: "Cao lớn khỏe mạnh", vi: { size: 16, price: 320000, oldPrice: 384000 }, thuong: { size: 48, price: 900000, oldPrice: 1100000 } },
  { _id: "8", name: "Sữa Bột Optimum Gold 2 (6-12 tháng)", price: 385000, oldPrice: 450000, rating: 4.9, sold: 1205, discount: 14, image: "https://d8um25gjecm9v.cloudfront.net/cms/SBTE_Optimum_Gold_S2_400_01_cbad762a85.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/SBTE_Optimum_Gold_S2_400_01_cbad762a85.png", "https://d8um25gjecm9v.cloudfront.net/cms/SBTE_Optimum_Gold_S2_400_02_cb83a5a962.png"], emoji: "🍼", category: "Sữa bột", badge: "Dinh dưỡng cao cấp" },
  { _id:"17", name:"Sữa tươi Green Farm Có đường 180ml", price: 32000, oldPrice: 38000, rating: 4.9, sold: 1245, discount: 15, emoji:"🥛", category:"Sữa tươi", badge:"Đột phá", image: "https://d8um25gjecm9v.cloudfront.net/cms/GF_CD_180ml_01_e23b453767.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/GF_CD_180ml_01_e23b453767.png", "https://d8um25gjecm9v.cloudfront.net/cms/GF_CD_180ml_04_ff6ff9a097.png", "https://d8um25gjecm9v.cloudfront.net/cms/GF_CD_180ml_02_022c6bb5fc.png"], vi: { size: 4, price: 32000, oldPrice: 38000 }, thuong: { size: 48, price: 384000, oldPrice: 456000 } },
  { _id:"18", name:"Sữa hạt Vinamilk 9 loại hạt ít đường", price: 35000, oldPrice: 40000, rating: 4.8, sold: 980, discount: 12, emoji:"🌾", category:"Sữa thực vật", badge:"Hương vị mới", image: "https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_11_251468903a.webp", images: ["https://d8um25gjecm9v.cloudfront.net/cms/07_31_May_11_251468903a.webp", "https://d8um25gjecm9v.cloudfront.net/cms/STV_9_loai_hat_ID_1_Lvuong_01_61c68ca928_f405e33f93.png", "https://d8um25gjecm9v.cloudfront.net/cms/STV_9_loai_hat_ID_1_Lvuong_02_1_9deef626a2.png"], thuong: { size: 24, price: 840000, oldPrice: 960000 } },
  { _id:"20", name:"Kem hộp Vinamilk Dừa", price: 85000, oldPrice: 98000, rating: 4.9, sold: 1420, discount: 13, image: "https://d8um25gjecm9v.cloudfront.net/cms/Thumbnails_1_28_Feb_23_c5e7bddaec.png", images: ["https://d8um25gjecm9v.cloudfront.net/cms/Thumbnails_1_28_Feb_23_c5e7bddaec.png", "https://d8um25gjecm9v.cloudfront.net/cms/KEM_Kem_hop_VNM_Dua_870_01_7f3a3907ef_12766052fe.png", "https://d8um25gjecm9v.cloudfront.net/cms/KEM_Kem_hop_VNM_Dua_870_02_af69192391_a6d683d7c0.png"], emoji:"🥥", category:"Kem", badge:"Mới", thuong: { size: 4, price: 320000, oldPrice: 392000 } }
];

const formatPrice = (p) =>
  new Intl.NumberFormat("vi-VN").format(p) + "₫";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export const ProductSkeleton = () => (
  <div className="py-6 px-4 animate-pulse bg-transparent">
    <div className="h-4 w-24 bg-[#e2ddd3] rounded mb-3" />
    <div className="h-44 bg-[#ede9df] rounded mb-4" />
    <div className="h-4 w-16 bg-[#e2ddd3] rounded mb-2" />
    <div className="h-5 bg-[#e2ddd3] rounded w-4/5 mb-1" />
    <div className="h-5 bg-[#e2ddd3] rounded w-3/5 mb-3" />
    <div className="h-3 bg-[#e2ddd3] rounded w-full mb-1" />
    <div className="h-3 bg-[#e2ddd3] rounded w-4/5 mb-4" />
    <div className="h-4 w-28 bg-[#e2ddd3] rounded" />
  </div>
);

// ─── ProductCard ──────────────────────────────────────────────────────────────
const ProductCard = ({ product, index = 0 }) => {
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

  const handlePackToggle = (e, type) => {
    e.stopPropagation();
    setPackType(type);
  };

  return (
    <motion.div
      onClick={() => navigate(`/products/${product._id}`)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="relative flex flex-col py-6 px-4 cursor-pointer group bg-transparent"
    >
      {/* Badge (Purity Award, Bán chạy...) */}
      {product.badge && (
        <div className="mb-3 h-6 flex items-center">
          <span className="text-[11px] font-medium px-2 py-0.5 tracking-wide bg-[#dde8f5] text-[#003087] dark:bg-[#1e3a8a] dark:text-[#bfdbfe]">
            {product.badge}
          </span>
        </div>
      )}
      {!product.badge && <div className="mb-3 h-6" />}

      {/* Image area */}
      <div className="relative flex items-center justify-center mb-4"
           style={{ height: "180px" }}>
        {/* Discount badge */}
        {product.discount > 0 && (
          <div className="absolute top-0 left-0 z-10 text-[11px] font-semibold px-1.5 py-0.5"
               style={{ background: "var(--vnm-red)", color: "#fff" }}>
            -{product.discount}%
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-0 right-0 z-10 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: liked ? "#D0021B" : "#999" }}
        >
          <FiHeart size={15} className={liked ? "fill-current" : ""} />
        </button>

        {/* Product image */}
        {product.image ? (
          <div className="relative h-full w-full flex items-center justify-center dark:bg-white/95 dark:rounded-xl dark:p-2 dark:shadow-sm">
            <img src={product.image} alt={product.name} className={`absolute w-full h-full object-contain mix-blend-darken dark:mix-blend-normal transition-all duration-500 group-hover:scale-105 ${product.images?.length > 1 ? 'group-hover:opacity-0' : ''}`} />
            {product.images?.length > 1 && (
              <img src={product.images[1]} alt={product.name} className="absolute w-full h-full object-contain mix-blend-darken dark:mix-blend-normal opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105" />
            )}
          </div>
        ) : (
          <motion.span className="text-8xl drop-shadow select-none transition-transform duration-300 group-hover:scale-105">
            {product.emoji || "🥛"}
          </motion.span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        {/* Category */}
        <div className="text-sm mb-1.5 text-slate-500 dark:text-slate-400" style={{ fontFamily: "'DM Mono', monospace" }}>
          {product.category}
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
          <div className="flex">
            {[1,2,3,4,5].map((s) => (
              <FiStar key={s} size={13}
                className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-[#ccc]"} />
            ))}
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400" style={{ fontFamily: "DM Mono, monospace" }}>
            {product.rating}
          </span>
        </div>

        {/* Pack type toggle (Lẻ / Vỉ / Thùng) */}
        {(hasThuong || hasVi) && (
          <div className="flex gap-1.5 mb-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => handlePackToggle(e, "le")}
              className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 border transition-all rounded-[3px] ${packType === "le" ? "bg-[#003087] text-white border-[#003087] dark:bg-white dark:text-[#003087] dark:border-white" : "bg-transparent text-[#003087] border-[#003087] dark:text-white dark:border-white"}`}
            >Lẻ</button>
            {hasVi && (
              <button
                onClick={(e) => handlePackToggle(e, "vi")}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 border transition-all rounded-[3px] ${packType === "vi" ? "bg-[#003087] text-white border-[#003087] dark:bg-white dark:text-[#003087] dark:border-white" : "bg-transparent text-[#003087] border-[#003087] dark:text-white dark:border-white"}`}
              ><FiPackage size={9} /> Vỉ {product.vi.size}</button>
            )}
            {hasThuong && (
              <button
                onClick={(e) => handlePackToggle(e, "thuong")}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 border transition-all rounded-[3px] ${packType === "thuong" ? "bg-[#003087] text-white border-[#003087] dark:bg-white dark:text-[#003087] dark:border-white" : "bg-transparent text-[#003087] border-[#003087] dark:text-white dark:border-white"}`}
              ><FiPackage size={9} /> Thùng {product.thuong.size}</button>
            )}
          </div>
        )}

        {/* Price row */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex flex-col">
            {currentOldPrice && (
              <span className="text-xs line-through mb-0.5 text-slate-400 dark:text-slate-500" style={{ fontFamily: "'DM Mono', monospace" }}>
                {formatPrice(currentOldPrice)}
              </span>
            )}
            <span className="text-lg font-semibold text-[#003087] dark:text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
              {formatPrice(currentPrice)}
            </span>
          </div>
          {currentPackInfo && (
            <span className="text-[10px] font-medium px-1.5 py-0.5" style={{ background: "#e8f4fd", color: "var(--vnm-navy)", borderRadius: "3px" }}>
              {currentPackInfo.size} hộp
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;