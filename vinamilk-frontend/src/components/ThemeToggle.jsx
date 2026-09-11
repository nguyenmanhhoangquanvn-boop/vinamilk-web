import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useDarkMode } from "../context/DarkModeContext";

const ThemeToggle = ({ size = "md" }) => {
  const { dark, toggle } = useDarkMode();

  const isSm = size === "sm";
  const knobSize = isSm ? 20 : 24;
  const trackW = isSm ? 44 : 56;
  const trackH = isSm ? 24 : 28;
  const offX = 2;
  const onX = trackW - knobSize - 2;

  return (
    <button
      onClick={toggle}
      style={{ width: trackW, height: trackH }}
      className={`relative inline-flex items-center rounded-full flex-shrink-0 cursor-pointer
        transition-colors duration-300 focus:outline-none
        ${dark ? "bg-blue-600" : "bg-slate-300"}`}
      aria-label="Toggle dark mode"
    >
      <motion.span
        animate={{ x: dark ? onX : offX }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        style={{ width: knobSize, height: knobSize }}
        className="absolute inline-flex items-center justify-center bg-white rounded-full shadow-md"
      >
        <AnimatePresence mode="wait">
          {dark ? (
            <motion.span key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}>
              <FiMoon size={isSm ? 10 : 12} className="text-blue-600" />
            </motion.span>
          ) : (
            <motion.span key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}>
              <FiSun size={isSm ? 10 : 12} className="text-amber-500" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
};

export default ThemeToggle;