import { useState } from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const StarRating = ({ value = 0, onChange, readonly = false, size = 24 }) => {
  const [hover, setHover] = useState(0);
  const labels = ["", "Rất tệ", "Tệ", "Bình thường", "Tốt", "Xuất sắc"];
  const active = hover || value;

  return (
    <div className="flex flex-col items-start gap-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            disabled={readonly}
            whileHover={!readonly ? { scale: 1.25, y: -2 } : {}}
            whileTap={!readonly ? { scale: 0.9 } : {}}
            onMouseEnter={() => !readonly && setHover(star)}
            onMouseLeave={() => !readonly && setHover(0)}
            onClick={() => !readonly && onChange?.(star)}
            className={readonly ? "cursor-default" : "cursor-pointer"}
          >
            <motion.div
              animate={{ scale: star <= active ? 1 : 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <FiStar
                size={size}
                className={`transition-all duration-150 ${
                  star <= active
                    ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                    : "text-slate-300"
                }`}
              />
            </motion.div>
          </motion.button>
        ))}
      </div>
      {!readonly && active > 0 && (
        <motion.p
          key={active}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-amber-500"
        >
          {labels[active]}
        </motion.p>
      )}
    </div>
  );
};

export default StarRating;