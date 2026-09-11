import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Vinamilk Green Farm",
    subtitle: "Sữa tươi hút chân không — Sạch tinh khiết, hương cỏ hoa",
    image: "https://d8um25gjecm9v.cloudfront.net/cms/LDP_Hero_Banner_Desktop_6_c41d8769dd.webp",
    cta: "Khám phá ngay",
    link: "/products",
    accent: "var(--vnm-navy)"
  },
  {
    id: 2,
    title: "Kem Vinamilk Mát Lạnh",
    subtitle: "Sảng khoái trọn vị, xua tan nắng hè",
    image: "https://d8um25gjecm9v.cloudfront.net/cms/new_kem_1_7e7e140849.webp",
    cta: "Mua ngay",
    link: "/products",
    accent: "#d0021b"
  },
  {
    id: 3,
    title: "Kem Ốc Quế Mới",
    subtitle: "Ngọt ngào, thơm béo từ sữa tươi nguyên chất",
    image: "https://d8um25gjecm9v.cloudfront.net/cms/new_kem_2_3f1b8317ce.webp",
    cta: "Xem sản phẩm",
    link: "/products",
    accent: "var(--vnm-navy)"
  }
];

const HeroBanner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full overflow-hidden" style={{ borderBottom: "1px solid var(--vnm-border)" }}>
      {/* Nav buttons */}
      <button
        ref={prevRef}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 shadow-md hover:bg-[var(--vnm-cream)] opacity-0 group-hover:opacity-100 cursor-pointer"
        style={{ background: "rgba(255, 255, 255, 0.9)", border: "1px solid var(--vnm-border)", color: "var(--vnm-navy)" }}
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        ref={nextRef}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 shadow-md hover:bg-[var(--vnm-cream)] opacity-0 group-hover:opacity-100 cursor-pointer"
        style={{ background: "rgba(255, 255, 255, 0.9)", border: "1px solid var(--vnm-border)", color: "var(--vnm-navy)" }}
      >
        <FiChevronRight size={24} />
      </button>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true, el: ".vnm-hero-pagination" }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="hero-swiper group"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full aspect-[21/9] min-h-[350px] md:min-h-[500px] overflow-hidden flex items-end">
              {/* Background image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out scale-100 swiper-slide-active:scale-105"
                style={{ width: "100%", height: "100%" }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute bottom-10 md:bottom-16 left-8 md:left-20 z-10 text-white max-w-xl pr-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold font-bradford mb-3 drop-shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {slide.title}
                  </h2>
                  <p className="text-base md:text-lg mb-6 text-white/90 drop-shadow">
                    {slide.subtitle}
                  </p>
                  <a
                    href={slide.link}
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg"
                    style={{ background: "#fff", color: "var(--vnm-navy)" }}
                  >
                    {slide.cta} <FiArrowRight />
                  </a>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination */}
      <div className="vnm-hero-pagination absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2" />

      <style>{`
        .vnm-hero-pagination .swiper-pagination-bullet {
          width: 24px; height: 3px; border-radius: 0; opacity: 0.4;
          background: #fff; display: inline-block; transition: all 0.3s;
        }
        .vnm-hero-pagination .swiper-pagination-bullet-active {
          opacity: 1; width: 48px; background: #fff;
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;