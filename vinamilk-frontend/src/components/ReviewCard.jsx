import { useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiThumbsUp, FiMoreHorizontal } from "react-icons/fi";

const ReviewCard = ({ review, index }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((p) => liked ? p - 1 : p + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-sky-200
                        flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
          {review.avatar || "👤"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-slate-800 text-sm">{review.name}</p>
            {review.verified && (
              <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                ✓ Đã mua hàng
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <FiStar key={s} size={13}
                  className={s <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
              ))}
            </div>
            <span className="text-xs font-bold text-amber-500">{review.rating}.0</span>
            <span className="text-xs text-slate-400">· {review.date}</span>
          </div>
        </div>

        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          <FiMoreHorizontal size={16} />
        </button>
      </div>

      {/* Comment */}
      <p className="text-sm text-slate-700 leading-relaxed mb-3">{review.comment}</p>

      {/* Mock images */}
      {review.images?.length > 0 && (
        <div className="flex gap-2 mb-3">
          {review.images.map((img, i) => (
            <div key={i} className="w-16 h-16 bg-gradient-to-br from-blue-50 to-sky-100
                                    rounded-xl flex items-center justify-center text-2xl
                                    border border-blue-100 cursor-pointer hover:scale-105 transition-transform">
              {img}
            </div>
          ))}
        </div>
      )}

      {/* Like */}
      <div className="flex items-center justify-between">
        <button onClick={handleLike}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all
            ${liked ? "bg-blue-100 text-blue-600" : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"}`}>
          <FiThumbsUp size={13} className={liked ? "fill-blue-600" : ""} />
          Hữu ích {likeCount > 0 ? `(${likeCount})` : ""}
        </button>

        {review.rating >= 4 && (
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg font-medium">
            ✨ Đánh giá tích cực
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewCard;