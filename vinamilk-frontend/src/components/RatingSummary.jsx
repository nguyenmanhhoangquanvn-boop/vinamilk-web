import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const RatingSummary = ({ reviews = [] }) => {
  const total = reviews.length;
  const avg = total > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
    : 0;

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: total > 0 ? Math.round((reviews.filter((r) => r.rating === star).length / total) * 100) : 0,
  }));

  return (
    <div className="flex flex-col sm:flex-row gap-8 p-6 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl">
      {/* Average */}
      <div className="flex flex-col items-center justify-center flex-shrink-0">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl font-black text-blue-700 leading-none"
        >
          {avg}
        </motion.span>
        <div className="flex gap-0.5 my-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <FiStar key={s} size={18}
              className={s <= Math.round(avg) ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
          ))}
        </div>
        <p className="text-sm text-slate-500 font-medium">{total} đánh giá</p>
      </div>

      {/* Distribution bars */}
      <div className="flex-1 space-y-2.5">
        {dist.map(({ star, count, pct }, i) => (
          <div key={star} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-10 flex-shrink-0">
              <span className="text-xs font-bold text-slate-600">{star}</span>
              <FiStar size={11} className="fill-amber-400 text-amber-400" />
            </div>
            <div className="flex-1 h-2.5 bg-white rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300"
              />
            </div>
            <span className="text-xs text-slate-400 w-8 text-right">{count}</span>
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div className="flex sm:flex-col justify-center gap-4 sm:gap-3 flex-shrink-0">
        {[
          { label: "5 sao", value: `${dist[0].pct}%`, color: "text-green-600" },
          { label: "Hài lòng", value: `${dist[0].pct + dist[1].pct}%`, color: "text-blue-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center bg-white rounded-xl px-4 py-2 shadow-sm">
            <p className={`text-lg font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;