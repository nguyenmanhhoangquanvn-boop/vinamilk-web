// SkeletonLoader.jsx — Reusable shimmer skeletons

// Base shimmer animation wrapper
const Shimmer = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
);

// Product card skeleton
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100">
    <div className="h-48 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-[shimmer_1.5s_infinite]" />
    <div className="p-4 space-y-3">
      <Shimmer className="h-3 w-20 rounded-full" />
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-3/4" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => <Shimmer key={i} className="h-3 w-3 rounded-full" />)}
        <Shimmer className="h-3 w-16 ml-1" />
      </div>
      <Shimmer className="h-6 w-28" />
      <Shimmer className="h-10 w-full rounded-xl" />
    </div>
  </div>
);

// Category card skeleton
export const CategorySkeleton = () => (
  <div className="bg-slate-100 rounded-2xl p-5 flex flex-col items-center gap-3 animate-pulse">
    <Shimmer className="w-16 h-16 rounded-2xl" />
    <Shimmer className="h-3 w-20" />
    <Shimmer className="h-2.5 w-16" />
  </div>
);

// Banner skeleton
export const BannerSkeleton = () => (
  <div className="rounded-2xl overflow-hidden animate-pulse" style={{ minHeight: 340 }}>
    <div className="h-full min-h-[340px] bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200" />
  </div>
);

// Grid skeletons
export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {[...Array(count)].map((_, i) => <ProductCardSkeleton key={i} />)}
  </div>
);

export const CategoryGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
    {[...Array(count)].map((_, i) => <CategorySkeleton key={i} />)}
  </div>
);

export default ProductCardSkeleton;