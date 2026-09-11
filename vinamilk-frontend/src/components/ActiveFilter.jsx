import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const ActiveFilter = ({ filters, onRemove, onClearAll }) => {
  const activeList = [];

  if (filters.search) activeList.push({ key: "search", label: `🔍 "${filters.search}"` });

  (filters.categories || []).forEach((id) => {
    const names = { 1: "Sữa tươi", 2: "Sữa chua", 3: "Sữa đặc", 4: "Trẻ em", 5: "Sữa trái cây", 6: "Sữa dinh dưỡng", 7: "Sữa thực vật", 8: "Kem" };
    activeList.push({ key: `cat-${id}`, label: names[id] || id, type: "category", id });
  });

  if (filters.priceMin > 0 || filters.priceMax > 0) {
    const fmt = (v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v;
    const label = filters.priceMin && filters.priceMax
      ? `${fmt(filters.priceMin)} – ${fmt(filters.priceMax)}đ`
      : filters.priceMin
      ? `Từ ${fmt(filters.priceMin)}đ`
      : `Đến ${fmt(filters.priceMax)}đ`;
    activeList.push({ key: "price", label });
  }

  (filters.rating || []).forEach((r) => {
    activeList.push({ key: `rating-${r}`, label: `${"★".repeat(r)} ${r} sao`, type: "rating", id: r });
  });

  (filters.brands || []).forEach((id) => {
    const names = { 1: "Vinamilk", 2: "Cô gái Hà Lan", 3: "TH true Milk", 4: "Không lạc" };
    activeList.push({ key: `brand-${id}`, label: names[id] || id, type: "brand", id });
  });

  const hasActive = activeList.length > 0;

  return (
    <motion.div
      initial={false}
      animate={{
        height: hasActive ? "auto" : 0,
        opacity: hasActive ? 1 : 0,
        marginBottom: hasActive ? 20 : 0,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="flex items-center gap-2 flex-wrap py-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Đang lọc:</span>

        <AnimatePresence>
          {activeList.map((item) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700
                         text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              <span>{item.label}</span>
              <button
                onClick={() => onRemove(item.key, item)}
                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors ml-0.5"
              >
                <FiX size={11} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {activeList.length > 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClearAll}
            className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100
                       border border-red-200 px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
          >
            <FiX size={11} /> Xóa tất cả
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ActiveFilter;