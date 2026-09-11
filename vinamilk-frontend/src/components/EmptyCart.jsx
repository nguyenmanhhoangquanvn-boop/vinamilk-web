import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center">
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-28 h-28 bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 rounded-full
                   flex items-center justify-center mb-6 shadow-lg">
        <FiShoppingCart size={48} className="text-blue-400" />
      </motion.div>
      <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Giỏ hàng trống!</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-xs">Bạn chưa có sản phẩm nào trong giỏ. Hãy khám phá các sản phẩm tuyệt vời từ Vinamilk nhé!</p>
      <div className="flex gap-3">
        <motion.button whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-md"
          style={{ background: "linear-gradient(90deg,#0057b8,#0099e6)" }}>
          Mua sắm ngay <FiArrowRight size={16} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:border-blue-300 hover:text-blue-600 transition-all">
          Về trang chủ
        </motion.button>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-4 opacity-40">
        {["🥛","🧴","🍼"].map((e, i) => (
          <motion.div key={i} animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-2xl">
            {e}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyCart;