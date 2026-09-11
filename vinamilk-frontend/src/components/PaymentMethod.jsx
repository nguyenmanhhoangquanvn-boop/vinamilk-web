import { motion } from "framer-motion";
import { FiTruck, FiCreditCard, FiSmartphone } from "react-icons/fi";

const methods = [
  {
    id: "cod",
    icon: FiTruck,
    label: "Thanh toán khi nhận hàng",
    sub: "Thanh toán bằng tiền mặt khi nhận hàng (COD)",
    badge: "Phổ biến",
    badgeColor: "bg-green-100 text-green-700",
    color: "from-green-500 to-emerald-400",
  },
  {
    id: "bank",
    icon: FiCreditCard,
    label: "Chuyển khoản ngân hàng",
    sub: "Vietcombank • Techcombank • BIDV • MB Bank",
    badge: null,
    color: "from-blue-500 to-sky-400",
  },
  {
    id: "ewallet",
    icon: FiSmartphone,
    label: "Ví điện tử",
    sub: "MoMo • ZaloPay • VNPay • ShopeePay",
    badge: "Hoàn tiền 5%",
    badgeColor: "bg-red-100 text-red-600",
    color: "from-pink-500 to-rose-400",
  },
];

const PaymentMethod = ({ selected, onChange }) => (
  <div className="space-y-3">
    {methods.map((m) => {
      const Icon = m.icon;
      const active = selected === m.id;
      return (
        <motion.button
          key={m.id}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onChange(m.id)}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200
            ${active ? "border-[#00129B] bg-[#F5F7F9] dark:bg-blue-900/20 shadow-sm" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600"}`}
        >
          {/* Radio */}
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
            ${active ? "border-[#00129B]" : "border-slate-300"}`}>
            {active && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="w-2.5 h-2.5 rounded-full bg-[#00129B]" />
            )}
          </div>

          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color}
                           flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <Icon size={18} className="text-white" />
          </div>

          {/* Label */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className={`text-sm font-bold ${active ? "text-[#00129B] dark:text-blue-400" : "text-slate-800 dark:text-white"}`}>{m.label}</p>
              {m.badge && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.badgeColor}`}>{m.badge}</span>
              )}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{m.sub}</p>
          </div>
        </motion.button>
      );
    })}

    {/* Bank details when selected */}
    {selected === "bank" && (
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 text-sm space-y-2">
        <p className="font-bold text-blue-800 dark:text-blue-400 mb-3">Thông tin chuyển khoản:</p>
        {[
          ["Ngân hàng", "Vietcombank"],
          ["Số tài khoản", "1234567890"],
          ["Chủ tài khoản", "CÔNG TY CP SỮA VIỆT NAM"],
          ["Nội dung", "Thanh toan don hang VINAMILK"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{k}:</span>
            <span className="font-bold text-slate-800 dark:text-white">{v}</span>
          </div>
        ))}
      </motion.div>
    )}

    {selected === "ewallet" && (
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-4 gap-2">
        {[{e:"💳",n:"MoMo"},{e:"💰",n:"ZaloPay"},{e:"🏦",n:"VNPay"},{e:"🛍️",n:"ShopeePay"}].map((w) => (
          <div key={w.n} className="flex flex-col items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                                    rounded-xl p-3 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all">
            <span className="text-2xl">{w.e}</span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{w.n}</span>
          </div>
        ))}
      </motion.div>
    )}
  </div>
);

export default PaymentMethod;