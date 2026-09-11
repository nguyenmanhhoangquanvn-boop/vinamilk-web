import { motion } from "framer-motion";

const benefits = [
  {
    icon: "/images/banners/icon_tinh_khiet.svg",
    title: "100% Nguyên chất",
    desc: "Sữa tươi chuẩn tinh khiết từ hệ thống trang trại chuẩn quốc tế."
  },
  {
    icon: "/images/banners/icon_canxi.svg",
    title: "Giàu Canxi tự nhiên",
    desc: "Giúp hệ xương chắc khỏe, phát triển chiều cao tối ưu."
  },
  {
    icon: "/images/banners/icon_de_khang.svg",
    title: "Tăng cường đề kháng",
    desc: "Bổ sung các vitamin thiết yếu A, D3, Selen giúp bảo vệ cơ thể."
  },
  {
    icon: "/images/banners/icon_chieu_cao.svg",
    title: "Hỗ trợ chiều cao",
    desc: "Nguồn dinh dưỡng dồi dào, là hành trang trưởng thành vững chắc."
  }
];

const ProductBenefits = () => {
  return (
    <div className="w-full py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Area */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-3 text-blue-600">Có gì đặc sắc?</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-800 font-bradford">
            Không phải Sữa tươi nào cũng như nhau
          </h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Khám phá lý do hàng triệu gia đình Việt Nam tin chọn Vinamilk làm người bạn đồng hành dinh dưỡng mỗi ngày.
          </p>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Banner Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="/images/banners/ST_100_BNFIMG_1.jpg" 
              alt="Sữa tươi 100% Vinamilk" 
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {benefits.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center p-3 mb-4">
                  <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBenefits;
