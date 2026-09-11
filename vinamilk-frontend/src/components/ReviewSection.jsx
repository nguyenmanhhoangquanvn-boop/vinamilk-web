import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiThumbsUp, FiChevronDown } from "react-icons/fi";

const mockReviews = [
  { id: 1, name: "Nguyễn Thị Lan", avatar: "👩", rating: 5, date: "12/04/2025", comment: "Sữa rất ngon, thơm béo tự nhiên. Gia đình mình dùng hàng tuần, con nhỏ rất thích. Đóng gói cẩn thận, giao hàng nhanh!", likes: 24, verified: true },
  { id: 2, name: "Trần Văn Minh", avatar: "👨", rating: 5, date: "08/04/2025", comment: "Chất lượng tuyệt vời, đúng hàng chính hãng Vinamilk. Giá hợp lý, sẽ mua lại lần sau.", likes: 18, verified: true },
  { id: 3, name: "Lê Thị Hoa", avatar: "👩‍🦱", rating: 4, date: "02/04/2025", comment: "Sữa ngon, hạn dài. Chỉ hơi tiếc là hộp bị móp nhẹ khi nhận hàng nhưng sữa vẫn tốt.", likes: 9, verified: false },
  { id: 4, name: "Phạm Quốc Hùng", avatar: "👨‍💼", rating: 5, date: "28/03/2025", comment: "Mua về cho cả nhà uống, ai cũng khen ngon. Sẽ tiếp tục ủng hộ Vinamilk!", likes: 31, verified: true },
  { id: 5, name: "Võ Thị Mai", avatar: "👧", rating: 4, date: "20/03/2025", comment: "Sữa tươi ngon, không quá ngọt. Thích hợp cho người ăn kiêng. Giao hàng đúng hẹn.", likes: 12, verified: true },
];

const RatingSummary = () => {
  const avg = 4.8;
  const dist = [{ stars: 5, pct: 78 }, { stars: 4, pct: 15 }, { stars: 3, pct: 5 }, { stars: 2, pct: 1 }, { stars: 1, pct: 1 }];
  return (
    <div className="flex flex-col sm:flex-row gap-8 p-6 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl mb-6">
      <div className="flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-blue-700">{avg}</span>
        <div className="flex gap-0.5 my-1">
          {[1,2,3,4,5].map((s) => (
            <FiStar key={s} size={16} className={s <= Math.round(avg) ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
          ))}
        </div>
        <span className="text-xs text-slate-500">{mockReviews.length} đánh giá</span>
      </div>
      <div className="flex-1 space-y-2">
        {dist.map(({ stars, pct }) => (
          <div key={stars} className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-600 w-3">{stars}</span>
            <FiStar size={12} className="fill-amber-400 text-amber-400 flex-shrink-0" />
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (5 - stars) * 0.1 }}
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full" />
            </div>
            <span className="text-xs text-slate-500 w-7 text-right">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ review, index }) => {
  const [liked, setLiked] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-sky-100
                        flex items-center justify-center text-xl flex-shrink-0">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-slate-800 text-sm">{review.name}</p>
            {review.verified && (
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                ✓ Đã mua hàng
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <FiStar key={s} size={12} className={s <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
              ))}
            </div>
            <span className="text-xs text-slate-400">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed mb-3">{review.comment}</p>
      <button onClick={() => setLiked(!liked)}
        className={`flex items-center gap-1.5 text-xs font-medium transition-all
            ${liked ? "text-blue-600" : "text-slate-400 hover:text-blue-500"}`}>
        <FiThumbsUp size={13} className={liked ? "fill-blue-600" : ""} />
        Hữu ích ({review.likes + (liked ? 1 : 0)})
      </button>
    </motion.div>
  );
};

const ReviewSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? mockReviews : mockReviews.slice(0, 3);

  return (
    <div>
      <h2 className="text-xl font-black text-slate-800 mb-5">Đánh giá sản phẩm</h2>
      <RatingSummary />
      <div className="space-y-4">
        <AnimatePresence>
          {visible.map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
        </AnimatePresence>
      </div>
      {mockReviews.length > 3 && (
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold
                     hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2">
          <FiChevronDown size={16} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
          {showAll ? "Thu gọn" : `Xem thêm ${mockReviews.length - 3} đánh giá`}
        </motion.button>
      )}
    </div>
  );
};

export default ReviewSection;