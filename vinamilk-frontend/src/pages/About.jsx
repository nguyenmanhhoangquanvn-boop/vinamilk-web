import { Link } from "react-router-dom";
import { FiChevronRight, FiCheckCircle } from "react-icons/fi";

const About = () => {
  return (
    <div className="w-full">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Trang chủ</Link>
          <FiChevronRight size={13} />
          <span className="text-blue-600 dark:text-blue-400 font-semibold">Giới thiệu</span>
        </div>

        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-4">Về Vinamilk Shop</h1>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Được thành lập từ năm 1976, Vinamilk hiện là công ty sữa lớn nhất Việt Nam và nằm trong Top 40 công ty sữa lớn nhất thế giới về doanh thu. 
              Vinamilk cam kết mang đến cho cộng đồng nguồn dinh dưỡng chất lượng cao cấp hàng đầu bằng chính sự trân trọng, tình yêu và trách nhiệm cao của mình với cuộc sống con người và xã hội.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1">Chất lượng quốc tế</h3>
                  <p className="text-sm">Hệ thống trang trại đạt chuẩn Global G.A.P. lớn nhất Châu Á.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1">Đa dạng sản phẩm</h3>
                  <p className="text-sm">Hơn 250 chủng loại sản phẩm dinh dưỡng đáp ứng mọi nhu cầu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
