import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiAward, FiGift, FiClock, FiChevronRight, FiTag,
  FiCheckCircle, FiStar, FiTrendingUp, FiShoppingBag,
} from "react-icons/fi";

// ─── Mock data ──────────────────────────────────────────────────────────────────
const mockUser = { points: 1250, tier: "Silver", nextTier: "Gold", pointsToNext: 750 };

const pointHistory = [
  { id: 1, type: "earn", desc: "Mua hàng đơn VNM1715001", points: +120, date: "09/05/2025" },
  { id: 2, type: "earn", desc: "Mua hàng đơn VNM1715002", points: +375, date: "07/05/2025" },
  { id: 3, type: "redeem", desc: "Đổi voucher giảm 50.000đ", points: -500, date: "05/05/2025" },
  { id: 4, type: "earn", desc: "Đăng ký thành viên Rewards", points: +100, date: "01/05/2025" },
  { id: 5, type: "earn", desc: "Mua hàng đơn VNM1714999", points: +210, date: "28/04/2025" },
  { id: 6, type: "redeem", desc: "Đổi quà tặng Sữa tươi 1L", points: -200, date: "20/04/2025" },
  { id: 7, type: "earn", desc: "Giới thiệu bạn bè", points: +150, date: "15/04/2025" },
];

const vouchers = [
  { id: 1, title: "Giảm 30.000đ", desc: "Áp dụng đơn từ 150.000đ", cost: 300, emoji: "🎟️", color: "from-blue-500 to-sky-400" },
  { id: 2, title: "Giảm 50.000đ", desc: "Áp dụng đơn từ 250.000đ", cost: 500, emoji: "💰", color: "from-emerald-500 to-green-400" },
  { id: 3, title: "Giảm 100.000đ", desc: "Áp dụng đơn từ 500.000đ", cost: 900, emoji: "🏷️", color: "from-violet-500 to-purple-400" },
  { id: 4, title: "Miễn phí vận chuyển", desc: "Không giới hạn đơn hàng", cost: 200, emoji: "🚚", color: "from-amber-500 to-orange-400" },
];

const gifts = [
  { id: 1, title: "Sữa tươi Vinamilk 1L", desc: "Giao tận nhà miễn phí", cost: 200, emoji: "🥛", color: "from-blue-400 to-sky-300" },
  { id: 2, title: "Sữa chua 4 hộp", desc: "Hộp 100g × 4", cost: 350, emoji: "🧴", color: "from-pink-400 to-rose-300" },
  { id: 3, title: "Ly Vinamilk cao cấp", desc: "Thép không gỉ 500ml", cost: 600, emoji: "☕", color: "from-slate-500 to-slate-400" },
  { id: 4, title: "Túi vải Vinamilk", desc: "Canvas canvas thời trang", cost: 400, emoji: "👜", color: "from-amber-400 to-yellow-300" },
];

const tiers = [
  { name: "Bronze", min: 0, color: "text-amber-700 bg-amber-100 dark:bg-amber-900/30", icon: "🥉" },
  { name: "Silver", min: 500, color: "text-slate-600 bg-slate-100 dark:bg-slate-700", icon: "🥈" },
  { name: "Gold", min: 2000, color: "text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30", icon: "🥇" },
  { name: "Diamond", min: 5000, color: "text-blue-700 bg-blue-100 dark:bg-blue-900/30", icon: "💎" },
];

