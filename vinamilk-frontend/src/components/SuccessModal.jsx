import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiShoppingBag, FiHome } from "react-icons/fi";

const SuccessModal = ({ open, orderId }) => {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl text-center font-sans">

            {/* Success icon */}
            {/* Success icon (simplified for performance) */}
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full
                         flex items-center justify-center mx-auto mb-5 shadow-xl shadow-green-200">
              <FiCheck size={44} className="text-white" strokeWidth={3} />
            </div>

            {/* Confetti dots */}
            {/* Confetti dots (removed for smoother performance) */}

            {/* Content (simplified for performance) */}
            <div>
              <h2 className="text-3xl font-display font-bold text-vnm-navy mb-3">Đặt hàng thành công! 🎉</h2>
              <p className="text-vnm-text-sec text-base mb-2">Cảm ơn bạn đã tin dùng sản phẩm Vinamilk</p>
              {orderId && (
                <p className="text-sm text-vnm-navy font-bold bg-vnm-blue-tag px-4 py-2 rounded-full inline-block mb-5">
                  Mã đơn hàng: #{orderId}
                </p>
              )}
              <p className="text-vnm-text-sec text-sm mb-8">
                Chúng tôi sẽ xử lý đơn hàng trong 24 giờ. Bạn sẽ nhận được SMS xác nhận sớm nhất!
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full py-4 rounded-xl font-bold text-base text-white flex items-center justify-center gap-2 shadow-lg
                             bg-gradient-to-r from-vnm-navy to-vnm-navy-60 hover:from-vnm-navy-60 hover:to-vnm-navy transition-all">
                  <FiShoppingBag size={18} /> Xem đơn hàng
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-4 rounded-xl font-bold text-base border border-vnm-border
                             text-vnm-text hover:border-vnm-navy hover:text-vnm-navy transition-all flex items-center justify-center gap-2">
                  <FiHome size={18} /> Trang chủ
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;