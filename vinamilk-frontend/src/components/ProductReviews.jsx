import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiFilter, FiChevronDown } from "react-icons/fi";
import toast from "react-hot-toast";

import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";
import { getReviews } from "../services/reviewService";

// ─── Mock reviews ─────────────────────────────────────────────────────────────
const mockReviews = [
  { _id:"rv1", name:"Nguyễn Thị Lan", avatar:"👩", rating:5, date:"12/04/2025", verified:true, likes:24,
    comment:"Sữa rất ngon, thơm béo tự nhiên. Gia đình mình dùng hàng tuần, con nhỏ rất thích. Đóng gói cẩn thận, giao hàng nhanh!", images:["🥛","📦"] },
  { _id:"rv2", name:"Trần Văn Minh", avatar:"👨", rating:5, date:"08/04/2025", verified:true, likes:18,
    comment:"Chất lượng tuyệt vời, đúng hàng chính hãng Vinamilk. Giá hợp lý, sẽ mua lại lần sau." },
  { _id:"rv3", name:"Lê Thị Hoa", avatar:"👩‍🦱", rating:4, date:"02/04/2025", verified:false, likes:9,
    comment:"Sữa ngon, hạn dài. Chỉ hơi tiếc là hộp bị móp nhẹ khi nhận hàng nhưng sữa vẫn tốt." },
  { _id:"rv4", name:"Phạm Quốc Hùng", avatar:"👨‍💼", rating:5, date:"28/03/2025", verified:true, likes:31,
    comment:"Mua về cho cả nhà uống, ai cũng khen ngon. Sẽ tiếp tục ủng hộ Vinamilk!", images:["👍"] },
  { _id:"rv5", name:"Võ Thị Mai", avatar:"👧", rating:4, date:"20/03/2025", verified:true, likes:12,
    comment:"Sữa tươi ngon, không quá ngọt. Thích hợp cho người ăn kiêng. Giao hàng đúng hẹn." },
  { _id:"rv6", name:"Đặng Minh Tuấn", avatar:"🧑", rating:3, date:"15/03/2025", verified:true, likes:5,
    comment:"Sữa bình thường, không có gì đặc biệt. Mùi vị ổn nhưng giá hơi cao so với chất lượng." },
];

const sortOptions = [
  { id: "newest", label: "Mới nhất" },
  { id: "highest", label: "Đánh giá cao" },
  { id: "lowest", label: "Đánh giá thấp" },
  { id: "images", label: "Có hình ảnh" },
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const ReviewSkeleton = () => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 animate-pulse space-y-3">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-slate-200 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-32" />
        <div className="h-3 bg-slate-200 rounded w-24" />
      </div>
    </div>
    <div className="h-4 bg-slate-200 rounded w-full" />
    <div className="h-4 bg-slate-200 rounded w-4/5" />
    <div className="h-4 bg-slate-200 rounded w-3/5" />
  </div>
);

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyReviews = () => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
    className="text-center py-14">
    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
      className="text-5xl mb-4">💬</motion.div>
    <h3 className="text-lg font-black text-slate-800 mb-2">Chưa có đánh giá nào</h3>
    <p className="text-slate-400 text-sm max-w-xs mx-auto">
      Hãy là người đầu tiên chia sẻ trải nghiệm về sản phẩm này!
    </p>
  </motion.div>
);

// ─── Filter bar ───────────────────────────────────────────────────────────────
const FilterBar = ({ sortBy, onSort, filterStar, onFilterStar, total }) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="text-sm text-slate-500 font-medium mr-1">{total} đánh giá</span>

    {/* Star filter */}
    {[0, 5, 4, 3, 2, 1].map((s) => (
      <button key={s} onClick={() => onFilterStar(s)}
        className={`px-3 py-1.5 rounded text-sm font-bold border transition-all`}
        style={{
          background: filterStar === s ? "var(--vnm-navy)" : "#fff",
          color: filterStar === s ? "#fff" : "var(--vnm-text-sec)",
          borderColor: filterStar === s ? "var(--vnm-navy)" : "var(--vnm-border)"
        }}>
        {s === 0 ? "Tất cả" : `${s} ★`}
      </button>
    ))}

    <div className="ml-auto relative">
      <select value={sortBy} onChange={(e) => onSort(e.target.value)}
        className="appearance-none pl-3 pr-8 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold
                   bg-white text-slate-700 focus:border-blue-400 outline-none cursor-pointer">
        {sortOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
      </select>
      <FiChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

// ─── Main ProductReviews ──────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 5;

const ProductReviews = ({ productId, hasPurchased = true }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [filterStar, setFilterStar] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Load ngay lập tức
    setReviews(mockReviews);
    setLoading(false);
  }, [productId]);

  const handleNewReview = (review) => {
    const full = {
      _id: review._id || `rv${Date.now()}`,
      name: review.name || "Bạn",
      avatar: review.avatar || "🙂",
      rating: review.rating,
      comment: review.comment,
      date: new Date().toLocaleDateString("vi-VN"),
      verified: true,
      likes: 0,
      images: review.images?.map((i) => i.preview) || [],
    };
    setReviews((p) => [full, ...p]);
    setPage(1);
    setSortBy("newest");
  };

  // Sort + filter
  const processed = [...reviews]
    .filter((r) => filterStar === 0 || r.rating === filterStar)
    .sort((a, b) => {
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      if (sortBy === "images") return (b.images?.length || 0) - (a.images?.length || 0);
      return 0; // newest — keep insertion order
    });

  const totalPages = Math.ceil(processed.length / ITEMS_PER_PAGE);
  const paginated = processed.slice(0, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FiMessageSquare size={22} style={{ color: "var(--vnm-navy)" }} />
        <h2 className="text-2xl font-bradford font-bold" style={{ color: "var(--vnm-text)" }}>Đánh giá sản phẩm</h2>
      </div>

      {/* Rating summary */}
      {!loading && <RatingSummary reviews={reviews} />}

      {/* Write review form */}
      <ReviewForm productId={productId} hasPurchased={hasPurchased} onSubmitted={handleNewReview} />

      {/* Filter bar */}
      {!loading && reviews.length > 0 && (
        <FilterBar sortBy={sortBy} onSort={setSortBy}
          filterStar={filterStar} onFilterStar={(s) => { setFilterStar(s); setPage(1); }}
          total={processed.length} />
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <ReviewSkeleton key={i} />)}
        </div>
      ) : processed.length === 0 ? (
        <EmptyReviews />
      ) : (
        <>
          <AnimatePresence>
            <div className="space-y-4">
              {paginated.map((r, i) => <ReviewCard key={r._id} review={r} index={i} />)}
            </div>
          </AnimatePresence>

          {page < totalPages && (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setPage((p) => p + 1)}
              className="w-full py-3 rounded border text-sm font-semibold transition-all bg-white flex items-center justify-center gap-2"
              style={{ borderColor: "var(--vnm-navy)", color: "var(--vnm-navy)" }}>
              <FiChevronDown size={16} />
              Xem thêm ({processed.length - page * ITEMS_PER_PAGE} đánh giá)
            </motion.button>
          )}
        </>
      )}
    </div>
  );
};

export default ProductReviews;