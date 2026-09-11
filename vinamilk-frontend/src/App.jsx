import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet, useNavigationType } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import ErrorBoundary from "./components/ErrorBoundary";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

// ── Direct imports to prevent Suspense fallback ────────────────────────────────
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import VinamilkCare from "./pages/VinamilkCare";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";

// ── Admin imports ─────────────────────────────────────────────────────────────
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategoriesUsers from "./pages/admin/AdminCategoriesUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";


// ── Scroll to top on route change ─────────────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, navigationType]);
  return null;
};

// ── Main layout (Navbar + Footer shared) ─────────────────────────────────────
const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300"
         style={{ background: "var(--vnm-cream)" }}>
      <Navbar />
      <div className="flex-1 w-full overflow-x-hidden">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <Outlet />
        </motion.div>
      </div>
      <Footer />
      <ChatWidget />
    </div>
  );
};

// ── Toast styling ──────────────────────────────────────────────────────────────
const toastOptions = {
  duration: 3000,
  style: {
    background: "#ffffff",
    color: "#0f172a",
    fontFamily: "'VNM Sans Std', 'VNM Sans Display', Arial, sans-serif",
    fontWeight: "600",
    fontSize: "14px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
    padding: "12px 16px",
    maxWidth: "380px",
  },
  success: {
    iconTheme: { primary: "#22c55e", secondary: "#ffffff" },
    style: {
      background: "#f0fdf4",
      color: "#166534",
      border: "1px solid #bbf7d0",
    },
  },
  error: {
    iconTheme: { primary: "#ef4444", secondary: "#ffffff" },
    style: {
      background: "#fef2f2",
      color: "#991b1b",
      border: "1px solid #fecaca",
    },
  },
};

// ── App ───────────────────────────────────────────────────────────────────────
const App = () => {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <CartProvider>
          <OrderProvider>
            <AuthProvider>
            <ErrorBoundary>
              <ScrollToTop />
              <Toaster
                position="top-right"
                gutter={8}
                containerClassName="toast-container"
                toastOptions={toastOptions}
              />
              <Routes>
                {/* Public */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected with shared Navbar & Footer */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/care" element={<VinamilkCare />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                </Route>

                {/* ── Admin Routes ── */}
                <Route element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/categories" element={<AdminCategoriesUsers defaultTab="categories" />} />
                    <Route path="/admin/users" element={<AdminCategoriesUsers defaultTab="users" />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </AuthProvider>
          </OrderProvider>
        </CartProvider>
      </DarkModeProvider>
    </BrowserRouter>
  );
};

export default App;