// ProductListSkeleton.jsx — Loading skeletons for product list page

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse">
    <div className="h-56 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-[shimmer_1.5s_infinite]" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-20 bg-slate-200 rounded-full" />
      <div className="h-4 w-full bg-slate-200 rounded" />
      <div className="h-4 w-4/5 bg-slate-200 rounded" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 w-3 bg-slate-200 rounded-full" />
        ))}
      </div>
      <div className="h-6 w-28 bg-slate-200 rounded" />
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-slate-200 rounded-xl" />
        <div className="flex-1 h-10 bg-slate-200 rounded-xl" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 12 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {[...Array(count)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const SidebarFilterSkeleton = () => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 h-fit space-y-4 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="border-b border-slate-200 pb-4">
        <div className="h-4 bg-slate-200 rounded w-24 mb-3" />
        <div className="space-y-2">
          {[...Array(3)].map((_, j) => (
            <div key={j} className="flex gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded" />
              <div className="h-3 bg-slate-200 rounded flex-1" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const PageHeaderSkeleton = () => (
  <div className="animate-pulse space-y-3 mb-6">
    <div className="h-5 bg-slate-200 rounded w-48" />
    <div className="flex justify-between items-center">
      <div className="h-4 bg-slate-200 rounded w-32" />
      <div className="h-9 bg-slate-200 rounded-lg w-40" />
    </div>
  </div>
);

export default ProductCardSkeleton;