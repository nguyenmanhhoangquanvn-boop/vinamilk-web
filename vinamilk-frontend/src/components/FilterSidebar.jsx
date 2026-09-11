import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";
import SearchBar from "./SearchBar";

const categories = [
  { id: 1, name: "Sữa tươi", count: 24, emoji: "🥛" },
  { id: 2, name: "Sữa chua", count: 18, emoji: "🧴" },
  { id: 3, name: "Sữa đặc", count: 8, emoji: "🥫" },
  { id: 4, name: "Sữa bột", count: 15, emoji: "🍼" },
  { id: 5, name: "Sữa trái cây", count: 3, emoji: "🍎" },
  { id: 6, name: "Sữa dinh dưỡng", count: 12, emoji: "💊" },
  { id: 7, name: "Sữa thực vật", count: 5, emoji: "🌾" },
  { id: 8, name: "Kem", count: 6, emoji: "🍦" },
];

const brands = [
  { id: 1, name: "Vinamilk", count: 42 },
  { id: 2, name: "Cô gái Hà Lan", count: 15 },
  { id: 3, name: "TH true Milk", count: 12 },
  { id: 4, name: "Lothamilk", count: 8 },
];

const flavors = [
  { id: "original", name: "Nguyên chất", emoji: "🥛" },
  { id: "strawberry", name: "Dâu tây", emoji: "🍓" },
  { id: "chocolate", name: "Socola", emoji: "🍫" },
  { id: "banana", name: "Chuối", emoji: "🍌" },
  { id: "blueberry", name: "Việt quất", emoji: "🫐" },
  { id: "vanilla", name: "Vani", emoji: "🌿" },
  { id: "coffee", name: "Cà phê", emoji: "☕" },
];

const volumes = [
  { id: "110ml", name: "110ml" },
  { id: "180ml", name: "180ml" },
  { id: "200ml", name: "200ml" },
  { id: "500ml", name: "500ml" },
  { id: "1L", name: "1 Lít" },
  { id: "900g", name: "900g" },
  { id: "1.5L", name: "1.5 Lít" },
];

const nutritionNeeds = [
  { id: "bone", name: "Chắc xương", emoji: "🦴" },
  { id: "brain", name: "Phát triển trí não", emoji: "🧠" },
  { id: "immune", name: "Tăng đề kháng", emoji: "🛡️" },
  { id: "diet", name: "Ăn kiêng / giảm cân", emoji: "⚖️" },
  { id: "muscle", name: "Tăng cơ bắp", emoji: "💪" },
  { id: "digestive", name: "Tiêu hóa tốt", emoji: "🌱" },
];

const sugarLevels = [
  { id: "no-sugar", name: "Không đường", emoji: "🚫🍬" },
  { id: "low-sugar", name: "Ít đường", emoji: "🍬" },
  { id: "normal", name: "Có đường (thường)", emoji: "🧁" },
  { id: "sweetened", name: "Có đường (đặc)", emoji: "🍯" },
];

const ageGroups = [
  { id: "child", name: "Trẻ nhỏ (0–6 tuổi)", emoji: "🍼" },
  { id: "teen", name: "Thiếu niên (7–17 tuổi)", emoji: "🧒" },
  { id: "adult", name: "Người lớn (18+ tuổi)", emoji: "🧑" },
  { id: "elder", name: "Người cao tuổi (60+)", emoji: "👴" },
];

const priceRanges = [
  { label: "Dưới 20.000đ", min: 0, max: 20000 },
  { label: "20.000đ – 50.000đ", min: 20000, max: 50000 },
  { label: "50.000đ – 200.000đ", min: 50000, max: 200000 },
  { label: "Trên 200.000đ", min: 200000, max: 0 },
];

const sortOptions = [
  { id: "relevant", label: "Liên quan nhất" },
  { id: "newest", label: "Mới nhất" },
  { id: "price-asc", label: "Giá: Thấp → Cao" },
  { id: "price-desc", label: "Giá: Cao → Thấp" },
  { id: "best-seller", label: "Bán chạy nhất" },
  { id: "rating", label: "Đánh giá cao nhất" },
];

