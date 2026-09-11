    import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-4 my-8">
      {/* Prev */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center justify-center w-10 h-10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ color: "#003087" }}
      >
        <FiChevronLeft size={22} strokeWidth={2.5} />
      </motion.button>

      {/* Pages */}
      <div className="flex items-center gap-3">
        {pages.map((page, i) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${i}`}
                className="w-10 text-center text-[#003087] font-bold"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <motion.button
              key={page}
              whileHover={!isActive ? { scale: 1.1 } : {}}
              whileTap={!isActive ? { scale: 0.95 } : {}}
              onClick={() => onPageChange(page)}
              className="w-10 h-10 flex items-center justify-center font-bold text-[16px] transition-all rounded-[3px]"
              style={{
                color: "#003087",
                border: isActive ? "1.5px solid #003087" : "1.5px solid transparent",
                background: "transparent",
              }}
            >
              {page}
            </motion.button>
          );
        })}
      </div>

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center w-10 h-10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ color: "#003087" }}
      >
        <FiChevronRight size={22} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
};

export default Pagination;