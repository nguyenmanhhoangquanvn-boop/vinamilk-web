import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khởi tạo từ localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user_info");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback((tokenValue, userInfo, remember = false) => {
    setToken(tokenValue);
    setUser(userInfo);
    if (remember) {
      localStorage.setItem("access_token", tokenValue);
      localStorage.setItem("user_info", JSON.stringify(userInfo));
    } else {
      sessionStorage.setItem("access_token", tokenValue);
      sessionStorage.setItem("user_info", JSON.stringify(userInfo));
      localStorage.setItem("access_token", tokenValue);
      localStorage.setItem("user_info", JSON.stringify(userInfo));
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_info");
  }, []);

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export default AuthContext;