import { motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";

const QuantitySelector = ({ quantity, onChange, max = 99, min = 1 }) => {
  const decrement = () => { if (quantity > min) onChange(quantity - 1); };
  const increment = () => { if (quantity < max) onChange(quantity + 1); };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border overflow-hidden" style={{ borderColor: "var(--vnm-border)", borderRadius: "8px" }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={decrement}
          disabled={quantity <= min}
          className="w-10 h-10 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--vnm-cream)]"
          style={{ color: "var(--vnm-navy)" }}
        >
          <FiMinus size={16} />
        </motion.button>

        <div className="w-12 h-10 flex items-center justify-center border-x" style={{ borderColor: "var(--vnm-border)" }}>
          <motion.span key={quantity} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-base font-black" style={{ color: "var(--vnm-navy)" }}>
            {quantity}
          </motion.span>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={increment}
          disabled={quantity >= max}
          className="w-10 h-10 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--vnm-cream)]"
          style={{ color: "var(--vnm-navy)" }}
        >
          <FiPlus size={16} />
        </motion.button>
      </div>
      <span className="text-sm font-medium" style={{ color: "var(--vnm-text-sec)" }}>{max} sản phẩm có sẵn</span>
    </div>
  );
};

export default QuantitySelector;