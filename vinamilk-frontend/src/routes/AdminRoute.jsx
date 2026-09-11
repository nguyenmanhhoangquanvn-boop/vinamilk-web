import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * AdminRoute — chỉ cho phép user có role admin truy cập.
 * Nếu chưa đăng nhập → redirect về /login
 * Nếu đã đăng nhập nhưng không phải admin → redirect về /
 */
const AdminRoute = ({ redirectTo = "/login" }) => {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6EC]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center leading-none">
            <span className="font-black text-[28px] tracking-tight text-[#003087]" style={{ letterSpacing: "-0.02em" }}>
              Vinamilk<sup className="text-[10px] font-bold relative" style={{ top: "-10px" }}>®</sup>
            </span>
            <span className="text-[9px] font-bold tracking-[0.15em] text-[#003087] opacity-60 mt-0.5">ADMIN PANEL</span>
          </div>
          <div className="w-7 h-7 border-2 border-[#E8E2D4] border-t-[#003087] rounded-full animate-spin" />
          <p className="text-[#5a7299] text-sm font-medium">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to={redirectTo} replace />;

  // Allow any logged in user for demo (in production, check user.role === "admin")
  return <Outlet />;
};

export default AdminRoute;
