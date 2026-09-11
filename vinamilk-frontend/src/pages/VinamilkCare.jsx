import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const VinamilkCare = () => {
  useEffect(() => {
    document.title = "Vinamilk Care | Món quà sức khỏe";
  }, []);

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="w-full bg-[#001489] text-white pt-16 md:pt-24 pb-0 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Top Text Row */}
          <div className="w-full flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-12">
            <div className="w-full md:w-1/3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Vinamilk Care</h1>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif italic font-medium leading-snug">
                "Yêu thương là hiện diện mỗi ngày, bằng mọi cách."
              </h2>
              <div className="space-y-4 text-base md:text-lg leading-relaxed text-blue-50 max-w-3xl font-medium">
                <p>
                  Bạn muốn chăm sóc ba mẹ hay người thân nhưng sợ bận rộn rồi quên?
                  <br />
                  Với Vinamilk Care, bạn chỉ cần chọn gói định kỳ 3, 6 hoặc 9 tháng 1 lần duy nhất.
                </p>
                <p>
                  Vinamilk sẽ thay bạn mang sữa đến tận tay người nhận đều đặn mỗi tháng.
                  <br />
                  Bạn chỉ cần bước 1 bước, Vinamilk sẽ bước 99 bước còn lại.
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom Image */}
          <div className="w-full relative z-10 mt-4 md:mt-8 flex justify-center">
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              src="https://d8um25gjecm9v.cloudfront.net/cms/image_3653_47a173337a.png" 
              alt="Vinamilk Care Delivery" 
              className="w-full h-auto object-cover"
              style={{ display: "block", marginBottom: "-1px", objectPosition: "center top" }}
            />
          </div>
        </div>
      </section>

      {/* Main Content Section with grid background */}
      <section 
        className="w-full py-20 px-4 sm:px-6"
        style={{
          backgroundColor: "#f0f4f8",
          backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-[42px] font-bold text-center text-[#001489] mb-14 tracking-tight">
            Tìm hiểu các gói của Vinamilk Care
          </h2>

          <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-5xl mx-auto">
            
            {/* Standard Package */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 rounded-2xl overflow-hidden shadow-xl shadow-blue-900/5 bg-[#fffdf0] border border-[#e8e4c9]"
            >
              <div className="w-full h-32 md:h-40 bg-cover bg-center border-b border-[#001489]" style={{ backgroundImage: "url('https://d8um25gjecm9v.cloudfront.net/cms/thumbnail_Header_image_5c8da9dc7b_a4fa49d2fb.png')" }}>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-3xl font-bold text-[#001489] mb-3">Gói Tiêu Chuẩn</h3>
                <p className="text-[#001489] font-medium text-lg mb-8">Người bạn thương sẽ được:</p>
                
                <ul className="space-y-4">
                  {[
                    "Sữa giao tận nhà, đều đặn mỗi tháng 1 lần.",
                    "Gọi điện thăm hỏi và tư vấn sức khỏe mỗi 2 tuần",
                    "1 tấm thiệp gửi gắm trọn lời yêu",
                    "Là những người đầu tiên được thử sản phẩm mới miễn phí",
                    "Vận chuyển miễn phí"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-[#001489] font-medium text-base">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-[#001489] text-white flex items-center justify-center flex-shrink-0">
                        <FiCheckCircle size={14} />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Premium Package */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex-1 rounded-2xl overflow-hidden shadow-xl shadow-blue-900/5 bg-[#fffdf0] border border-[#e8e4c9] relative"
            >
              <div className="w-full h-32 md:h-40 bg-cover bg-center border-b border-[#001489]" style={{ backgroundImage: "url('https://d8um25gjecm9v.cloudfront.net/cms/thumbnail_premium_90b4b497f2_f93f34ac93.png')" }}>
              </div>
              
              <div className="p-8 md:p-10 pt-8 md:pt-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-3xl font-bold text-[#001489]">Gói Cao Cấp</h3>
                  <div className="bg-[#ccfbf1] text-[#0f766e] px-3 py-1 rounded font-bold text-sm flex items-center gap-1.5 shadow-sm border border-[#99f6e4]">
                    <span>✨ Sắp ra mắt</span>
                  </div>
                </div>
                <p className="text-[#001489] font-medium text-lg mb-8">Người bạn thương sẽ được:</p>
                
                <ul className="space-y-4">
                  {[
                    "Sữa giao tận nhà, đều đặn mỗi tháng 1 lần.",
                    "Gọi điện thăm hỏi và tư vấn sức khỏe mỗi 2 tuần",
                    "1 tấm thiệp gửi gắm trọn lời yêu",
                    "Là những người đầu tiên được thử sản phẩm mới miễn phí",
                    "Vận chuyển miễn phí",
                    "Bộ quà tặng cao cấp",
                    "Kiểm tra sức khỏe định kỳ miễn phí"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-[#001489] font-medium text-base">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-[#001489] text-white flex items-center justify-center flex-shrink-0">
                        <FiCheckCircle size={14} />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default VinamilkCare;
