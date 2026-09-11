import axiosClient from "./axiosClient";

export const getCart = () => axiosClient.get("/api/cart");
export const updateCartItem = (id, quantity) => axiosClient.put(`/api/cart/${id}`, { quantity });
export const removeCartItem = (id) => axiosClient.delete(`/api/cart/${id}`);
export const clearCartApi = () => axiosClient.delete("/api/cart");