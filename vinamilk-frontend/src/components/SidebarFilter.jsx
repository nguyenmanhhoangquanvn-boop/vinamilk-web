import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";

const SidebarFilter = ({ filters, onFilterChange, onMobileClose, isMobile }) => {
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    rating: true,
    brand: true,
  });

  const toggleSection = (section) => {
    setExpanded((p) => ({ ...p, [section]: !p[section] }));
  };

  const categories = [
    { id: 1, name: "Sữa tươi", count: 24 },
    { id: 2, name: "Sữa chua", count: 18 },
    { id: 3, name: "Sữa đặc", count: 8 },
    { id: 4, name: "Sữa trẻ em", count: 15 },
    { id: 5, name: "Sữa trái cây", count: 3 },
    { id: 6, name: "Dinh dưỡng", count: 12 },
  ];

  const brands = [
    { id: 1, name: "Vinamilk", count: 42 },
    { id: 2, name: "Cô gái Hà Lan", count: 15 },
    { id: 3, name: "TH true Milk", count: 12 },
    { id: 4, name: "Không lạc", count: 8 },
  ];

  const ratings = [
    { stars: 5, count: 234 },
    { stars: 4, count: 156 },
    { stars: 3, count: 89 },
    { stars: 2, count: 34 },
    { stars: 1, count: 12 },
  ];

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
      >
        {title}
        <FiChevronDown
          size={16}
          className={`transition-transform ${expanded[section] ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {expanded[section] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 space-y-2.5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const FilterCheckbox = ({ id, label, count, checked, onChange }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
      />
      <span className="text-xs text-slate-700 group-hover:text-blue-600 transition-colors flex-1">
        {label}
      </span>
      {count && <span className="text-xs text-slate-400">({count})</span>}
    </label>
  );

  const sidebarContent = (
    <div className="space-y-1">
      {/* Header mobile */}
      {isMobile && (
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800">Bộ lọc</h3>
          <button
            onClick={onMobileClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-all"
          >
            <FiX size={18} />
          </button>
        </div>
      )}

      {/* Danh mục */}
      <FilterSection title="Danh mục" section="category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <FilterCheckbox
              key={cat.id}
              id={cat.id}
              label={cat.name}
              count={cat.count}
              checked={filters.categories?.includes(cat.id)}
              onChange={(e) => {
                const newCats = e.target.checked
                  ? [...(filters.categories || []), cat.id]
                  : (filters.categories || []).filter((c) => c !== cat.id);
                onFilterChange({ ...filters, categories: newCats });
              }}
            />
          ))}
        </div>
      </FilterSection>

      {/* Khoảng giá */}
      <FilterSection title="Khoảng giá" section="price">
        <div className="space-y-2.5">
          <div>
            <label className="text-xs text-slate-600 mb-1.5 block">Từ (đ)</label>
            <input
              type="number"
              placeholder="0"
              value={filters.priceMin || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, priceMin: parseInt(e.target.value) || 0 })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 mb-1.5 block">Đến (đ)</label>
            <input
              type="number"
              placeholder="∞"
              value={filters.priceMax || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, priceMax: parseInt(e.target.value) || 0 })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Đánh giá" section="rating">
        <div className="space-y-2">
          {ratings.map(({ stars, count }) => (
            <FilterCheckbox
              key={stars}
              id={stars}
              label={
                <span className="flex items-center gap-1">
                  {"★".repeat(stars)}
                  <span className="text-yellow-400">★</span>
                </span>
              }
              count={count}
              checked={filters.rating?.includes(stars)}
              onChange={(e) => {
                const newRatings = e.target.checked
                  ? [...(filters.rating || []), stars]
                  : (filters.rating || []).filter((r) => r !== stars);
                onFilterChange({ ...filters, rating: newRatings });
              }}
            />
          ))}
        </div>
      </FilterSection>

      {/* Thương hiệu */}
      <FilterSection title="Thương hiệu" section="brand">
        <div className="space-y-2">
          {brands.map((brand) => (
            <FilterCheckbox
              key={brand.id}
              id={brand.id}
              label={brand.name}
              count={brand.count}
              checked={filters.brands?.includes(brand.id)}
              onChange={(e) => {
                const newBrands = e.target.checked
                  ? [...(filters.brands || []), brand.id]
                  : (filters.brands || []).filter((b) => b !== brand.id);
                onFilterChange({ ...filters, brands: newBrands });
              }}
            />
          ))}
        </div>
      </FilterSection>

      {/* Reset button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() =>
          onFilterChange({
            categories: [],
            brands: [],
            rating: [],
            priceMin: 0,
            priceMax: 0,
            search: "",
          })
        }
        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-bold mt-4 hover:shadow-md transition-all"
      >
        Xóa bộ lọc
      </motion.button>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/40 flex"
        >
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-72 bg-white p-6 overflow-y-auto"
          >
            {sidebarContent}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 h-fit sticky top-20">
      {sidebarContent}
    </div>
  );
};

export default SidebarFilter;