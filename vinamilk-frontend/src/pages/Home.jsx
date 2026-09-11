import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import HeroBanner from "../components/HeroBanner";

// ─── Danh mục sản phẩm nổi bật ────────────────────────────────────────────────
const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Sữa tươi",
      image: "https://d8um25gjecm9v.cloudfront.net/cms/cat_sua_tuoi_d5e8c9a123.webp",
      link: "/products?category=sua-tuoi"
    },
    {
      id: 2,
      name: "Sữa chua",
      image: "https://d8um25gjecm9v.cloudfront.net/cms/cat_sua_chua_a4b7d2e456.webp",
      link: "/products?category=sua-chua"
    },
    {
      id: 3,
      name: "Sữa hạt",
      image: "https://d8um25gjecm9v.cloudfront.net/cms/cat_sua_hat_c8f3e1b789.webp",
      link: "/products?category=sua-hat"
    },
    {
      id: 4,
      name: "Kem",
      image: "https://d8um25gjecm9v.cloudfront.net/cms/cat_kem_e2a9d4c012.webp",
      link: "/products?category=kem"
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 lg:px-16" style={{ background: "var(--vnm-cream)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#003087", fontFamily: "system-ui, -apple-system, sans-serif" }}>
            Danh mục sản phẩm
          </h2>
          <p className="text-base md:text-lg" style={{ color: "var(--vnm-text-sec)" }}>
            Khám phá các dòng sản phẩm chất lượng từ Vinamilk
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white text-lg md:text-xl font-bold mb-1">{cat.name}</h3>
                <span className="text-white/90 text-sm flex items-center gap-1">
                  Xem thêm <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Mời bạn sắm sữa section ──────────────────────────────────────────────────
const MoiBanSamSua = () => {
  const showcaseProducts = [
    {
      id: "16",
      name: "Sữa chua ăn Green Farm Ít Đường",
      img: "https://d8um25gjecm9v.cloudfront.net/cms/SCA_GF_ID_01_3f2afca818_286c5123ee.png",
      hoverImg: "https://d8um25gjecm9v.cloudfront.net/cms/SP_19_Side_665c54b37b_ff6e9dfb31_ff6b65812f.webp",
      height: "h-[120px] sm:h-[180px] md:h-[240px] lg:h-[300px]",
      price: "32.000₫",
      imgShadow: "23.3%"
    },
    {
      id: "10",
      name: "Sữa chua uống thanh trùng Green Farm Ít Đường",
      img: "https://d8um25gjecm9v.cloudfront.net/cms/SCUTT_GF_thanhtrung_ID_01_a64a385623_923869557f.png",
      hoverImg: "https://d8um25gjecm9v.cloudfront.net/cms/SP_23_Side_982d2c1cb5_361f5e8948_cd5bc8a551.webp",
      height: "h-[160px] sm:h-[240px] md:h-[320px] lg:h-[400px]",
      price: "6.500₫",
      imgShadow: "17.9%"
    },
    {
      id: "18",
      name: "Sữa hạt Vinamilk 9 loại hạt ít đường",
      img: "https://d8um25gjecm9v.cloudfront.net/cms/STV_9_loai_hat_ID_1_Lvuong_01_61c68ca928_f405e33f93.png",
      hoverImg: "https://d8um25gjecm9v.cloudfront.net/cms/SP_13_Side_35aab76c3e_4a3e6ea55a_2fa9ea8e3f.webp",
      height: "h-[160px] sm:h-[240px] md:h-[320px] lg:h-[380px]",
      price: "35.000₫",
      imgShadow: "17.9%"
    },
    {
      id: "17",
      name: "Sữa tươi Green Farm Có đường 180ml",
      img: "https://d8um25gjecm9v.cloudfront.net/cms/GF_CD_180ml_01_e23b453767.png",
      hoverImg: "https://d8um25gjecm9v.cloudfront.net/cms/SP_1_Side_4846bd0415_65223fdbc1_22e6c00bbb.webp",
      height: "h-[160px] sm:h-[240px] md:h-[320px] lg:h-[380px]",
      price: "32.000₫",
      imgShadow: "17.8%"
    },
    {
      id: "19",
      name: "Vinamilk Gelato Sôcôla",
      img: "https://d8um25gjecm9v.cloudfront.net/cms/KEM_Gelato_VNM_Socola_400_01_5ff26d1b10_33f22ef880.png",
      height: "h-[160px] sm:h-[240px] md:h-[320px] lg:h-[380px]",
      price: "79.000₫",
      imgShadow: "18%"
    },
    {
      id: "20",
      name: "Kem hộp Vinamilk Dừa",
      img: "https://d8um25gjecm9v.cloudfront.net/cms/KEM_Kem_hop_VNM_Dua_870_01_7f3a3907ef_12766052fe.png",
      height: "h-[160px] sm:h-[240px] md:h-[320px] lg:h-[380px]",
      price: "85.000₫",
      imgShadow: "18%"
    }
  ];

  return (
    <section className="w-full bg-[#FAF9F3] border-t-2 border-b-[8px] border-[#003087] pt-20 pb-0 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-between overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-5xl md:text-[64px] font-bold text-[#003087] tracking-tight leading-none" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
          Mời bạn sắm sữa
        </h2>
      </div>

      <div className="w-full max-w-[1440px] flex items-end justify-between gap-0 pb-0 mt-8 px-2 lg:px-8">
        {showcaseProducts.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="group relative flex-1 h-[200px] sm:h-[300px] lg:h-[480px] select-none cursor-pointer z-10 hover:z-20"
          >
            <div
              className="absolute bottom-0 left-1/2 flex flex-col items-center"
              style={{ transform: `translateX(-50%) translateY(${p.imgShadow || '0%'})` }}
            >
              <img
                src={p.img}
                alt={p.name}
                className={`${p.height} w-auto max-w-none object-contain object-bottom transition-all duration-500 ease-out group-hover:-translate-y-5 group-hover:scale-[1.12] drop-shadow-2xl will-change-transform transform-gpu pointer-events-none`}
                style={{ transformOrigin: "bottom center" }}
              />
            </div>
            <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-2 text-center bg-[#003087]/95 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-blue-800/40 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 translate-y-2 group-hover:translate-y-0 flex flex-col items-center w-max">
              <p className="text-xs font-bold whitespace-nowrap tracking-wide text-white">{p.name}</p>
              <span className="text-[11px] font-bold text-yellow-300 mt-0.5">{p.price}</span>
              <div className="w-2 h-2 bg-[#003087] border-r border-b border-blue-800/40 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// ─── Banner Khuyến mãi ────────────────────────────────────────────────────────
const PromotionBanner = () => {
  return (
    <section className="w-full py-8 md:py-12 px-4 md:px-8 lg:px-16" style={{ background: "var(--vnm-cream)" }}>
      <div className="max-w-7xl mx-auto">
        <Link to="/products" className="block group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <img
            src="https://d8um25gjecm9v.cloudfront.net/cms/promo_banner_desktop_a1b2c3d4e5.webp"
            alt="Khuyến mãi đặc biệt"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </section>
  );
};

// ─── Hành Trình Bền Vững Section ──────────────────────────────────────────────
const HanhTrinhBenVung = () => {
  const pillars = [
    {
      id: 1,
      title: "Đất Lành Sinh Thái",
      desc: "Chăm sóc nguồn đất, nước sạch tại 14 trang trại sinh thái đạt tiêu chuẩn quốc tế nghiêm ngặt, kiến tạo hệ sinh thái bền vững.",
      img: "https://d8um25gjecm9v.cloudfront.net/cms/home_ptbv_01_647efd4c2a.webp",
      accent: "#4caf50"
    },
    {
      id: 2,
      title: "Thiên Nhiên Xanh",
      desc: "Nỗ lực phủ xanh rừng bảo tồn thiên nhiên, gia tăng hấp thụ carbon và bảo vệ sự đa dạng sinh học tự nhiên.",
      img: "https://d8um25gjecm9v.cloudfront.net/cms/home_ptbv_02_dbb281fdf2.webp",
      accent: "#8bc34a"
    },
    {
      id: 3,
      title: "Vì Tương Lai Bền Vững",
      desc: "Cam kết mạnh mẽ Net Zero Carbon vào năm 2050 thông qua chuyển dịch năng lượng xanh, vì sức khỏe thế hệ mai sau.",
      img: "https://d8um25gjecm9v.cloudfront.net/cms/home_ptbv_03_cd8161be5c.webp",
      accent: "#00abc0"
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 lg:px-16" style={{ background: "var(--vnm-cream)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center md:text-left md:flex md:items-end md:justify-between">
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#003087", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}
            >
              Hành Trình Bền Vững
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-2"
              style={{ fontFamily: "system-ui, -apple-system, Arial, sans-serif", color: "var(--vnm-text)" }}
            >
              Để Lại Màu Xanh Cho Thế Hệ Mai Sau
            </h2>
          </div>
          <Link
            to="/about"
            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold hover:underline transition-all"
            style={{ color: "#003087", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}
          >
            Tìm hiểu hành trình Net Zero →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              style={{ border: "1px solid var(--vnm-border)" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold text-white uppercase rounded"
                  style={{ background: p.accent, fontFamily: "system-ui, -apple-system, Arial, sans-serif", letterSpacing: "0.08em" }}
                >
                  Cột mốc {i + 1}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#003087", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--vnm-text-sec)", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}
                >
                  {p.desc}
                </p>
                <span
                  className="text-xs font-semibold mt-auto transition-colors flex items-center gap-1"
                  style={{ color: "var(--vnm-text-sec)", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}
                >
                  Xem chi tiết <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Tin tức & Sự kiện ────────────────────────────────────────────────────────
const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Vinamilk đạt Top 50 công ty niêm yết tốt nhất Việt Nam",
      excerpt: "Vinamilk tiếp tục khẳng định vị thế dẫn đầu ngành hàng sữa với nhiều giải thưởng danh giá...",
      image: "https://d8um25gjecm9v.cloudfront.net/cms/news_01_abc123def456.webp",
      date: "20/05/2026",
      category: "Tin tức"
    },
    {
      id: 2,
      title: "Ra mắt dòng sản phẩm organic mới cho trẻ em",
      excerpt: "Vinamilk giới thiệu dòng sản phẩm organic cao cấp, đáp ứng nhu cầu dinh dưỡng cho trẻ...",
      image: "https://d8um25gjecm9v.cloudfront.net/cms/news_02_def456ghi789.webp",
      date: "15/05/2026",
      category: "Sản phẩm"
    },
    {
      id: 3,
      title: "Chương trình Quỹ sữa Vươn cao Việt Nam 2026",
      excerpt: "Tiếp tục hành trình mang dinh dưỡng đến với trẻ em khó khăn trên khắp cả nước...",
      image: "https://d8um25gjecm9v.cloudfront.net/cms/news_03_ghi789jkl012.webp",
      date: "10/05/2026",
      category: "Cộng đồng"
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 lg:px-16" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#003087", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}
          >
            Tin tức & Sự kiện
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mt-2"
            style={{ fontFamily: "system-ui, -apple-system, Arial, sans-serif", color: "var(--vnm-text)" }}
          >
            Cập nhật từ Vinamilk
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link
              key={item.id}
              to={`/blog/${item.id}`}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              style={{ border: "1px solid var(--vnm-border)" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-full" style={{ background: "#003087" }}>
                  {item.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs text-gray-500 mb-2">{item.date}</span>
                <h3
                  className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#003087] transition-colors"
                  style={{ color: "var(--vnm-text)", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4 line-clamp-3"
                  style={{ color: "var(--vnm-text-sec)", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}
                >
                  {item.excerpt}
                </p>
                <span
                  className="text-xs font-semibold mt-auto flex items-center gap-1"
                  style={{ color: "#003087", fontFamily: "system-ui, -apple-system, Arial, sans-serif" }}
                >
                  Đọc thêm <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-sm uppercase tracking-wider transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
            style={{ background: "#003087", color: "#fff" }}
          >
            Xem tất cả tin tức <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── Home Page ────────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <div className="w-full" style={{ background: "var(--vnm-cream)" }}>

      {/* ── Hero Banner ── */}
      <HeroBanner />

      {/* ── Danh mục sản phẩm ── */}
      {/* Removed per user request */}

      {/* ── Mời bạn sắm sữa ── */}
      <MoiBanSamSua />

      {/* ── Banner Khuyến mãi ── */}
      <PromotionBanner />

      {/* ── Cầu tiến là bí quyết (Full-Width) ── */}
      <section className="w-full" style={{ background: "var(--vnm-cream)" }}>
        <div className="text-center pt-16 pb-8 px-4">
          <h2
            className="font-bold mb-5"
            style={{
              fontFamily: "system-ui, -apple-system, Arial, sans-serif",
              color: "var(--vnm-text)",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              lineHeight: 1.1,
            }}
          >
            Cầu tiến là bí quyết
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{
              color: "var(--vnm-text-sec)",
              fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              lineHeight: 1.7,
              fontFamily: "system-ui, -apple-system, Arial, sans-serif",
            }}
          >
            Không ngừng tìm kiếm, ứng dụng công nghệ sản xuất tiên tiến nhất để đáp ứng những tiêu chuẩn khắt khe nhất của chính Vinamilk.
          </p>
        </div>
        <div className="w-full">
          <img
            src="https://d8um25gjecm9v.cloudfront.net/cms/tech_banner_desktop_cce7be112e.webp"
            alt="Cầu tiến là bí quyết - Vinamilk"
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* ── Hành Trình Bền Vững ── */}
      <HanhTrinhBenVung />

      {/* ── Tin tức & Sự kiện ── */}
      {/* Removed per user request */}

    </div>
  );
};

export default Home;
