import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiClock, FiTrendingUp, FiTrash2 } from "react-icons/fi";
import useDebounce from "../hooks/useDebounce";

const STORAGE_KEY = "vnm_search_history";
const MAX_HISTORY = 8;

const trendingSuggestions = [
  { text: "Sữa tươi tiệt trùng", category: "Sữa tươi", trending: true },
  { text: "Sữa chua Vinamilk", category: "Sữa chua", trending: true },
  { text: "Sữa ít đường", category: "Sữa tươi", trending: false },
  { text: "Sữa trẻ em", category: "Trẻ em", trending: true },
  { text: "Sữa trái cây Hero", category: "Sữa trái cây", trending: false },
  { text: "Sữa đặc Ngôi Sao", category: "Sữa đặc", trending: false },
  { text: "Sữa dinh dưỡng ADM", category: "Sữa dinh dưỡng", trending: false },
  { text: "Sữa chua uống", category: "Sữa chua", trending: true },
];

// ─── localStorage helpers ──────────────────────────────────────────────────────
const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {}
};

const addToHistory = (text) => {
  if (!text?.trim()) return;
  const history = getHistory().filter((h) => h !== text);
  const updated = [text, ...history].slice(0, MAX_HISTORY);
  saveHistory(updated);
  return updated;
};

const removeFromHistory = (text) => {
  const updated = getHistory().filter((h) => h !== text);
  saveHistory(updated);
  return updated;
};

const clearHistory = () => {
  saveHistory([]);
  return [];
};

// ─── SearchBar Component ───────────────────────────────────────────────────────
const SearchBar = ({ value, onChange, placeholder = "Tìm kiếm sản phẩm..." }) => {
  const [focused, setFocused] = useState(false);
  const [inputVal, setInputVal] = useState(value || "");
  const [history, setHistory] = useState(getHistory);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const debounced = useDebounce(inputVal, 400);

  useEffect(() => { onChange?.(debounced); }, [debounced]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = inputVal
    ? trendingSuggestions.filter((s) => s.text.toLowerCase().includes(inputVal.toLowerCase()))
    : trendingSuggestions.filter((s) => s.trending);

  const handleSelect = (text) => {
    setInputVal(text);
    onChange?.(text);
    setFocused(false);
    inputRef.current?.blur();
    // Lưu vào lịch sử
    const updated = addToHistory(text);
    setHistory(updated);
  };

  const handleClear = () => {
    setInputVal("");
    onChange?.("");
    inputRef.current?.focus();
  };

  const handleRemoveHistory = (e, text) => {
    e.stopPropagation();
    const updated = removeFromHistory(text);
    setHistory(updated);
  };

  const handleClearHistory = (e) => {
    e.stopPropagation();
    const updated = clearHistory();
    setHistory(updated);
  };

  const handleBlurSearch = (e) => {
    // Lưu khi người dùng blur nếu có giá trị
    if (inputVal.trim()) {
      const updated = addToHistory(inputVal.trim());
      setHistory(updated);
    }
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="flex items-center gap-3 rounded px-4 py-2.5 transition-all duration-200 border"
           style={{
             background: "#fff",
             borderColor: focused ? "var(--vnm-navy)" : "var(--vnm-border)",
             boxShadow: focused ? "0 4px 12px rgba(0,48,135,0.08)" : "none"
           }}>
        <FiSearch size={18} className="flex-shrink-0 transition-colors"
                  style={{ color: focused ? "var(--vnm-navy)" : "var(--vnm-text-sec)" }} />
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={handleBlurSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputVal.trim()) {
              handleSelect(inputVal.trim());
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm font-medium"
          style={{ color: "var(--vnm-text)" }}
        />
        <AnimatePresence>
          {inputVal && (
            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              onClick={handleClear}
              className="w-5 h-5 rounded-full flex items-center justify-center transition-all"
              style={{ background: "var(--vnm-border)", color: "var(--vnm-text-sec)" }}>
              <FiX size={12} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {focused && (
            <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 rounded border shadow-2xl z-50 overflow-hidden"
            style={{ background: "#fff", borderColor: "var(--vnm-border)" }}
          >
            {/* Lịch sử tìm kiếm thật */}
            {!inputVal && history.length > 0 && (
              <div className="px-4 pt-3 pb-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--vnm-text-sec)" }}>
                    Tìm kiếm gần đây
                  </p>
                  <button
                    onClick={handleClearHistory}
                    className="flex items-center gap-1 text-xs font-medium transition-colors"
                    style={{ color: "var(--vnm-red)" }}
                  >
                    <FiTrash2 size={10} /> Xóa tất cả
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {history.map((r) => (
                    <div key={r} className="flex items-center gap-1 rounded px-2.5 py-1 border"
                         style={{ borderColor: "var(--vnm-border)", background: "var(--vnm-cream)" }}>
                      <button
                        onClick={() => handleSelect(r)}
                        className="flex items-center gap-1.5 text-xs font-medium transition-all hover:underline"
                        style={{ color: "var(--vnm-text-sec)" }}
                      >
                        <FiClock size={11} /> {r}
                      </button>
                      <button
                        onClick={(e) => handleRemoveHistory(e, r)}
                        className="w-4 h-4 flex items-center justify-center rounded transition-all"
                        style={{ color: "var(--vnm-text-sec)" }}
                      >
                        <FiX size={9} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="h-px w-full my-2" style={{ background: "var(--vnm-border)" }} />
              </div>
            )}

            {/* Gợi ý tìm kiếm */}
            <div className="px-2 py-2">
              {!inputVal && (
                <p className="text-xs font-bold uppercase tracking-wider px-3 mb-2" style={{ color: "var(--vnm-text-sec)" }}>
                  Gợi ý phổ biến
                </p>
              )}
              {filtered.length === 0 ? (
                <div className="text-center py-4 text-sm" style={{ color: "var(--vnm-text-sec)" }}>
                  Không tìm thấy gợi ý
                </div>
              ) : (
                filtered.map((s, i) => (
                  <motion.button
                    key={s.text}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleSelect(s.text)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded transition-all text-left group hover:bg-[var(--vnm-cream)]"
                  >
                    <div className="w-7 h-7 rounded bg-[var(--vnm-cream)] flex items-center justify-center flex-shrink-0 transition-all border border-[var(--vnm-border)]">
                      {s.trending
                        ? <FiTrendingUp size={13} style={{ color: "var(--vnm-red)" }} />
                        : <FiSearch size={13} style={{ color: "var(--vnm-text-sec)" }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold transition-colors truncate" style={{ color: "var(--vnm-text)" }}>
                        {s.text}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--vnm-text-sec)" }}>{s.category}</p>
                    </div>
                    {s.trending && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "rgba(208,2,27,0.1)", color: "var(--vnm-red)" }}>
                        Hot
                      </span>
                    )}
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;