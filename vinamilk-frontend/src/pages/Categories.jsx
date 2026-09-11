import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import axiosClient from "../services/axiosClient";
import CategorySection from "../components/CategoryCard";
import { CategoryGridSkeleton } from "../components/SkeletonLoader";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategories([]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Trang chủ</Link>
          <FiChevronRight size={13} />
          <span className="text-blue-600 dark:text-blue-400 font-semibold">Danh mục sản phẩm</span>
        </div>

        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Tất cả danh mục</h1>
          <p className="text-slate-500 dark:text-slate-400">Lựa chọn các sản phẩm chất lượng từ Vinamilk theo từng danh mục dưới đây.</p>
        </div>

        {/* Category Grid */}
        {loading ? (
          <CategoryGridSkeleton />
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
            <CategorySection categories={categories} />
          </div>
        )}

      </main>
    </div>
  );
};

export default Categories;
