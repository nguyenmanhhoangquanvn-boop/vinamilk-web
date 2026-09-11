import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    category: "ĐẸP DA - ĐẸP DÁNG",
    title: "Nước ép trái cây giảm cân, đẹp da, dễ làm tại nhà",
    image: "https://d8um25gjecm9v.cloudfront.net/cms/Blog_1_f0a2684141_0f28d9f7d4.jpg",
    link: "https://www.vinamilk.com.vn/blogs/dep-da-dep-dang/nuoc-ep-trai-cay-giam-can",
  },
  {
    id: 2,
    category: "ĐẸP DA - ĐẸP DÁNG",
    title: "Ăn sữa chua có đẹp da không? Mẹo ăn đúng chuẩn",
    image: "https://d8um25gjecm9v.cloudfront.net/cms/Blog_6_0465e3d059_64398df752.jpg",
    link: "https://www.vinamilk.com.vn/blogs/dep-da-dep-dang/an-sua-chua-dep-da",
  },
  {
    id: 3,
    category: "ĐẸP DA - ĐẸP DÁNG",
    title: "Uống trà atiso trị mụn hiệu quả tức thì",
    image: "https://d8um25gjecm9v.cloudfront.net/cms/Blog_5_9884124744_51b13c5f56.jpg",
    link: "https://www.vinamilk.com.vn/blogs/dep-da-dep-dang/uong-tra-atiso-tri-mun",
  },
];

const Blog = () => {
  return (
    <div className="w-full bg-[#FAF9F3] min-h-screen pt-12 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-[40px] md:text-[56px] font-black text-[#003087] uppercase tracking-tight">
            Khám phá
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-[#003087] uppercase border border-[#003087] px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[22px] md:text-[26px] text-[#003087] leading-tight group-hover:text-[#0057b8] transition-colors mb-4">
                  {post.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center gap-2 text-[#003087] text-sm font-bold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Khám phá ngay</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
