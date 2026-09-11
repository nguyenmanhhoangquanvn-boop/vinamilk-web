import axiosClient from "./axiosClient";

export const createOrder = (payload) => axiosClient.post("/api/orders", payload);
export const getOrders = () => axiosClient.get("/api/orders");
export const getOrderById = (id) => axiosClient.get(`/api/orders/${id}`);
export const cancelOrder = (id) => axiosClient.patch(`/api/orders/${id}/cancel`);