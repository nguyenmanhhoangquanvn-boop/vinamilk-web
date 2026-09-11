import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiImage, FiX, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import StarRating from "./StarRating";
import { postReview } from "../services/reviewService";

const ReviewForm = ({ productId, onSubmitted, hasPurchased = true }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleImageMock = () => {
    const emojis = ["🥛", "🧴", "📦", "✨", "👍"];
    const mock = { id: Date.now(), preview: emojis[Math.floor(Math.random() * emojis.length)] };
    setImages((p) => [...p, mock].slice(0, 4));
  };

  const validate = () => {
    const e = {};
    if (!rating) e.rating = "Vui lòng chọn số sao";
    if (!comment.trim()) e.comment = "Vui lòng nhập nội dung đánh giá";
    else if (comment.trim().length < 10) e.comment = "Đánh giá phải có ít nhất 10 ký tự";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      await postReview(productId, { rating, comment: comment.trim() });
      toast.success("🎉 Cảm ơn bạn đã đánh giá sản phẩm!", { duration: 2500 });
      onSubmitted?.({ rating, comment: comment.trim(), images });
      setRating(0); setComment(""); setImages([]); setErrors({});
    } catch {
      // Mock success
      toast.success("🎉 Cảm ơn bạn đã đánh giá sản phẩm!", { duration: 2500 });
      onSubmitted?.({
        _id: `r${Date.now()}`,
        rating, comment: comment.trim(),
        name: "Bạn", avatar: "🙂", date: new Date().toLocaleDateString("vi-VN"),
        verified: true, likes: 0,
      });
      setRating(0); setComment(""); setImages([]); setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  if (!hasPurchased) {
    return (
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
          <FiLock size={20} className="text-slate-400" />
        </div>
        <div>
          <p className="font-bold text-slate-700 text-sm">Chỉ khách hàng đã mua mới được đánh giá</p>
          <p className="text-xs text-slate-400 mt-0.5">Mua sản phẩm này để có thể chia sẻ trải nghiệm của bạn</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <h3 className="font-black text-slate-800 text-base mb-5 flex items-center gap-2">
        ✍️ Viết đánh giá của bạn
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star rating */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Đánh giá chất lượng *
          </label>
          <StarRating value={rating} onChange={(v) => { setRating(v); setErrors((p) => ({ ...p, rating: "" })); }} size={32} />
          <AnimatePresence>
            {errors.rating && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-red-500 text-xs font-medium mt-1.5">⚠ {errors.rating}</motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Nội dung đánh giá *
          </label>
          <textarea value={comment} onChange={(e) => { setComment(e.target.value); setErrors((p) => ({ ...p, comment: "" })); }}
            rows={4} placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
            className={`w-full px-4 py-3 border rounded-xl text-sm font-medium resize-none outline-none transition-all
              placeholder-slate-300 leading-relaxed
              ${errors.comment ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"}`} />
          <div className="flex justify-between mt-1">
            <AnimatePresence>
              {errors.comment && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-red-500 text-xs font-medium">⚠ {errors.comment}</motion.p>
              )}
            </AnimatePresence>
            <span className={`text-xs ml-auto ${comment.length > 500 ? "text-red-500" : "text-slate-400"}`}>
              {comment.length}/500
            </span>
          </div>
        </div>

        {/* Images mock */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Thêm ảnh (tối đa 4)
          </label>
          <div className="flex gap-2 flex-wrap">
            {images.map((img) => (
              <div key={img.id} className="relative w-16 h-16 bg-blue-50 rounded-xl
                                           flex items-center justify-center text-2xl border border-blue-200">
                {img.preview}
                <button type="button" onClick={() => setImages((p) => p.filter((i) => i.id !== img.id))}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full
                             flex items-center justify-center hover:bg-red-600 transition-all">
                  <FiX size={10} />
                </button>
              </div>
            ))}
            {images.length < 4 && (
              <button type="button" onClick={handleImageMock}
                className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-xl
                           flex flex-col items-center justify-center gap-0.5
                           hover:border-blue-400 hover:bg-blue-50 transition-all group">
                <FiImage size={16} className="text-slate-400 group-hover:text-blue-500" />
                <span className="text-xs text-slate-400 group-hover:text-blue-500">Thêm</span>
              </button>
            )}
          </div>
        </div>

        {/* Submit */}
        <motion.button type="submit" disabled={submitting}
          whileHover={!submitting ? { scale: 1.01, y: -1 } : {}}
          whileTap={!submitting ? { scale: 0.99 } : {}}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2
                     shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(90deg,#0057b8,#0099e6)" }}>
          {submitting
            ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang gửi...</>
            : <><FiSend size={15} /> Gửi đánh giá</>}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ReviewForm;