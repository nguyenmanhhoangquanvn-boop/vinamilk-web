import { motion } from "framer-motion";

const ProductInfoBanner = () => {
  return (
    <div className="w-full pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 relative group"
        >
          <img 
            src="/images/banners/ST_100_INFO.jpg" 
            alt="Thông tin sữa tươi Vinamilk" 
            className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Lớp phủ mờ bảo vệ text nếu ảnh có nền sáng */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductInfoBanner;