// ─── Components ─────────────────────────────────────────────────────────────────
const RedeemCard = ({ item, userPoints, onRedeem, type }) => {
  const canAfford = userPoints >= item.cost;
  return (
    <motion.div
      whileHover={canAfford ? { y: -4, shadow: "xl" } : {}}
      className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm transition-all ${!canAfford ? "opacity-60" : ""}`}
    >
      <div className={`h-24 bg-gradient-to-br ${item.color} flex items-center justify-center text-4xl relative`}>
        {item.emoji}
        {!canAfford && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="text-white text-xs font-bold bg-black/40 px-2 py-1 rounded-full">Chưa đủ điểm</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-black text-slate-800 dark:text-white text-sm mb-0.5">{item.title}</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{item.desc}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm font-black text-amber-600 dark:text-amber-400">
            <FiStar size={13} className="fill-amber-400 text-amber-400" /> {item.cost.toLocaleString()} điểm
          </span>
          <motion.button
            onClick={() => canAfford && onRedeem(item, type)}
            disabled={!canAfford}
            whileHover={canAfford ? { scale: 1.05 } : {}}
            whileTap={canAfford ? { scale: 0.95 } : {}}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all
              ${canAfford
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                : "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed"}`}
          >
            Đổi ngay
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Rewards Page ──────────────────────────────────────────────────────────
const Rewards = () => {
  const [points, setPoints] = useState(mockUser.points);
  const [history, setHistory] = useState(pointHistory);
  const [activeTab, setActiveTab] = useState("overview");
  const [registered, setRegistered] = useState(true);

  const handleRedeem = (item, type) => {
    if (points < item.cost) return;
    const label = type === "voucher" ? "voucher" : "quà tặng";
    toast.success(`🎉 Đổi ${label} "${item.title}" thành công!`, { duration: 3000 });
    setPoints((p) => p - item.cost);
    setHistory((h) => [
      { id: Date.now(), type: "redeem", desc: `Đổi ${label}: ${item.title}`, points: -item.cost, date: new Date().toLocaleDateString("vi-VN") },
      ...h,
    ]);
  };

  const currentTier = tiers.reduce((acc, t) => (points >= t.min ? t : acc), tiers[0]);
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progress = nextTier ? Math.min(100, ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100) : 100;

  const tabs = [
    { id: "overview", label: "Tổng quan", icon: FiAward },
    { id: "vouchers", label: "Đổi Voucher", icon: FiTag },
    { id: "gifts", label: "Đổi Quà", icon: FiGift },
    { id: "history", label: "Lịch sử", icon: FiClock },
  ];

  return (
    <div className="w-full">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Trang chủ</Link>
          <FiChevronRight size={13} />
          <span className="text-blue-600 dark:text-blue-400 font-semibold">Vinamilk Rewards</span>
        </div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden mb-6 relative"
          style={{ background: "linear-gradient(135deg,#0057b8 0%,#003d9c 50%,#0099e6 100%)" }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-12 translate-x-12" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-8 -translate-x-8" />
          <div className="relative z-10 px-6 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{currentTier.icon}</span>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${currentTier.color}`}>
                  {currentTier.name} Member
                </span>
              </div>
              <p className="text-white/70 text-sm mb-1">Điểm tích lũy của bạn</p>
              <div className="flex items-end gap-2">
                <motion.span
                  key={points}
                  initial={{ scale: 1.2, color: "#fbbf24" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  className="text-4xl font-black text-white"
                >
                  {points.toLocaleString()}
                </motion.span>
                <span className="text-white/60 text-sm mb-1">điểm</span>
              </div>
              {nextTier && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>{currentTier.name}</span>
                    <span>{nextTier.name} ({(nextTier.min - points).toLocaleString()} điểm nữa)</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 text-right">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="text-6xl">🏆</motion.span>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold flex-shrink-0 transition-all
                  ${activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300"}`}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-5">
                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Điểm hiện tại", value: points.toLocaleString(), icon: "⭐", color: "text-amber-600" },
                    { label: "Hạng thành viên", value: currentTier.name, icon: currentTier.icon, color: "text-blue-600" },
                    { label: "Điểm đã dùng", value: history.filter(h => h.type === "redeem").reduce((s, h) => s + Math.abs(h.points), 0).toLocaleString(), icon: "🎁", color: "text-emerald-600" },
                    { label: "Điểm đã kiếm", value: history.filter(h => h.type === "earn").reduce((s, h) => s + h.points, 0).toLocaleString(), icon: "💰", color: "text-violet-600" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm text-center">
                      <span className="text-2xl">{stat.icon}</span>
                      <p className={`text-lg font-black mt-1 ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* How to earn */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
                  <h3 className="font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiTrendingUp size={16} className="text-blue-600" /> Cách tích điểm
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { icon: "🛒", title: "Mua hàng", desc: "1.000đ = 1 điểm thưởng" },
                      { icon: "👥", title: "Giới thiệu bạn bè", desc: "+150 điểm mỗi người" },
                      { icon: "⭐", title: "Viết đánh giá", desc: "+20 điểm mỗi đánh giá" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier benefits */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
                  <h3 className="font-black text-slate-800 dark:text-white mb-4">Quyền lợi theo hạng</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {tiers.map((tier) => (
                      <div key={tier.name} className={`rounded-xl p-3 border-2 transition-all ${tier.name === currentTier.name ? "border-blue-500 shadow-md" : "border-transparent bg-slate-50 dark:bg-slate-700/50"}`}>
                        <div className="text-xl mb-1">{tier.icon}</div>
                        <p className="font-black text-sm text-slate-800 dark:text-white">{tier.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">Từ {tier.min.toLocaleString()} điểm</p>
                        {tier.name === currentTier.name && <span className="text-xs text-blue-600 font-bold">✓ Hạng hiện tại</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VOUCHERS */}
            {activeTab === "vouchers" && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                  Bạn có <span className="font-black text-amber-600">{points.toLocaleString()} điểm</span>. Đổi lấy voucher giảm giá ngay!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {vouchers.map((v) => (
                    <RedeemCard key={v.id} item={v} userPoints={points} onRedeem={handleRedeem} type="voucher" />
                  ))}
                </div>
              </div>
            )}

            {/* GIFTS */}
            {activeTab === "gifts" && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                  Bạn có <span className="font-black text-amber-600">{points.toLocaleString()} điểm</span>. Đổi lấy quà tặng hấp dẫn!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {gifts.map((g) => (
                    <RedeemCard key={g.id} item={g} userPoints={points} onRedeem={handleRedeem} type="gift" />
                  ))}
                </div>
              </div>
            )}

            {/* HISTORY */}
            {activeTab === "history" && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-2">
                    <FiClock size={16} className="text-blue-600" /> Lịch sử giao dịch điểm
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {history.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between px-5 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                          ${item.type === "earn" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" : "bg-red-100 dark:bg-red-900/30 text-red-500"}`}>
                          {item.type === "earn" ? <FiShoppingBag size={15} /> : <FiGift size={15} />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">{item.desc}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{item.date}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-black ${item.type === "earn" ? "text-emerald-600" : "text-red-500"}`}>
                        {item.type === "earn" ? "+" : ""}{item.points.toLocaleString()} điểm
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Rewards;