const Section = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b py-4" style={{ borderColor: "rgba(0, 48, 135, 0.15)" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-[17px] font-bold transition-colors"
        style={{ color: "var(--vnm-navy)" }}>
        {title}
        <FiChevronDown size={20} className={`transition-transform ${open ? "rotate-180" : ""}`} style={{ color: "var(--vnm-navy)" }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden mt-4">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Checkbox = ({ label, count, checked, onChange, emoji }) => (
  <label className="flex items-center gap-3 cursor-pointer group py-1.5 select-none" onClick={onChange}>
    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all`}
      style={{
        background: checked ? "var(--vnm-navy)" : "#fff",
        borderColor: checked ? "var(--vnm-navy)" : "var(--vnm-border)",
      }}>
      {checked && <svg viewBox="0 0 12 12" className="w-3 h-3 text-white fill-current"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
    </div>
    {emoji && <span className="text-base">{emoji}</span>}
    <span className={`text-sm flex-1 transition-colors ${checked ? "font-semibold" : ""}`}
      style={{ color: checked ? "var(--vnm-navy)" : "var(--vnm-text-sec)" }}>
      {label}
    </span>
    {count && <span className="text-sm" style={{ color: "var(--vnm-text-sec)", fontFamily: "'DM Mono', monospace" }}>({count})</span>}
  </label>
);

const FilterSidebar = ({ filters, onFilterChange, onSearchChange, sortBy, onSortChange, isMobile, onMobileClose, productCount = 0 }) => {
  const updateList = (key, id, checked) => {
    const current = filters[key] || [];
    const updated = checked ? [...current, id] : current.filter((v) => v !== id);
    onFilterChange({ ...filters, [key]: updated });
  };

  const updateCategories = (id, checked) => updateList("categories", id, checked);
  const updateBrands     = (id, checked) => updateList("brands", id, checked);
  const updateRating     = (stars, checked) => updateList("rating", stars, checked);
  const updateFlavors    = (id, checked) => updateList("flavors", id, checked);
  const updateVolumes    = (id, checked) => updateList("volumes", id, checked);
  const updateNutrition  = (id, checked) => updateList("nutrition", id, checked);
  const updateSpecialTarget = (id, checked) => updateList("specialTarget", id, checked);

  const applyPriceRange = (range) => {
    onFilterChange({ ...filters, priceMin: range.min, priceMax: range.max });
  };

  const categoryName = filters.categories?.length === 1 
    ? categories.find(c => c.id === filters.categories[0])?.name 
    : "Sản phẩm";

  const content = (
    <div className="space-y-0">
      {!isMobile && (
        <div className="mb-10 mt-2">
          <h1 className="text-[64px] font-bold tracking-tight leading-none" style={{ color: "var(--vnm-navy)" }}>
            {categoryName}
            <sup className="text-[28px] ml-1.5 font-normal" style={{ color: "var(--vnm-navy-60)" }}>{productCount}</sup>
          </h1>
        </div>
      )}

      {isMobile && (
        <div className="flex items-center justify-between mb-5 pb-5 border-b" style={{ borderColor: "var(--vnm-border)" }}>
          <h3 className="font-bradford font-semibold text-xl" style={{ fontFamily: "'Playfair Display', serif", color: "var(--vnm-text)" }}>Bộ lọc</h3>
          <button onClick={onMobileClose} className="p-1.5 rounded transition-all hover:bg-slate-100" style={{ color: "var(--vnm-text-sec)" }}>
            <FiX size={20} />
          </button>
        </div>
      )}

      {/* Search */}
      <div className="pb-5 border-b" style={{ borderColor: "var(--vnm-border)" }}>
        <p className="text-lg font-bradford mb-3" style={{ color: "var(--vnm-text)", fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>Tìm kiếm</p>
        <SearchBar value={filters.search} onChange={(v) => onSearchChange(v)} placeholder="Tìm sản phẩm..." />
      </div>

      {/* Sắp xếp */}
      <Section title="Sắp xếp" defaultOpen={false}>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2.5 border rounded text-sm font-medium outline-none cursor-pointer mt-2"
          style={{ borderColor: "rgba(0, 48, 135, 0.15)", color: "var(--vnm-navy)", background: "transparent" }}>
          {sortOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </Section>

      {/* Danh mục */}
      <Section title="Danh mục" defaultOpen={false}>
        <div className="space-y-1 mt-2">
          {categories.map((cat) => (
            <Checkbox key={cat.id} label={cat.name} count={cat.count} emoji={cat.emoji}
              checked={filters.categories?.includes(cat.id)}
              onChange={() => updateCategories(cat.id, !filters.categories?.includes(cat.id))} />
          ))}
        </div>
      </Section>

      {/* Khoảng giá */}
      <Section title="Khoảng giá" defaultOpen={false}>
        <div className="space-y-2 mb-4 mt-2">
          {priceRanges.map((range) => {
            const active = filters.priceMin === range.min && filters.priceMax === range.max;
            return (
              <button key={range.label} onClick={() => applyPriceRange(range)}
                className="w-full text-left px-3 py-2.5 rounded text-sm font-medium transition-all border"
                style={{
                  background: active ? "var(--vnm-navy)" : "#fff",
                  color: active ? "#fff" : "var(--vnm-text-sec)",
                  borderColor: active ? "var(--vnm-navy)" : "rgba(0, 48, 135, 0.15)",
                }}>
                {range.label}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3 mt-3">
          <div className="flex-1">
            <label className="text-sm mb-1 block" style={{ color: "var(--vnm-text-sec)" }}>Từ (đ)</label>
            <input type="number" placeholder="0" value={filters.priceMin || ""}
              onChange={(e) => onFilterChange({ ...filters, priceMin: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border rounded text-sm outline-none font-mono"
              style={{ borderColor: "rgba(0, 48, 135, 0.15)", color: "var(--vnm-navy)", background: "transparent" }} />
          </div>
          <div className="flex-1">
            <label className="text-sm mb-1 block" style={{ color: "var(--vnm-text-sec)" }}>Đến (đ)</label>
            <input type="number" placeholder="∞" value={filters.priceMax || ""}
              onChange={(e) => onFilterChange({ ...filters, priceMax: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border rounded text-sm outline-none font-mono"
              style={{ borderColor: "rgba(0, 48, 135, 0.15)", color: "var(--vnm-navy)", background: "transparent" }} />
          </div>
        </div>
      </Section>

      {/* Đánh giá */}
      <Section title="Đánh giá" defaultOpen={false}>
        <div className="space-y-1 mt-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <Checkbox key={stars}
              label={<span className="flex items-center gap-0.5">{Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < stars ? "text-amber-400" : "text-slate-300"}>★</span>
              ))}<span style={{ color: "var(--vnm-text-sec)" }} className="ml-1">trở lên</span></span>}
              checked={filters.rating?.includes(stars)}
              onChange={() => updateRating(stars, !filters.rating?.includes(stars))} />
          ))}
        </div>
      </Section>

      {/* Thương hiệu */}
      <Section title="Thương hiệu" defaultOpen={false}>
        <div className="space-y-1 mt-2">
          {brands.map((brand) => (
            <Checkbox key={brand.id} label={brand.name} count={brand.count}
              checked={filters.brands?.includes(brand.id)}
              onChange={() => updateBrands(brand.id, !filters.brands?.includes(brand.id))} />
          ))}
        </div>
      </Section>

      {/* Hương vị */}
      <Section title="Hương vị" defaultOpen={false}>
        <div className="space-y-1">
          {flavors.map((f) => (
            <Checkbox key={f.id} label={f.name} emoji={f.emoji}
              checked={filters.flavors?.includes(f.id)}
              onChange={() => updateFlavors(f.id, !filters.flavors?.includes(f.id))} />
          ))}
        </div>
      </Section>



      {/* Nhu cầu dinh dưỡng */}
      <Section title="Nhu cầu dinh dưỡng" defaultOpen={false}>
        <div className="space-y-1">
          {nutritionNeeds.map((n) => (
            <Checkbox key={n.id} label={n.name} emoji={n.emoji}
              checked={filters.nutrition?.includes(n.id)}
              onChange={() => updateNutrition(n.id, !filters.nutrition?.includes(n.id))} />
          ))}
        </div>
      </Section>



      {/* Reset */}
      <div className="pt-4">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => onFilterChange({
            categories: [], brands: [], rating: [],
            flavors: [], nutrition: [], specialTarget: [],
            priceMin: 0, priceMax: 0, search: ""
          })}
          className="w-full py-3 rounded text-white text-base font-medium transition-all"
          style={{ background: "var(--vnm-navy)" }}>
          Xóa bộ lọc
        </motion.button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 flex" style={{ background: "rgba(0,48,135,0.4)" }}>
        <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-80 p-5 overflow-y-auto shadow-2xl" style={{ background: "var(--vnm-cream)" }}>
          {content}
        </motion.div>
        <div className="flex-1" onClick={onMobileClose} />
      </motion.div>
    );
  }

  return (
    <div className="rounded p-0 lg:pr-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto" style={{ background: "transparent" }}>
      {content}
    </div>
  );
};

export default FilterSidebar;