import { FiClock, FiCheck, FiTruck, FiPackage, FiX } from "react-icons/fi";

const statusConfig = {
  pending:   { label: "Chờ xác nhận", color: "bg-amber-100 text-amber-700 border-amber-200",   icon: FiClock,   dot: "bg-amber-400" },
  confirmed: { label: "Đã xác nhận",  color: "bg-blue-100 text-blue-700 border-blue-200",     icon: FiCheck,   dot: "bg-blue-500" },
  shipping:  { label: "Đang giao",    color: "bg-purple-100 text-purple-700 border-purple-200", icon: FiTruck,   dot: "bg-purple-500" },
  delivered: { label: "Đã giao",      color: "bg-green-100 text-green-700 border-green-200",   icon: FiPackage, dot: "bg-green-500" },
  cancelled: { label: "Đã hủy",       color: "bg-red-100 text-red-600 border-red-200",         icon: FiX,       dot: "bg-red-500" },
};

const OrderStatusBadge = ({ status, size = "md" }) => {
  const cfg = statusConfig[status] || statusConfig.pending;
  const Icon = cfg.icon;
  const small = size === "sm";
  return (
    <span className={`inline-flex items-center gap-1.5 font-bold border rounded-full
      ${cfg.color} ${small ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5"}`}>
      <span className={`rounded-full animate-pulse ${cfg.dot} ${small ? "w-1.5 h-1.5" : "w-2 h-2"}`} />
      <Icon size={small ? 11 : 13} />
      {cfg.label}
    </span>
  );
};

export { statusConfig };
export default OrderStatusBadge;