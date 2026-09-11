import { createContext, useContext, useState, useCallback, useEffect } from "react";
import axiosClient from "../services/axiosClient";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch từ API khi mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosClient.get("/api/orders");
        setOrders(res.data || []);
      } catch (e) {
        console.error("Lỗi fetch orders:", e);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const addOrder = useCallback((orderData) => {
    const newOrder = {
      _id: `o${Date.now()}`,
      orderId: orderData.orderId || `VNM${Date.now()}`,
      date: new Date().toLocaleDateString("vi-VN"),
      status: "pending",
      paymentMethod: orderData.paymentMethod,
      fullName: orderData.fullName,
      phone: orderData.phone,
      address: orderData.address,
      note: orderData.note || "",
      subtotal: orderData.subtotal,
      shipping: orderData.shipping || 0,
      total: orderData.total,
      items: orderData.items,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const updateOrder = useCallback((orderId, updates) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId || o._id === orderId ? { ...o, ...updates } : o))
    );
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrder, loading }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be inside OrderProvider");
  return ctx;
};

export default OrderContext;