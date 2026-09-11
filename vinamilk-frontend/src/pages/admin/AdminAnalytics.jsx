import { motion } from "framer-motion";
import { FiTrendingUp, FiArrowUp, FiArrowDown } from "react-icons/fi";

const MiniBar = ({ data, color, height = 80 }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
          className="flex-1 rounded-t"
          style={{ background: color, opacity: i === data.length - 1 ? 1 : 0.35 + (i / data.length) * 0.5 }}
        />
      ))}
    </div>
  );
};

const Card = ({ title, sub, value, change, data, color, delay = 0 }) => {
  const isPos = change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-2xl border border-[#E8E2D4] p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#5a7299]">{title}</p>
          <p className="text-2xl font-black text-[#1a2e5a] mt-1">{value}</p>
          {sub && <p className="text-xs text-[#5a7299] mt-0.5">{sub}</p>}
        </div>
        <span className="flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ color: isPos ? "#166534" : "#991b1b", background: isPos ? "#f0fdf4" : "#fef2f2" }}>
          {isPos ? <FiArrowUp size={10} /> : <FiArrowDown size={10} />}
          {Math.abs(change)}%
        </span>
      </div>
      <MiniBar data={data} color={color} height={60} />
      <div className="flex items-center justify-between mt-2">
        {["T2","T3","T4","T5","T6","T7","CN"].map((d) => (
          <span key={d} className="text-[9px] text-[#5a7299] font-medium flex-1 text-center">{d}</span>
        ))}
      </div>
    </motion.div>
  );
};

const AdminAnalytics = () => {
  const cards = [
    { title: "Doanh thu", value: "₫284.5M", sub: "Tháng 06/2026", change: 12.5, color: "#003087", data: [120, 180, 150, 210, 190, 250, 284], delay: 0 },
    { title: "Đơn hàng", value: "1,248", sub: "Đơn trong tháng", change: 8.2, color: "#0369A1", data: [80, 110, 95, 145, 120, 165, 200], delay: 0.05 },
    { title: "Tài khoản mới", value: "342", sub: "Đăng ký tháng này", change: 18.7, color: "#059669", data: [30, 45, 38, 60, 52, 78, 90], delay: 0.1 },
    { title: "Tỷ lệ chuyển đổi", value: "4.8%", sub: "Truy cập → Mua hàng", change: -1.2, color: "#7C3AED", data: [5.1, 4.9, 5.2, 4.8, 5.0, 4.7, 4.8], delay: 0.15 },
  ];

  const topCats = [
    { name: "Sữa Tươi", pct: 38, revenue: "₫108M", color: "#003087" },
    { name: "Sữa Chua",  pct: 25, revenue: "₫71M",  color: "#0369A1" },
    { name: "Kem",       pct: 18, revenue: "₫51M",  color: "#7C3AED" },
    { name: "Sữa Hạt",  pct: 12, revenue: "₫34M",  color: "#059669" },
    { name: "Sữa Đặc",  pct: 7,  revenue: "₫20M",  color: "#D97706" },
  ];

  const months = ["T1","T2","T3","T4","T5","T6"];
  const revenueByMonth = [180, 210, 195, 240, 260, 284];
  const ordersMonthly  = [850, 980, 920, 1100, 1180, 1248];
  const monthMax = Math.max(...revenueByMonth);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-[#1a2e5a]">Phân tích & Báo cáo</h1>
        <p className="text-sm text-[#5a7299] mt-0.5">Số liệu thống kê 7 ngày và 6 tháng gần nhất</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => <Card key={c.title} {...c} />)}
      </div>

      {/* Monthly Revenue + Category split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E2D4] shadow-sm p-5"
        >
          <h3 className="font-bold text-[#1a2e5a] mb-1">Doanh thu 6 tháng</h3>
          <p className="text-xs text-[#5a7299] mb-5">Triệu đồng (₫)</p>
          <div className="flex items-end gap-3 h-40">
            {months.map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-[#003087]">{revenueByMonth[i]}M</span>
                <motion.div
                  initial={{ height: 0 }} animate={{ height: `${(revenueByMonth[i] / monthMax) * 100}%` }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.5 }}
                  className="w-full rounded-t-xl cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ background: i === 5 ? "#003087" : "#E8F0FB", minHeight: 4 }}
                  title={`${m}: ₫${revenueByMonth[i]}M`}
                />
                <span className="text-[11px] text-[#5a7299] font-medium">{m}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-[#E8E2D4] shadow-sm p-5"
        >
          <h3 className="font-bold text-[#1a2e5a] mb-4">Tỷ lệ theo danh mục</h3>
          <div className="flex flex-col gap-3">
            {topCats.map((c, i) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-[#1a2e5a]">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#5a7299]">{c.revenue}</span>
                    <span className="text-xs font-bold text-[#003087]">{c.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F4EFE0] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ background: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly orders table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-[#E8E2D4] shadow-sm overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-[#E8E2D4]">
          <h3 className="font-bold text-[#1a2e5a]">Tổng hợp theo tháng</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#FAF6EC" }}>
                {["Tháng","Đơn hàng","Doanh thu","Tài khoản mới","Tăng trưởng"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-[11px] font-black uppercase tracking-wider text-[#5a7299]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {months.map((m, i) => {
                const growth = i > 0 ? (((revenueByMonth[i] - revenueByMonth[i-1]) / revenueByMonth[i-1]) * 100).toFixed(1) : null;
                const isPos = growth === null || Number(growth) >= 0;
                return (
                  <tr key={m} className="border-t border-[#E8E2D4] hover:bg-[#FAF6EC] transition-colors">
                    <td className="px-5 py-3.5 text-sm font-bold text-[#1a2e5a]">Tháng {i + 1}/2026</td>
                    <td className="px-5 py-3.5 text-sm text-[#1a2e5a]">{ordersMonthly[i].toLocaleString("vi-VN")}</td>
                    <td className="px-5 py-3.5 text-sm font-bold text-[#003087]">₫{revenueByMonth[i]}M</td>
                    <td className="px-5 py-3.5 text-sm text-[#1a2e5a]">{Math.round(342 * revenueByMonth[i] / 284)}</td>
                    <td className="px-5 py-3.5">
                      {growth !== null ? (
                        <span className="flex items-center gap-0.5 text-xs font-bold" style={{ color: isPos ? "#166534" : "#991B1B" }}>
                          {isPos ? <FiArrowUp size={11} /> : <FiArrowDown size={11} />}
                          {Math.abs(growth)}%
                        </span>
                      ) : <span className="text-xs text-[#5a7299]">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
