import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
const fallbackCategories = [
  { id: 1, name: "Sữa tươi", emoji: "🥛", count: "24 sản phẩm" },
  { id: 2, name: "Sữa chua", emoji: "🧴", count: "18 sản phẩm" },
  { id: 3, name: "Sữa đặc", emoji: "🥫", count: "8 sản phẩm" },
  { id: 4, name: "Sữa trẻ em", emoji: "🍼", count: "15 sản phẩm" },
  { id: 5, name: "Sữa trái cây", emoji: "🍎", count: "3 sản phẩm" },
  { id: 6, name: "Sữa dinh dưỡng", emoji: "💊", count: "12 sản phẩm" },
];

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="cursor-pointer group"
      onClick={() => {
        const emptyFilters = { categories: [], brands: [], rating: [], priceMin: 0, priceMax: 0, search: "", flavors: [] };
        const newFilters = { ...emptyFilters, categories: [category.id] };
        sessionStorage.setItem("vnm_shop_filters", JSON.stringify(newFilters));
        sessionStorage.setItem("vnm_shop_should_restore", "true");
        sessionStorage.setItem("vnm_shop_page", "1");
        sessionStorage.setItem("vnm_shop_sort", "relevant");
        navigate("/products");
      }}
    >
      <div
        className="flex flex-col items-center gap-3 py-6 px-3 transition-all duration-200 border"
        style={{
          background: "#fff",
          borderColor: "var(--vnm-border)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--vnm-navy)";
          e.currentTarget.style.background = "var(--vnm-cream)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--vnm-border)";
          e.currentTarget.style.background = "#fff";
        }}
      >
        {/* Icon — clean, no gradient */}
        <div
          className="w-14 h-14 flex items-center justify-center text-4xl transition-transform duration-300 group-hover:scale-110"
          style={{ background: "var(--vnm-cream)" }}
        >
          {category.emoji}
        </div>

        <div className="text-center">
          <p
            className="font-medium text-base leading-tight"
            style={{ color: "var(--vnm-text)" }}
          >
            {category.name}
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--vnm-text-sec)", fontFamily: "'DM Mono', monospace" }}
          >
            {category.count}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ categories: apiCategories }) => {
  const data = apiCategories?.length ? apiCategories : fallbackCategories;
  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2
            className="font-bradford text-3xl md:text-4xl font-semibold"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--vnm-text)" }}
          >
            Danh mục sản phẩm
          </h2>
          <p className="text-base mt-1.5" style={{ color: "var(--vnm-text-sec)" }}>
            Khám phá đa dạng sản phẩm Vinamilk
          </p>
        </div>
        <Link
          to="/products"
          onClick={() => {
            sessionStorage.removeItem("vnm_shop_should_restore");
            sessionStorage.removeItem("vnm_shop_filters");
            sessionStorage.removeItem("vnm_shop_page");
            sessionStorage.removeItem("vnm_shop_sort");
          }}
          className="text-base font-medium flex items-center gap-1 transition-colors hover:opacity-80"
          style={{ color: "var(--vnm-navy)" }}
        >
          Xem tất cả →
        </Link>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6" style={{ border: "1px solid var(--vnm-border)", borderRight: "none" }}>
        {data.map((cat, i) => (
          <div key={cat.id || i} style={{ borderRight: "1px solid var(--vnm-border)" }}>
            <CategoryCard category={cat} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { CategoryCard, CategorySection };
export default CategorySection;