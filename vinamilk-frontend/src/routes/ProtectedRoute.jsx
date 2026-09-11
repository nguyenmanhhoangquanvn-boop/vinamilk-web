import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Bọc các route cần đăng nhập.
 */
const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-sky-400 rounded-2xl
                          flex items-center justify-center font-black text-white text-xl shadow-lg">
            V
          </div>
          {/* Spinner */}
          <div className="w-8 h-8 border-3 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;