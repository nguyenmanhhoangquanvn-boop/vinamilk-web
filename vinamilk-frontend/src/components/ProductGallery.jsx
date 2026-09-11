import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZoomIn, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProductGallery = ({ images = [], emoji = "🥛", productName = "" }) => {
  const [selected, setSelected] = useState(0);

  const mockImages = images && images.length > 0 ? images : [
    { id: 1, emoji: emoji, bg: "bg-[var(--vnm-cream-2)]" },
    { id: 2, emoji: "📦", bg: "bg-[var(--vnm-cream)]" },
    { id: 3, emoji: "🏷️", bg: "bg-[var(--vnm-cream-2)]" },
    { id: 4, emoji: "✨", bg: "bg-[var(--vnm-cream)]" },
  ];

  const [direction, setDirection] = useState(0);

  const prev = () => {
    setDirection(-1);
    setSelected((p) => (p === 0 ? mockImages.length - 1 : p - 1));
  };
  const next = () => {
    setDirection(1);
    setSelected((p) => (p === mockImages.length - 1 ? 0 : p + 1));
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{ aspectRatio: "1/1", backgroundColor: "var(--vnm-cream)" }}>
        <motion.div
          className="w-full h-full flex items-center justify-center relative"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={selected}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full h-full p-8 flex items-center justify-center select-none"
            >
              {mockImages[selected]?.url ? (
                <img src={mockImages[selected].url} alt={productName} className="w-full h-full object-contain" style={{ mixBlendMode: "darken" }} />
              ) : (
                <span className="text-[140px] drop-shadow-2xl">{mockImages[selected]?.emoji || emoji}</span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm
                       rounded-full flex items-center justify-center shadow hover:bg-white transition-all border" style={{ borderColor: "var(--vnm-border)" }}>
            <FiChevronLeft size={18} style={{ color: "var(--vnm-navy)" }} />
          </button>
          <button onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm
                       rounded-full flex items-center justify-center shadow hover:bg-white transition-all border" style={{ borderColor: "var(--vnm-border)" }}>
            <FiChevronRight size={18} style={{ color: "var(--vnm-navy)" }} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {mockImages.map((_, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`h-1.5 rounded-full transition-all`}
                style={{ background: i === selected ? "var(--vnm-navy)" : "var(--vnm-border)", width: i === selected ? "20px" : "6px" }} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {mockImages.map((img, i) => (
          <motion.button key={img.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(i)}
            className="aspect-square overflow-hidden border transition-all flex items-center justify-center text-3xl bg-transparent"
            style={{ 
              borderRadius: "8px",
              borderColor: i === selected ? "var(--vnm-navy)" : "var(--vnm-border)",
              boxShadow: i === selected ? "0 4px 12px rgba(0,48,135,0.15)" : "none",
              backgroundColor: "var(--vnm-cream)"
            }}>
            {img.url ? <img src={img.url} className="w-full h-full object-contain p-2" style={{ mixBlendMode: "darken" }} alt="thumb" /> : img.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;