import { motion } from "framer-motion";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { useState } from "react";

const related = [
  { _id: "r1", name: "Sữa tươi không đường 180ml", price: 8500, oldPrice: 10000, rating: 4.4, sold: 756, discount: 15, emoji: "🧊", category: "Sữa tươi" },
  { _id: "r2", name: "Sữa chua uống Vinamilk 170ml", price: 12000, oldPrice: 15000, rating: 4.7, sold: 1892, discount: 20, emoji: "🧴", category: "Sữa chua" },
  { _id: "r3", name: "Sữa đặc Ngôi Sao 380g", price: 22000, oldPrice: 26000, rating: 4.6, sold: 1205, discount: 10, emoji: "🥫", category: "Sữa đặc" },
  { _id: "r4", name: "Sữa dinh dưỡng ADM Ít Đường", price: 20000, oldPrice: 24000, rating: 4.8, sold: 1100, discount: 10, emoji: "🥛", category: "Sữa dinh dưỡng" },
];

const fmt = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

const RelatedCard = ({ product, index }) => {
  const [added, setAdded] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-white overflow-hidden border transition-all group cursor-pointer"
      style={{ borderRadius: "12px", borderColor: "var(--vnm-border)", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
      <div className="h-44 flex items-center justify-center relative bg-[var(--vnm-cream-2)]">
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded" style={{ background: "var(--vnm-red)" }}>
            -{product.discount}%
          </span>
        )}
        <motion.span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {product.emoji}
        </motion.span>
      </div>
      <div className="p-4 border-t" style={{ borderColor: "var(--vnm-border)" }}>
        <span className="text-xs font-semibold" style={{ color: "var(--vnm-navy)" }}>{product.category}</span>
        <h4 className="text-sm font-bold mt-1 mb-1.5 line-clamp-2 transition-colors leading-snug" style={{ color: "var(--vnm-text)" }}>
          {product.name}
        </h4>
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map((s) => (
            <FiStar key={s} size={10} className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
          ))}
          <span className="text-xs ml-0.5" style={{ color: "var(--vnm-text-sec)" }}>({product.sold})</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-black" style={{ color: "var(--vnm-navy)" }}>{fmt(product.price)}</span>
          {product.oldPrice && <span className="text-xs line-through" style={{ color: "var(--vnm-text-sec)" }}>{fmt(product.oldPrice)}</span>}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={(e) => { e.stopPropagation(); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
          className="w-full py-2.5 rounded text-sm font-bold flex items-center justify-center gap-1.5 transition-all border"
          style={{
            background: added ? "var(--vnm-cream-2)" : "var(--vnm-navy)",
            color: added ? "var(--vnm-navy)" : "#fff",
            borderColor: added ? "var(--vnm-navy)" : "var(--vnm-navy)"
          }}>
          <FiShoppingCart size={14} />
          {added ? "Đã thêm!" : "Thêm giỏ"}
        </motion.button>
      </div>
    </motion.div>
  );
};

const RelatedProducts = ({ products = [] }) => {
  const data = products.length ? products : related;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bradford font-bold" style={{ color: "var(--vnm-text)" }}>Sản phẩm liên quan</h2>
        <button className="text-base font-semibold hover:underline" style={{ color: "var(--vnm-navy)" }}>Xem tất cả →</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.slice(0, 4).map((p, i) => <RelatedCard key={p._id} product={p} index={i} />)}
      </div>
    </div>
  );
};

export default RelatedProducts;