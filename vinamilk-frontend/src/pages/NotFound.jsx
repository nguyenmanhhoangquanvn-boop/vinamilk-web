import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHome, FiShoppingBag, FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--vnm-cream)" }}
    >
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <motion.span
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-8xl block mb-4"
          >
            🥛
          </motion.span>
          <h1
            className="text-[120px] font-black leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--vnm-navy)",
              opacity: 0.12,
              lineHeight: 1,
            }}
          >
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2
            className="text-2xl font-black mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--vnm-navy)" }}
          >
            Trang không tìm thấy
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--vnm-text-sec)" }}>
            Có vẻ trang bạn đang tìm kiếm đã bị di chuyển hoặc không tồn tại.
            Hãy quay lại trang chủ để tiếp tục mua sắm nhé!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all"
                style={{ background: "var(--vnm-navy)" }}
              >
                <FiHome size={16} /> Về trang chủ
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border transition-all"
                style={{
                  borderColor: "var(--vnm-navy)",
                  color: "var(--vnm-navy)",
                  background: "transparent",
                }}
              >
                <FiShoppingBag size={16} /> Xem sản phẩm
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
